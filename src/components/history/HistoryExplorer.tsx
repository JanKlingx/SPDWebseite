'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useId, useMemo, useState, useSyncExternalStore } from 'react';
import { ArrowDown, ArrowUp, BookOpen, ChevronLeft, ChevronRight, Link2, List, Minus, Plus, Search, X } from 'lucide-react';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import eventData from '../../../content/history/events.json';
import peopleData from '../../../content/history/people.json';
import chairpersons from '../../../content/history/chairpersons.json';
import artifactData from '../../../content/history/artifacts.json';

export type HistorySource = { title: string; url?: string; note?: string };
export type HistoryEvent = { id: string; year: number; dateLabel: string; title: string; summary: string; body: string[]; category: string; level: 'buedingen' | 'germany'; era: string; sources: HistorySource[]; status: string; relatedIds?: string[] };
const events = eventData as HistoryEvent[];
type HistoryArtifact = { id: string; title: string; dateLabel: string; description: string; source: string; copyright: string; eventId: string; status: string; image: string | null; alt?: string };
const artifacts = artifactData as HistoryArtifact[];
const statusLabels: Record<string, string> = { chronicle: 'Aus der Chronik', verified: 'Mit Quelle eingeordnet', pending: 'Redaktionell zu ergänzen' };
const levels = [{ id: 'buedingen', title: 'Büdingen', href: '/geschichte/buedingen' }, { id: 'germany', title: 'Deutschland', href: '/geschichte/deutschland' }, { id: 'all', title: 'Zusammen', href: '/geschichte?level=all' }] as const;
function subscribe(callback: () => void) { window.addEventListener('popstate', callback); return () => window.removeEventListener('popstate', callback); }
function getSnapshot() { return window.location.search; }
function serverSnapshot() { return ''; }
function SourceList({ sources }: { sources: HistorySource[] }) { return <ul className="history-sources">{sources.map((source, index) => <li key={`${source.title}-${index}`}>{source.url ? <a href={source.url}>{source.title}</a> : <span>{source.title}</span>}{source.note && <small>{source.note}</small>}</li>)}</ul>; }

export function HistoryExplorer({ initialLevel = 'buedingen' }: { initialLevel?: 'buedingen' | 'germany' }) {
  const search = useSyncExternalStore(subscribe, getSnapshot, serverSnapshot);
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const level = ['buedingen', 'germany', 'all'].includes(params.get('level') || '') ? params.get('level')! : initialLevel;
  const era = params.get('era') || '';
  const category = params.get('category') || '';
  const query = params.get('q') || '';
  const from = params.get('from') || '';
  const to = params.get('to') || '';
  const view = params.get('view') === 'list' ? 'list' : 'timeline';
  const zoom = Math.min(3, Math.max(1, Number(params.get('zoom')) || 2));
  const selected = params.get('event') || '';
  const [jumpYear, setJumpYear] = useState('1893');
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const filtersId = useId();
  const localEvents = events.filter(event => level === 'all' || event.level === level);
  const eras = [...new Set(localEvents.map(event => event.era))];
  const categories = [...new Set(localEvents.map(event => event.category))].sort((a, b) => a.localeCompare(b, 'de'));
  const shown = localEvents.filter(event => (!era || event.era === era) && (!category || event.category === category) && (!from || event.year >= Number(from)) && (!to || event.year <= Number(to)) && (!query || `${event.title} ${event.summary} ${event.body.join(' ')} ${event.year} ${event.category}`.toLocaleLowerCase('de').includes(query.toLocaleLowerCase('de'))));
  const chronology = shown.filter(event => event.status !== 'pending');
  const openPeriods = shown.filter(event => event.status === 'pending');
  const shownPeople = peopleData.filter(person => level === 'all' || person.level === level);
  const gallery = artifacts[galleryIndex];
  function update(patch: Record<string, string | null>) {
    const next = new URLSearchParams(window.location.search);
    Object.entries(patch).forEach(([key, value]) => { if (value) next.set(key, value); else next.delete(key); });
    const nextQuery = next.toString();
    window.history.replaceState(null, '', `${window.location.pathname}${nextQuery ? `?${nextQuery}` : ''}${window.location.hash}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
  function chooseEvent(id: string) {
    update({ event: id });
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: 'center', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }));
  }
  function resetFilters() { update({ era: null, category: null, q: null, from: null, to: null, event: null }); }
  function jump() {
    const year = Number(jumpYear);
    if (!shown.length || !Number.isFinite(year)) return;
    const nearest = shown.reduce((best, event) => Math.abs(event.year - year) < Math.abs(best.year - year) ? event : best);
    chooseEvent(nearest.id);
  }
  return <>
    <div className="container history-breadcrumb"><Link href="/">Startseite</Link><span aria-hidden="true">/</span><span>SPD-Geschichte</span></div>
    <section className="container history-hero" aria-labelledby="history-heading">
      <div><h1 id="history-heading">Geschichte, die<br />weitergeht.</h1><p>Sozialdemokratie in Büdingen und Deutschland: Menschen, Mut und politische Veränderung.</p><a className="text-link" href="#zeitstrahl">Den Zeitstrahl entdecken <ArrowDown size={19} aria-hidden="true" /></a></div>
      <div className="history-year-object"><span aria-hidden="true">1893</span><p>Der erste überlieferte Nachweis<br />sozialdemokratischer Aktivitäten in Büdingen.</p></div>
    </section>
    <section className="history-exhibition" id="zeitstrahl" aria-labelledby="timeline-heading">
      <div className="container">
        <div className="history-exhibition-head"><div><h2 id="timeline-heading">Zwei Perspektiven.<br />Eine Bewegung.</h2><p className="muted">Wähle einen Blick auf die Geschichte.</p></div><BookOpen size={42} strokeWidth={1.25} aria-hidden="true" /></div>
        <nav className="history-levels" aria-label="Historische Perspektive">{levels.map(item => <a key={item.id} href={item.href} aria-current={level === item.id ? 'page' : undefined} onClick={event => { event.preventDefault(); update({ level: item.id, era: null, category: null, event: null }); }}>{item.title}<span>{item.id === 'buedingen' ? 'Seit 1893' : item.id === 'germany' ? 'Seit 1863' : 'Beide Ebenen'}</span></a>)}</nav>
        <form className="history-filter-form" onSubmit={event => event.preventDefault()} aria-label="Zeitstrahl filtern">
          <div className="history-search"><label htmlFor={`${filtersId}-search`}>Geschichte durchsuchen</label><div><Search size={20} aria-hidden="true" /><input id={`${filtersId}-search`} type="search" value={query} onChange={event => update({ q: event.target.value, event: null })} placeholder="Ereignis, Person oder Jahr" /></div></div>
          <div><label htmlFor={`${filtersId}-era`}>Zeitraum</label><select id={`${filtersId}-era`} value={era} onChange={event => update({ era: event.target.value, event: null })}><option value="">Alle Zeiträume</option>{eras.map(value => <option key={value}>{value}</option>)}</select></div>
          <div><label htmlFor={`${filtersId}-category`}>Thema</label><select id={`${filtersId}-category`} value={category} onChange={event => update({ category: event.target.value, event: null })}><option value="">Alle Themen</option>{categories.map(value => <option key={value}>{value}</option>)}</select></div>
          <details className="history-more-filters"><summary>Jahre eingrenzen</summary><div><label htmlFor={`${filtersId}-from`}>Ab Jahr</label><input id={`${filtersId}-from`} type="number" inputMode="numeric" min="1863" max="2026" value={from} onChange={event => update({ from: event.target.value, event: null })} placeholder="1863" /><label htmlFor={`${filtersId}-to`}>Bis Jahr</label><input id={`${filtersId}-to`} type="number" inputMode="numeric" min="1863" max="2026" value={to} onChange={event => update({ to: event.target.value, event: null })} placeholder="2026" /></div></details>
        </form>
        <div className="history-toolbar"><p aria-live="polite">{chronology.length} {chronology.length === 1 ? 'Ereignis' : 'Ereignisse'}, {openPeriods.length} {openPeriods.length === 1 ? 'offener Zeitraum' : 'offene Zeiträume'}{(query || era || category || from || to) && <button className="history-reset" onClick={resetFilters}>Filter zurücksetzen <X size={15} aria-hidden="true" /></button>}</p><div className="history-view-controls"><span>Ansicht</span><button aria-label="Zeitstrahl anzeigen" aria-pressed={view === 'timeline'} onClick={() => update({ view: 'timeline' })}><BookOpen size={18} aria-hidden="true" /></button><button aria-label="Liste anzeigen" aria-pressed={view === 'list'} onClick={() => update({ view: 'list' })}><List size={18} aria-hidden="true" /></button><span className="history-zoom-label">Detailgröße</span><button aria-label="Detailgröße verkleinern" disabled={zoom === 1} onClick={() => update({ zoom: String(zoom - 1) })}><Minus size={18} aria-hidden="true" /></button><output aria-label="Detailgröße">{zoom}</output><button aria-label="Detailgröße vergrößern" disabled={zoom === 3} onClick={() => update({ zoom: String(zoom + 1) })}><Plus size={18} aria-hidden="true" /></button></div></div>
        <div className="history-jump"><label htmlFor={`${filtersId}-jump`}>Zu einem Jahr springen</label><input id={`${filtersId}-jump`} inputMode="numeric" type="number" min="1863" max="2026" value={jumpYear} onChange={event => setJumpYear(event.target.value)} /><button className="text-link" onClick={jump} disabled={!shown.length}>Eintrag zeigen <ArrowDown size={16} aria-hidden="true" /></button></div>
        {from && to && Number(from) > Number(to) && <p className="history-validation" role="alert">Das Anfangsjahr muss vor dem Endjahr liegen.</p>}
        {chronology.length ? <ol className={`history-events history-events--${view} history-zoom-${zoom}`}>{chronology.map(event => <li key={event.id} id={event.id} className={`${selected === event.id ? 'is-selected' : ''} ${event.category === 'Verfolgung' ? 'history-respectful' : ''}`}><article><div className="history-event-year"><span>{event.year}</span><small>{event.level === 'buedingen' ? 'Büdingen' : 'Deutschland'}</small></div><div className="history-event-content"><p className="history-event-meta"><span>{event.dateLabel}</span><span>{event.category}</span></p><h3>{event.title}</h3><p>{event.summary}</p><details open={selected === event.id || undefined}><summary>Ereignis lesen</summary><div className="history-event-body">{event.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}<p className="history-source-status">{statusLabels[event.status]}</p><h4>Quellen und Einordnung</h4><SourceList sources={event.sources} />{event.relatedIds?.length ? <div className="history-related"><h4>Verwandte Ereignisse</h4>{event.relatedIds.map(id => { const related = events.find(item => item.id === id); return related ? <a href={`?level=all&event=${id}#${id}`} key={id} onClick={e => { e.preventDefault(); update({ level: 'all', event: id, era: null, category: null, q: null, from: null, to: null }); requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: 'center' })); }}>{related.dateLabel}: {related.title}</a> : null; })}</div> : null}</div></details><a className="history-permalink" href={`?level=${event.level}&event=${event.id}#${event.id}`} onClick={e => { e.preventDefault(); chooseEvent(event.id); }} aria-label={`Direktlink: ${event.title}`}><Link2 size={15} aria-hidden="true" />Direktlink</a></div></article></li>)}</ol> : !shown.length ? <div className="history-empty"><h3>Hier fehlt noch ein Treffer.</h3><p>Versuche einen anderen Suchbegriff oder einen größeren Zeitraum.</p><button className="button quiet" onClick={resetFilters}>Alle Einträge zeigen</button></div> : null}
        {openPeriods.length > 0 && <section className="history-open-periods" aria-labelledby="history-open-heading"><div><h3 id="history-open-heading">Offene Zeiträume</h3><p>Hier fehlen geprüfte Ereignisse. Die Recherchefelder bleiben einzeln aufrufbar.</p></div><div>{openPeriods.map(event => <details key={event.id} id={event.id} open={selected === event.id || undefined} className={selected === event.id ? 'is-selected' : undefined}><summary><strong>{event.dateLabel}</strong><span>{event.level === 'buedingen' ? 'Büdingen' : 'Deutschland'}</span></summary><div className="history-open-body"><p>{event.summary}</p>{event.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}<p className="history-source-status">{statusLabels[event.status]}</p><h4>Quellen und Einordnung</h4><SourceList sources={event.sources} /><a className="history-permalink" href={`?level=${event.level}&event=${event.id}#${event.id}`} onClick={e => { e.preventDefault(); chooseEvent(event.id); }} aria-label={`Direktlink: Offener Zeitraum ${event.dateLabel}`}><Link2 size={15} aria-hidden="true" />Direktlink</a></div></details>)}</div></section>}
        <aside className="history-source-note"><h3>Geschichte braucht Quellen.</h3><p>Die Büdinger Chronik ist eine historische Ausgangsdarstellung. Unklare Angaben und fehlende Materialien bleiben sichtbar. Sie werden nicht durch Vermutungen ergänzt.</p><details><summary>Was bedeuten die Quellenhinweise?</summary><p>„Aus der Chronik“ bezeichnet die bereitgestellte historische Darstellung. „Mit Quelle eingeordnet“ verweist auf ergänzende institutionelle Nachweise. „Redaktionell zu ergänzen“ markiert offene Forschung oder fehlendes Material.</p></details></aside>
      </div>
    </section>
    <section className="container section" aria-labelledby="history-people-heading"><div className="section-head"><h2 id="history-people-heading">Menschen hinter<br />der Geschichte.</h2><p>Überlieferte Namen, mit Sorgfalt eingeordnet.</p></div><div className="history-people">{shownPeople.map(person => <article key={person.id} id={person.id}><p className="history-person-period">{person.period}</p><h3>{person.name}</h3><p>{person.summary}</p><details><summary>Historisches Profil</summary><p>{person.role}</p>{person.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}<p className="history-source-status">{statusLabels[person.status]}</p><SourceList sources={person.sources} /><div className="history-related">{person.eventIds.map(id => <a key={id} href={`/geschichte?level=all&event=${id}#${id}`}>Zum Ereignis {events.find(event => event.id === id)?.dateLabel}</a>)}</div></details></article>)}</div></section>
    <section className="history-material-section section"><div className="container"><div className="section-head"><h2>Erinnerung<br />braucht Material.</h2><p>Ein offenes Archiv für Fotos und Dokumente.</p></div><div className="history-gallery">{gallery.image ? <figure className="history-gallery-image history-gallery-photo"><Image src={gallery.image} alt={gallery.alt || gallery.title} width={1200} height={900} sizes="(max-width: 650px) 100vw, 50vw" /><figcaption>{gallery.title}</figcaption></figure> : <ImagePlaceholder title="Das Archiv wächst mit euch." description={gallery.title} className="history-gallery-image" />}<div className="history-gallery-copy"><p className="history-person-period">{galleryIndex + 1} von {artifactData.length} Materialplätzen</p><h3>{gallery.title}</h3><p>{gallery.description}</p><p className="small muted">{gallery.dateLabel}</p><button className="text-link" aria-expanded={galleryOpen} onClick={() => setGalleryOpen(!galleryOpen)}>Materialangaben {galleryOpen ? <Minus size={17} aria-hidden="true" /> : <Plus size={17} aria-hidden="true" />}</button>{galleryOpen && <dl className="history-artifact-details"><dt>Quelle</dt><dd>{gallery.source}</dd><dt>Bildrechte</dt><dd>{gallery.copyright}</dd><dt>Verknüpftes Ereignis</dt><dd><a href={`/geschichte?level=buedingen&event=${gallery.eventId}#${gallery.eventId}`}>{events.find(event => event.id === gallery.eventId)?.title}</a></dd></dl>}<div className="history-gallery-controls"><button className="button quiet" aria-label="Vorherigen Materialplatz anzeigen" onClick={() => setGalleryIndex((galleryIndex + artifactData.length - 1) % artifactData.length)}><ChevronLeft size={20} aria-hidden="true" /></button><button className="button quiet" aria-label="Nächsten Materialplatz anzeigen" onClick={() => setGalleryIndex((galleryIndex + 1) % artifactData.length)}><ChevronRight size={20} aria-hidden="true" /></button></div></div></div><noscript><div className="history-archive-noscript">{artifactData.map(artifact => <article key={artifact.id}><h3>{artifact.title}</h3><p>{artifact.description}</p><p>{artifact.source}. {artifact.copyright}.</p></article>)}</div></noscript></div></section>
    <section className="container section history-chairpersons"><div><h2>Verantwortung<br />im Wandel.</h2><p>Frühere Vorsitzende des Ortsvereins nach der überlieferten Chronik. Offene Amtszeiten bleiben offen.</p></div><details><summary>Die historische Vorsitzendenliste öffnen</summary><p className="small muted">Die Liste wurde noch nicht vollständig mit Originalunterlagen abgeglichen. Sie bestätigt keine aktuellen Funktionen.</p><dl>{chairpersons.map(person => <div key={person.id}><dt>{person.period}</dt><dd><strong>{person.name}</strong><small>{person.note}</small></dd></div>)}</dl></details></section>
    <div className="container history-return"><a className="text-link" href="#timeline-heading">Zurück zum Zeitstrahl <ArrowUp size={17} aria-hidden="true" /></a><Link className="text-link" href="/kontakt">Historisches Material beitragen</Link></div>
  </>;
}
