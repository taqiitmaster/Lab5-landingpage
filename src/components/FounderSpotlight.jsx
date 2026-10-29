import { ArrowUpRight } from "lucide-react"
import { founder, profile } from "../data/portfolioData"
import { Icon } from "./icons.jsx"
import Reveal from "./Reveal.jsx"

export default function FounderSpotlight() {
  return (
    <section id="inphint" className="section" data-nav="experience" aria-labelledby="founder-title">
      <div className="container">
        <Reveal className="founder-shell spot">
          <div className="founder-copy">
            <h2 id="founder-title" className="h2">{founder.heading}</h2>
            <p className="founder-sub">{founder.subheading}</p>
            <p className="lead">{founder.description}</p>
            <a href={profile.website} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Visit Inphint <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
          <ul className="service-grid">
            {founder.services.map((s) => (
              <li key={s.title} className="service">
                <span className="icon-chip icon-chip--sm"><Icon name={s.icon} size={18} /></span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
