import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getNews, getArticle, formatNewsDate } from '@/lib/news';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import '@/styles/editorial.css';

export function generateStaticParams() { return getNews().map(article => ({ slug: article.id })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const article = getArticle((await params).slug); return { title: article?.title || 'Beitrag nicht gefunden', description: article?.summary }; }

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const related = getNews().filter(item => item.id !== article.id).sort((a, b) => Number(b.tags.some(tag => article.tags.includes(tag))) - Number(a.tags.some(tag => article.tags.includes(tag)))).slice(0, 2);
  return <article>
    <header className="container editorial-article-head"><nav aria-label="Brotkrumennavigation" className="editorial-breadcrumb"><Link href="/">Startseite</Link><span aria-hidden="true">/</span><Link href="/aktuelles">Aktuelles</Link></nav><h1 className="editorial-article-title">{article.title}</h1><p className="editorial-deck">{article.summary}</p><div className="editorial-meta"><time dateTime={article.date}>{formatNewsDate(article.date)}</time><span>{article.category}</span>{article.status === 'archive' && <span className="editorial-archive">Archivbeitrag</span>}</div></header>
    <div className="container">{article.image ? <Image className="editorial-article-image" src={article.image} alt={article.imageAlt || article.title} width={1380} height={700} sizes="100vw" priority /> : <ImagePlaceholder title="Ein Bild zum Beitrag" description="Freigegebenes Originalfoto ergänzen" className="editorial-article-image" />}</div>
    <div className="container editorial-article-layout"><aside className="editorial-source-note"><h2>Quelle &amp; Einordnung</h2><p className="small">Eigenständige Zusammenfassung einer Veröffentlichung der SPD Büdingen. Politische Wertungen sind als Position der Partei zu lesen.</p><a href={article.sourceUrl} className="text-link">Originalbeitrag öffnen</a><p className="small muted">{article.sourceTitle}<br />Eingesehen am 12. November 2026</p></aside><div className="editorial-prose" dangerouslySetInnerHTML={{ __html: article.html }} /></div>
    <section className="container section" aria-labelledby="related-heading"><div className="section-head"><h2 id="related-heading">Weiterlesen</h2><Link className="text-link" href="/aktuelles">Alle Nachrichten</Link></div><div className="grid-two">{related.map(item => <article className="editorial-related" key={item.id}><p className="small muted"><time dateTime={item.date}>{formatNewsDate(item.date)}</time>{item.status === 'archive' ? ' (Archiv)' : ''}</p><h3><Link href={`/aktuelles/${item.id}`}>{item.title}</Link></h3><p>{item.summary}</p></article>)}</div></section>
  </article>;
}
