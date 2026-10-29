# MTN Portfolio (React + Vite + react-three-fiber)
npm install && npm run dev   # build: npm run build  → deploy dist/ to Vercel or Netlify
Photo: public/taqi.jpg · CV: put Taqi_CV.pdf in public/ · Form: FORM_ENDPOINT in src/components/Contact.jsx · Content: src/data.js

You are a senior creative front-end engineer and UI/UX designer. Build a complete, production-ready, single-page portfolio website that looks premium, futuristic and award-winning, the kind of site that makes a client or recruiter decide to hire within seconds. Use your creativity at its peak.

## 1. TECH STACK
- React (Vite) + HTML5 + JavaScript (no TypeScript)
- Tailwind CSS for styling
- Framer Motion for animations and scroll-based effects
- Three.js with @react-three/fiber and @react-three/drei for the 3D scroll animation (lightweight, see section 4)
- Lenis for smooth scrolling
- lucide-react or react-icons for icons
- Google Fonts: "Space Grotesk" or "Sora" for headings, "Inter" for body, "JetBrains Mono" for small tech labels
- ONE landing page only. No routing, no multiple pages. Navigation scrolls to sections.
- Output the full project: folder structure, package.json, every component with complete code, and run instructions (npm install, npm run dev). No placeholders or "add code here".

## 2. DESIGN DIRECTION
- Theme: deep black (#050505 / #0a0a0f) with ONE signature accent, electric cyan (#00E5FF) with a secondary violet (#7C3AED) used only in gradients and glows. Keep it disciplined: black, white/grey text, cyan accent.
- Style: futuristic, minimal, premium. Glassmorphism cards (backdrop-blur, 1px translucent borders), subtle neon glows, soft gradient mesh/aurora blobs in the background, fine grid or noise texture overlay, gradient text on key words.
- Custom animated cursor on desktop (glowing dot + trailing ring that grows on hover). Disable on touch devices.
- Scroll progress bar at the top in the accent gradient.
- Animated page loader/intro (name reveal with a progress counter, under 2 seconds).
- Magnetic buttons, hover tilt on cards (vanilla-tilt style or Framer Motion), animated gradient borders, text scramble/typing effect, number count-up animations, staggered reveal-on-scroll for everything.
- Fully responsive: mobile-first, flawless at 360px up to 4K. Touch-friendly.
- Accessibility: semantic HTML5, alt text, focus states, sufficient contrast, and respect prefers-reduced-motion by disabling heavy animation and 3D.

## 3. NAVBAR AND PAGE STRUCTURE
Navbar (sticky, glass blur, shrinks on scroll, hamburger menu with animated full-screen overlay on mobile). ONLY these links:
**Home | Skills | Education | Contact**
Plus a small logo "MTN" (or "Taqi.dev") on the left and a "Hire Me" button on the right that scrolls to Contact.
Highlight the active link based on scroll position.

Page sections in order (everything except Skills, Education and Contact lives inside the Home area, since the navbar stays minimal):
1. **Home** (Hero → About → Services/Inphint → Experience → Languages → Stats)
2. **Skills**
3. **Education**
4. **Contact** + Footer

### HERO (must be spectacular)
- Full viewport height, black background with aurora glow and subtle animated particles/grid.
- Left: small mono tag "Available for work • Open to opportunities" with a pulsing green dot. Large headline: "Hi, I'm **Muhammad Taqi Nayyer**" with the name in animated gradient text. Rotating typewriter subtitle cycling through: "Full-Stack Developer", "React Developer", "SEO Specialist", "AI Automation Builder", "Founder of Inphint". One-line pitch: "I build fast, beautiful, search-optimized web experiences and automate businesses with AI."
- Two CTA buttons: "View My Work / Skills" (filled glow) and "Contact Me" (outline), plus "Download CV" (link to /Taqi_CV.pdf placeholder). Social/contact icons row (email, phone, WhatsApp).
- Right: my photo [YOUR PHOTO, e.g. /public/taqi.jpg] inside a premium frame: rounded/hexagonal or arch mask, glowing gradient ring slowly rotating, floating glass badges orbiting it ("React", "SEO", "AI", "Unity"), subtle parallax/tilt on mouse move. Make sure the face is centered, cropped well and sharp (object-fit: cover, object-position tuned). On mobile, show the photo under the headline, scaled well.
- Bottom: animated "scroll down" mouse indicator and a thin marquee of tech logos/keywords scrolling infinitely.

### ABOUT (inside Home)
Short, confident bio of a 22-year-old developer from Pakistan who started in SEO, moved into web and game development, and now runs his own digital company, studying Computer Science at Qarshi University. Mention working with international clients. Include a quick-facts glass card: Name, Age 22, Email, Phone, Location (Lahore, Pakistan), Status "Open to jobs & freelance".

### SERVICES / INPHINT (inside Home)
Feature a premium highlighted card: "Founder, Inphint (inphint.com), 2025" with a "Visit Inphint" button linking to https://inphint.com. Below it, a grid of animated service cards with icons and hover glow:
Web Development • AI Automation • SEO • Branding & Design • Video Editing • Social Media Marketing

### EXPERIENCE (inside Home): animated vertical timeline (alternating sides on desktop, single column on mobile), newest first:
- **Founder, Inphint** (2025 to present). Runs a digital agency offering web development, AI automation, SEO, branding & design, video editing and social media marketing.
- **Front-End Development Intern, Ebryx** (3 months, Arfa Software Technology Park, Lahore).
- **Sales Call Center Representative** (1 month). Client communication, persuasion, handling objections.
- **Game Development Intern, Unity Front-End** (1 year, remote).
- **SEO Specialist** (2 years, worked during O-Levels). On-page, off-page and technical SEO.
Each item: role, company, duration, 2 to 3 short impact-oriented bullet points.

### LANGUAGES (inside Home)
Animated cards or a glowing orbit/chip layout for: Python, C++, C#, JavaScript, each with a small icon and an animated proficiency ring or bar.

### STATS (inside Home)
Count-up numbers: "4+ Years Experience (SEO, dev, internships)", "2 Years SEO", "1 Company Founded", "6 Services Offered", "International Clients".

## 4. THE 3D SCROLL ANIMATION (signature feature)
Create a scroll-driven 3D experience that works smoothly on phones:
- Use a single fixed, lightweight react-three-fiber <Canvas> behind the content (pointer-events: none) containing a futuristic object, such as a low-poly glowing wireframe icosahedron/torus knot with floating particles (maximum ~1500 points) or a rotating abstract "tech core".
- Tie the object's rotation, position, scale and color/emissive intensity to scroll progress (use drei ScrollControls or Framer Motion's useScroll mapped to the 3D transforms), so it morphs and moves to different positions as the user passes Hero → Skills → Education → Contact.
- Additionally, add CSS 3D scroll effects (perspective, rotateX/translateZ on cards as they enter view) for the Skills section, e.g. skill cards flipping/rising in 3D with tilt.
- PERFORMANCE RULES (critical, the site must NOT lag on mobile):
  - Cap devicePixelRatio: dpr={[1, 1.5]}, antialias off on mobile
  - Low polygon counts, no heavy textures, no shadows, no postprocessing on mobile
  - Detect mobile with matchMedia/userAgent and reduce particle count by ~60%
  - Lazy-load the Canvas with React.lazy + Suspense so first paint is instant
  - Use frameloop="demand" or pause rendering when the tab is hidden / canvas out of view
  - Fallback to a pure CSS gradient/parallax background if WebGL is unavailable or prefers-reduced-motion is on
  - Only animate transform and opacity; use will-change sparingly

## 5. SKILLS SECTION (navbar link: Skills)
Grouped glass cards with animated progress bars or radial rings, icons, and 3D tilt on hover:
- **SEO:** On-Page SEO, Off-Page SEO, Technical SEO, Keyword Research, Link Building, Google Analytics & Search Console
- **Development:** React.js, JavaScript (ES6+), Node.js, HTML5, CSS3, Tailwind CSS, REST APIs, Git & GitHub, Responsive Design
- **Game Dev:** Unity, C#, Game UI / Front-End
- **Business & Soft Skills:** Sales & Call Center Experience, Communication Skills, Project Handling, International Client Communication, Negotiation, Team Collaboration, Time Management, Problem Solving
- **Skills I added (shown as "Also Proficient In"):** AI Automation & Prompt Engineering, Workflow Automation (n8n / Zapier / Make), Web Performance Optimization, UI/UX Design, Branding & Graphic Design, Video Editing, Social Media Marketing, Content Writing, Lead Generation, CRM basics, Freelancing & Client Management, Python scripting, Data Structures & Algorithms
Include a rotating skill-icon marquee/orbit as a visual highlight.

## 6. EDUCATION SECTION (navbar link: Education)
Glass timeline cards with animated line:
- **BS Computer Science**, Qarshi University (2024 to present), currently in 5th semester
- **Diploma in Web Development (React)**, 1 year
- **FSc Pre-Engineering**, Government College University (GCU) (2021 to 2022)
- **O-Levels (Biology)**, Beaconhouse (2018 to 2021)

## 7. CONTACT SECTION (navbar link: Contact) + FOOTER
- Big headline: "Let's build something extraordinary." with gradient text.
- Left: contact cards (clickable): Email m.taqi542@gmail.com (mailto), Phone 0321 3372325 (tel:), WhatsApp link (https://wa.me/923213372325), Location Lahore, Pakistan.
- Right: glass contact form (Name, Email, Message) with floating labels, validation, animated submit button and success state. Wire it with EmailJS or Formspree (add clear comments on where to put the keys), with a mailto fallback.
- Footer: logo, quick links, © 2026 Muhammad Taqi Nayyer, "Back to top" button with a rocket/arrow animation.

## 8. EXTRA PREMIUM TOUCHES
- Smooth scrolling (Lenis), section transitions, animated section headings with a small mono index label like "01 / SKILLS"
- Subtle sound-free micro-interactions: button ripples, icon hover bounces
- Floating "WhatsApp / Hire Me" button on the bottom-right
- SEO meta tags, Open Graph tags, favicon, JSON-LD Person schema, and fast Lighthouse scores (target 90+ on mobile)
- Clean, well-commented, reusable components (Navbar, Hero, Scene3D, About, Services, Timeline, Languages, Skills, Education, Contact, Footer) and a central data file (data.js) holding all my content so it is easy to edit
- Optimize images (lazy loading, WebP)

## 9. FINAL DELIVERABLE
Provide: 1) the complete file tree, 2) full code for every file, 3) install/run/deploy steps (Vercel or Netlify), 4) a short list of where to replace my photo, CV and form keys. Do not skip any component and do not truncate code.
