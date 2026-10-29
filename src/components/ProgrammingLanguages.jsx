import { languages } from "../data/portfolioData"
import Reveal from "./Reveal.jsx"
import SectionHeading from "./SectionHeading.jsx"

export default function ProgrammingLanguages() {
  return (
    <section id="languages" className="section section--tight" data-nav="skills" aria-labelledby="lang-title">
      <div className="container">
        <SectionHeading id="lang-title" title={languages.heading} sub={languages.subheading} />
        <div className="lang-grid">
          {languages.items.map((l, i) => (
            <Reveal key={l.name} delay={i * 0.05}>
              <article className="card spot lang-card">
                <p className="lang-tag">{l.tag}</p>
                <h3 className="lang-name">{l.name}</h3>
                <code className="lang-snippet" aria-hidden="true">{l.snippet}</code>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="tools-row">
          <h3>{languages.toolsHeading}</h3>
          <ul className="chips chips--outline">
            {languages.tools.map((t) => <li key={t} className="chip">{t}</li>)}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
