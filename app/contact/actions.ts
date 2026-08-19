"use server";

import { site } from "@/config/site";

export type ContactFormState = {
  status: "idle" | "sent" | "error";
  message: string;
};

/**
 * Server-side contact form handler.
 *
 * Spam protection (no third-party service, per Term 5):
 *  - honeypot field ("company") that humans never see or fill
 *  - minimum-time check: submissions faster than 3s are bots
 *  - server-side validation of every field
 *
 * Delivery: posts to the Resend API (free tier: 100 emails/day) when
 * RESEND_API_KEY is set. Without the key (local dev / preview before the
 * client approves the account) it logs and reports success so the form is
 * testable end to end.
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
      message: "Something went wrong. Please try again.",
    };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      status: "error",
      message:
        "Please provide your name, a valid email address, and a message.",
    };
  }
  if (name.length > 200 || email.length > 200 || message.length > 5000) {
    return {
      status: "error",
      message: "Your message is too long. Please shorten it and try again.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[contact] RESEND_API_KEY not set — logging instead:", {
      name,
      email,
      length: message.length,
    });
    return { status: "sent", message: "Thank you. Your message has been sent." };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `Website contact form <${process.env.CONTACT_FROM ?? "onboarding@resend.dev"}>`,
      to: [site.contactRecipient],
      reply_to: email,
      subject: `Website inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  });

  if (!response.ok) {
    console.error("[contact] delivery failed:", response.status);
    return {
      status: "error",
      message:
        "We could not send your message. Please email the firm directly.",
    };
  }

  return { status: "sent", message: "Thank you. Your message has been sent." };
}
