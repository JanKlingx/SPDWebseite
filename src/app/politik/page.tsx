import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import topics from '../../../content/topics/topics.json';
import '@/styles/editorial.css';
export const metadata: Metadata = { title: 'Unsere Politik', description: 'Die kommunalpolitischen Themen und belegten Positionen der SPD Büdingen im Überblick.' };
export default function PoliticsPage() {
  return <>
    <section className="editorial-hero"><div className="container"><h1>Was Büdingen<br />bewegt.</h1><p>Unsere Themen, Positionen und politischen Vorhaben für die Stadt.</p><Link className="text-link" href="/politik/wahlprogramm">Wahlprogramm lesen</Link></div></section>
    <section className="section container" aria-labelledby="topics-heading"><div className="section-head"><h2 id="topics-heading">Vor Ort gestalten</h2><p className="small muted">Grundlage: das veröffentlichte Programm 2026 bis 2031.<br />Ziele und belegte Umsetzung werden getrennt.</p></div><div className="editorial-topics">{topics.map((topic, index) => <Link href={`/politik/themen/${topic.id}`} key={topic.id} className="editorial-topic"><span className="editorial-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><div><h3>{topic.title}</h3><p>{topic.intro}</p></div><ArrowUpRight size={28} aria-hidden="true" /></Link>)}</div></section>
    <section className="surface"><div className="container section"><div className="section-head"><h2>Politik nachvollziehen</h2><p>Wer entscheidet, was beantragt wird und was daraus folgt.</p></div><div className="grid-three"><div><h3>Wahlprogramm</h3><p>Die politischen Ziele für 2026 bis 2031, nach Themen gegliedert.</p><Link className="text-link" href="/politik/wahlprogramm">Programm entdecken</Link></div><div><h3>Fraktion</h3><p>Parlamentarische Arbeit und überprüfbare Informationen zur Fraktion.</p><Link className="text-link" href="/politik/fraktion">Zur Fraktion</Link></div><div><h3>Anträge &amp; Beschlüsse</h3><p>Von der politischen Initiative bis zur nachgewiesenen Umsetzung.</p><Link className="text-link" href="/politik/antraege">Vorgänge ansehen</Link></div></div></div></section>
  </>;
}
