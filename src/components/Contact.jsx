import { PERSON } from '../lib/site.js'
import { IndexLabel, MaskLines, Reveal } from '../ui/Motion.jsx'
import { ext, GitHubMark, LinkedInMark } from './Chrome.jsx'

/** A big link row: label in mono, value in display type, a rule that draws on hover. */
function Row({ label, value, href, external, icon }) {
  return (
    <a href={href} {...(external ? ext : {})} className="group relative flex flex-col gap-2 border-b border-g-700 py-6 sm:flex-row sm:items-baseline sm:gap-10 lg:py-8">
      <span aria-hidden="true" className="absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-paper transition-transform duration-500 group-hover:scale-x-100" />
      <span className="meta w-28 shrink-0 text-g-500">{label}</span>
      <span className="flex min-w-0 items-center gap-4 break-all font-display text-[clamp(1.5rem,4vw,3.4rem)] font-medium leading-none tracking-[-0.035em] text-paper transition-transform duration-500 group-hover:translate-x-2">
        {icon}{value}
      </span>
      {href && <span aria-hidden="true" className="meta ml-auto hidden text-g-500 transition-colors group-hover:text-paper sm:block">{external ? 'Open ↗' : 'Go →'}</span>}
    </a>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="relative pb-16 pt-28 lg:pt-40">
      <div className="frame">
        <IndexLabel index="08" label="Contact" />
        <div data-line="end">
          <MaskLines lines={['Let’s build', 'something.']} className="display-hero mt-10 normal-case text-paper" />
        </div>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-lg text-[17px] leading-relaxed text-g-400">Available for front-end roles, freelance builds and SEO work. The fastest way to reach me is email.</p>
        </Reveal>

        <div className="mt-14 border-t border-g-700">
          <Row label="Email" value={PERSON.email} href={`mailto:${PERSON.email}`} />
          <Row label="Phone" value={PERSON.phone} href={PERSON.phoneHref} />
          <Row label="GitHub" value={`@${PERSON.githubHandle}`} href={PERSON.github} external icon={<GitHubMark size={30} />} />
          <Row label="LinkedIn" value="Muhammad Taqi" href={PERSON.linkedin} external icon={<LinkedInMark size={28} />} />
          <div className="flex flex-col gap-2 border-b border-g-700 py-6 sm:flex-row sm:items-baseline sm:gap-10 lg:py-8">
            <span className="meta w-28 shrink-0 text-g-500">Location</span>
            <span className="font-display text-[clamp(1.5rem,4vw,3.4rem)] font-medium leading-none tracking-[-0.035em] text-paper">{PERSON.location}</span>
          </div>
        </div>

        <footer className="meta mt-24 flex flex-col gap-3 border-t border-g-700 pt-6 text-g-500 sm:flex-row sm:justify-between">
          <span>{PERSON.name} · © {new Date().getFullYear()}</span>
          <span>Designed &amp; built by {PERSON.name}</span>
        </footer>
      </div>
    </section>
  )
}
