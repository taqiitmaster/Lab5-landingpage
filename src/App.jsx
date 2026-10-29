import {lazy,Suspense} from 'react'
import useSiteFx from './useSiteFx.js'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Contact from './components/Contact.jsx'
import {About,Services,Experience,Languages,Stats,Skills,Education} from './components/Sections.jsx'
const Scene3D=lazy(()=>import('./components/Scene3D.jsx'))
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches
const gl=(()=>{try{return!!document.createElement('canvas').getContext('webgl')}catch{return false}})()
export default function App(){useSiteFx()
 return <>
  <div id="bar"/><div id="cur"/><div id="cur2"/>
  <div id="load"><div className="mono">booting portfolio</div><div id="cnt">0</div><h2 className="grad">Muhammad Taqi Nayyer</h2></div>
  <div id="bg" aria-hidden="true"/>
  {!reduce&&gl&&<Suspense fallback={null}><Scene3D/></Suspense>}
  <Navbar/>
  <main><div id="home"><Hero/><About/><Services/><Experience/><Languages/><Stats/></div><Skills/><Education/><Contact/></main>
  <footer><a className="logo" href="#home">MTN<span className="grad">.</span></a><nav aria-label="Footer">{['Home','Skills','Education','Contact'].map(l=><a key={l} href={'#'+l.toLowerCase()}>{l}</a>)}</nav><span style={{color:'var(--mute)'}}>© 2026 Muhammad Taqi Nayyer</span><a className="btn mag" href="#home">Back to top 🚀</a></footer>
  <a id="wa" href="https://wa.me/923213372325" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">💬</a></>}
