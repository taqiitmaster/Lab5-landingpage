import { useState } from "react"
import { ArrowUpRight, Check, Copy, Mail, MapPin, Phone } from "lucide-react"
import { contact, profile, socials } from "../data/portfolioData"
import { GithubIcon, LinkedinIcon } from "./icons.jsx"
import Reveal from "./Reveal.jsx"

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section id="contact" className="section" data-nav="contact" aria-labelledby="contact-title">
      <div className="container">
        <Reveal className="contact-shell spot">
          <div className="contact-glow" aria-hidden="true" />
          <h2 id="contact-title" className="h2">{contact.heading}</h2>
          <p className="lead">{contact.text}</p>

          <ul className="contact-list">
            <li>
              <Mail size={18} aria-hidden="true" />
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <button type="button" className="copy-btn" onClick={copyEmail} aria-label="Copy email address">
                {copied ? <Check size={15} /> : <Copy size={15} />}
                <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
              </button>
            </li>
            <li><Phone size={18} aria-hidden="true" /><a href={`tel:${profile.phoneHref}`}>{profile.phone}</a></li>
            <li><MapPin size={18} aria-hidden="true" /><span>{profile.location}</span></li>
          </ul>

          <div className="contact-actions">
            <a className="btn btn-primary" href={`mailto:${profile.email}?subject=${encodeURIComponent(contact.mailSubject)}`}>
              <Mail size={18} aria-hidden="true" /> Email Me
            </a>
            <a className="btn btn-ghost" href={`tel:${profile.phoneHref}`}><Phone size={18} aria-hidden="true" /> Call Me</a>
            <a className="btn btn-ghost" href={profile.website} target="_blank" rel="noopener noreferrer">
              Visit Inphint <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>

          <div className="social-row">
            {socials.github && (
              <a href={socials.github} target="_blank" rel="noopener noreferrer" className="social" aria-label="GitHub profile (opens in a new tab)">
                <GithubIcon /> GitHub
              </a>
            )}
            {socials.linkedin && (
              <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="social" aria-label="LinkedIn profile (opens in a new tab)">
                <LinkedinIcon /> LinkedIn
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
