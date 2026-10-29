import {useState} from 'react'
const L=['Home','Skills','Education','Contact']
export default function Navbar(){const [o,setO]=useState(false)
 return <><nav id="nav" aria-label="Main"><a className="logo" href="#home">MTN<span className="grad">.</span></a>
  <div className="links">{L.map(l=><a key={l} href={'#'+l.toLowerCase()}>{l}</a>)}</div>
  <a className="btn fill mag" href="#contact">Hire me</a>
  <button id="burger" aria-label="Menu" aria-expanded={o} style={{position:'relative',zIndex:60}} onClick={()=>setO(!o)}>{o?'✕':'☰'}</button></nav>
  <div id="menu" className={o?'open':''} aria-hidden={!o}>{L.map(l=><a key={l} href={'#'+l.toLowerCase()} onClick={()=>setO(false)}>{l}</a>)}</div></>}
