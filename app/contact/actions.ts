"use server";

import { site } from "@/config/site";

export type ContactFormState = {
  status: "idle" | "sent" | "sent-dev" | "error";
  message: string;
};

const DIRECT_EMAILS = site.contactRecipients.join(" or ");

/**
 * Server-side contact form handler. Mirrors the firm's previous inquiry
 * form: name · email · phone · message. Delivers to BOTH recipients in
 * config/site.ts via the Resend API.
 *
 * Spam protection (no third-party service): honeypot field, minimum-time
 * check, server-side validation.
 *
 * Failure posture (contract Term 13 — fail loudly):
 *  - production with no RESEND_API_KEY → hard error state pointing the
 *    visitor at the direct email addresses; never a silent fake success
 *  - development with no key → logs THAT a submission occurred (never the
 *    message body — potential-client communications may be privileged) and
 *    returns a state that says delivery was skipped
 *  - delivery failure → error message includes the direct emails
 */
export async function submitContact(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Honeypot: silently accept so bots get no signal.
  if (String(formData.get("company") ?? "") !== "") {
    return { status: "sent", message: "Thank you. Your message has been sent." };
  }

  // Time gate: reject sub-3-second submissions.
  const startedAt = Number(formData.get("startedAt"));
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 3000) {
    return {
      status: "error",
      message: `Something went wrong. Please try again, or write to ${DIRECT_EMAILS}.`,
    };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      status: "error",
      message:
        "Please provide your name, a valid email address, and a message.",
    };
  }
  if (
    name.length > 200 ||
    email.length > 200 ||
    phone.length > 50 ||
    message.length > 5000
  ) {
    return {
      status: "error",
      message: "Your message is too long. Please shorten it and try again.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV === "production") {
      // Fail loudly: never pretend a message was delivered.
      console.error(
        "[contact] RESEND_API_KEY is not configured in production — submission NOT delivered."
      );
      return {
        status: "error",
        message: `The contact form is not yet configured. Please email ${DIRECT_EMAILS}, or call either office.`,
      };
    }
    // Dev: no body logged; the UI states that nothing was delivered.
    console.log("[contact] dev submission received (not delivered — no RESEND_API_KEY)");
    return {
      status: "sent-dev",
      message:
        "Development mode: the form works, but no email was sent (RESEND_API_KEY is not set).",
    };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `Website inquiry <${process.env.CONTACT_FROM ?? "onboarding@resend.dev"}>`,
      to: [...site.contactRecipients],
      reply_to: email,
      subject: `${site.name} website inquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        "",
        message,
      ]
        .filter((line) => line !== null)
        .join("\n"),
    }),
  });

  if (!response.ok) {
    // Status code only — never the submission contents.
    console.error(`[contact] delivery failed with HTTP ${response.status}`);
    return {
      status: "error",
      message: `We could not send your message. Please email ${DIRECT_EMAILS}, or call either office.`,
    };
  }

  return { status: "sent", message: "Thank you. Your message has been sent." };
}
