import {useEffect} from 'react'
// Loader, scroll progress, reveal-on-scroll, counters, rings, tilt, magnetic buttons, custom cursor
export default function useSiteFx(){useEffect(()=>{
 const $=s=>document.querySelector(s),reduce=matchMedia('(prefers-reduced-motion:reduce)').matches,off=[]
 let n=0;const cnt=$('#cnt'),iv=setInterval(()=>{n=Math.min(100,n+Math.ceil(Math.random()*9));cnt.textContent=n;if(n>=100){clearInterval(iv);setTimeout(()=>$('#load').classList.add('done'),200)}},reduce?1:28)
 const sc=()=>{const m=document.documentElement.scrollHeight-innerHeight;$('#bar').style.width=scrollY/m*100+'%';$('#nav').classList.toggle('sm',scrollY>40)};addEventListener('scroll',sc,{passive:true})
 const nv=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&document.querySelectorAll('.links a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id))),{rootMargin:'-45% 0px -50% 0px'})
 ;['home','skills','education','contact'].forEach(i=>nv.observe(document.getElementById(i)))
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const t=e.target;t.classList.add('in');io.unobserve(t)
  t.querySelectorAll('[data-n]').forEach(c=>{const to=+c.dataset.n,s=performance.now();(function f(now){const p=Math.min((now-s)/1400,1);c.textContent=Math.round(to*(1-Math.pow(1-p,3)));p<1&&requestAnimationFrame(f)})(s)})
  t.querySelectorAll('.v').forEach(v=>v.style.strokeDashoffset=289*(1-v.dataset.p/100))}),{threshold:.15})
 document.querySelectorAll('.rv,.sk .glass').forEach((el,i)=>{el.style.transitionDelay=(i%4)*90+'ms';io.observe(el)})
 document.querySelectorAll('.tilt').forEach(el=>{el.onpointermove=e=>{if(e.pointerType!=='mouse')return;const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(800px) rotateY(${x*10}deg) rotateX(${-y*10}deg)`};el.onpointerleave=()=>el.style.transform=''})
 document.querySelectorAll('.mag').forEach(b=>{b.onpointermove=e=>{if(e.pointerType!=='mouse')return;const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.25}px,${(e.clientY-r.top-r.height/2)*.35}px)`};b.onpointerleave=()=>b.style.transform=''})
 const c1=$('#cur'),c2=$('#cur2'),fr=$('#frame');let mx=0,my=0,rx=0,ry=0,raf
 const pm=e=>{mx=e.clientX;my=e.clientY;c1.style.transform=`translate(${mx}px,${my}px)`;if(!reduce&&e.pointerType==='mouse')fr.style.transform=`translate(${(mx/innerWidth-.5)*14}px,${(my/innerHeight-.5)*14}px) rotateY(${(mx/innerWidth-.5)*8}deg)`};addEventListener('pointermove',pm)
 ;(function l(){rx+=(mx-rx)*.15;ry+=(my-ry)*.15;c2.style.transform=`translate(${rx}px,${ry}px)`;raf=requestAnimationFrame(l)})()
 document.querySelectorAll('a,button,.tilt').forEach(el=>{el.addEventListener('pointerenter',()=>c2.classList.add('h'));el.addEventListener('pointerleave',()=>c2.classList.remove('h'))})
 return()=>{clearInterval(iv);removeEventListener('scroll',sc);removeEventListener('pointermove',pm);cancelAnimationFrame(raf);io.disconnect();nv.disconnect()}
},[])}
