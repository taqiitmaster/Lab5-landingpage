import {useState} from 'react'
// Put your Formspree endpoint here (https://formspree.io/f/YOUR_ID). Empty = mailto fallback.
const FORM_ENDPOINT=''
export default function Contact(){const [er,setEr]=useState({}),[msg,setMsg]=useState('')
 const go=async e=>{e.preventDefault();const f=e.target,d=Object.fromEntries(new FormData(f)),x={}
  if(!d.name.trim())x.name='Required';if(!/^\S+@\S+\.\S+$/.test(d.email))x.email='Enter a valid email';if(!d.message.trim())x.message='Required'
  setEr(x);if(Object.keys(x).length)return
  try{if(!FORM_ENDPOINT)throw 0;const r=await fetch(FORM_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(d)});if(!r.ok)throw 0;setMsg('Sent. I’ll reply soon.');f.reset()}
  catch{location.href=`mailto:m.taqi542@gmail.com?subject=${encodeURIComponent('Portfolio message from '+d.name)}&body=${encodeURIComponent(d.message+'\n\n'+d.email)}`;setMsg('Opening your email app as a fallback.')}}
 const F=({n,l,t='text',ta})=><div className="fld">{ta?<textarea id={n} name={n} rows="5" placeholder=" "/>:<input id={n} name={n} type={t} placeholder=" "/>}<label htmlFor={n}>{l}</label><span className="err">{er[n]}</span></div>
 const C=({i,l,v,h})=><a className="glass cc rv" href={h} target={h?.startsWith('http')?'_blank':undefined} rel="noopener"><b className="big">{i}</b><div><span>{l}</span>{v}</div></a>
 return <section id="contact"><div className="head rv"><span className="mono">03 / Contact</span></div>
  <h2 className="cta rv">Let’s build something <span className="grad">extraordinary.</span></h2>
  <div className="two"><div><C i="✉" l="Email" v="m.taqi542@gmail.com" h="mailto:m.taqi542@gmail.com"/><C i="☎" l="Phone" v="0321 3372325" h="tel:+923213372325"/><C i="💬" l="WhatsApp" v="Chat now" h="https://wa.me/923213372325"/><C i="⌖" l="Location" v="Lahore, Pakistan"/></div>
  <form className="glass cform rv" onSubmit={go} noValidate><F n="name" l="Name"/><F n="email" l="Email" t="email"/><F n="message" l="Message" ta/><button className="btn fill mag" type="submit">Send message</button><p role="status" style={{margin:0,color:'var(--cyan,#00e5ff)'}}>{msg}</p></form></div></section>}
