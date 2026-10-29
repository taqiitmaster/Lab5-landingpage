/**
 * ───────────────────────────────────────────────────────────────
 *  EDIT YOUR CONTENT HERE. Every section of the site reads from
 *  this single file.
 * ───────────────────────────────────────────────────────────────
 */

export const NOT_SPECIFIED = 'Dates not specified'

export const profile = {
  name: 'Muhammad Taqi Nayyer',
  shortName: 'Taqi Nayyer',
  monogram: 'TN',
  email: 'm.taqi542@gmail.com',
  phone: '+92 321 3372325',
  phoneHref: '+923213372325',
  location: 'Lahore, Pakistan',
  website: 'https://inphint.com',
  tagline: 'Computer Science Student | Developer | Founder of Inphint',
  // Set to a real file path to turn on the CV download button, e.g.
  // '/cv/Muhammad-Taqi-Nayyer-CV.pdf' (put the PDF in the /public/cv folder).
  cvUrl: null,
}

export const socials = {
  github: 'https://github.com/taqiitmaster',
  linkedin: null, // paste your LinkedIn URL here to show it automatically
}

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export const hero = {
  status: 'COMPUTER SCIENCE STUDENT · DEVELOPER · FOUNDER',
  greeting: "Hi, I'm Muhammad Taqi Nayyer.",
  headline: 'I Build Digital Experiences That Solve Real Problems.',
  intro:
    'Computer Science student, frontend developer, and founder of Inphint, combining web development, SEO, and digital strategy to build useful products and help businesses grow online.',
  roles: [
    'React Developer',
    'Frontend Developer',
    'SEO Specialist',
    'Digital Entrepreneur',
    'AI Automation Enthusiast',
  ],
  highlights: ['Founder of Inphint', 'React & Frontend Development', 'SEO & Digital Marketing'],
  floatingCards: [
    { icon: 'code', text: 'Frontend Development' },
    { icon: 'search', text: 'SEO & Digital Strategy' },
    { icon: 'rocket', text: 'Founder @ Inphint' },
  ],
  photoAlt: 'Portrait of Muhammad Taqi Nayyer in a navy double-breasted blazer',
}

export const about = {
  heading: 'A Developer With a Business Mindset.',
  summary:
    'I’m Muhammad Taqi Nayyer, a Computer Science student and digital professional with experience spanning frontend development, SEO, digital marketing, game development, and client communication. My journey has allowed me to work across technical and business environments, from remote development internships and corporate experience to founding Inphint, my own digital services company. I enjoy learning new technologies, solving practical problems, and building digital solutions that create value for businesses and users.',
  cards: [
    { icon: 'code', title: 'Technical Development', text: 'Responsive, component-based interfaces built with React and modern JavaScript.' },
    { icon: 'search', title: 'Search Engine Optimization', text: 'Audits, keyword research and on-page strategy to improve search visibility.' },
    { icon: 'compass', title: 'Digital Strategy', text: 'Connecting websites, content and marketing into one clear plan for growth.' },
    { icon: 'users', title: 'Entrepreneurship & Client Communication', text: 'Running a digital services company and working directly with clients.' },
  ],
}

/**
 * Skill levels are OFF by default. To show an honest level on a chip, set
 * `showLevels: true` and add `level: 'Learning' | 'Working' | 'Confident'`
 * to individual skills.
 */
export const skills = {
  showLevels: false,
  categories: [
    {
      id: 'frontend',
      icon: 'code',
      title: 'Frontend Development',
      blurb: 'Interfaces that are fast, responsive and maintainable.',
      items: [
        'HTML5', 'CSS3', 'JavaScript ES6+', 'React.js', 'Responsive Web Design',
        'Component-Based Architecture', 'DOM Manipulation', 'UI Implementation',
        'Frontend Debugging', 'Git and GitHub',
      ],
    },
    {
      id: 'backend',
      icon: 'server',
      title: 'Backend & Programming',
      blurb: 'Programming fundamentals across several languages.',
      items: [
        // Please confirm your real Node.js level. Edit or remove this line if needed.
        'Node.js (fundamentals)', 'Python', 'C++', 'C#', 'REST API Fundamentals', 'JSON',
        'Programming Fundamentals', 'Object-Oriented Programming', 'Problem Solving',
      ],
    },
    {
      id: 'seo',
      icon: 'search',
      title: 'Search Engine Optimization',
      blurb: 'Hands-on SEO experience from audit to reporting.',
      items: [
        'On-Page SEO', 'Off-Page SEO', 'Technical SEO', 'Keyword Research', 'Competitor Analysis',
        'Website Audits', 'Internal Linking', 'Content Optimization', 'Backlink Analysis',
        'SEO Reporting', 'Search Intent Analysis', 'Website Performance Optimization', 'SEO Strategy',
      ],
    },
    {
      id: 'marketing',
      icon: 'megaphone',
      title: 'Digital Marketing & Branding',
      blurb: 'Brand, content and campaigns working together.',
      items: [
        'Social Media Marketing', 'Digital Marketing Strategy', 'Brand Identity Development',
        'Graphic Design Coordination', 'Content Planning', 'Video Editing Coordination',
        'Online Advertising Fundamentals', 'Website Conversion Optimization',
        'Digital Content Strategy', 'Audience Research',
      ],
    },
    {
      id: 'ai',
      icon: 'bot',
      title: 'AI & Automation',
      blurb: 'Practical automation that removes repetitive work.',
      items: [
        'AI Automation Fundamentals', 'Workflow Automation', 'AI-Powered Business Solutions',
        'Automation Workflow Design', 'API Integration Fundamentals', 'AI Chatbot Concepts',
        'Process Optimization',
      ],
    },
    {
      id: 'business',
      icon: 'briefcase',
      title: 'Professional & Business',
      blurb: 'Working clearly with clients and teams.',
      items: [
        'Client Communication', 'International Client Communication', 'Sales and Lead Qualification',
        'Customer Relationship Management', 'Project Coordination', 'Task Prioritization',
        'Team Collaboration', 'Time Management', 'Business Development', 'Requirements Gathering',
        'Professional Communication', 'Adaptability', 'Client Relationship Management',
      ],
    },
  ],
}

export const languages = {
  heading: 'What I Write Code In',
  subheading: 'Languages are listed separately from frameworks and tools.',
  items: [
    { name: 'JavaScript', tag: 'Web & interfaces', snippet: 'console.log("Hello, World");' },
    { name: 'Python', tag: 'Scripting & logic', snippet: 'print("Hello, World")' },
    { name: 'C++', tag: 'Fundamentals & OOP', snippet: 'std::cout << "Hello, World";' },
    { name: 'C#', tag: 'Object-oriented code', snippet: 'Console.WriteLine("Hello, World");' },
  ],
  toolsHeading: 'Frameworks & tools',
  tools: ['React.js', 'Git & GitHub', 'Unity', 'REST APIs'],
}

export const education = [
  {
    id: 'qarshi',
    icon: 'graduation',
    title: 'BS Computer Science',
    institution: 'Qarshi University',
    period: '2024 — Present',
    status: 'Currently in 5th semester',
    description:
      'Currently pursuing a Bachelor of Science in Computer Science, developing knowledge in programming, software development, and computer science fundamentals.',
  },
  {
    id: 'react-diploma',
    icon: 'code',
    title: 'Web Development with React',
    institution: null, // institution not provided; left blank on purpose
    qualification: 'One-year diploma',
    period: NOT_SPECIFIED,
    description: 'Completed a one-year web development diploma focused on React and modern web development.',
  },
  {
    id: 'gcu',
    icon: 'book',
    title: 'FSc Pre-Engineering',
    institution: 'Government College University (GCU)',
    period: '2021 — 2022',
    description: 'Completed intermediate studies in the Pre-Engineering stream.',
  },
  {
    id: 'beaconhouse',
    icon: 'book',
    title: 'O Levels: Biology',
    institution: 'Beaconhouse',
    period: '2018 — 2021',
    description: 'Completed O Level studies with Biology.',
  },
]

export const experience = [
  {
    id: 'inphint',
    icon: 'rocket',
    role: 'Founder',
    org: 'Inphint',
    url: 'https://inphint.com',
    period: '2025 — Present',
    description:
      'Founded Inphint, a digital services company focused on helping businesses establish and grow their online presence through modern websites, digital marketing, branding, and automation solutions.',
    responsibilities: [
      'Business development and service planning',
      'Website project coordination',
      'Digital strategy and SEO planning',
      'Client communication',
      'Brand and content coordination',
      'Managing project requirements and deliverables',
    ],
    tags: ['Web Development', 'AI Automation', 'Search Engine Optimization', 'Branding and Graphic Design', 'Video Editing', 'Social Media Marketing'],
    tagsLabel: 'Services offered',
    featured: true,
  },
  {
    id: 'ebryx',
    icon: 'code',
    role: 'Frontend Development Intern',
    org: 'Ebryx',
    location: 'Arfa Software Technology Park, Lahore',
    duration: '3 months',
    period: NOT_SPECIFIED,
    description:
      'Completed a three-month frontend development internship at Ebryx, gaining exposure to professional software development workflows, frontend implementation, and collaborative project environments.',
  },
  {
    id: 'unity',
    icon: 'gamepad',
    role: 'Unity Frontend / Game Development Intern',
    org: 'Remote internship',
    duration: NOT_SPECIFIED,
    period: NOT_SPECIFIED,
    description:
      'Completed a remote internship involving Unity-based game development and frontend-related implementation, gaining exposure to interactive development workflows and collaborative remote work.',
  },
  {
    id: 'seo',
    icon: 'search',
    role: 'SEO Professional',
    org: null,
    duration: '2 years',
    period: NOT_SPECIFIED,
    description:
      'Worked in SEO, developing practical experience in website optimization, keyword research, search visibility, and organic growth strategies.',
    tags: ['On-Page SEO', 'Off-Page SEO', 'Technical SEO', 'Keyword Research', 'Website Audits'],
    tagsLabel: 'Focus areas',
  },
  {
    id: 'sales',
    icon: 'headset',
    role: 'Sales Call Center Representative',
    org: null,
    duration: '1 month',
    period: NOT_SPECIFIED,
    description:
      'Gained experience in customer communication, sales conversations, handling objections, and understanding customer needs in a call center environment.',
  },
]

export const founder = {
  heading: 'Building More Than Code.',
  subheading: 'Founder of Inphint: Digital Solutions for Growing Businesses.',
  description:
    'In 2025, I founded Inphint to bring web development, SEO, branding, social media marketing, video editing, and AI automation together under one digital services company. Through this journey, I have been developing both my technical capabilities and my understanding of client needs, project delivery, and business growth.',
  services: [
    { icon: 'globe', title: 'Web Development', text: 'Modern, responsive websites built with clean code.' },
    { icon: 'trending', title: 'SEO & Organic Growth', text: 'Audits, keyword research and on-page strategy.' },
    { icon: 'bot', title: 'AI Automation', text: 'Workflows that remove repetitive manual work.' },
    { icon: 'palette', title: 'Branding & Design', text: 'Visual identity that keeps a brand consistent.' },
    { icon: 'video', title: 'Video Editing', text: 'Edited video content for social and marketing.' },
    { icon: 'share', title: 'Social Media Marketing', text: 'Content planning to build an online audience.' },
  ],
}

export const contact = {
  heading: 'Have a Project or Opportunity in Mind?',
  text: 'I’m open to discussing frontend development opportunities, software projects, digital solutions, and collaborations with people building meaningful products.',
  mailSubject: 'Hello Taqi, I found your portfolio',
}
