# Muhammad Taqi Nayyer: Portfolio

React + Vite + Framer Motion single-page portfolio.

## Run it
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
npm run preview    # preview the build
```
Requires Node.js 18+.

## Everything you will want to edit lives in `src/data/portfolioData.js`
| To do this | Change this |
|---|---|
| Add your CV | Put the PDF in `public/cv/` and set `profile.cvUrl = '/cv/your-file.pdf'`. The "CV coming soon" label becomes a Download button. |
| Add LinkedIn | Set `socials.linkedin` to your profile URL. The button appears in Contact automatically. |
| GitHub | Already set to https://github.com/taqiitmaster (hero + contact). |
| Replace the photo | Overwrite `src/assets/profile-photo.jpg` (keep the same file name). |
| Add dates to roles | Replace `NOT_SPECIFIED` in the `period` field of an experience or education entry. The date chip appears once a real value is set. |
| Show skill levels | Set `skills.showLevels = true` and give individual skills `{ name: 'React.js', level: 'Working' }`. Off by default. |
| Add future projects | Add a `projects` array to the data file and a `Projects.jsx` component modelled on `Skills.jsx`. Then add it to `App.jsx`. |

## Please verify
- **Node.js** is listed as "Node.js (fundamentals)". Edit or remove it in `skills.categories` to match your real level.
- **Unity internship** shows "Remote internship" in place of a company name because none was given.
- After deploying, add `og:image` and `og:url` to `index.html` for link previews.

## Notes
- No contact form is included, since there is no backend. "Email Me" (mailto) and "Call Me" (tel) are the real contact methods.
- Reduced-motion preferences are respected (animations are disabled).
