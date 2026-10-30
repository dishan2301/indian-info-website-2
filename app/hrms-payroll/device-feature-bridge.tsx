'use client';
import { useEffect, useRef, useState } from 'react';
import { useSpring } from 'motion/react';
import { DeviceHero } from './device-hero';
import VerticalTabs from '@/components/ui/vertical-tabs';
import { hrmsFeatureTabs } from './feature-tabs-data';
import styles from './device-feature-bridge.module.css';

export function DeviceFeatureBridge() {
 const root=useRef<HTMLDivElement>(null);
 const [featureReady,setFeatureReady]=useState(false);
 const travel=useSpring(0,{stiffness:115,damping:27,mass:.48});
 useEffect(()=>{
  const el=root.current;if(!el)return;
  const hero=el.querySelector<HTMLElement>('[aria-labelledby="device-hero-title"]');
  const device=el.querySelector<HTMLElement>('[data-travel-device]');
  const target=el.querySelector<HTMLElement>('[data-laptop-screen]');
  if(!hero||!device||!target)return;
  let frame=0;
  let targetProgress=0;
  const apply=()=>{
   frame=0;
   const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
   const p=travel.get();
   const source=device.parentElement!.getBoundingClientRect(),destination=target.getBoundingClientRect();
   device.style.transform=reduced?'none':`translate(${(destination.left-source.left)*p}px,${(destination.top-source.top)*p}px) scale(${1+(destination.width/source.width-1)*p})`;
   device.style.opacity=String(reduced?1:1-Math.max(0,(p-.82)/.18));
   el.style.setProperty('--arrival',String(reduced?1:Math.max(0,Math.min(1,(p-.72)/.28))));
   const ready=reduced||(targetProgress>=.995&&p>=.99);
   el.dataset.featureReady=String(ready);
   setFeatureReady(previous=>previous===ready?previous:ready);
   el.style.setProperty('--section-blue',String(p));
   el.style.setProperty('--laptop-glow',String(Math.max(0,Math.min(1,(p-.7)/.3))));
  };
  const scheduleApply=()=>{if(!frame)frame=requestAnimationFrame(apply)};
  const measure=()=>{
   const h=hero.getBoundingClientRect();
   const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
   targetProgress=Math.max(0,Math.min(1,(window.innerHeight*.78-h.bottom)/(h.height*.72)));
   travel.set(reduced?1:targetProgress);
   scheduleApply();
  };
  const stopTravel=travel.on('change',scheduleApply);
  measure();window.addEventListener('scroll',measure,{passive:true});window.addEventListener('resize',measure);
  return()=>{window.removeEventListener('scroll',measure);window.removeEventListener('resize',measure);stopTravel();cancelAnimationFrame(frame);device.style.transform='';device.style.opacity=''};
 },[]);
 return <div ref={root} className={styles.bridge}><DeviceHero/><VerticalTabs services={hrmsFeatureTabs} enabled={featureReady}/></div>;
}
