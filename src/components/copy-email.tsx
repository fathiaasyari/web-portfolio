"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the mailto link next to this button still works */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-line bg-card text-plum transition-[background-color,scale] duration-300 hover:bg-blush active:scale-95"
      aria-label={copied ? "Email address copied" : "Copy email address"}
    >
      {copied ? <Check aria-hidden className="size-4 text-rose-ink" /> : <Copy aria-hidden className="size-4" />}
      <span aria-live="polite" className="sr-only">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </button>
  );
}
