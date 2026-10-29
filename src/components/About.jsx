import { about } from "../data/portfolioData"
import { Icon } from "./icons.jsx"
import Reveal from "./Reveal.jsx"

export default function About() {
  return (
    <section id="about" className="section" data-nav="home" aria-labelledby="about-title">
      <div className="container about-grid">
        <Reveal className="about-copy">
          <h2 id="about-title" className="h2">{about.heading}</h2>
          <p className="lead">{about.summary}</p>
        </Reveal>
        <div className="about-cards">
          {about.cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.06}>
              <article className="card spot about-card">
                <span className="icon-chip"><Icon name={c.icon} /></span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
