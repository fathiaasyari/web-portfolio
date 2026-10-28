import * as site from "./site";

let reported = false;

/** Walks site.ts and prints every todo()/draft() still in place. Server-only. */
export function auditContent() {
  if (reported) return;
  reported = true;

  const todos: string[] = [];
  const drafts: string[] = [];

  const walk = (value: unknown, path: string) => {
    if (Array.isArray(value)) return value.forEach((v, i) => walk(v, `${path}[${i}]`));
    if (value && typeof value === "object") {
      const v = value as Record<string, unknown>;
      if (v.kind === "todo") return void todos.push(`${path}: ${v.hint}`);
      if (v.kind === "draft") return void drafts.push(`${path}: ${String(v.text).slice(0, 70)}…`);
      for (const [k, child] of Object.entries(v)) walk(child, path ? `${path}.${k}` : k);
    }
  };
  for (const [k, v] of Object.entries(site)) if (typeof v !== "function") walk(v, k);

  const extra: string[] = [];
  if (!site.cv.available) extra.push("cv.available is false — add the PDF to /public/cv and flip it");
  if (!site.photo.src) extra.push("photo.src is null — add a portrait to /public/images");
  if (site.seo.siteUrl.includes("example.com")) extra.push("seo.siteUrl still points to example.com");

  if (todos.length + drafts.length + extra.length === 0) return;
  console.warn(
    [
      "",
      `◆ Content audit — ${todos.length} placeholder(s), ${drafts.length} draft(s), ${extra.length} setup item(s)`,
      ...extra.map((s) => `  ! ${s}`),
      ...todos.map((s) => `  ○ TODO  ${s}`),
      ...drafts.map((s) => `  ◌ DRAFT ${s}`),
      "  Edit src/content/site.ts to resolve.",
      "",
    ].join("\n")
  );
}
