"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  CircleCheck,
  LoaderCircle,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { useId, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { CONTACT, telHref, whatsappHref } from "@/data/site";
import { clsx } from "@/lib/clsx";
import { submitProjectBrief, type ProjectBrief } from "@/lib/contact";
import { EASE } from "@/lib/motion";

type FieldName = "fullName" | "email" | "phone" | "message";

type Errors = Partial<Record<FieldName, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const EMPTY_BRIEF: ProjectBrief = {
  fullName: "",
  email: "",
  phone: "",
  message: "",
};

function validate(brief: ProjectBrief): Errors {
  const errors: Errors = {};

  if (brief.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(brief.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (brief.phone.trim() && !/^[+\d][\d\s\-()]{6,19}$/.test(brief.phone.trim())) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (brief.message.trim().length < 10) {
    errors.message = "Tell us a little about the project.";
  }

  return errors;
}

const FIELD_CLASSES =
  "w-full rounded-xl border bg-white px-4 py-3 text-[0.9375rem] text-ink " +
  "placeholder:text-muted-2 transition-colors duration-200 " +
  "focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/12";

function FieldShell({
  label,
  htmlFor,
  error,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 flex items-baseline gap-2 text-[0.8125rem] font-medium text-ink"
      >
        {label}
        {optional ? (
          <span className="text-[0.75rem] font-normal text-muted-2">
            Optional
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="mt-1.5 text-[0.8125rem] text-red-600"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function Contact() {
  const formId = useId();
  const [brief, setBrief] = useState<ProjectBrief>(EMPTY_BRIEF);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const reduceMotion = useReducedMotion();

  const fieldId = (name: string) => `${formId}-${name}`;

  const update = <K extends keyof ProjectBrief>(
    key: K,
    value: ProjectBrief[K],
  ) => {
    setBrief((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!(key in current)) return current;
      const next = { ...current };
      delete next[key as FieldName];
      return next;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate(brief);
    setErrors(nextErrors);

    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      setStatus("idle");
      const element = formRef.current?.querySelector<HTMLElement>(
        `[data-field="${firstError}"]`,
      );
      element?.focus();
      element?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }

    setStatus("submitting");
    setSubmitError(null);
    try {
      await submitProjectBrief(brief, honeypot);
      setStatus("success");
      setBrief(EMPTY_BRIEF);
    } catch (error) {
      setSubmitError(
        error instanceof Error && error.message ? error.message : null,
      );
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="border-t border-line bg-white py-20 sm:py-28 lg:py-32"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Intro column */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="lg:sticky lg:top-32">
                <SectionLabel>Start a project</SectionLabel>
                <h2 className="type-h2 mt-5 text-ink">Let&apos;s talk.</h2>
                <p className="type-lead mt-6 max-w-[40ch] text-muted">
                  Tell us what you&apos;re trying to build. We&apos;ll tell you
                  what it takes.
                </p>

                <ul className="mt-10 space-y-3.5 border-t border-line pt-8">
                  <li>
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="group inline-flex items-center gap-3 text-[0.9375rem] text-ink transition-colors hover:text-brand-deep"
                    >
                      <span className="grid size-9 place-items-center rounded-lg border border-line bg-surface transition-colors group-hover:border-brand/30 group-hover:bg-brand-mist">
                        <Mail
                          aria-hidden="true"
                          strokeWidth={1.6}
                          className="size-4 text-brand-deep"
                        />
                      </span>
                      {CONTACT.email}
                    </a>
                  </li>
                  {CONTACT.phones.map((phone) => (
                    <li key={phone} className="flex flex-wrap items-center gap-2">
                      <a
                        href={telHref(phone)}
                        className="group inline-flex items-center gap-3 text-[0.9375rem] text-ink transition-colors hover:text-brand-deep"
                      >
                        <span className="grid size-9 place-items-center rounded-lg border border-line bg-surface transition-colors group-hover:border-brand/30 group-hover:bg-brand-mist">
                          <Phone
                            aria-hidden="true"
                            strokeWidth={1.6}
                            className="size-4 text-brand-deep"
                          />
                        </span>
                        {phone}
                      </a>
                      <a
                        href={whatsappHref(phone)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Message ${phone} on WhatsApp`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-2.5 py-1 text-[0.75rem] font-medium text-muted transition-colors hover:border-brand/30 hover:bg-brand-mist hover:text-brand-deep"
                      >
                        <WhatsAppIcon className="size-3.5" />
                        WhatsApp
                      </a>
                    </li>
                  ))}
                  {CONTACT.location ? (
                    <li className="inline-flex items-center gap-3 text-[0.9375rem] text-muted">
                      <span className="grid size-9 place-items-center rounded-lg border border-line bg-surface">
                        <MapPin
                          aria-hidden="true"
                          strokeWidth={1.6}
                          className="size-4 text-brand-deep"
                        />
                      </span>
                      {CONTACT.location}
                    </li>
                  ) : null}
                </ul>

                <p className="mt-8 flex items-start gap-2.5 text-[0.8125rem] leading-relaxed text-muted">
                  <ShieldCheck
                    aria-hidden="true"
                    strokeWidth={1.6}
                    className="mt-0.5 size-4 shrink-0 text-brand"
                  />
                  Your details stay with us. We don&apos;t share or sell your
                  information.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Form column */}
          <div className="lg:col-span-7">
            <Reveal delay={0.08}>
              <div className="rounded-[20px] border border-line bg-surface p-6 sm:p-8 lg:p-10">
                <AnimatePresence mode="wait" initial={false}>
                  {status === "success" ? (
                    <motion.div
                      key="success"
                      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="flex flex-col items-start py-8"
                      role="status"
                    >
                      <span className="grid size-12 place-items-center rounded-full bg-brand-pale">
                        <CircleCheck
                          aria-hidden="true"
                          strokeWidth={1.6}
                          className="size-6 text-brand-deep"
                        />
                      </span>
                      <h3 className="mt-6 text-xl font-semibold text-ink">
                        Brief received.
                      </h3>
                      <p className="mt-3 max-w-[44ch] text-[0.9375rem] leading-relaxed text-muted">
                        Thanks for the detail — it makes the first conversation
                        far more useful. We&apos;ll review it and come back to
                        you shortly.
                      </p>
                      <button
                        type="button"
                        onClick={() => setStatus("idle")}
                        className="mt-7 text-sm font-medium text-brand-deep underline decoration-brand/40 underline-offset-4 transition-colors hover:decoration-brand"
                      >
                        Send another brief
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      ref={formRef}
                      onSubmit={handleSubmit}
                      noValidate
                      initial={false}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-6"
                    >
                      {/* Honeypot — hidden from people, irresistible to bots. */}
                      <div aria-hidden="true" className="sr-only">
                        <label htmlFor={fieldId("website")}>
                          Leave this field empty
                        </label>
                        <input
                          id={fieldId("website")}
                          name="website"
                          type="text"
                          tabIndex={-1}
                          autoComplete="off"
                          value={honeypot}
                          onChange={(event) => setHoneypot(event.target.value)}
                        />
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <FieldShell
                          label="Full name"
                          htmlFor={fieldId("fullName")}
                          error={errors.fullName}
                        >
                          <input
                            id={fieldId("fullName")}
                            data-field="fullName"
                            name="fullName"
                            type="text"
                            autoComplete="name"
                            placeholder="Jane Doe"
                            value={brief.fullName}
                            onChange={(event) =>
                              update("fullName", event.target.value)
                            }
                            aria-invalid={Boolean(errors.fullName)}
                            aria-describedby={
                              errors.fullName
                                ? `${fieldId("fullName")}-error`
                                : undefined
                            }
                            className={clsx(
                              FIELD_CLASSES,
                              errors.fullName
                                ? "border-red-400"
                                : "border-line",
                            )}
                          />
                        </FieldShell>

                        <FieldShell
                          label="Work email"
                          htmlFor={fieldId("email")}
                          error={errors.email}
                        >
                          <input
                            id={fieldId("email")}
                            data-field="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="jane@company.com"
                            value={brief.email}
                            onChange={(event) =>
                              update("email", event.target.value)
                            }
                            aria-invalid={Boolean(errors.email)}
                            aria-describedby={
                              errors.email
                                ? `${fieldId("email")}-error`
                                : undefined
                            }
                            className={clsx(
                              FIELD_CLASSES,
                              errors.email ? "border-red-400" : "border-line",
                            )}
                          />
                        </FieldShell>

                        <FieldShell
                          label="Phone / WhatsApp"
                          htmlFor={fieldId("phone")}
                          error={errors.phone}
                          optional
                        >
                          <input
                            id={fieldId("phone")}
                            data-field="phone"
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            placeholder="+91 00000 00000"
                            value={brief.phone}
                            onChange={(event) =>
                              update("phone", event.target.value)
                            }
                            aria-invalid={Boolean(errors.phone)}
                            aria-describedby={
                              errors.phone
                                ? `${fieldId("phone")}-error`
                                : undefined
                            }
                            className={clsx(
                              FIELD_CLASSES,
                              errors.phone ? "border-red-400" : "border-line",
                            )}
                          />
                        </FieldShell>
                      </div>

                      <FieldShell
                        label="Tell us about the project"
                        htmlFor={fieldId("message")}
                        error={errors.message}
                      >
                        <textarea
                          id={fieldId("message")}
                          data-field="message"
                          name="message"
                          rows={5}
                          placeholder="What are you building, who is it for, and what does success look like?"
                          value={brief.message}
                          onChange={(event) =>
                            update("message", event.target.value)
                          }
                          aria-invalid={Boolean(errors.message)}
                          aria-describedby={
                            errors.message
                              ? `${fieldId("message")}-error`
                              : undefined
                          }
                          className={clsx(
                            FIELD_CLASSES,
                            "resize-y",
                            errors.message ? "border-red-400" : "border-line",
                          )}
                        />
                      </FieldShell>

                      <div className="border-t border-line pt-6">
                        <button
                          type="submit"
                          disabled={status === "submitting"}
                          className="group inline-flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 text-base font-medium text-white shadow-[0_10px_30px_-14px_rgba(0,181,182,0.9)] transition-[background-color,box-shadow,transform] duration-300 hover:bg-brand-deep active:translate-y-px disabled:cursor-not-allowed disabled:opacity-70 sm:h-14 sm:w-auto sm:px-8"
                        >
                          {status === "submitting" ? (
                            <>
                              <LoaderCircle
                                aria-hidden="true"
                                className="size-4 animate-spin"
                              />
                              Sending…
                            </>
                          ) : (
                            <>
                              Send Project Brief
                              <span
                                aria-hidden="true"
                                className="transition-transform duration-300 group-hover:translate-x-1"
                              >
                                →
                              </span>
                            </>
                          )}
                        </button>

                        {status === "error" ? (
                          <p
                            role="alert"
                            className="mt-4 text-[0.875rem] text-red-600"
                          >
                            {submitError ??
                              "Something went wrong sending your brief."}{" "}
                            Please try again, or email us at{" "}
                            <a
                              href={`mailto:${CONTACT.email}`}
                              className="underline underline-offset-4"
                            >
                              {CONTACT.email}
                            </a>
                            .
                          </p>
                        ) : null}

                        <p className="mt-4 text-[0.8125rem] leading-relaxed text-muted">
                          Your details stay with us. We don&apos;t share or sell
                          your information.
                        </p>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
