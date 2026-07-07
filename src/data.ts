import { Project, SkillCategory, Experience, Service } from './types';

export const projects: Project[] = [
  {
    id: 's-core-portal',
    title: 'S-CORE Portal',
    subtitle: 'Request-and-approval portal for StratComm',
    category: 'Web Development',
    description: 'S-CORE is a web-based request-and-approval portal for the Strategic Communications Office that centralizes submissions, automates approvals/task assignments, provides real-time messaging, file uploads/previews, and PDF/Excel report generation.',
    longDescription: 'S-CORE is a fully-featured request-and-approval system designed for the DLSU-D Strategic Communications Office. Centralizes creative and publication submissions, automates approval workflows and task assignments, and provides real-time messaging, file uploads with dynamic previews, and robust PDF/Excel audit reports.',
    tags: ['Node.js', 'Express', 'MongoDB', 'Socket.IO', 'EJS'],
    links: {
      live: 'https://dlsuds-core.me'
    },
    year: '2025',
    role: 'Lead Full-Stack Developer',
    featured: true,
    mediaType: 'svg',
    status: 'finished',
    tagline: '@s-core',
    images: ['/projects/s-core1.webp', '/projects/s-core2.webp', '/projects/s-core3.webp', '/projects/s-core4.webp', '/projects/s-core5.webp']
  },
  {
    id: 'internal-reporting-dashboard',
    title: 'Internal Reporting Dashboard',
    subtitle: 'Apache Superset pricing dashboard for SM Investments',
    category: 'Web Development',
    description: 'Apache Superset dashboard for SM Investments — consolidates operational data, automates reporting workflows, and surfaces key metrics in real-time. Built with custom CSS grid architecture, RBAC, and automated data pipelines. Dashboard data is covered for confidentiality.',
    longDescription: 'Consolidates operational data across business units, automates weekly reporting workflows, and surfaces key performance indicators in real-time. Built with custom CSS grid architecture, role-based access control (RBAC), and automated data pipelines for SM Investments Treasury Department.\n\nSensitive data in the screenshots has been covered to protect proprietary financial information.',
    tags: ['Apache Superset', 'Custom CSS', 'Draw.io', 'Agile', 'Confidential'],
    links: {},
    year: '2026',
    role: 'Treasury Systems Automation Fellow',
    featured: true,
    mediaType: 'image',
    status: 'finished',
    tagline: '@superset-sm',
    images: ['/projects/internal-reporting-dashboard-1.webp', '/projects/internal-reporting-dashboard-2.webp']
  },
  {
    id: 's-core-prototype',
    title: 'S-CORE Prototype',
    subtitle: 'Interactive Figma design and user flows',
    category: 'UI/UX',
    description: 'Prototype for the S-CORE capstone project: booking/submission/approval flows and UI interactions created in Figma.',
    longDescription: 'Interactive, high-fidelity UI/UX prototype created for the S-CORE portal. Fully maps booking, submission, approval, and real-time review workflows. Utilizes detailed Figma components, interaction design layers, and dynamic transition flows.',
    tags: ['Figma'],
    links: {
      live: 'https://www.figma.com/proto/vmmkjrlQKnDjIRLeaG382g/S-CORE-System-for-SCO'
    },
    year: '2025',
    role: 'UI/UX Designer',
    featured: false,
    mediaType: 'svg',
    status: 'finished',
    tagline: '@s-core-proto',
    images: ['/projects/s-core%20prototype1.webp', '/projects/s-core%20prototype2.webp', '/projects/s-core%20prototype3.webp']
  },
  {
    id: 'caresync',
    title: 'CareSync',
    subtitle: 'Cross-platform care link application',
    category: 'Web Development',
    description: 'Cross-platform Flutter app that securely links caregivers and elders. Features medication management, adherence tracking, mood & health logs, and real-time emergency/missed-dose alerts — powered by Firebase for real-time sync and secure Firestore rules.',
    longDescription: 'A dynamic cross-platform Flutter mobile application designed to securely connect caregivers and senior family members. Features medication trackers, health logging, and instant notification alerts, backed by robust Firebase authorization rules.',
    tags: ['Flutter', 'Firebase', 'Dart'],
    links: {
      github: 'https://github.com/carebear1919/caresync_mobileapplication'
    },
    year: '2026',
    role: 'Lead App Architect',
    featured: true,
    mediaType: 'svg',
    status: 'ongoing',
    tagline: '@caresync',
    images: ['/projects/CareSync_Presentation_Jojica.webp', '/projects/CareSync_Presentation_Jojica (1).webp', '/projects/CareSync_Presentation_Jojica (2).webp', '/projects/CareSync_Presentation_Jojica (3).webp', '/projects/CareSync_Presentation_Jojica (4).webp', '/projects/CareSync_Presentation_Jojica (5).webp']
  },
  {
    id: 'cics-website',
    title: 'CICS Website',
    subtitle: 'Informational college landing portal and catalog',
    category: 'Web Development',
    description: 'A modern informational website for the College of Information and Computer Studies (CICS). This is a project and not the official site. It shows hero banners, student achievements, programs, faculty & staff, services, and contact pages.',
    longDescription: 'A custom student-built showcase portal for the College of Information and Computer Studies. Details academic curricula, faculty rosters, department announcements, and interactive services using modern React routing systems.',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind', 'react-router-dom', 'lucide-react'],
    links: {
      live: 'https://website-cics.vercel.app'
    },
    year: '2025',
    role: 'Lead Frontend Developer',
    featured: false,
    mediaType: 'svg',
    status: 'finished',
    tagline: '@cics-web',
    images: ['/projects/cicswebsite1.webp', '/projects/cicswebsite2.webp']
  },
  {
    id: 'beauty-corner',
    title: 'Beauty Corner',
    subtitle: 'HTML/CSS/JS e-commerce catalog and cart',
    category: 'Web Development',
    description: 'A simple HTML, CSS, and JavaScript website featuring products/prices and an order application with a receipt and a simple submit success pop-up. Deployed on GitHub Pages.',
    longDescription: 'A clean, semantic client-side e-commerce storefront. Features responsive product lists, pricing calculators, and dynamic checkout receipt generators with high-contrast accessibility compliance.',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    links: {
      live: 'https://carebear1919.github.io/beautycorner-applicationproject'
    },
    year: '2023',
    role: 'Independent Web Developer',
    featured: false,
    mediaType: 'svg',
    status: 'finished',
    tagline: '@beauty-corner',
    images: ['/projects/makeup1.webp', '/projects/makeup2.webp', '/projects/makeup3.webp']
  },
  {
    id: 'purrfect-care',
    title: 'Purrfect Care',
    subtitle: 'Blazor database sync and tracking program',
    category: 'Web Development',
    description: 'A Blazor-based web application for managing and synchronizing donation data between two databases, featuring CRUD operations and data consistency for administrators. This was a collaboration project.',
    longDescription: 'Admin system syncing donations data across physical sites. Employs Entity Framework Core for ACID transaction verification and database schema synchronization.',
    tags: ['Blazor', '.NET', 'C#', 'Entity Framework Core', 'SQL Database', 'ASP.NET Core MVC'],
    links: {
      github: 'https://github.com/carebear1919/PurrfectCare_CollabProject'
    },
    year: '2024',
    role: 'Collaborator / Backend Eng.',
    featured: false,
    mediaType: 'svg',
    status: 'finished',
    tagline: '@purrfect-care',
    images: ['/projects/purr1.webp', '/projects/purr2.webp', '/projects/purr3.webp']
  },
  {
    id: 'character-selector',
    title: 'Character Selector',
    subtitle: 'Micro-interaction prototype with anims',
    category: 'UI/UX',
    description: 'Interactive character selection UI concept prototype inspired by Sanrio-style characters, showcasing micro-interactions, selection states, and animated transitions.',
    longDescription: 'A high-fidelity Figma interaction prototype showing smooth page overlays, selection card active indicators, and delightful micro-transitions for character customizations.',
    tags: ['Figma', 'React', 'TypeScript'],
    links: {
      live: 'https://www.figma.com/proto/rJsCcjZ1DCL26f1n6cXfKF/Lab7_HILARIO'
    },
    year: '2024',
    role: 'Interaction Designer',
    featured: false,
    mediaType: 'svg',
    status: 'finished',
    tagline: '@characters',
    images: ['/projects/Characters.webp']
  },
  {
    id: 'airline-booking',
    title: 'Airline Booking Prototype',
    subtitle: 'Airline flow, seat selector, & checkout design',
    category: 'UI/UX',
    description: 'UI/UX prototype for an airline booking flow including search, seat selection, and booking confirmation — created in Figma.',
    longDescription: 'Figma mockups demonstrating intuitive airline flight searches, visual interactive seat-chart grids, and responsive layout checkout confirmations.',
    tags: ['Figma'],
    links: {
      live: 'https://www.figma.com/proto/g7ALouynkapXlQ1gwQ3QLt/HILARIO_NG_GOMEZ_FINALS'
    },
    year: '2024',
    role: 'Visual UX Designer',
    featured: false,
    mediaType: 'svg',
    status: 'finished',
    tagline: '@airline-booking',
    images: ['/projects/Airline Prototype1.webp', '/projects/Airline Prototype2.webp']
  },
  {
    id: 'cics-publications',
    title: 'CICS Publications & Merch',
    subtitle: 'Student Gov merchandise and posters',
    category: 'Branding & Visuals',
    description: 'A collection of publication materials and merchandise designs created for the CICS Student Government, including event posters, social media graphics, promotional banners, and branded merchandise layouts.',
    longDescription: 'Cohesive branding kits including department shirts, stickers, event infographics, and high-engagement announcement banners for the College student community.',
    tags: ['Adobe Suite', 'Canva', 'Figma'],
    links: {},
    year: '2024',
    role: 'Creatives Lead Creator',
    featured: false,
    mediaType: 'svg',
    status: 'finished',
    tagline: '@cics-gov-pub',
    images: ['/projects/cics1.webp', '/projects/cics2.webp', '/projects/cics3.webp', '/projects/cics4.webp', '/projects/cics5.webp', '/projects/cics6.webp', '/projects/cics7.webp', '/projects/cics8.webp', '/projects/cics9.webp', '/projects/cics10.webp', '/projects/cics11.webp']
  },
  {
    id: 'paws-publications',
    title: 'DLSUD PAWS Publications',
    subtitle: 'Advocacy digital assets & posters',
    category: 'Branding & Visuals',
    description: 'During my time with DLSUD PAWS, I created various publication materials promoting animal welfare awareness and campus cat care initiatives, including informational graphics and partner appreciation posts. NOTE: This is a simple prototype created in Figma.',
    longDescription: 'Educational outreach assets, donor visual materials, and social posters for local stray rescue and cat feeding programs on the DLSU-D campus grounds.',
    tags: ['Figma', 'Illustrator', 'Photoshop'],
    links: {},
    year: '2024',
    role: 'Creatives Lead Developer',
    featured: false,
    mediaType: 'svg',
    status: 'finished',
    tagline: '@paws-advocacy',
    images: ['/projects/paws1.webp', '/projects/paws2.webp']
  },
  {
    id: 'dream-house',
    title: 'My Dream House',
    subtitle: 'Visual identity asset compilation & design',
    category: 'UI/UX',
    description: 'A UI/branding concept created in Figma — a stylized dream house composition using vector shapes and photos; assets prepared using Canva and Photoshop.',
    longDescription: 'Branding experiment mixing vector styling layout grids, digital collages, and color theory guidelines mapped inside interactive Figma view layers.',
    tags: ['Figma', 'Canva', 'Photoshop'],
    links: {
      live: 'https://www.figma.com/proto/Dfv0lHCCCnztSfEIHOTjfj/Dream-House---HILARIO'
    },
    year: '2023',
    role: 'Digital Illustrator',
    featured: false,
    mediaType: 'svg',
    status: 'finished',
    tagline: '@dreamhouse',
    images: ['/projects/dreamhouse.webp']
  },
  {
    id: 'cso-publications',
    title: 'CSO Publications & Awards',
    subtitle: 'Student Organization Council pubmats',
    category: 'Branding & Visuals',
    description: 'Publication materials created for the Council of Student Organizations, including promotional graphics, event materials, and organizational branding. Featured recognition: Best Executive Committee Award.',
    longDescription: 'High-density design packets and leadership recognition layouts. Awarded Best Exec Committee in regional university evaluations for organizational standardizations.',
    tags: ['Photoshop', 'Canva'],
    links: {},
    year: '2025',
    role: 'Executive Committee Lead',
    featured: false,
    mediaType: 'svg',
    status: 'finished',
    tagline: '@cso-council',
    images: ['/projects/CSOPIC.webp', '/projects/cso1.webp', '/projects/cso2.webp', '/projects/cso3.webp', '/projects/cso4.webp', '/projects/cso5.webp', '/projects/cso6.webp', '/projects/Task_HILARIO,JIAN MARIE L..webp']
  },

  {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    subtitle: 'Responsive personal design sandbox',
    category: 'UI/UX',
    description: "You're already here! This personal portfolio showcases my work and will continue to grow as I take on more projects. Built with React, Tailwind CSS, and TypeScript for a modern, responsive experience.",
    longDescription: 'Modern, high-performance web ledger hosting case studies. Designed with meticulous attention to typography scales, interactive cards, line overlays, and deep-palette toggling modes.',
    tags: ['React', 'Tailwind', 'TypeScript'],
    links: {},
    year: '2026',
    role: 'Architect & Designer',
    featured: false,
    mediaType: 'svg',
    status: 'ongoing',
    tagline: '@hilario-built'
  },
  {
    id: 'creative-portfolio',
    title: 'Creative Portfolio',
    subtitle: 'Graphic layout visual document',
    category: 'Branding & Visuals',
    description: 'A curated collection of my creative works spanning graphic design, publication layouts, branding concepts, and visual communications.',
    longDescription: 'A beautiful visual catalog documenting brand concepts, modern vector layouts, typography assets, and custom illustrations compiled across creative projects.',
    tags: ['Photoshop', 'Canva', 'Figma', 'Illustrator'],
    links: {
      live: '/projects/Jian Marie Hilario - Portfolio.pdf',
      canva: 'https://canva.link/f6xn3atopprl6rq'
    },
    year: '2025',
    role: 'Visual Coordinator',
    featured: false,
    mediaType: 'svg',
    status: 'finished',
    tagline: '@hilario-creative',
    pdfUrl: '/projects/Jian Marie Hilario - Portfolio.pdf'
  },
  {
    id: 'score-manual',
    title: "S-CORE Digital User's Manual",
    subtitle: 'Interactive single-page instruction directory',
    category: 'Web Development',
    description: 'An interactive single-page guide built with React 19 and TypeScript that walks users through navigating the S-CORE portal — from login flows and request submissions to approval tracking and report generation. Features a custom in-memory search index, scroll-based section tracking via Intersection Observer, print-optimized layouts, and an AI-powered assistant for on-demand help.',
    longDescription: "An interactive digital companion built on React 19 and TypeScript. Accelerates DLSU-D office staff onboarding with intuitive in-memory searchable indexes, dynamic IntersectionObserver indicators, responsive tables, and fully-responsive print configurations.",
    tags: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS 4', 'Motion', 'Lucide React', 'Google Gen AI'],
    links: {
      live: 'https://s-core-digital-user-manual.pages.dev'
    },
    year: '2026',
    role: 'Architect & Tech Writer',
    featured: true,
    mediaType: 'svg',
    status: 'finished',
    tagline: '@s-core-manual',
    images: ['/projects/S-COREMANUAL1.webp', '/projects/S-COREMANUAL2.webp', '/projects/S-COREMANUAL3.webp', '/projects/S-COREMANUAL4.webp']
  },
  {
    id: 'career-pipeline',
    title: 'Career Pipeline',
    subtitle: 'Gen Z minimalist job application tracker',
    category: 'Web Development',
    description: 'A Gen Z minimalist job application tracker with real-time analytics, follow-up reminders, and electric indigo accents. Full CRUD for applications, contact management, analytics dashboard with KPI cards, status donut, skill heatmap, weekly volume, and distribution charts.',
    longDescription: 'A full-featured job application tracking system with 6 statuses (Applied → Interviewing → Technical → Offer → Rejected → Ghosted), recruiter contact management, resume/cover letter URL tracking, and a rich analytics dashboard featuring KPI cards, status donut chart, skill heatmap, weekly volume trends, and location/pay/source distribution charts.\n\nIncludes dark/light theme with custom accent colors, a command palette (Ctrl+K), multi-filter search, stale application tracking with follow-up reminders, desktop table view with mobile card view and pagination, a welcome onboarding modal with Q&A guide, settings panel with data reset and theme customization, and Excel/PDF export support.',
    tags: ['React 19', 'TypeScript 5.8', 'Vite 6', 'Tailwind CSS 4', 'Recharts 3', 'Motion', 'Lucide React', 'date-fns', 'Express.js'],
    links: {
      live: 'https://job-application-tracker-by-jian.vercel.app'
    },
    year: '2026',
    role: 'Full-Stack Developer',
    featured: true,
    mediaType: 'image',
    status: 'finished',
    tagline: '@career-pipeline',
    images: ['/projects/JobTracker1.webp', '/projects/JobTracker2.webp', '/projects/JobTracker3.webp', '/projects/JobTracker4.webp', '/projects/JobTracker5.webp', '/projects/JobTracker6.webp', '/projects/JobTracker7.webp', '/projects/JobTracker8.webp']
  },
  {
    id: 'retro-calc',
    title: 'RetroCalc — Calorie Tracker',
    subtitle: 'Windows 95/98-themed calorie & macro tracker',
    category: 'Web Development',
    description: 'A nostalgic Windows 95/98-themed calorie and macronutrient tracker. Features a daily dashboard with calorie/macro progress bars, a Chart.js donut chart, a food log journal with add/delete, a 7-day history (checklist + bar chart), and retro UI elements (taskbar, start menu, draggable/minimizable windows, 3D borders, pixel fonts). Runs entirely client-side with localStorage persistence.',
    longDescription: 'A fully client-side calorie and macronutrient tracking application wrapped in a nostalgic Windows 95/98 interface. The daily dashboard displays calorie and macro progress bars alongside a Chart.js doughnut chart for visual breakdown. Users can log food entries with add/delete functionality, review a 7-day history with checklists and bar charts, and interact with retro UI elements including a taskbar, start menu, draggable/minimizable windows, 3D beveled borders, and pixel-perfect typography.\n\nBuilt with React 19, TypeScript, Vite 6, and TailwindCSS v4. Chart.js 4 powers the doughnut and bar charts with annotation plugins. Motion (framer-motion) drives window animations. An Express backend integrates Google Gemini AI for intelligent food suggestions. All data persists via browser localStorage.',
    tags: ['React 19', 'TypeScript', 'Vite 6', 'Tailwind CSS 4', 'Chart.js 4', 'Motion', 'Express.js', 'Google Gemini AI'],
    links: {
      live: 'https://calorie-tracker-log.vercel.app'
    },
    year: '2026',
    role: 'Full-Stack Developer',
    featured: true,
    mediaType: 'image',
    status: 'finished',
    tagline: '@retro-calc',
    images: ['/projects/RetroCalc1.webp', '/projects/RetroCalc2.webp', '/projects/RetroCalc3.webp']
  },
  {
    id: 'score-poster',
    title: 'S-CORE Promotional Poster',
    subtitle: 'High-contrast campaign poster',
    category: 'Branding & Visuals',
    description: 'A promotional poster design for the S-CORE portal campaign, created in Canva and Figma. Highlights the system\'s key capabilities — request submissions, approval automation, and real-time messaging — through bold editorial typography and a dark tech-aesthetic visual identity.',
    longDescription: 'Promotional high-contrast print and digital asset for the Capstone deployment. Centers on high-exposure typography guidelines and geometric framing grids.',
    tags: ['Canva', 'Figma'],
    links: {},
    year: '2025',
    role: 'Visual Lead Designer',
    featured: false,
    mediaType: 'svg',
    status: 'finished',
    tagline: '@s-core-poster',
    images: ['/projects/S-CORE POSTER.webp']
  },
  {
    id: 'sample-company',
    title: 'Sample Company',
    subtitle: 'ALTIORA brand Figma website design',
    category: 'UI/UX',
    description: 'A brand-focused Figma website design concept for ALTIORA — featuring clean layouts, product presentation, and modern UI components crafted for a premium brand identity.',
    longDescription: 'A comprehensive Figma website design for ALTIORA, a premium brand. The design explores modern web layouts with an emphasis on visual hierarchy, brand storytelling, product showcases, and seamless navigation. Every screen was crafted to reflect a luxurious yet approachable brand voice — balancing high-impact visuals with clean, functional UI.\n\nThis is an ongoing iteration with continuous refinements in layout structure, component consistency, and interaction design.',
    tags: ['Figma'],
    links: {
      live: 'https://www.figma.com/proto/aMXn2cK9TSL2AahvPsLBlN/ALTIORA?page-id=143%3A317&node-id=308-2236&viewport=-1802%2C-61%2C0.32&t=72EBSUKxijLE5Lco-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=308%3A2236&show-proto-sidebar=1'
    },
    year: '2026',
    role: 'UI/UX Designer',
    featured: false,
    mediaType: 'image',
    status: 'ongoing',
    tagline: '@sample-company',
    images: ['/projects/SampleCompany1.webp', '/projects/SampleCompany2.webp', '/projects/SampleCompany3.webp', '/projects/SampleCompany4.webp']
  }
];

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages-frameworks',
    title: 'Languages & Frameworks',
    skills: [
      { name: 'React', level: 95, description: 'Declarative component trees, virtual list renderers, and custom lifecycle optimization hooks.' },
      { name: 'TypeScript', level: 92, description: 'Strong typing declarations, strict compile interfaces, and generic functions.' },
      { name: 'JavaScript', level: 96, description: 'Asynchronous scripting patterns, ES modules, DOM APIs, and dynamic data structures.' },
      { name: 'HTML5 & CSS3', level: 98, description: 'Semantic markup architecture, custom variables, grid templates, and responsive layouts.' },
      { name: 'Flutter & Dart', level: 85, description: 'Cross-platform app development, state management, and async service fetching.' },
      { name: 'Node.js & Express', level: 88, description: 'Server-side REST endpoints, secure routers, and automated data pipelines.' },
      { name: 'PHP', level: 80, description: 'Server scripts, database connections, and secure MVC template engines.' },
      { name: 'ASP.NET / C#', level: 78, description: 'Enterprise backend controller APIs, strict types, and Entity Framework integrations.' },
      { name: 'Java', level: 75, description: 'Object-oriented logic architectures and foundational backend services.' },
      { name: 'Python', level: 80, description: 'Automation scripts, web scrapers, and local CSV/JSON processing workflows.' },
      { name: 'Bootstrap', level: 90, description: 'Rapid column layouts, built-in components, and utility styling sheets.' }
    ]
  },
  {
    id: 'tools-automation',
    title: 'Tools, Databases & Automation',
    skills: [
      { name: 'Figma', level: 96, description: 'High-fidelity wireframing, layout structures, variables mapping, and interactive flows.' },
      { name: 'Git & GitHub', level: 90, description: 'Branch merging pipelines, pull reviews, automated script triggers, and pages deploys.' },
      { name: 'PostgreSQL & SQL', level: 84, description: 'Structured schema designs, ACID queries, index optimizations, and sync systems.' },
      { name: 'MongoDB', level: 85, description: 'NoSQL collections, document queries, aggregations, and session tokens.' },
      { name: 'Firebase', level: 88, description: 'Real-time database triggers, phone auth setups, and secure client-side constraints.' },
      { name: 'Apache Superset', level: 90, description: 'Advanced business intelligence charts, database connections, and custom CSS overrides.' },
      { name: 'Power Automate', level: 82, description: 'Event-driven process mappings, email notifications, and document transfers.' },
      { name: 'SQLite', level: 80, description: 'Lightweight local database integrations for cross-platform apps.' },
      { name: 'VS Code & Git', level: 95, description: 'Optimized workspace automation setups, debuggers, and script hooks.' }
    ]
  },
  {
    id: 'design-software',
    title: 'Design & Software Suite',
    skills: [
      { name: 'Photoshop', level: 90, description: 'Detailed asset layers, raster editing, brand standardizations, and visual prep.' },
      { name: 'Illustrator', level: 88, description: 'Vector logos, custom path alignments, export profiles, and layout designs.' },
      { name: 'Canva', level: 95, description: 'High-efficiency publishing layouts, marketing outlines, and social announcements.' },
      { name: 'Adobe Animate', level: 80, description: 'Vector frame animations, timelines, and layout visual behaviors.' },
      { name: 'IbisPaint', level: 82, description: 'Raster drawings, custom brushes, sketch composites, and graphic assets.' },
      { name: 'MS Excel', level: 90, description: 'Financial spreadsheets, pivot tables, data calculations, and process steps.' },
      { name: 'Draw.io', level: 92, description: 'Process step maps, network architecture graphs, and database schemas.' },
      { name: 'MS Planner', level: 88, description: 'Agile sprints, tasks monitoring, and organizational workflow layouts.' }
    ]
  }
];

export const experienceTimeline: Experience[] = [
  {
    id: 'exp-1',
    role: 'Treasury Automation Intern',
    company: 'SM Investments Corporation',
    location: 'Manila, PH',
    period: 'Jan 2026 – Apr 2026',
    description: [
      'Engineered React ledgers and Apache Superset dashboards for corporate Treasury operations, reducing workflow steps.',
      'Mapped and documented a 19-step pricing process, designing 2 core visualization dashboards.',
      'Authored comprehensive CSS customization guides and developer manuals to sustain platform updates.'
    ],
    tag: 'Industry'
  },
  {
    id: 'exp-2',
    role: 'Executive Committee',
    company: 'DLSU-D Council of Student Organizations',
    location: 'Cavite, PH',
    period: 'Feb 2025 – Jul 2025',
    description: [
      'Orchestrated organizational guidelines, administrative policies, and student-body operations.',
      'Awarded "Executive of the Month" twice for stellar policy implementations and team performance.',
      'Managed digital communication guidelines across 30+ recognized student associations.'
    ],
    tag: 'Leadership'
  },
  {
    id: 'exp-3',
    role: 'Creatives Committee Creator',
    company: 'CICS Student Government',
    location: 'Cavite, PH',
    period: '2022 – Present',
    description: [
      'Led comprehensive brand standardizations and designed high-engagement publishing packages.',
      'Created custom department merchandise layouts, digital event posters, and promotional graphics.',
      'Collaborated with student representatives to accelerate event promotion schedules by 40%.'
    ],
    tag: 'Design'
  },
  {
    id: 'exp-4',
    role: 'Creatives Lead',
    company: 'DLSU-D PAWS Advocacy Group',
    location: 'Cavite, PH',
    period: '2023 – 2024',
    description: [
      'Crafted impactful animal welfare outreach visuals and stray-care campaign infopublications.',
      'Designed community sponsorship recognition banners and educational campus posters.'
    ],
    tag: 'Advocacy'
  }
];

export const services: Service[] = [
  {
    id: 'web-design-dev',
    number: '01',
    title: 'Web Design & Development',
    positioning: 'Pixel-perfect, responsive websites built in React — designed in Figma first, engineered to last.',
    description: 'From landing pages to multi-page company sites, I design and build responsive websites that look intentional and perform reliably. Every project starts in Figma — layouts, components, and user flows mapped before a single line of code is written. The result is a site that doesn\'t just look good in a browser preview — it works on every screen, loads fast, and holds up under real use.',
    includes: [
      'Landing pages & company profile sites',
      'Portfolio & personal brand websites',
      'E-commerce storefronts & product catalogs',
      'Multi-page responsive websites',
      'GitHub Pages & Vercel deployment'
    ],
    tools: ['React', 'TypeScript', 'Node.js', 'HTML5', 'CSS3', 'JavaScript', 'Figma', 'Tailwind CSS', 'Vite']
  },
  {
    id: 'ui-ux-design-prototyping',
    number: '02',
    title: 'UI/UX Design & Prototyping',
    positioning: 'From blank canvas to clickable prototype — interfaces designed around how real users actually think.',
    description: 'Good design isn\'t decoration — it\'s clarity. I design interfaces that reduce friction, guide users naturally, and communicate hierarchy without needing instructions. My process starts with understanding the user and the problem before touching any design tool. Wireframes come first, high-fidelity mockups second, and every decision has a reason behind it.',
    includes: [
      'User flow mapping & wireframing',
      'High-fidelity UI design in Figma',
      'Clickable interactive prototypes',
      'Component-based design systems',
      'Design handoff documentation for developers'
    ],
    tools: ['Figma', 'Adobe XD', 'Adobe Illustrator', 'Photoshop']
  },
  {
    id: 'dashboard-data-vis',
    number: '03',
    title: 'Dashboard & Data Visualization',
    positioning: 'Raw data turned into decision-ready dashboards — built for clarity, secured for the right eyes only.',
    description: 'Most people can pull data. Not everyone can present it in a way that actually drives decisions. I design and build dashboards that surface what matters — clean data hierarchy, intuitive filters, and role-based access so the right people see the right information. My experience building production-grade pricing dashboards deployed across enterprise treasury operations means I\'ve done this at a corporate level, not just in a classroom.',
    includes: [
      'BI dashboard design and development',
      'Interactive data visualization (charts, tables, KPI cards)',
      'Role-based access control (RBAC) setup',
      'Automated data pipeline integration',
      'Apache Superset configuration and CSS customization'
    ],
    tools: ['Apache Superset', 'Custom CSS', 'Recharts', 'D3.js', 'Excel', 'Firebase']
  },
  {
    id: 'mobile-app-dev',
    number: '04',
    title: 'Mobile App Development',
    positioning: 'One codebase. Two platforms. Zero compromise on the user experience.',
    description: 'I build cross-platform mobile applications using Flutter — which means your app runs on both iOS and Android from a single codebase without sacrificing performance or feel. I handle the full mobile development cycle: authentication, real-time data, role-based navigation, and UI that actually fits how people use their phones. If your users need it on the go, I can build it.',
    includes: [
      'Cross-platform mobile apps (iOS & Android)',
      'Firebase authentication & real-time database integration',
      'Role-based user routing & navigation',
      'Custom UI components tailored to mobile UX patterns',
      'App deployment preparation'
    ],
    tools: ['Flutter', 'Dart', 'Firebase Auth', 'Firestore', 'StreamBuilder']
  },
  {
    id: 'ecommerce-dev',
    number: '05',
    title: 'E-Commerce Development',
    positioning: 'Online stores that don\'t just display products — they convert browsers into buyers.',
    description: 'An e-commerce site lives or dies by its user flow. I build storefronts where the path from product discovery to order confirmation is frictionless — clear product layouts, intuitive cart behavior, smooth checkout, and a confirmation experience that makes the customer feel good about what they just did. From simple product catalogs to order management with receipt generation, I cover the full buying journey.',
    includes: [
      'Product catalog with category filtering',
      'Shopping cart with quantity management',
      'Order form with itemized receipt generation',
      'Checkout confirmation & success UX',
      'Deployment on Vercel or GitHub Pages'
    ],
    tools: ['React', 'TypeScript', 'JavaScript', 'CSS3', 'HTML5', 'Vercel', 'GitHub Pages']
  },
  {
    id: 'graphic-design-materials',
    number: '06',
    title: 'Graphic Design & Brand Materials',
    positioning: 'High-impact visuals that communicate before anyone reads a single word.',
    description: 'I\'ve been designing publication materials, event posters, digital advocacy assets, and organizational graphics for student bodies and university councils since 2022. Three years of real briefs, real deadlines, and real audiences. Whether it\'s a social media campaign, an event poster, or a digital infographic that needs to communicate a complex idea simply — I understand how visual hierarchy, color, and typography work together to make people stop scrolling.',
    includes: [
      'Event posters & promotional materials (pubmats)',
      'Social media graphics & campaign assets',
      'Digital infographics & data storytelling visuals',
      'Organizational publication materials',
      'Print-ready and web-optimized file formats'
    ],
    tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe Animate', 'Canva', 'Figma']
  },
  {
    id: 'logo-identity-design',
    number: '07',
    title: 'Logo & Visual Identity Design',
    positioning: 'A logo is a first impression that never gets a second chance — let\'s make it count.',
    description: 'Visual identity is more than a logo — it\'s the system that makes a brand recognizable across every touchpoint. I design logos grounded in the brand\'s personality and purpose, then extend that into a coherent identity: color palette, typography pairing, and basic brand guidelines your team can actually use. Every concept is delivered with the rationale behind it, so you understand why it works — not just that it does.',
    includes: [
      'Logo concept development & refinement',
      'Color palette & typography definition',
      'Basic brand guidelines document',
      'Multiple file format delivery (SVG, PNG, PDF)',
      'Light & dark variant versions'
    ],
    tools: ['Adobe Illustrator', 'Figma', 'Photoshop']
  },
  {
    id: 'process-doc-writing',
    number: '08',
    title: 'Process Documentation & Technical Writing',
    positioning: 'Clear documentation that lets teams build, hand off, and scale — without losing what they built.',
    description: 'The work doesn\'t end when the product ships. Someone has to onboard the next developer, train the next user, and make sure the system survives a team change. I write documentation that\'s actually useful — structured, clear, and written for the person who comes after you. From developer guides and CSS customization references to process flow diagrams and project playbooks, I translate complex technical systems into language that people can act on.',
    includes: [
      'Technical developer guides & references',
      'Standard Operating Procedures (SOPs)',
      'End-to-end process flow diagrams (Draw.io)',
      'Project playbooks & handover documentation',
      'Stakeholder training materials'
    ],
    tools: ['Draw.io', 'MS Word', 'Notion', 'Apache Superset', 'MS Planner']
  }
];
