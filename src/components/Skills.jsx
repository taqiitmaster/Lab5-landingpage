import { skills } from "../data/portfolioData"
import { Icon } from "./icons.jsx"
import Reveal from "./Reveal.jsx"
import SectionHeading from "./SectionHeading.jsx"

export default function Skills() {
  return (
    <section id="skills" className="section" data-nav="skills" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading id="skills-title" title="Skills, Grouped by What I Actually Do" sub="Six areas where I have practical experience, from interface code to client conversations." />
        <div className="skills-grid">
          {skills.categories.map((cat, i) => (
            <Reveal key={cat.id} delay={(i % 3) * 0.06}>
              <article className="card spot skill-card">
                <header className="skill-head">
                  <span className="icon-chip"><Icon name={cat.icon} /></span>
                  <div>
                    <h3>{cat.title}</h3>
                    <p>{cat.blurb}</p>
                  </div>
                </header>
                <ul className="chips">
                  {cat.items.map((s) => {
                    const name = typeof s === "string" ? s : s.name
                    const level = typeof s === "string" ? null : s.level
                    return (
                      <li key={name} className="chip">
                        {name}
                        {skills.showLevels && level && <em>{level}</em>}
                      </li>
                    )
                  })}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
