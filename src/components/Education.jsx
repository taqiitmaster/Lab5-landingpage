import { education, NOT_SPECIFIED } from "../data/portfolioData"
import { Icon } from "./icons.jsx"
import Reveal from "./Reveal.jsx"
import SectionHeading from "./SectionHeading.jsx"
import Timeline from "./Timeline.jsx"

export default function Education() {
  return (
    <section id="education" className="section" data-nav="education" aria-labelledby="edu-title">
      <div className="container narrow">
        <SectionHeading id="edu-title" title="Education" sub="From pre-engineering to a Computer Science degree." />
        <Timeline label="Education timeline">
          {education.map((e) => (
            <li key={e.id} className="tl-item">
              <span className="tl-dot" aria-hidden="true" />
              <Reveal>
                <article className="card spot tl-card">
                  <header className="tl-head">
                    <span className="icon-chip"><Icon name={e.icon} /></span>
                    <div>
                      <h3>{e.title}</h3>
                      {e.institution && <p className="tl-org">{e.institution}</p>}
                    </div>
                  </header>
                  <ul className="meta">
                    {e.period !== NOT_SPECIFIED && <li>{e.period}</li>}
                    {e.qualification && <li>{e.qualification}</li>}
                    {e.status && <li className="meta-live"><span className="pulse-dot" aria-hidden="true" />{e.status}</li>}
                  </ul>
                  <p>{e.description}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </Timeline>
      </div>
    </section>
  )
}
