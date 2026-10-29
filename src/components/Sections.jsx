import D from '../data.js'
const Head=({k,children})=><div className="head rv"><span className="mono">{k}</span><h2>{children}</h2></div>
export const About=()=><section id="about"><Head k="About">Started in SEO. <span className="grad">Now building companies.</span></Head>
 <div className="two"><div className="glass rv"><p>I’m a 22-year-old developer from Pakistan. I began with SEO while still in O-Levels, moved into web and game development, and now run my own digital company, Inphint, while studying Computer Science at Qarshi University.</p><p style={{color:'var(--mute)'}}>I work with international clients and care about the details that make a site rank, load fast and convert.</p></div>
 <dl className="glass facts rv" style={{margin:0}}>{[['Name','Muhammad Taqi Nayyer'],['Age','22'],['Email','m.taqi542@gmail.com'],['Phone','0321 3372325'],['Location','Lahore, Pakistan'],['Status','Open to jobs & freelance']].map(([a,b])=><div key={a}><dt>{a}</dt><dd>{b}</dd></div>)}</dl></div></section>
export const Services=()=><section id="services"><Head k="Services">What <span className="grad">Inphint</span> does</Head>
 <div className="glass inp rv tilt"><div><span className="mono">Founder · 2025</span><h3 style={{fontSize:'1.8rem',margin:'6px 0'}}>Inphint (inphint.com)</h3><p style={{margin:0,color:'var(--mute)'}}>A digital agency for web, AI automation, SEO and brand.</p></div><a className="btn fill mag" href="https://inphint.com" target="_blank" rel="noopener">Visit Inphint</a></div>
 <div className="grid">{D.svc.map(s=><div key={s[1]} className="glass rv tilt"><div className="big">{s[0]}</div><h3>{s[1]}</h3><p>{s[2]}</p></div>)}</div></section>
export const Experience=()=><section id="experience"><Head k="Experience">Where I’ve <span className="grad">worked</span></Head>
 <div className="tl alt">{D.exp.map(e=><article key={e[0]} className="glass it rv"><h3>{e[0]}</h3><span className="mono">{e[1]} · {e[2]}</span><ul>{e[3].map(b=><li key={b}>{b}</li>)}</ul></article>)}</div></section>
export const Languages=()=><section id="languages"><Head k="Languages">Code I <span className="grad">write</span></Head>
 <div className="grid">{D.lang.map(l=><div key={l[0]} className="glass lang rv tilt"><div className="pr"><svg viewBox="0 0 104 104" width="104" height="104"><circle className="t" cx="52" cy="52" r="46"/><circle className="v" cx="52" cy="52" r="46" data-p={l[1]}/></svg><b>{l[1]}%</b></div><h3>{l[0]}</h3></div>)}</div></section>
export const Stats=()=><section id="stats"><div className="grid">{D.stat.map(s=><div key={s[2]} className="glass stat rv"><b>{s[0]?<><em data-n={s[0]} style={{fontStyle:'normal'}}>0</em>{s[1]}</>:s[1]}</b><span>{s[2]}</span></div>)}</div></section>
export const Skills=()=><section id="skills"><Head k="01 / Skills">Tools of the <span className="grad">trade</span></Head>
 <div className="grid sk">{D.sk.map(g=><div key={g[0]} className="glass tilt"><h3 className="grad">{g[0]}</h3>{g[1].map(s=><div key={s[0]} className="bar">{s[0]}<i style={{'--w':s[1]+'%'}}/></div>)}</div>)}</div>
 <div className="glass rv" style={{marginTop:20}}><h3 style={{marginBottom:16}}>Also proficient in</h3><div className="chips">{D.also.map(a=><span key={a}>{a}</span>)}</div></div></section>
export const Education=()=><section id="education"><Head k="02 / Education">Learning <span className="grad">path</span></Head>
 <div className="tl">{D.edu.map(e=><article key={e[0]} className="glass it rv"><h3>{e[0]}</h3><span className="mono">{e[1]} · {e[2]}</span></article>)}</div></section>
