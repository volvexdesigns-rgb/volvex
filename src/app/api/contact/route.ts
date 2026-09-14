import nodemailer, { type Transporter } from "nodemailer";
import { NextResponse } from "next/server";

// nodemailer needs the Node runtime (not edge).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Basic abuse guard. Per-instance only — swap for Redis/Upstash if you scale out. */
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const submissions = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (submissions.get(key) ?? []).filter(
    (time) => now - time < RATE_LIMIT_WINDOW_MS,
  );

  if (recent.length >= RATE_LIMIT_MAX) {
    submissions.set(key, recent);
    return true;
  }

  recent.push(now);
  submissions.set(key, recent);

  // Keep the map from growing without bound on a long-lived instance.
  if (submissions.size > 500) {
    for (const [ip, times] of submissions) {
      if (times.every((time) => now - time >= RATE_LIMIT_WINDOW_MS)) {
        submissions.delete(ip);
      }
    }
  }

  return false;
}

let cachedTransporter: Transporter | null = null;

/** Names the variables the host is missing, so logs point straight at the gap. */
function missingSmtpVars(): string[] {
  return (["SMTP_HOST", "SMTP_USER", "SMTP_PASSWORD"] as const).filter(
    (name) => !process.env[name],
  );
}

function getTransporter(): Transporter | null {
  if (cachedTransporter) return cachedTransporter;

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;

  if (!host || !user || !password) return null;

  const port = Number(process.env.SMTP_PORT ?? 465);

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    // App passwords are often copied with spaces in them.
    auth: { user, pass: password.replace(/\s+/g, "") },
  });

  return cachedTransporter;
}

/** Escapes values before they are interpolated into the HTML email body. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Strips CR/LF so user input can never inject extra mail headers. */
function sanitizeHeader(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function field(form: FormData, name: string): string {
  const value = form.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const transporter = getTransporter();

  if (!transporter) {
    console.error(
      `[Volvex Designs] SMTP is not configured — missing ${missingSmtpVars().join(
        ", ",
      )}. Set these in your host's environment variables, then redeploy.`,
    );
    return NextResponse.json(
      { error: "Email is not configured on the server." },
      { status: 500 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again shortly." },
      { status: 429 },
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real people never fill a hidden field.
  if (field(form, "website")) {
    return NextResponse.json({ ok: true });
  }

  const fullName = field(form, "fullName");
  const email = field(form, "email");
  const phone = field(form, "phone");
  const message = field(form, "message");

  // Server-side validation — the client checks are for UX only.
  const errors: string[] = [];
  if (fullName.length < 2 || fullName.length > 120) errors.push("fullName");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 200) {
    errors.push("email");
  }
  if (message.length < 10 || message.length > 5000) errors.push("message");

  if (errors.length > 0) {
    return NextResponse.json(
      { error: "Some fields need attention.", fields: errors },
      { status: 422 },
    );
  }

  const rows: [string, string][] = [
    ["Name", fullName],
    ["Email", email],
    ["Phone / WhatsApp", phone || "—"],
  ];

  const html = `
    <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0b1215;line-height:1.6;max-width:640px">
      <p style="margin:0 0 4px;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#00998f">
        New project brief
      </p>
      <h1 style="margin:0 0 24px;font-size:22px;font-weight:600">${escapeHtml(fullName)}</h1>
      <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:10px 16px 10px 0;color:#5c6a6d;vertical-align:top;white-space:nowrap;border-bottom:1px solid #e8eded">${escapeHtml(
              label,
            )}</td>
            <td style="padding:10px 0;border-bottom:1px solid #e8eded">${escapeHtml(
              value,
            )}</td>
          </tr>`,
          )
          .join("")}
      </table>
      <h2 style="margin:28px 0 8px;font-size:14px;color:#5c6a6d;font-weight:600">About the project</h2>
      <p style="margin:0;white-space:pre-wrap;font-size:14px">${escapeHtml(message)}</p>
      <p style="margin:32px 0 0;padding-top:16px;border-top:1px solid #e8eded;font-size:12px;color:#8c9799">
        Sent from the Volvex Designs project brief form. Reply directly to reach ${escapeHtml(
          fullName,
        )}.
      </p>
    </div>
  `;

  const text = [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "About the project:",
    message,
  ].join("\n");

  try {
    await transporter.sendMail({
      // Gmail rewrites From to the authenticated account, so send as ourselves
      // and put the enquirer on Reply-To.
      from: `"Volvex Designs Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER,
      replyTo: `"${sanitizeHeader(fullName)}" <${sanitizeHeader(email)}>`,
      subject: `New project brief — ${sanitizeHeader(fullName)}`,
      text,
      html,
    });
  } catch (error) {
    console.error("[Volvex Designs] Failed to send project brief:", error);
    return NextResponse.json(
      { error: "Could not send your brief. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
