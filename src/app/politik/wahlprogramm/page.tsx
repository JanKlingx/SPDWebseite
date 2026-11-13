import type { Metadata } from 'next';
import Link from 'next/link';
import program from '../../../../content/politics/program.json';
import topics from '../../../../content/topics/topics.json';
import '@/styles/editorial.css';
export const metadata: Metadata = { title: 'Wahlprogramm 2026 bis 2031', description: 'Die belegten Ziele der SPD Büdingen für 2026 bis 2031 als thematisch gegliederte Webübersicht.' };
export default function ProgramPage() {
  return <>
    <section className="editorial-hero"><div className="container"><h1>Stark für<br />Büdingen.</h1><p>Die Ziele der SPD Büdingen für die Wahlperiode 2026 bis 2031.</p><a className="text-link" href={program.sourceUrl}>Vollständiges Programm öffnen</a></div></section>
    <section className="container section"><div className="section-head"><h2>{program.title}</h2><p className="small muted">Lesefassung als eigenständige Zusammenfassung.<br />Quelle eingesehen am 12. November 2026.</p></div><nav className="editorial-program-nav" aria-label="Programmkapitel">{program.chapters.map((chapter, index) => <a href={`#${chapter.id}`} key={chapter.id}><span>{String(index + 1).padStart(2, '0')}</span>{chapter.title}</a>)}</nav><div className="editorial-program-chapters">{program.chapters.map((chapter, index) => <section className="editorial-program-chapter" id={chapter.id} key={chapter.id} aria-labelledby={`${chapter.id}-heading`}><span className="editorial-program-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><div><h2 id={`${chapter.id}-heading`}>{chapter.title}</h2><p>{chapter.summary}</p><div className="editorial-inline-links">{chapter.topicIds.map(id => <Link key={id} href={`/politik/themen/${id}`}>{topics.find(topic => topic.id === id)?.title}</Link>)}</div></div></section>)}</div><div className="editorial-program-note"><h2>Quelle und Material</h2><p>{program.notice}</p><a className="text-link" href={program.sourceUrl}>{program.sourceTitle}</a></div></section>
  </>;
}
