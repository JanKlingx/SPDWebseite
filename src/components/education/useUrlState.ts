'use client';
import { useSyncExternalStore } from 'react';
const subscribe=(callback:()=>void)=>{window.addEventListener('popstate',callback);window.addEventListener('education-url',callback);return()=>{window.removeEventListener('popstate',callback);window.removeEventListener('education-url',callback)}};
export function useUrlState(){
  const search=useSyncExternalStore(subscribe,()=>window.location.search,()=> '');
  const params=new URLSearchParams(search);
  function update(values:Record<string,string>,push=false){const url=new URL(window.location.href);for(const [key,value] of Object.entries(values)){if(value)url.searchParams.set(key,value);else url.searchParams.delete(key)}window.history[push?'pushState':'replaceState']({},'',url);window.dispatchEvent(new Event('education-url'))}
  return {params,update};
}
