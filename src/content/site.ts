/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  THE PINK PORTFOLIO — single source of truth for every word on the site.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Two kinds of unconfirmed content exist in this file:
 *
 *   todo("hint")   → information that was NOT provided (links, results, roles).
 *                    Renders as a dashed "to confirm" chip so it can't ship
 *                    unnoticed. Replace with a plain string.
 *
 *   draft("text")  → neutral wording written from the project title only
 *                    (no outcomes, no numbers). Renders normally, but is listed
 *                    in the build log until you confirm it by replacing
 *                    draft("…") with a plain string.
 *
 *  `next build` prints every remaining todo/draft. Aim for zero before deploy.
 */

export type Placeholder = { kind: "todo"; hint: string };
export type Draft = { kind: "draft"; text: string };
export type Copy = string | Placeholder | Draft;

export const todo = (hint: string): Placeholder => ({ kind: "todo", hint });
export const draft = (text: string): Draft => ({ kind: "draft", text });

/** A link whose href is unknown yet stays a placeholder (rendered disabled). */
export type LinkValue = { label: string; href: string | Placeholder };

// ─── Identity & SEO ──────────────────────────────────────────────────────────

export const person = {
  fullName: "Syaila Fathia Azzahra",
  shortName: "Thia",
  wordmark: "thia",
  role: "Data & Business Analytics",
  degree: "Computer Science graduate",
  university: "Universitas Pendidikan Indonesia",
  interests: ["Data Analytics", "Business Analysis", "Technology"],
};

export const seo = {
  /** Set to the production domain before deploying (used for canonical + sitemap). */
  siteUrl: "https://example.com",
  title: "Thia — Syaila Fathia Azzahra · Data & Business Analytics",
  description:
    "Portfolio of Syaila Fathia Azzahra (Thia), a Computer Science graduate from Universitas Pendidikan Indonesia focused on data analytics, business analysis and technology.",
  locale: "en_US",
};

/** Put the real file at /public/cv/… and keep this path in sync. */
export const cv = {
  href: "/cv/Syaila-Fathia-Azzahra-CV.pdf",
  available: false, // flip to true once the PDF exists in /public/cv
  fileName: "Syaila-Fathia-Azzahra-CV.pdf",
};

/** Put a portrait at /public/images/thia.jpg (4:5, ≥1000px tall) and set src. */
export const photo = {
  src: null as string | null, // e.g. "/images/thia.jpg"
  alt: "Portrait of Syaila Fathia Azzahra",
};

// ─── Navigation ──────────────────────────────────────────────────────────────

export const nav = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

// ─── Hero ────────────────────────────────────────────────────────────────────

export const hero = {
  portraitPending: "Portrait coming soon",
  roleLines: ["Data", "& Business", "Analytics"],
  collageWords: ["data", "business", "& a little curiosity"],
  greeting: "Hello, I’m",
  cvPending: "CV coming soon",
  atlasTitle: "West Java",
  atlasScope: "27 regions",
  atlasNote: "From regional data to a clearer picture.",
  regionHint: "Explore a region",
  regencyLabel: "Regency",
  cityLabel: "City",
  scrollLabel: "A little more about me",
  status: "Open to analyst roles",
  /** Split so the name stacks on small screens and runs as one line on wide ones. */
  nameLines: ["Syaila Fathia", "Azzahra"],
  /** A statement of fact, not a slogan. */
  lede: "Computer Science graduate from Universitas Pendidikan Indonesia. Most recently, I analysed regional financial data across all 27 regencies and cities of West Java at Indonesia’s Ministry of Finance.",
  primaryCta: { label: "Selected work", href: "#projects" },
  secondaryCta: { label: "CV" },
  toolkit: "Python · SQL · Power BI",
  /** Caption under the abstract West Java composition (hover swaps in the region name). */
  figureCaption: "West Java, 27 regions",
  /** The 27 regencies & cities of West Java — the scope of the DJPb internship analysis. */
  regions: [
    "Kab. Bogor", "Kab. Sukabumi", "Kab. Cianjur", "Kab. Bandung", "Kab. Garut", "Kab. Tasikmalaya",
    "Kab. Ciamis", "Kab. Kuningan", "Kab. Cirebon", "Kab. Majalengka", "Kab. Sumedang", "Kab. Indramayu",
    "Kab. Subang", "Kab. Purwakarta", "Kab. Karawang", "Kab. Bekasi", "Kab. Bandung Barat", "Kab. Pangandaran",
    "Kota Bogor", "Kota Sukabumi", "Kota Bandung", "Kota Cirebon", "Kota Bekasi", "Kota Depok",
    "Kota Cimahi", "Kota Tasikmalaya", "Kota Banjar",
  ],
};

export const headerPresentation = {
  contactLabel: "Let’s talk",
};

// ─── About ───────────────────────────────────────────────────────────────────

export const about = {
  eyebrow: "About me",
  heading: "Curious by nature, *analytical* by training.",
  paragraphs: [
    "Computer Science taught me how systems work; data taught me why decisions get made. I enjoy both sides — writing the query or the script, and then sitting with the result long enough to understand what it actually means for the people who need it.",
    "My internship at the Ministry of Finance's regional treasury office in West Java put that into practice: analysing financial data across all 27 districts and cities of the province, and turning it into reports and dashboards that colleagues could read at a glance.",
    "I'm now looking for a team where careful analysis and clear communication matter as much as the tools.",
  ],
  traits: [
    {
      icon: "brain",
      title: "Analytical thinking",
      body: "Breaking a vague question into measurable parts, then checking the numbers before trusting them.",
    },
    {
      icon: "palette",
      title: "Creativity",
      body: "Looking for the chart, framing or angle that makes an insight land instead of just exist.",
    },
    {
      icon: "messages",
      title: "Communication",
      body: "Translating technical findings into plain language for people who don't live in spreadsheets.",
    },
    {
      icon: "compass",
      title: "Curiosity",
      body: "Asking the second and third “why?” — that's usually where the useful answer is hiding.",
    },
  ],
} as const;

// ─── Experience ──────────────────────────────────────────────────────────────

export const experienceSection = {
  eyebrow: "Experience",
  heading: "Where analysis met *real decisions*.",
};

export const experience = [
  {
    role: "Intern" as Copy,
    roleDetail: todo("Exact internship title (e.g. Data Analyst Intern)"),
    org: "Kanwil DJPb Provinsi Jawa Barat",
    orgLong:
      "Regional Office of the Directorate General of Treasury, West Java — Ministry of Finance of the Republic of Indonesia",
    period: "March – June 2025",
    start: "2025-03",
    end: "2025-06",
    highlight: { value: "27", label: "districts & cities analysed across West Java" },
    summary:
      "Supported regional financial analysis for the treasury office, working with data from every district and city in West Java.",
    bullets: [
      "Analysed regional financial data covering all 27 districts and cities in West Java.",
      "Performed exploratory data analysis (EDA) in Python to profile, clean and understand the datasets.",
      "Built forecasting analyses to project financial indicators.",
      "Prepared analytical reports and dashboards to communicate findings to the team.",
    ],
    tags: ["Python", "EDA", "Forecasting", "Reporting", "Dashboards"],
  },
];

// ─── Projects ────────────────────────────────────────────────────────────────

export const projectsSection = {
  eyebrow: "Selected projects",
  heading: "Three problems, *three ways* of reading data.",
  intro:
    "Each case study covers the problem, my role, the process, the tools and the outcome.",
};

export const projectPresentation = {
  diagramCaption: "Method illustration · not project data",
  methods: ["Regional comparison", "Membership functions", "Classification boundary"],
};

export type Project = {
  slug: string;
  number: string;
  category: string;
  title: string;
  summary: Copy;
  problem: Copy;
  role: Copy;
  process: Copy[];
  stack: Copy[];
  results: Copy[];
  links: LinkValue[];
  accent: "blush" | "pink" | "plum";
};

export const projects: Project[] = [
  {
    slug: "regional-financial-analytics-dashboard",
    number: "01",
    category: "Analytics · Dashboard",
    title: "Regional Financial Analytics Dashboard",
    summary: draft(
      "A dashboard that brings regional financial data into one view so trends and differences between areas are easy to compare."
    ),
    problem: draft(
      "Regional financial data is spread across many areas and periods, which makes it slow to compare performance and spot trends without a consolidated view."
    ),
    role: todo("Your role — e.g. sole analyst, data prep + dashboard design"),
    process: [
      draft("Collected and cleaned the regional financial datasets."),
      draft("Explored the data to choose the indicators worth tracking."),
      draft("Designed dashboard views for comparison across regions and over time."),
    ],
    stack: [todo("Tools used — e.g. Python, Excel, Power BI / Looker Studio")],
    results: [todo("Verified outcome — who used it and what changed")],
    links: [
      { label: "View dashboard", href: todo("Dashboard or repo URL") },
    ],
    accent: "blush",
  },
  {
    slug: "fuzzy-scholarship-selection",
    number: "02",
    category: "Web System · Decision Support",
    title: "Fuzzy-Based Scholarship Selection Web System",
    summary: draft(
      "A web-based decision-support system that uses fuzzy logic to evaluate scholarship applicants against multiple criteria."
    ),
    problem: draft(
      "Scholarship selection weighs several criteria at once, and many of them don't fit neatly into yes/no rules — which makes manual ranking slow and hard to keep consistent."
    ),
    role: todo("Your role — e.g. full-stack developer, fuzzy model design"),
    process: [
      draft("Defined the selection criteria and their fuzzy membership functions."),
      draft("Built the inference rules that turn applicant data into a ranking score."),
      draft("Implemented the web interface for entering applicants and reviewing results."),
    ],
    stack: [todo("Language / framework / database used")],
    results: [todo("Verified outcome — e.g. tested with N applicants, adopted by …")],
    links: [{ label: "View repository", href: todo("GitHub repo URL") }],
    accent: "pink",
  },
  {
    slug: "poverty-classification-research",
    number: "03",
    category: "Research · Machine Learning",
    title: "Data-Driven Poverty Classification Research",
    summary: draft(
      "A research project that applies classification methods to socio-economic data to identify poverty status."
    ),
    problem: draft(
      "Targeting social programmes depends on knowing who is in need; data-driven classification can make that identification more systematic."
    ),
    role: todo("Your role — e.g. lead researcher, thesis author"),
    process: [
      draft("Prepared and pre-processed the socio-economic dataset."),
      draft("Trained and compared classification models."),
      draft("Evaluated model performance and interpreted the key factors."),
    ],
    stack: [todo("Language, libraries and algorithms used")],
    results: [todo("Verified result — e.g. best model + metric, publication")],
    links: [{ label: "Read paper", href: todo("Paper / repository URL") }],
    accent: "plum",
  },
];

// ─── Toolkit ─────────────────────────────────────────────────────────────────

export const toolkitSection = {
  eyebrow: "My toolkit",
  heading: "Tools I reach for, *grouped by purpose*.",
};

export const toolkit: {
  icon: "chart" | "presentation" | "code" | "messages";
  title: string;
  blurb: string;
  items: Copy[];
}[] = [
  {
    icon: "chart",
    title: "Data Analysis",
    blurb: "Profiling, cleaning and questioning data before drawing conclusions.",
    items: ["Python", "SQL", "R", "Exploratory Data Analysis", "Forecasting", "Excel"],
  },
  {
    icon: "presentation",
    title: "Business & Visualization",
    blurb: "Turning analysis into views that decision-makers can read quickly.",
    items: ["Power BI", "Tableau", "Looker Studio", "Excel", "Dashboard design", "Reporting"],
  },
  {
    icon: "code",
    title: "Programming",
    blurb: "The Computer Science foundation underneath the analysis.",
    items: ["Python", "SQL", "R", draft("Web development")],
  },
  {
    icon: "messages",
    title: "Communication",
    blurb: "Making findings understandable to non-technical audiences.",
    items: ["Data storytelling", "Report writing", "Presenting", "Public speaking"],
  },
];

// ─── Beyond the data ─────────────────────────────────────────────────────────

export const beyond = {
  qualitiesLabel: "In a few words",
  eyebrow: "Beyond the data",
  heading: "The person behind the *spreadsheets*.",
  intro:
    "Analysis is only useful when people trust it and understand it. Outside of data work, I build that through leading, organising and speaking.",
  entries: [
    {
      icon: "users",
      kind: "Leadership",
      title: todo("Role & organisation (e.g. Head of Division, …)") as Copy,
      period: todo("Years") as Copy,
      body: todo("One line: what you led and what came of it") as Copy,
    },
    {
      icon: "award",
      kind: "Organisations",
      title: todo("Student organisation / community") as Copy,
      period: todo("Years") as Copy,
      body: todo("One line: your contribution") as Copy,
    },
    {
      icon: "mic",
      kind: "Public speaking",
      title: todo("Event, talk or MC role") as Copy,
      period: todo("Year") as Copy,
      body: todo("One line: audience and topic") as Copy,
    },
  ],
  // Personal qualities weren't specified in the brief — confirm or replace.
  qualities: [
    draft("Detail-minded"),
    draft("Organised"),
    draft("Collaborative"),
    draft("Persistent"),
    draft("Warm"),
  ] as Copy[],
};

// ─── Contact ─────────────────────────────────────────────────────────────────

export const contact = {
  eyebrow: "Contact",
  heading: "Let’s make something *meaningful* together.",
  body:
    "I’m open to roles and collaborations in data analytics, business analysis and technology. The fastest way to reach me is email.",
  email: todo("your.email@example.com") as string | Placeholder,
  links: [
    { label: "LinkedIn", href: todo("linkedin.com/in/…") },
    { label: "GitHub", href: todo("github.com/…") },
  ] as LinkValue[],
};

export const footer = {
  note: "Designed with care, built with Next.js.",
};
