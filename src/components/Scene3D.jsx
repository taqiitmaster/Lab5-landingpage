import {Canvas,useFrame} from '@react-three/fiber'
import {useMemo,useRef} from 'react'
import * as THREE from 'three'
const mob=matchMedia('(max-width:860px)').matches
// Scroll-driven wireframe core + particles. Light on purpose: no shadows, no textures, dpr capped.
function Core(){
 const g=useRef(),k=useRef(),pts=useRef(),m=useRef(),p=useRef(0)
 const pos=useMemo(()=>new Float32Array((mob?500:1400)*3).map(()=>(Math.random()-.5)*16),[])
 const a=useMemo(()=>new THREE.Color(0x00e5ff),[]),b=useMemo(()=>new THREE.Color(0x7c3aed),[])
 useFrame(()=>{const mx=document.documentElement.scrollHeight-innerHeight,t=mx>0?scrollY/mx:0;p.current+=(t-p.current)*.07;const s=p.current
  g.current.position.set(mob?1.0*Math.cos(s*Math.PI*2):2.2*Math.cos(s*Math.PI*2),mob?2.1-s*3.2:-s*.8,Math.sin(s*Math.PI)*-1.5)
  g.current.scale.setScalar((mob?.5:1)*(1+.4*Math.sin(s*Math.PI)));g.current.rotation.set(s*6,s*9+performance.now()*2e-4,0)
  k.current.rotation.y+=.01;m.current.color.copy(a).lerp(b,Math.sin(s*Math.PI));m.current.opacity=(mob?.28:.35)+(mob?.15:.4)*Math.sin(s*Math.PI)
  pts.current.rotation.y=s*3;pts.current.position.y=s*2})
 return <>
  <mesh ref={g}><icosahedronGeometry args={[1.6,mob?1:2]}/><meshBasicMaterial ref={m} wireframe transparent color="#00e5ff"/>
   <mesh ref={k}><torusKnotGeometry args={[.6,.18,mob?60:100,8]}/><meshBasicMaterial wireframe transparent opacity={mob?.35:.6} color="#7c3aed"/></mesh></mesh>
  <points ref={pts}><bufferGeometry><bufferAttribute attach="attributes-position" array={pos} count={pos.length/3} itemSize={3}/></bufferGeometry><pointsMaterial size={.03} color="#9ff6ff" transparent opacity={.7}/></points></>
}
export default function Scene3D(){return <div id="c3d" aria-hidden="true"><Canvas dpr={[1,1.5]} gl={{antialias:!mob,alpha:true}} camera={{position:[0,0,6],fov:50}}><Core/></Canvas></div>}
