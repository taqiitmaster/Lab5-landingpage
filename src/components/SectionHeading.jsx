export default function SectionHeading({ id, title, sub, align = "left" }) {
  return (
    <header className={`section-head section-head--${align}`}>
      <h2 id={id}>{title}</h2>
      {sub && <p>{sub}</p>}
    </header>
  )
}
