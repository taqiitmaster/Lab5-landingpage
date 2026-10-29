import {useEffect,useState} from 'react'
import D from '../data.js'
export default function Hero(){const [t,setT]=useState('')
 useEffect(()=>{let i=0,c=0,del=false,id;const f=()=>{const w=D.roles[i];setT(w.slice(0,c));if(!del&&c===w.length){del=true;id=setTimeout(f,1400);return}if(del&&c===0){del=false;i=(i+1)%D.roles.length}c+=del?-1:1;id=setTimeout(f,del?35:70)};f();return()=>clearTimeout(id)},[])
 return <><section className="hero" style={{maxWidth:1280,margin:'auto'}}><div>
  <span className="tag mono"><i className="dot"/>Available for work · Open to opportunities</span>
  <h1>Hi, I’m <span className="grad">Muhammad Taqi Nayyer</span></h1>
  <div className="sub">{t}<i/></div>
  <p className="pitch">I build fast, beautiful, search-optimized web experiences and automate businesses with AI.</p>
  <div className="row"><a className="btn fill mag" href="#skills">View my skills</a><a className="btn mag" href="#contact">Contact me</a></div>
  <div className="row" style={{margin:0}}><a className="ico" href="mailto:m.taqi542@gmail.com" aria-label="Email">✉</a><a className="ico" href="tel:+923213372325" aria-label="Phone">☎</a><a className="ico" href="https://wa.me/923213372325" aria-label="WhatsApp" target="_blank" rel="noopener">💬</a></div></div>
  <div className="frame" id="frame"><div className="ring"/><div className="ph"><img src="/taqi.jpg" alt="Portrait of Muhammad Taqi Nayyer" width="560" height="596" fetchpriority="high"/></div>
   {[['React',{top:'8%',left:'-6%'}],['SEO',{top:'30%',right:'-8%'}],['AI',{bottom:'22%',left:'-9%'}],['Unity',{bottom:'6%',right:'-2%'}]].map(([n,s],i)=><span key={n} className="badge" style={{...s,animationDelay:-i+'s'}}>{n}</span>)}</div>
  <div className="scroll" aria-hidden="true"/></section>
  <div className="mq" aria-hidden="true"><div>{[...D.tech,...D.tech,...D.tech,...D.tech].map((x,i)=><span key={i}>{x}</span>)}</div></div></>}
