'use client';
import Link from 'next/link';
import Image from 'next/image';
import media from '../../../content/media.json';
import { usePathname } from 'next/navigation';
import { useState,useRef } from 'react';
import { Menu, X, Search } from 'lucide-react';
const links = [['Startseite','/'],['Aktuelles','/aktuelles'],['Unsere Politik','/politik'],['Unsere Menschen','/menschen'],['Jusos','/jusos'],['Politik verstehen','/wissen'],['SPD-Geschichte','/geschichte'],['Termine','/termine']];
export function Header() {
  const [open,setOpen]=useState(false); const menuRef=useRef<HTMLButtonElement>(null); const pathname=usePathname();
  const logo = media.logo as {src:string|null;alt:string;width:number;height:number};
  return <header><a href="#main" className="skip">Zum Inhalt</a><div className="container masthead"><Link className="brand" href="/" aria-label="SPD Büdingen, Startseite">{logo.src?.startsWith('/images/') ? <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} style={{width:'auto',height:'var(--space-2xl)',maxWidth:'100%',objectFit:'contain'}} priority /> : <span className="logo-slot" aria-label="Original-Logo folgt">Logo<br/>folgt</span>}<span>SPD Büdingen<small>Sozialdemokratie vor Ort</small></span></Link><div className="header-tools"><Link href="/suche" className="text-link"><Search size={20} aria-hidden="true"/>Suche</Link><Link href="/mitmachen" className="button">Mitmachen</Link><button ref={menuRef} className="menu-button" aria-expanded={open} aria-controls="main-navigation" onClick={()=>setOpen(!open)} aria-label={open?'Menü schließen':'Menü öffnen'}>{open?<X size={24}/>:<Menu size={24}/>}<span>Menü</span></button></div></div><nav id="main-navigation" className={`primary-nav ${open?'is-open':''}`} aria-label="Hauptnavigation" onKeyDown={e=>{if(e.key==='Escape'){setOpen(false);menuRef.current?.focus()}}}><div className="container nav-inner">{links.map(([label,href])=><Link key={href} href={href} onClick={()=>setOpen(false)} aria-current={(href==='/'?pathname==='/':pathname.startsWith(href))?'page':undefined}>{label}</Link>)}<Link href="/mitmachen" onClick={()=>setOpen(false)} className="mobile-join">Mitmachen</Link></div></nav></header>;
}
