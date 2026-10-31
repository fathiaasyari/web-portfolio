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
    "Beyond my professional experience, I have applied analytical thinking to projects involving unemployment trends, academic competition planning, and decision-support systems, while developing communication and leadership skills through campus organizations.",
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
    roleDetail: "PAPK Division (Financial Analysis & Reporting)",
    org: "Kanwil DJPb Provinsi Jawa Barat",
    orgLong:
      "Regional Office of the Directorate General of Treasury, West Java — Ministry of Finance of the Republic of Indonesia",
    period: "March – July 2025",
    start: "2025-03",
    end: "2025-07",
    highlight: { value: "27", label: "West Java regions · 20+ work units" },
    summary:
      "Supported financial data analysis, budget realization monitoring, and reporting activities at the West Java Regional Office of the Directorate General of Treasury, working with regional financial datasets and analytical tools to support internal evaluations.",
    bullets: [
      "Analysed regional financial data across 27 regencies and cities in West Java to identify trends and assess budget allocation.",
      "Performed exploratory data analysis using Python, Pandas, and NumPy to examine financial indicators and historical patterns.",
      "Developed an ARIMA-based forecasting model to estimate monthly budget realization trends.",
      "Created interactive dashboards using Looker Studio and data visualizations to support reporting and internal discussions.",
      "Reviewed and validated budget realization reports from more than 20 government work units.",
      "Supported financial anomaly assessments through historical and outlier-pattern analysis.",
    ],
    tags: ["Python", "Pandas", "NumPy", "ARIMA", "Looker Studio", "Excel", "Matplotlib", "Seaborn"],
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
  highlight: string;
  access: string;
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
    highlight: "27 Regions Analysed",
    summary: "Transformed regional financial data into interactive dashboards and visual insights to support financial monitoring and comparisons across West Java.",
    problem: "Regional financial data covers multiple administrative areas, reporting periods, and indicators. Without a consolidated analytical view, identifying trends, comparing financial conditions, and communicating findings becomes more challenging.",
    role: "Financial data analysis, exploratory data analysis, dashboard development, and reporting support during my internship at the Directorate General of Treasury.",
    process: [
      "Prepared and validated financial data from regional reporting sources.",
      "Conducted exploratory analysis to identify trends, variations, and potential outliers.",
      "Developed analytical visualizations and regional comparisons.",
      "Built Looker Studio dashboards and prepared findings for internal reporting."
    ],
    stack: [
      "Python",
      "Pandas",
      "NumPy",
      "Looker Studio",
      "Matplotlib",
      "Seaborn",
      "Excel"
    ],
    results: [
      "Analysed financial indicators covering 27 regencies and cities in West Java.",
      "Developed interactive dashboards and visual summaries to support internal reporting and financial performance reviews.",
      "Produced forecasting analyses to support the assessment of monthly budget realization trends."
    ],
    access: "Internal project · Public dashboard unavailable",
    links: [],
    accent: "blush"
  },
  {
    slug: "fuzzy-scholarship-selection",
    number: "02",
    category: "Web System · Decision Support",
    title: "Fuzzy-Based Scholarship Selection Web System",
    highlight: "2,000 Applicant Records",
    summary: "Developed a web-based decision support system integrating fuzzy logic, multi-criteria prioritization, and fund allocation to support more structured scholarship selection.",
    problem: "Scholarship selection involves balancing financial need, academic performance, student contributions, and other considerations. Conventional scoring approaches can struggle with uncertainty, while funding limitations require recipient recommendations to account for available budgets and quotas.",
    role: "Researcher and system developer, responsible for designing the selection model, defining evaluation criteria, analysing model performance, and implementing the web-based decision support workflow.",
    process: [
      "Prepared the applicant dataset and defined evaluation criteria.",
      "Designed fuzzy membership functions and inference rules for initial eligibility assessment.",
      "Applied Fuzzy AHP to determine criterion weights and candidate priorities.",
      "Integrated return-potential scoring with allocation rules based on available funds and quotas.",
      "Implemented the web workflow and evaluated model performance."
    ],
    stack: [
      "Python",
      "Fuzzy Sugeno",
      "Fuzzy AHP",
      "React",
      "TypeScript",
      "Data Analysis"
    ],
    results: [
      "Developed and evaluated the selection model using 2,000 applicant records.",
      "Achieved 79.63% recall for eligible applicants and 71.66% balanced accuracy on the 400-record test set.",
      "Implemented applicant eligibility assessment, priority ranking, fund and quota allocation recommendations, and result export functionality in a web-based prototype."
    ],
    access: "Academic research · Web-based prototype",
    links: [],
    accent: "pink"
  },
  {
    slug: "poverty-classification-research",
    number: "03",
    category: "Research · Machine Learning",
    title: "Data-Driven Poverty Classification Research",
    highlight: "95.15% Test Accuracy",
    summary: "Applied machine learning to socioeconomic indicators from 514 Indonesian regencies and cities to classify poverty status and explore data-driven approaches to regional socioeconomic assessment.",
    problem: "Poverty assessment requires interpreting multiple socioeconomic indicators, including education, health, and expenditure. Machine learning provides an additional analytical approach for identifying patterns and classifying regional poverty status.",
    role: "First author and research contributor, involved in data analysis, machine learning methodology, model evaluation, and scientific manuscript preparation.",
    process: [
      "Collected and prepared publicly available socioeconomic indicators.",
      "Conducted preprocessing, normalization, and dimensionality reduction using PCA.",
      "Optimized and evaluated the KNN classification model through cross-validation.",
      "Examined feature contributions using Random Forest and documented the findings in a scientific publication."
    ],
    stack: [
      "Python",
      "K-Nearest Neighbors",
      "PCA",
      "Random Forest",
      "Cross-Validation"
    ],
    results: [
      "Achieved 95.15% test accuracy using an optimized K-Nearest Neighbors classification model.",
      "Analysed socioeconomic indicators across 514 Indonesian regencies and cities.",
      "Published in Infact: International Journal of Computers, Volume 10, Number 1, May 2026 (SINTA 5)."
    ],
    access: "Published research · Infact, May 2026",
    links: [
      {
        label: "Read paper",
        href: "https://journal.ukrim.ac.id/index.php/JIF/article/view/753"
      }
    ],
    accent: "plum"
  }
];

// ─── More projects ──────────────────────────────────────────────────────────

export const moreProjectsSection = {
  heading: "More Projects, More Ways to Explore Data.",
  intro:
    "Beyond the featured case studies, these academic projects reflect hands-on experience in machine learning, natural language processing, recommendation systems, and exploratory data analysis.",
  stackLabel: "Tech Stack",
};

export const moreProjects = [
  {
    slug: "tokopedia-sentiment-analysis",
    number: "01",
    title: "Tokopedia Product Review Sentiment Analysis",
    category: "Natural Language Processing · Sentiment Classification",
    description:
      "Analyzed Indonesian e-commerce product reviews to identify customer sentiment patterns. Applied text preprocessing, TF-IDF feature extraction, and Naive Bayes classification, supported by sentiment visualizations and model evaluation.",
    stack: ["Python", "Pandas", "Scikit-learn", "TF-IDF", "Naive Bayes", "NLP"],
  },
  {
    slug: "skincare-recommendation-system",
    number: "02",
    title: "Skincare Product Recommendation System",
    category: "Recommendation System · Content-Based Filtering",
    description:
      "Developed an ingredient-based recommendation approach using 1,138 skincare products across 14 categories. Applied TF-IDF vectorization and cosine similarity to measure ingredient similarities and generate relevant product recommendations.",
    stack: ["Python", "Pandas", "Scikit-learn", "TF-IDF", "Cosine Similarity"],
  },
  {
    slug: "online-purchase-prediction",
    number: "03",
    title: "Online Purchase Prediction",
    category: "Machine Learning · Predictive Analytics",
    description:
      "Explored online shopping session data to predict purchasing behavior using Random Forest classification. Performed feature engineering, compared missing-value handling strategies, and evaluated predictive performance using ROC-AUC.",
    stack: ["Python", "Pandas", "Scikit-learn", "Random Forest", "Feature Engineering"],
  },
  {
    slug: "west-java-unemployment-analysis",
    number: "04",
    title: "West Java Unemployment Rate Analysis",
    category: "Exploratory Data Analysis · Socioeconomic Data",
    description:
      "Analyzed regional unemployment data from BPS, Dukcapil, and the Department of Manpower and Transmigration. Conducted exploratory data analysis to identify unemployment trends, regional differences, and socioeconomic patterns across West Java.",
    stack: ["Data Cleaning", "Exploratory Data Analysis", "Statistical Analysis", "Data Visualization"],
  },
] as const;

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
    items: ["Python", "SQL", "R", "React", "TypeScript", "Web development"],
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
      title: "Program Lead · I-TRI Challenge" as Copy,
      period: "2023–2024" as Copy,
      body: "Led a GEMASTIK preparation program involving 100+ participants, coordinating event planning, team responsibilities, participant engagement, and program execution." as Copy,
    },
    {
      icon: "award",
      kind: "Organisations",
      title: "Education & Development Division Staff · BEM KEMAKOM FPMIPA UPI" as Copy,
      period: "2023–2024" as Copy,
      body: "Contributed to student development, academic competitions, and organizational programs, including mentoring activities and coordination of more than five competition-related initiatives." as Copy,
    },
    {
      icon: "mic",
      kind: "Public speaking",
      title: "Master of Ceremonies · 10+ Campus Events" as Copy,
      period: "2023–2024" as Copy,
      body: "Hosted more than 10 university and faculty events, including freshman orientation and anniversary celebrations, engaging audiences of students, faculty members, and alumni." as Copy,
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
