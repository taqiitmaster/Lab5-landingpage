import { ArrowUpRight, Check, MapPin } from "lucide-react"
import { experience, NOT_SPECIFIED } from "../data/portfolioData"
import { Icon } from "./icons.jsx"
import Reveal from "./Reveal.jsx"
import SectionHeading from "./SectionHeading.jsx"
import Timeline from "./Timeline.jsx"

const shown = (v) => v && v !== NOT_SPECIFIED

export default function Experience() {
  return (
    <section id="experience" className="section" data-nav="experience" aria-labelledby="exp-title">
      <div className="container narrow">
        <SectionHeading id="exp-title" title="Experience" sub="Development, SEO, sales and my own company, across corporate, remote and entrepreneurial settings." />
        <Timeline label="Professional experience timeline">
          {experience.map((x) => (
            <li key={x.id} className="tl-item">
              <span className={`tl-dot ${x.featured ? "tl-dot--live" : ""}`} aria-hidden="true" />
              <Reveal>
                <article className={`card spot tl-card ${x.featured ? "tl-card--featured" : ""}`}>
                  <header className="tl-head">
                    <span className="icon-chip"><Icon name={x.icon} /></span>
                    <div>
                      <h3>{x.role}</h3>
                      {x.org && <p className="tl-org">{x.org}</p>}
                    </div>
                  </header>

                  <ul className="meta">
                    {shown(x.period) && <li>{x.period}</li>}
                    {shown(x.duration) && <li>{x.duration}</li>}
                    {x.location && <li><MapPin size={13} aria-hidden="true" /> {x.location}</li>}
                  </ul>

                  <p>{x.description}</p>

                  {x.responsibilities && (
                    <ul className="checks">
                      {x.responsibilities.map((r) => (
                        <li key={r}><Check size={15} aria-hidden="true" />{r}</li>
                      ))}
                    </ul>
                  )}

                  {x.tags && (
                    <div className="tag-block">
                      <p className="tag-label">{x.tagsLabel}</p>
                      <ul className="chips">{x.tags.map((t) => <li key={t} className="chip">{t}</li>)}</ul>
                    </div>
                  )}

                  {x.url && (
                    <a href={x.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                      Visit {x.org} <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  )}
                </article>
              </Reveal>
            </li>
          ))}
        </Timeline>
      </div>
    </section>
  )
}
