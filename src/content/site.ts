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
  available: true,
  fileName: "Syaila-Fathia-Azzahra-CV.pdf",
};

export const photo = {
  src: "/images/hero-photo.jpeg" as string | null,
  alt: "Portrait of Syaila Fathia Azzahra",
};

// ─── Navigation ──────────────────────────────────────────────────────────────

export const nav = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "activity", label: "Activity" },
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
    links: [{ label: "Read paper", href: "https://journal.ukrim.ac.id/index.php/JIF/article/view/753" }],
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

// ─── Activity gallery ────────────────────────────────────────────────────────

export type ActivityItem = {
  id: string;
  kind: "video" | "photo";
  title: string;
  caption: string;
  detail: string;
  category: string;
  /** Local path under public, e.g. /images/activity/event.jpg. Null shows a paper placeholder. */
  image: { src: string; alt: string; position?: string } | null;
  /** Optional original post or video; displayed separately from the photo viewer. */
  href?: string;
  linkLabel?: string;
};

export const activitySection = {
  heading: "A little life, *outside the spreadsheet*.",
  intro: "From internship days to campus microphones. A little board of things worth keeping.",
  note: "Little moments, happily kept. Tap a photo for the whole picture.",
};

export const activities: ActivityItem[] = [
  {
    id: "internship-report-discussion",
    kind: "photo",
    category: "Internship · Reports & discussion",
    title: "From draft to discussion.",
    caption: "A few laptops, a shared screen, and a fresh pair of eyes.",
    detail: "A report on the shared screen and a table of laptops during the DJPb West Java internship. These are the quieter moments behind a finished document: reading together, discussing the wording, and giving the next draft a little more clarity. Yes, the spreadsheet has a social life too.",
    image: { src: "/images/activity/internship-report-discussion.jpeg", alt: "Colleagues discussing a report displayed on a shared screen around a meeting table", position: "50% 80%" },
  },
  {
    id: "internship-ksp-focus-group",
    kind: "photo",
    category: "Internship · Knowledge sharing",
    title: "A seat at the conversation.",
    caption: "Notebook energy, big-room edition.",
    detail: "A moment from the 2024/25 KSP with Indonesia Focus Group Discussion in Bandung, dated 26 June 2025 on the presentation screen. Part of the internship album: a room of different perspectives, a panel discussion, and plenty to listen to. Curiosity gets a seat, too.",
    image: { src: "/images/activity/internship-ksp-focus-group.jpeg", alt: "Panel at the 2024/25 KSP with Indonesia Focus Group Discussion in Bandung on 26 June 2025", position: "50% 75%" },
  },
  {
    id: "internship-batik-team",
    kind: "photo",
    category: "Internship · The people",
    title: "Batik, but make it a team photo.",
    caption: "The dress code understood the assignment.",
    detail: "A group portrait from the internship days, with batik patterns, office lanyards, and everyone's best camera-ready expression. The work matters, and so do the people who make the days memorable. Filing this under: colleagues, colour, and a very good photo.",
    image: { src: "/images/activity/internship-batik-team.jpeg", alt: "Internship team posing together in batik and office attire" },
  },
  {
    id: "internship-hybrid-meeting",
    kind: "photo",
    category: "Internship · Team meetings",
    title: "One room, a few extra tabs.",
    caption: "Laptops open. People connected. A quick smile for the camera.",
    detail: "An office meeting with colleagues around the table and more participants joining on the screen. A little snapshot of the hybrid side of internship life — somewhere between the laptops, microphones, and meeting notes, there is still time for a smile.",
    image: { src: "/images/activity/internship-hybrid-meeting.jpeg", alt: "Colleagues with laptops at an office meeting with remote participants on a video-call screen" },
  },
  {
    id: "internship-morning-exercise",
    kind: "photo",
    category: "Internship · Beyond the desk",
    title: "A different kind of warm-up.",
    caption: "Before the tabs multiply, a little sunshine and movement.",
    detail: "An outdoor group exercise moment during the internship days. A change of pace from meeting rooms and screens: fresh air, a bit of movement, and a shared morning outside. Even a data-filled day can start with a little stretch.",
    image: { src: "/images/activity/internship-morning-exercise.jpeg", alt: "A group taking part in morning exercise outdoors in a sunny office courtyard" },
  },
  {
    id: "internship-dwi-warna-team",
    kind: "photo",
    category: "Internship · DJPb West Java",
    title: "The whole team, one frame.",
    caption: "A very full frame of very good company.",
    detail: "A group photo in front of Gedung Dwi Warna, with office-day formality swapped for a more relaxed moment together. One of the people-filled pages of the DJPb West Java internship album. Getting everyone into the frame might be its own team-building exercise.",
    image: { src: "/images/activity/internship-dwi-warna-team.jpeg", alt: "A large group posing in sportswear in front of Gedung Dwi Warna", position: "50% 65%" },
  },
  {
    id: "internship-energy-transition-discussion",
    kind: "photo",
    category: "Internship · Learning moments",
    title: "A few charts, a bigger picture.",
    caption: "Listening mode: on. Curiosity: also on.",
    detail: "A presentation discussing energy-transition financing and its wider economic effects. A snapshot from the internship learning album, where charts on a screen become the start of a bigger conversation. Some days the most useful tool is simply listening closely.",
    image: { src: "/images/activity/internship-energy-transition-discussion.jpeg", alt: "Conference participants listening to a presentation about energy-transition financing and economic effects", position: "50% 85%" },
  },
  {
    id: "internship-treasury-talks",
    kind: "photo",
    category: "Internship · Treasury Talks",
    title: "Treasury, with a side of curiosity.",
    caption: "A seat, a screen, and something new to take away.",
    detail: "A view from the audience at Treasury Talks, with the session title on the screen. Another small learning moment from the internship days — less about having all the answers, more about showing up with a little curiosity and room for a new perspective.",
    image: { src: "/images/activity/internship-treasury-talks.jpeg", alt: "Audience seating facing a presentation screen displaying Treasury Talks", position: "50% 65%" },
  },
  {
    id: "kemakom-goes-to-school",
    kind: "photo",
    category: "School visit · KGTS",
    title: "Small mic, big room.",
    caption: "A room full of students, a mic, and plenty of good energy.",
    detail: "Kemakom Goes to School — Dari Akademi Jadi Profesi. A little talking, a little laughter, and a room that definitely brought its own energy. The spreadsheet can wait; this moment deserves the spotlight.",
    image: { src: "/images/activity/kemakom-goes-to-school.jpeg", alt: "Two hosts with microphones in front of students at Kemakom Goes to School" },
  },
  {
    id: "co-hosting-cue-cards",
    kind: "photo",
    category: "Co-hosting",
    title: "Two mics, one cue card.",
    caption: "The very serious business of keeping things fun.",
    detail: "Microphones ready, cue cards in hand, and a quick check-in between co-hosts. A tiny behind-the-scenes reminder that even the smoothest programme has a few little glances that say: your turn, or mine?",
    image: { src: "/images/activity/co-hosting-cue-cards.jpeg", alt: "Two co-hosts holding microphones and sharing cue cards indoors" },
  },
  {
    id: "outdoor-mic-moments",
    kind: "photo",
    category: "Outdoor moments",
    title: "Sunshine & sound checks.",
    caption: "Mic? Check. Cue card? Check. A little sunshine? Bonus.",
    detail: "Taking the microphone outside, with greenery as the backdrop and a cue card close by. A sunny little pause for the camera — because an activity album needs a bit of personality between all the busy moments.",
    image: { src: "/images/activity/outdoor-mic-moments.jpeg", alt: "An outdoor portrait with a white cap, microphone and cue card against a leafy backdrop" },
  },
  {
    id: "campus-hosting-duo",
    kind: "photo",
    category: "Campus activities",
    title: "Good company, great energy.",
    caption: "Passing the mic, sharing a smile, keeping the moment going.",
    detail: "Two microphones and a shared moment outdoors. Somewhere between speaking and listening, there is always room for a smile. Saving this one for the people-and-memories side of the portfolio.",
    image: { src: "/images/activity/campus-hosting-duo.jpeg", alt: "Two hosts in dark shirts speaking into microphones outside a campus building" },
  },
  {
    id: "classroom-presentation",
    kind: "photo",
    category: "Presenting & sharing",
    title: "A little courage, out loud.",
    caption: "One mic, a few slides, and a story worth sharing.",
    detail: "A classroom, a presentation screen, and a chance to put ideas into words. Blue blazers on, microphone up. Some moments are about making a point; this one also makes a lovely memory.",
    image: { src: "/images/activity/classroom-presentation.jpeg", alt: "A student in a blue university blazer speaking beside a presentation screen and a fellow presenter" },
  },
  {
    id: "dinamik-18-celebration",
    kind: "photo",
    category: "DINAMIK 18 · Campus celebration",
    title: "Cue cards & birthday wishes.",
    caption: "A stage, a celebration, and more than one reason to smile.",
    detail: "A few pages from DINAMIK 18: hosting on stage, a celebratory tumpeng, and music to round things off. One collage, several little moments — the kind of campus day that refuses to fit into just one photo.",
    image: { src: "/images/activity/dinamik-18-celebration.jpeg", alt: "DINAMIK 18 collage showing stage hosts, a tumpeng celebration and a musical performance" },
  },
  {
    id: "kemakom-podcast-internship",
    kind: "photo",
    category: "Kemakom Podcast #3",
    title: "Internships, with a side of uni.",
    caption: "Lika-Liku Magang Sambil Kuliah — let’s talk about the juggling act.",
    detail: "The poster for Kemakom Podcast #3, Lika-Liku Magang Sambil Kuliah, featuring Fadjrin Diraja Muhammad. A little campus conversation about the internship-and-study balancing act. Find more conversations on the BEM Kemakom YouTube channel.",
    image: { src: "/images/activity/kemakom-podcast-internship.jpeg", alt: "Kemakom Podcast number 3 poster titled Lika-Liku Magang Sambil Kuliah featuring two people seated at a table" },
    href: "https://www.youtube.com/@BEMKemakom",
    linkLabel: "Explore Kemakom on YouTube",
  },
  {
    id: "kemakom-campus-gathering",
    kind: "photo",
    category: "Kemakom · Campus gathering",
    title: "A full room, a shared story.",
    caption: "Cue cards in hand. Campus memories in the making.",
    detail: "A collage of a Kemakom gathering, from the audience to the hosts with their microphones and cue cards. A little reminder that a good event is made up of everyone in the room — and the moments between the talking points.",
    image: { src: "/images/activity/kemakom-campus-gathering.jpeg", alt: "Kemakom campus gathering collage with a seated audience and two hosts holding microphones and cue cards" },
  },
  {
    id: "youtube",
    kind: "video",
    title: "Improve — Future Solution",
    caption: "KomCast #3. A little less scrolling, a little more listening.",
    detail: "Improve — Future Solution, KomCast #3. Press play for another little page of the activity scrapbook.",
    category: "KomCast #3 · Video",
    image: null,
    href: "https://www.youtube.com/watch?v=e8lGdw7EMUU",
  },
];

// ─── Contact ─────────────────────────────────────────────────────────────────

export const contact = {
  eyebrow: "Contact",
  heading: "Let’s make something *meaningful* together.",
  body:
    "I’m open to roles and collaborations in data analytics, business analysis and technology. The fastest way to reach me is email.",
  email: "syailafathiaa@gmail.com" as string | Placeholder,
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/syailafathia/" },
    { label: "GitHub", href: "https://github.com/fathiaasyari" },
  ] as LinkValue[],
};

export const footer = {
  note: "Designed with care, built with Next.js.",
};
