"use client";

import { useActionState, useState } from "react";
import { submitContact, type ContactFormState } from "@/app/contact/actions";

const initialState: ContactFormState = { status: "idle", message: "" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);
  // Set on first interaction; the server rejects submissions where the gap
  // between this and submit is bot-fast.
  const [startedAt, setStartedAt] = useState(0);

  if (state.status === "sent") {
    return (
      <p role="status" className="border border-line bg-paper-shade p-6">
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
        <label htmlFor="name" className="text-sm font-semibold">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="border border-line bg-paper px-3 py-2"
        />
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="email" className="text-sm font-semibold">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="border border-line bg-paper px-3 py-2"
        />
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="message" className="text-sm font-semibold">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={7}
          className="border border-line bg-paper px-3 py-2"
        />
      </div>

      {state.status === "error" && (
        <p role="alert" className="text-sm text-ink">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="justify-self-start bg-accent px-6 py-3 text-sm text-accent-ink disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
