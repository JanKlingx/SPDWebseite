'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
export function useDirectoryQuery() {
  const params=useSearchParams(); const path=usePathname(); const router=useRouter();
  function setQuery(values: Record<string,string>) {
    const next=new URLSearchParams(params.toString());
    Object.entries(values).forEach(([key,value])=>{if(value)next.set(key,value);else next.delete(key)});
    router.replace(`${path}${next.size?`?${next}`:''}`,{scroll:false});
  }
  return {params,setQuery};
}
