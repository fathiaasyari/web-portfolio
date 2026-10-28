import type { Metadata, Viewport } from "next";
import "./globals.css";
import { person, seo, contact } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(seo.siteUrl),
  title: seo.title,
  description: seo.description,
  applicationName: `${person.wordmark}.`,
  authors: [{ name: person.fullName }],
  keywords: [
    person.fullName,
    "Thia",
    "data analyst",
    "business analyst",
    "data analytics portfolio",
    "Universitas Pendidikan Indonesia",
    "Computer Science",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    title: seo.title,
    description: seo.description,
    siteName: `${person.wordmark}.`,
    locale: seo.locale,
    firstName: "Syaila Fathia",
    lastName: "Azzahra",
  },
  twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FAF7F6",
  colorScheme: "light",
};

/** schema.org Person — only fields we actually know; sameAs filled once links exist. */
function jsonLd() {
  const sameAs = contact.links.map((l) => l.href).filter((h): h is string => typeof h === "string");
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.fullName,
    alternateName: person.shortName,
    url: seo.siteUrl,
    alumniOf: { "@type": "CollegeOrUniversity", name: person.university },
    knowsAbout: person.interests,
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only rounded-full bg-plum px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
