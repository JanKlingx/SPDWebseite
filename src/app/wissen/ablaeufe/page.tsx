import type { Metadata } from 'next';
import Link from 'next/link';
import { GuideExplorer } from '@/components/education/GuideExplorer';
import '@/styles/education.css';
import '@/styles/guides.css';
export const metadata:Metadata={title:'Wie funktioniert Politik?'};
export default function GuidesPage(){return <><section className="education-hero education-hero-compact guide-page-hero"><div className="container"><nav className="education-breadcrumb" aria-label="Brotkrumen"><Link href="/">Startseite</Link><Link href="/wissen">Politik verstehen</Link><span>Abläufe</span></nav><h1>Wie wird aus<br/>einer Idee Politik?</h1><p>Entdecke Entscheidungen, Zuständigkeiten und deine Möglichkeiten zur Beteiligung.</p></div></section><section className="section container education-workspace"><GuideExplorer/></section></>}
