import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import topics from '../../../../../content/topics/topics.json';
import { getNews, formatNewsDate } from '@/lib/news';
import '@/styles/editorial.css';
export function generateStaticParams() { return topics.map(topic => ({ slug: topic.id })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const slug = (await params).slug; const topic = topics.find(item => item.id === slug); return { title: topic?.title || 'Thema nicht gefunden', description: topic?.intro }; }
export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const topic = topics.find(item => item.id === slug);
  if (!topic) notFound();
  const news = getNews().filter(article => topic.relatedNewsIds.includes(article.id));
  return <>
    <section className="editorial-hero"><div className="container"><nav className="editorial-breadcrumb" aria-label="Brotkrumennavigation"><Link href="/politik">Unsere Politik</Link><span aria-hidden="true">/</span><span>Themen</span></nav><h1>{topic.title}</h1><p>{topic.intro}</p><Link className="text-link" href={`/politik/wahlprogramm#${topic.programChapterId}`}>Im Wahlprogramm lesen</Link></div></section>
    <section className="section container editorial-topic-body"><div className="grid-two"><div><h2>Die kommunale Ebene</h2><p>{topic.localRelevance}</p><Link className="text-link" href="/wissen/ablaeufe">Zuständigkeiten verstehen</Link></div><div><h2>Unsere Position</h2><p className="editorial-position">{topic.position}</p><a className="text-link" href={topic.sourceUrl}>Veröffentlichtes Programm</a></div></div><div className="editorial-transparency"><h2>Vorhaben und Umsetzung</h2><p>{topic.measuresNotice}</p><Link className="text-link" href="/politik/antraege">Anträge und Beschlüsse</Link></div></section>
    <section className="section container editorial-top-rule"><div className="section-head"><h2>Zum Thema weiterlesen</h2><Link className="text-link" href="/politik">Alle Themen</Link></div>{news.length ? <div className="grid-two">{news.map(article => <article className="editorial-related" key={article.id}><p className="small muted"><time dateTime={article.date}>{formatNewsDate(article.date)}</time>{article.status === 'archive' ? ' (Archiv)' : ''}</p><h3><Link href={`/aktuelles/${article.id}`}>{article.title}</Link></h3><p>{article.summary}</p></article>)}</div> : <p>Zu diesem Thema sind noch keine weiteren belegten Nachrichten hinterlegt.</p>}</section>
  </>;
}
