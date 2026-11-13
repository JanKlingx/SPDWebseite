import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowDown, ArrowUp, ChevronDown } from 'lucide-react';
import topics from '../../../content/topics/topics.json';
import program from '../../../content/politics/program.json';
import { getNews, formatNewsDate } from '@/lib/news';
import '@/styles/politics.css';

export const metadata: Metadata = {
  title: 'Unsere Politik',
  description: 'Alle kommunalpolitischen Themen und belegten Positionen der SPD Büdingen auf einer Seite.',
};

export default function PoliticsPage() {
  const news = getNews();
  return <>
    <section className="politics-hero"><div className="container">
      <h1>Was Büdingen<br />bewegt.</h1>
      <p>Unsere Themen, Positionen und politischen Vorhaben für die Stadt.</p>
      <a className="text-link" href="#themen">Themen ansehen<ArrowDown size={20} aria-hidden="true" /></a>
    </div></section>

    <section className="section container" id="themen" aria-labelledby="topics-heading">
      <div className="section-head"><h2 id="topics-heading">Vor Ort gestalten</h2><p className="small muted">Grundlage: das veröffentlichte Programm 2026 bis 2031.<br />Ziele und belegte Umsetzung werden getrennt.</p></div>
      <div className="politics-reading-layout">
        <nav className="politics-topic-nav" aria-label="Politische Themen auf dieser Seite">
          {topics.map(topic => <a key={topic.id} href={`#${topic.id}`}>{topic.title}</a>)}
          <a className="politics-goals-link" href="#ziele">Übergreifende Ziele</a>
        </nav>
        <div className="politics-topic-sections">
          {topics.map(topic => {
            const relatedNews = news.filter(article => topic.relatedNewsIds.includes(article.id));
            return <section className="politics-topic" id={topic.id} key={topic.id} aria-labelledby={`${topic.id}-heading`}>
              <h3 id={`${topic.id}-heading`}>{topic.title}</h3>
              <p className="politics-topic-intro">{topic.intro}</p>
              <p className="politics-position">{topic.position}</p>
              <details className="politics-topic-details">
                <summary>Kontext, Quellen und Beiträge<ChevronDown size={20} aria-hidden="true" /></summary>
                <div className="politics-topic-detail-body">
                  <h4>Die kommunale Ebene</h4><p>{topic.localRelevance}</p>
                  <h4>Vorhaben und Umsetzung</h4><p>{topic.measuresNotice}</p>
                  <p className="small">Grundlage der Position: <a href={topic.sourceUrl}>{topic.sourceTitle}</a>. <a href={`#programm-${topic.programChapterId}`}>Zugehörige Ziele auf dieser Seite</a>.</p>
                  {relatedNews.length > 0 && <div className="politics-related-news"><h4>Beiträge zum Thema</h4><ul>{relatedNews.map(article => <li key={article.id}>
                    <p className="small muted"><time dateTime={article.date}>{formatNewsDate(article.date)}</time>{article.status === 'archive' ? ' (Archiv)' : ''}</p>
                    <Link href={`/aktuelles/${article.id}`}>{article.title}</Link><p>{article.summary}</p>
                  </li>)}</ul></div>}
                  <div className="politics-topic-links"><Link href="/wissen/ablaeufe">Zuständigkeiten verstehen</Link><Link href="/politik/antraege">Anträge und Beschlüsse</Link></div>
                </div>
              </details>
              <a className="politics-return" href="#themen">Zur Themenübersicht<ArrowUp size={16} aria-hidden="true" /></a>
            </section>;
          })}
        </div>
      </div>
    </section>

    <section className="politics-goals" id="ziele" aria-labelledby="goals-heading"><div className="section container">
      <div className="section-head"><h2 id="goals-heading">Ziele bis 2031</h2><p className="small muted">{program.subtitle}<br />Die vier Kapitel des veröffentlichten Programms.</p></div>
      <div className="politics-program-chapters">{program.chapters.map(chapter => <section className="politics-program-chapter" id={`programm-${chapter.id}`} key={chapter.id} aria-labelledby={`programm-${chapter.id}-heading`}>
        <h3 id={`programm-${chapter.id}-heading`}>{chapter.title}</h3><div><p>{chapter.summary}</p><nav className="politics-program-topic-links" aria-label={`Themen zu ${chapter.title}`}>{chapter.topicIds.map(id => <a key={id} href={`#${id}`}>{topics.find(topic => topic.id === id)?.title}</a>)}</nav></div>
      </section>)}</div>
      <details className="politics-source-note"><summary>Quelle und Einordnung<ChevronDown size={20} aria-hidden="true" /></summary><div><p>{program.notice}</p><p className="small"><a href={program.sourceUrl}>{program.sourceTitle}</a><br />Quelle eingesehen am 12. November 2026.</p></div></details>
    </div></section>

    <section className="surface" aria-labelledby="politics-transparency-heading"><div className="section container"><div className="section-head"><h2 id="politics-transparency-heading">Politik nachvollziehen</h2><p>Wer entscheidet, was beantragt wird und was daraus folgt.</p></div><div className="grid-two politics-transparency-links">
      <div><h3>Fraktion</h3><p>Parlamentarische Arbeit und überprüfbare Informationen zur Fraktion.</p><Link className="text-link" href="/politik/fraktion">Zur Fraktion</Link></div>
      <div><h3>Anträge &amp; Beschlüsse</h3><p>Von der politischen Initiative bis zur nachgewiesenen Umsetzung.</p><Link className="text-link" href="/politik/antraege">Vorgänge ansehen</Link></div>
    </div></div></section>
  </>;
}
