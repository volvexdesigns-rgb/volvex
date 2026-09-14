/**
 * Client side of the project brief form.
 *
 * Briefs are POSTed to the route handler at `src/app/api/contact/route.ts`,
 * which emails them over SMTP. Credentials live in `.env.local` (see
 * `.env.example`) — nothing secret is referenced from this file.
 *
 * To send somewhere else instead (a CRM, a form service), point
 * `NEXT_PUBLIC_CONTACT_ENDPOINT` at that URL; it receives the same multipart
 * payload built by `toFormData`.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "/api/contact";

export interface ProjectBrief {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

/** Serialises the brief so any multipart-capable endpoint can consume it. */
export function toFormData(brief: ProjectBrief, honeypot = ""): FormData {
  const data = new FormData();
  data.append("fullName", brief.fullName);
  data.append("email", brief.email);
  data.append("phone", brief.phone);
  data.append("message", brief.message);
  // Spam trap — the server silently discards anything that fills this in.
  data.append("website", honeypot);
  return data;
}

export async function submitProjectBrief(
  brief: ProjectBrief,
  honeypot = "",
): Promise<void> {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    body: toFormData(brief, honeypot),
  });

  if (!response.ok) {
    const detail = await response
      .json()
      .then((body: { error?: string }) => body?.error)
      .catch(() => undefined);

    throw new Error(detail ?? `Project brief submission failed (${response.status})`);
  }
}
