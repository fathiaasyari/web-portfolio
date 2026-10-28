import type { ComponentProps, ReactNode } from "react";
import { Download, Clock } from "lucide-react";
import { cv, type Copy, type LinkValue } from "@/content/site";

/* ── Content helpers ─────────────────────────────────────────────────────── */

export function isTodo(v: unknown): v is { kind: "todo"; hint: string } {
  return typeof v === "object" && v !== null && (v as { kind?: string }).kind === "todo";
}

/** Renders a Copy value: plain string, draft text, or a visible placeholder chip. */
export function Text({ value }: { value: Copy }) {
  if (typeof value === "string") return <>{value}</>;
  if (value.kind === "draft") return <>{value.text}</>;
  return (
    <span className="todo" title="Placeholder — edit src/content/site.ts">
      <Clock aria-hidden className="size-3.5 shrink-0" />
      <span>
        <span className="sr-only">To be confirmed: </span>
        {value.hint}
      </span>
    </span>
  );
}

/* ── Buttons ─────────────────────────────────────────────────────────────── */

const base =
  "group inline-flex min-h-12 items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-medium leading-none transition-[background-color,color,border-color] duration-200";

const variants = {
  primary:
    "bg-plum text-white hover:bg-rose-ink",
  secondary:
    "border border-plum/25 text-plum hover:border-plum hover:bg-paper",
  ghost: "text-plum hover:bg-blush",
};

type Variant = keyof typeof variants;

export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  ...props
}: ComponentProps<"a"> & { variant?: Variant }) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </a>
  );
}

/**
 * Download CV — a real download link once the PDF exists; until then a disabled
 * button that explains why, so recruiters never hit a 404.
 */
export function CvButton({
  variant = "primary",
  label = "Download CV",
  className = "",
}: {
  variant?: Variant;
  label?: string;
  className?: string;
}) {
  const icon = (
    <Download aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
  );
  if (cv.available) {
    return (
      <ButtonLink variant={variant} href={cv.href} download={cv.fileName} className={className}>
        {label}
        {icon}
      </ButtonLink>
    );
  }
  return (
    <button
      type="button"
      disabled
      aria-disabled="true"
      title="CV coming soon"
      className={`${base} ${variants[variant]} ${className} cursor-not-allowed opacity-70`}
    >
      {label}
      <span
        className={`rounded-full px-2 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-wider ${
          variant === "primary" ? "bg-white/15 text-white" : "bg-blush text-rose-ink"
        }`}
      >
        Soon<span className="sr-only"> — CV coming soon</span>
      </span>
    </button>
  );
}

/** External link that degrades to a placeholder chip when the URL is unknown. */
export function MaybeLink({
  link,
  className = "",
  children,
}: {
  link: LinkValue;
  className?: string;
  children?: ReactNode;
}) {
  if (isTodo(link.href)) {
    return (
      <span className={`${className} cursor-not-allowed opacity-70`} aria-disabled="true">
        {children ?? link.label}
        <span className="sr-only"> (link coming soon)</span>
      </span>
    );
  }
  return (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
      {children ?? link.label}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

/* ── Layout ──────────────────────────────────────────────────────────────── */

export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-[76rem] px-5 sm:px-8 ${className}`}>{children}</div>;
}

/** Preserve the editable copy while letting the heading, rather than accents, carry hierarchy. */
export function Emph({ text }: { text: string }) {
  return <>{text.replace(/\*([^*]+)\*/g, "$1")}</>;
}

