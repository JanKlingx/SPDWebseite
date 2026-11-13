import type { Metadata } from 'next';
import Link from 'next/link';
import { GlossaryExplorer } from '@/components/education/GlossaryExplorer';
import '@/styles/education.css';
export const metadata:Metadata={title:'Politik-Lexikon von A bis Z'};
export default function GlossaryPage(){return <><section className="education-hero education-hero-compact"><div className="container"><nav className="education-breadcrumb" aria-label="Brotkrumen"><Link href="/">Startseite</Link><Link href="/wissen">Politik verstehen</Link><span>Lexikon</span></nav><h1>Politik.<br/>Von A bis Z.</h1><p>Klare Erklärungen für die Begriffe hinter den Entscheidungen.</p></div></section><section className="section container education-workspace"><GlossaryExplorer/></section></>}
