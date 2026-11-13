import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { getNews, formatNewsDate } from '@/lib/news';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import '@/styles/editorial.css';

export const metadata: Metadata = { title: 'Aktuelles', description: 'Nachrichten, politische Positionen und Archivbeiträge der SPD Büdingen mit transparenten Quellen.' };
type Query = { q?: string | string[]; category?: string | string[]; tag?: string | string[] };

export default async function NewsPage({ searchParams }: { searchParams: Promise<Query> }) {
  const query = await searchParams;
  const news = getNews();
  const q = typeof query.q === 'string' ? query.q.slice(0, 160) : '';
  const category = typeof query.category === 'string' ? query.category : '';
  const tag = typeof query.tag === 'string' ? query.tag : '';
  const categories = [...new Set(news.map(article => article.category))];
  const tags = [...new Set(news.flatMap(article => article.tags))].sort();
  const normalize = (text: string) => text.toLocaleLowerCase('de-DE');
  const filtered = news.filter(article => (!q || normalize(`${article.title} ${article.summary} ${article.body}`).includes(normalize(q))) && (!category || article.category === category) && (!tag || article.tags.includes(tag)));
  return <>
    <section className="editorial-hero"><div className="container"><h1>Aus Büdingen.<br />Für Büdingen.</h1><p>Nachrichten, Positionen und Einblicke in die Arbeit vor Ort.</p><a className="text-link" href="#nachrichten">Nachrichten durchsuchen</a></div></section>
    <section className="section container" id="nachrichten" aria-labelledby="news-heading">
      <div className="section-head"><h2 id="news-heading">Aktuelles lesen</h2><p className="small muted">Quellen geprüft am 12. November 2026.<br />Ältere Beiträge bleiben als Archiv erkennbar.</p></div>
      <form className="editorial-filters" action="/aktuelles" method="get" role="search" aria-label="Nachrichten filtern">
        <div className="editorial-field editorial-search"><label htmlFor="news-q">Nachrichten durchsuchen</label><input id="news-q" name="q" type="search" defaultValue={q} maxLength={160} autoComplete="off" placeholder="Zum Beispiel Wohnen" /></div>
        <div className="editorial-field"><label htmlFor="news-category">Kategorie</label><select id="news-category" name="category" defaultValue={category}><option value="">Alle Kategorien</option>{categories.map(value => <option key={value}>{value}</option>)}</select></div>
        <div className="editorial-field"><label htmlFor="news-tag">Thema</label><select id="news-tag" name="tag" defaultValue={tag}><option value="">Alle Themen</option>{tags.map(value => <option key={value}>{value}</option>)}</select></div>
        <button className="button" type="submit">Filtern</button>
      </form>
      <div className="editorial-results"><p role="status" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'Beitrag' : 'Beiträge'}</p>{(q || category || tag) && <Link className="text-link" href="/aktuelles#nachrichten">Filter zurücksetzen</Link>}</div>
      {filtered.length ? <div className="grid-two editorial-news-grid">{filtered.map(article => <article key={article.id} className="editorial-news-item">
        <Link className="editorial-image-link" href={`/aktuelles/${article.id}`} tabIndex={-1} aria-hidden="true">{article.image ? <Image src={article.image} alt={article.imageAlt || ''} width={800} height={500} sizes="(max-width: 600px) 100vw, 50vw" /> : <ImagePlaceholder title={article.category} description="Freigegebenes Beitragsfoto ergänzen" className="editorial-news-image" />}</Link>
        <div className="editorial-meta"><time dateTime={article.date}>{formatNewsDate(article.date)}</time><span>{article.category}</span>{article.status === 'archive' && <span className="editorial-archive">Archiv</span>}</div>
        <h3><Link href={`/aktuelles/${article.id}`}>{article.title}</Link></h3><p>{article.summary}</p><Link className="text-link" href={`/aktuelles/${article.id}`}>Beitrag lesen<ArrowUpRight size={20} aria-hidden="true" /></Link>
      </article>)}</div> : <div className="editorial-empty"><h3>Kein passender Beitrag</h3><p>Mit einem anderen Suchwort oder weniger Filtern findest du weitere Nachrichten.</p><Link className="text-link" href="/aktuelles#nachrichten">Alle Beiträge anzeigen</Link></div>}
    </section>
  </>;
}
