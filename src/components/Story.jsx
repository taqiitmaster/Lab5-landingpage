import { motion, useReducedMotion } from 'framer-motion'
import { EDUCATION, EXPERIENCE } from '../lib/site.js'
import { CountUp, EASE, IndexLabel, MaskLines, Reveal, Rule } from '../ui/Motion.jsx'

/* ---------- 02 / PREMISE ---------- */
export function About() {
  return (
    <section id="about" className="relative py-28 lg:py-40">
      <div className="frame">
        <IndexLabel index="02" label="Premise" />
        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-9">
            <Reveal>
              <p className="statement text-paper">
                I started working at sixteen — two years of SEO before I’d finished school. Since then I’ve built game UI in
                Unity, shipped front-end at Ebryx in Arfa Karim Tower, and founded a studio I run while finishing my CS
                degree.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="statement mt-8 text-g-500">I write the code, rank the site, and ship the product end to end.</p>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="lg:col-span-3 lg:pt-3">
            <dl className="meta space-y-4 border-l border-g-700 pl-5 text-g-400">
              <div><dt>Started</dt><dd className="mt-1 text-paper">Age 16</dd></div>
              <div><dt>Roles held</dt><dd className="tabular mt-1 text-paper">05</dd></div>
              <div><dt>Company founded</dt><dd className="mt-1 text-paper">inphint, 2025</dd></div>
              <div><dt>Studying</dt><dd className="mt-1 text-paper">BS CS, semester 5</dd></div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ---------- 03 / EDUCATION ---------- */
const MOTIF_NOTE = { helix: 'Biology', blueprint: 'Engineering', code: 'Code', circuit: 'Systems' }

export function Education() {
  return (
    <section id="education" className="relative py-28 lg:py-36">
      <div className="frame">
        <IndexLabel index="03" label="Education" />
        <MaskLines lines={['Biology, then', 'engineering, then code.']} className="display-xl mt-8 text-paper" />
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-g-400">Four stops, in order. The line follows the same path — from a double helix to a schematic to the braces I write every day.</p>
        </Reveal>

        <ol className="mt-16 lg:mt-24">
          {EDUCATION.map((e, i) => (
            <li key={e.id}>
              <Rule delay={0.05} />
              {/* data-line tells The Line which shape to take through this row. */}
              <article data-line={e.motif} className="grid min-h-[230px] gap-5 py-10 sm:min-h-[260px] lg:grid-cols-12 lg:gap-6 lg:py-14">
                <div className="lg:col-span-5">
                  <p className="meta mb-3 text-g-500">{String(i + 1).padStart(2, '0')} — {MOTIF_NOTE[e.motif]}</p>
                  {e.years ? (
                    <p className="font-mono text-[clamp(2.6rem,6.4vw,5.6rem)] font-light leading-none tracking-[-0.04em] text-paper">
                      <CountUp to={+e.years[0]} />
                      <span className="text-g-600">—</span>
                      {e.years[1] === 'Now' ? <span>Now</span> : <CountUp to={+e.years[1]} />}
                    </p>
                  ) : (
                    <p className="font-mono text-[clamp(2.6rem,6.4vw,5.6rem)] font-light uppercase leading-none tracking-[-0.04em] text-paper">{e.duration}</p>
                  )}
                </div>
                <div className="lg:col-span-7 lg:pt-8">
                  <h3 className="display-md text-paper">{e.title}</h3>
                  <p className="mt-2 text-[17px] text-g-300">{e.school}</p>
                  <p className="meta mt-4 text-g-500">{e.field}</p>
                </div>
              </article>
            </li>
          ))}
        </ol>
        <Rule />
      </div>
    </section>
  )
}

/* ---------- 04 / EXPERIENCE ---------- */
export function Experience() {
  const reduce = useReducedMotion()
  return (
    <section id="experience" className="relative py-28 lg:py-36">
      <div className="frame">
        <IndexLabel index="04" label="Experience" />
        <MaskLines lines={['Working since sixteen.']} className="display-xl mt-8 text-paper" />
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-g-400">Five roles, oldest first. Each one is a node on the line.</p>
        </Reveal>

        <ol className="mt-16 lg:mt-24">
          {EXPERIENCE.map((x) => (
            <li key={x.role} data-line="node" className="relative pb-14 lg:pb-20">
              <motion.div initial={reduce ? false : { opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.9, ease: EASE }} className="grid gap-3 lg:grid-cols-12 lg:gap-6">
                <p className="meta tabular pt-1 text-g-400 lg:col-span-3">{x.duration}{x.current && <span className="ml-3 bg-paper px-1.5 py-0.5 text-ink">Now</span>}</p>
                <div className="lg:col-span-9">
                  <h3 className="display-md text-paper">{x.role}</h3>
                  {x.org && <p className="mt-1.5 text-[17px] text-g-300">{x.org}</p>}
                  <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-g-400">{x.body}</p>
                </div>
              </motion.div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
