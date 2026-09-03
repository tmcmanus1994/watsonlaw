"use client";

import { useActionState, useState } from "react";
import { submitContact, type ContactFormState } from "@/app/contact/actions";

const initialState: ContactFormState = { status: "idle", message: "" };

const inputClasses =
  "border border-rule bg-paper px-3 py-2 text-ink";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);
  // Set on first interaction; the server rejects submissions where the gap
  // between this and submit is bot-fast.
  const [startedAt, setStartedAt] = useState(0);

  if (state.status === "sent") {
    return (
      <p role="status" className="border border-rule bg-paper-deep p-6">
        {state.message}
      </p>
    );
  }

  return (
    <form
      action={formAction}
      className="grid max-w-xl gap-5"
      onFocusCapture={() => {
        if (startedAt === 0) setStartedAt(Date.now());
      }}
    >
      <input type="hidden" name="startedAt" value={startedAt} />

      {/* Honeypot — hidden from people, tempting to bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="name" className="label text-ink">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className={inputClasses}
        />
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="email" className="label text-ink">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputClasses}
        />
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="phone" className="label text-ink">
          Phone <span className="normal-case tracking-normal">(optional)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className={inputClasses}
        />
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="message" className="label text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={7}
          className={inputClasses}
        />
      </div>

      {state.status === "error" && (
        <p role="alert" className="border-l-2 border-accent pl-4 text-[length:var(--text-small)]">
          {state.message}
        </p>
      )}
      {state.status === "sent-dev" && (
        <p role="status" className="border-l-2 border-rule pl-4 text-[length:var(--text-small)] text-gray">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="label justify-self-start border border-ink px-6 py-3 text-ink hover:border-accent hover:text-accent disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
