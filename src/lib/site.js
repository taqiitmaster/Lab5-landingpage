/**
 * Every word on the page lives here — edit this file, not the components.
 */
import { CERTS } from './assets.js'

export const PERSON = {
  name: 'Muhammad Taqi Nayyer',
  short: 'Taqi',
  email: 'm.taqi542@gmail.com',
  phone: '0321 3372325',
  phoneHref: 'tel:+923213372325',
  // Shown publicly. The full street address from the brief is deliberately
  // NOT published — see README ("Security"). To show it anyway, replace this.
  location: 'Model Town, Lahore',
  github: 'https://github.com/taqiitmaster',
  githubHandle: 'taqiitmaster',
  linkedin: 'https://www.linkedin.com/in/muhammad-taqi-216551256/',
  linkedinHandle: 'muhammad-taqi',
  born: 2004,
}

export const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

/** Section index, in page order. Drives the nav's live section label. */
export const SECTIONS = [
  { id: 'home', index: '01', label: 'Index' },
  { id: 'about', index: '02', label: 'Premise' },
  { id: 'education', index: '03', label: 'Education' },
  { id: 'experience', index: '04', label: 'Experience' },
  { id: 'inphint', index: '05', label: 'inphint' },
  { id: 'skills', index: '06', label: 'Skills' },
  { id: 'certifications', index: '07', label: 'Certifications' },
  { id: 'contact', index: '08', label: 'Contact' },
]

export const ROLES = ['Front-end developer', 'SEO specialist', 'Founder, inphint', 'CS undergrad']

/** Chronological — The Line passes through these as DNA, blueprint, then code. */
export const EDUCATION = [
  { id: 'olevels', motif: 'helix', years: ['2018', '2021'], title: 'O Levels', field: 'Biology', school: 'Beaconhouse' },
  { id: 'fsc', motif: 'blueprint', years: ['2021', '2022'], title: 'FSc', field: 'Pre-Engineering', school: 'Government College University (GCU)' },
  { id: 'diploma', motif: 'code', years: null, duration: '1 year', title: 'Diploma in Web Development', field: 'React', school: 'Professional diploma' },
  { id: 'bscs', motif: 'circuit', years: ['2024', 'Now'], title: 'BS Computer Science', field: '5th semester', school: 'Qarshi University' },
]

/** Chronological, oldest first — the last node hands over to the inphint section. */
export const EXPERIENCE = [
  {
    role: 'SEO Specialist',
    org: null,
    duration: '2 years',
    body: 'On-page, off-page and technical SEO — started while still in O Levels.',
  },
  {
    role: 'Game Developer (Intern)',
    org: 'Unity projects — remote',
    duration: '1 year',
    body: 'Front-end and UI development for Unity-based game projects, working fully remote.',
  },
  {
    role: 'Sales Representative',
    org: 'Call centre',
    duration: '1 month',
    body: 'International outbound sales and client communication under pressure.',
  },
  {
    role: 'Front-End Developer (Intern)',
    org: 'Ebryx',
    duration: '3 months',
    body: 'Front-end development at Ebryx, a security firm in Arfa Karim Tower, Lahore.',
  },
  {
    role: 'Founder',
    org: 'inphint',
    duration: '2025 — Present',
    body: 'Runs a digital studio delivering web development, AI automation, SEO, branding, video and social media.',
    current: true,
  },
]

export const INPHINT = {
  url: 'https://inphint.com',
  host: 'inphint.com',
  founded: 2025,
  line: 'A digital studio built to ship — design, code, and growth under one roof.',
  services: ['Web Development', 'AI Automation', 'SEO', 'Branding & Design', 'Video Editing', 'Social Media Marketing'],
}

export const SKILLS = [
  { group: 'Front-End Development', items: ['React', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Responsive Design', 'Component Architecture', 'REST API Integration', 'Git & GitHub', 'Web Performance Optimisation', 'Cross-Browser Compatibility', 'UI Implementation'] },
  { group: 'SEO & Growth', items: ['On-Page SEO', 'Off-Page SEO', 'Technical SEO', 'Keyword Research', 'Link Building', 'Site Audits', 'Google Analytics', 'Google Search Console', 'Content Optimisation', 'Local SEO', 'SERP Analysis'] },
  { group: 'Professional', items: ['Client Communication (International)', 'Sales & Negotiation', 'Project Handling & Delivery', 'Requirement Gathering', 'Team Collaboration', 'Remote Work Discipline', 'Time Management', 'Problem Solving', 'Business Development', 'Presentation & Proposal Writing'] },
  { group: 'Other Technical', items: ['Unity (Game UI / Front-End)', 'AI Automation & Workflow Integration', 'Prompt Engineering', 'WordPress', 'Video Editing', 'Branding & Visual Design', 'Social Media Marketing'] },
  { group: 'Back-End & Tools', items: ['Node.js', 'npm', 'Version Control', 'Deployment Workflows'] },
  { group: 'Programming Languages', items: ['JavaScript', 'Python', 'C++', 'C#'] },
]

/** Issuers and verify links are read from the certificates themselves. */
export const CERTIFICATES = [
  { id: 'intro-to-ai', title: 'Introduction to AI', issuer: 'Google', date: 'Oct 2026', verify: 'https://coursera.org/verify/6AD9VBQ6EW99' },
  { id: 'stay-ahead-ai', title: 'Stay Ahead of the AI Curve', issuer: 'Google', date: 'Oct 2026', verify: 'https://coursera.org/verify/TG87QNUPZ2FN' },
  { id: 'productivity-ai', title: 'Maximize Productivity With AI Tools', issuer: 'Google', date: 'Oct 2026', verify: 'https://coursera.org/verify/T0RFUHJ4G4RG' },
  { id: 'art-of-prompting', title: 'Discover the Art of Prompting', issuer: 'Google', date: 'Oct 2026', verify: 'https://coursera.org/verify/JJX2MIRWIUFW' },
  { id: 'prompts-like-a-pro', title: 'Start Writing Prompts like a Pro', issuer: 'Google', date: 'Oct 2026', verify: 'https://coursera.org/verify/JFOF5O3V9P0Q' },
  { id: 'ecommerce-stores', title: 'Make the Sale: Build, Launch, and Manage E-commerce Stores', issuer: 'Google', date: 'Oct 2026', verify: 'https://coursera.org/verify/LZB30Z65G05L' },
  { id: 'ai-brainstorming', title: 'AI for Brainstorming and Planning', issuer: 'Google', date: 'Nov 2026', verify: 'https://coursera.org/verify/A33JUB8V521K' },
  { id: 'captivate-audience', title: 'Capture and Captivate Your Audience', issuer: 'Google', date: 'Nov 2026', verify: 'https://coursera.org/verify/JMS75TKA98IV' },
  { id: 'jira-automation', title: 'Automate Tasks and Processes with Jira', issuer: 'Coursera Project Network', date: 'Nov 2026', verify: 'https://coursera.org/verify/2FDF3YJ2485F' },
  { id: 'digital-marketing', title: 'Foundations of Digital Marketing and E-commerce', issuer: 'Google', date: 'Nov 2026', verify: 'https://coursera.org/verify/WCE8NV54TNT4' },
].map((c) => ({ ...c, ...CERTS[c.id] }))
