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
type HistoryArtifact = { id: string; title: string; dateLabel: string; description: string; source: string; copyright: string; eventId: string; status: string; image: string | null; alt?: string };
const events = eventData as HistoryEvent[];
const artifacts = artifactData as HistoryArtifact[];
const statusLabels: Record<string, string> = { chronicle: 'Aus der Chronik', verified: 'Mit Quelle eingeordnet', pending: 'Redaktionell zu ergänzen' };
const levels = [{ id: 'buedingen', title: 'Büdingen', href: '/geschichte/buedingen' }, { id: 'germany', title: 'Deutschland', href: '/geschichte/deutschland' }, { id: 'all', title: 'Zusammen', href: '/geschichte?level=all' }] as const;
const overviewIds: Record<string, string[]> = {
  buedingen: ['buedingen-1893', 'buedingen-1919', 'buedingen-1922', 'buedingen-1932-frauen', 'buedingen-1933', 'buedingen-1945'],
  germany: ['germany-1863', 'germany-1919', 'germany-1933', 'germany-1959', 'germany-1989', 'germany-2021'],
  all: ['germany-1863', 'buedingen-1893', 'buedingen-1919', 'germany-1933', 'germany-1969', 'germany-2021'],
};
const eraTitles: Record<string, string> = {
  '1863–1893': 'Wurzeln der Bewegung', '1893–1903': 'Die frühen Anfänge', '1903–1919': 'Arbeiterleben und Umbruch',
  '1919–1933': 'Weimarer Republik', '1933–1945': 'Verfolgung und Diktatur', '1945–1949': 'Demokratischer Neubeginn',
  '1949–1969': 'Nachkrieg und Wandel', '1969–1982': 'Reformen und Aufbruch', '1982–1989': 'Opposition und Wandel',
  '1989–2000': 'Einheit und Regierungswechsel', '2000 bis heute': 'Neuere Geschichte',
};
function subscribe(callback: () => void) { window.addEventListener('popstate', callback); return () => window.removeEventListener('popstate', callback); }
function getSnapshot() { return window.location.search; }
function serverSnapshot() { return ''; }
function SourceList({ sources }: { sources: HistorySource[] }) {
  return <ul className="history-sources">{sources.map((source, index) => <li key={`${source.title}-${index}`}>{source.url ? <a href={source.url}>{source.title}</a> : <span>{source.title}</span>}{source.note && <small>{source.note}</small>}</li>)}</ul>;
}

export function HistoryExplorer({ initialLevel = 'buedingen' }: { initialLevel?: 'buedingen' | 'germany' }) {
  const search = useSyncExternalStore(subscribe, getSnapshot, serverSnapshot);
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const selected = params.get('event') || '';
  const selectedEvent = events.find(event => event.id === selected);
  const level = ['buedingen', 'germany', 'all'].includes(params.get('level') || '') ? params.get('level')! : selectedEvent?.level || initialLevel;
  const era = params.get('era') || '';
  const category = params.get('category') || '';
  const query = params.get('q') || '';
  const from = params.get('from') || '';
  const to = params.get('to') || '';
  const view = params.get('view') === 'list' ? 'list' : 'timeline';
  const zoom = Math.min(3, Math.max(1, Number(params.get('zoom')) || 2));
  const hasFilters = Boolean(era || category || query || from || to);
  const isOverview = params.get('mode') !== 'all' && !hasFilters && view !== 'list';
  const [jumpYear, setJumpYear] = useState('1893');
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const filtersId = useId();
  const localEvents = events.filter(event => level === 'all' || event.level === level);
  const eras = [...new Set(localEvents.map(event => event.era))];
  const categories = [...new Set(localEvents.map(event => event.category))].sort((a, b) => a.localeCompare(b, 'de'));
  const shown = localEvents.filter(event => (!era || event.era === era) && (!category || event.category === category) && (!from || event.year >= Number(from)) && (!to || event.year <= Number(to)) && (!query || `${event.title} ${event.summary} ${event.body.join(' ')} ${event.year} ${event.category}`.toLocaleLowerCase('de').includes(query.toLocaleLowerCase('de'))));
  const chronology = shown.filter(event => event.status !== 'pending');
  const overviewEvents = chronology.filter(event => overviewIds[level].includes(event.id));
  const baseStations = isOverview ? overviewEvents : chronology;
  const selectedOutsideView = selectedEvent && selectedEvent.status !== 'pending' && !baseStations.some(event => event.id === selected);
  const stations = selectedOutsideView && selectedEvent ? [...baseStations, selectedEvent].sort((a, b) => a.year - b.year) : baseStations;
  const activeEvent = selectedEvent?.status !== 'pending' ? selectedEvent || stations[0] : undefined;
  const openPeriods = shown.filter(event => event.status === 'pending');
  if (selectedEvent?.status === 'pending' && !openPeriods.some(event => event.id === selected)) openPeriods.push(selectedEvent);
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
    const nextEvent = events.find(event => event.id === id);
    update({ event: id, level: level === 'all' ? 'all' : nextEvent?.level || level });
    requestAnimationFrame(() => {
      const target = document.getElementById(nextEvent?.status === 'pending' ? id : 'history-event-panel');
      const title = document.getElementById('history-detail-title');
      if (nextEvent?.status !== 'pending') title?.focus({ preventScroll: true });
      target?.scrollIntoView({ block: 'nearest', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    });
  }
  function resetFilters() { update({ era: null, category: null, q: null, from: null, to: null, event: null, mode: 'all' }); }
  function showOverview() { update({ era: null, category: null, q: null, from: null, to: null, event: null, mode: null, view: null }); }
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
        <div className="history-exhibition-head"><div><h2 id="timeline-heading">Die Geschichte im Überblick.</h2><p className="muted">Mit wenigen Stationen beginnen. Eine Epoche genauer entdecken.</p></div><BookOpen size={42} strokeWidth={1.25} aria-hidden="true" /></div>
        <nav className="history-levels" aria-label="Historische Perspektive">{levels.map(item => <a key={item.id} href={item.href} aria-current={level === item.id ? 'page' : undefined} onClick={event => { event.preventDefault(); update({ level: item.id, era: null, category: null, q: null, from: null, to: null, event: null, mode: null, view: null }); }}>{item.title}<span>{item.id === 'buedingen' ? 'Seit 1893' : item.id === 'germany' ? 'Seit 1863' : 'Beide Ebenen'}</span></a>)}</nav>

        <div className="history-reading-controls"><div className="history-mode" aria-label="Umfang des Zeitstrahls"><button aria-pressed={isOverview} onClick={showOverview}>Überblick</button><button aria-pressed={!isOverview && !era} onClick={() => { resetFilters(); update({ view: null }); }}>Alle Ereignisse</button></div><p>{isOverview ? `${overviewEvents.length} Stationen zum Einstieg` : era ? `${eraTitles[era] || 'Gewählte Epoche'}: ${era}` : 'Das vollständige Ereignisarchiv'}</p></div>
        <details className="history-era-picker"><summary><span>Eine Epoche vertiefen</span><span>{era || 'Alle historischen Zeiträume'}</span></summary><nav className="history-era-nav" aria-label="Historische Epochen">{eras.map(value => <button key={value} aria-pressed={era === value} onClick={() => update({ era: value, event: null, mode: 'all' })}><strong>{value}</strong><span>{eraTitles[value] || 'Historischer Zeitraum'}</span></button>)}</nav></details>

        <details className="history-tools" open={Boolean(category || query || from || to) || undefined}>
          <summary><Search size={18} aria-hidden="true" /><span>Suche und Werkzeuge</span><span className="history-tools-hint">Suche, Filter und Ansicht</span></summary>
          <div className="history-tools-content">
            <form className="history-filter-form" onSubmit={event => event.preventDefault()} aria-label="Zeitstrahl filtern">
              <div className="history-search"><label htmlFor={`${filtersId}-search`}>Geschichte durchsuchen</label><div><Search size={20} aria-hidden="true" /><input id={`${filtersId}-search`} type="search" value={query} onChange={event => update({ q: event.target.value, event: null, mode: 'all' })} placeholder="Ereignis, Person oder Jahr" /></div></div>
              <div><label htmlFor={`${filtersId}-era`}>Zeitraum</label><select id={`${filtersId}-era`} value={era} onChange={event => update({ era: event.target.value, event: null, mode: 'all' })}><option value="">Alle Zeiträume</option>{eras.map(value => <option key={value}>{value}</option>)}</select></div>
              <div><label htmlFor={`${filtersId}-category`}>Thema</label><select id={`${filtersId}-category`} value={category} onChange={event => update({ category: event.target.value, event: null, mode: 'all' })}><option value="">Alle Themen</option>{categories.map(value => <option key={value}>{value}</option>)}</select></div>
              <details className="history-more-filters"><summary>Jahre eingrenzen</summary><div><label htmlFor={`${filtersId}-from`}>Ab Jahr</label><input id={`${filtersId}-from`} type="number" inputMode="numeric" min="1863" max="2026" value={from} onChange={event => update({ from: event.target.value, event: null, mode: 'all' })} placeholder="1863" /><label htmlFor={`${filtersId}-to`}>Bis Jahr</label><input id={`${filtersId}-to`} type="number" inputMode="numeric" min="1863" max="2026" value={to} onChange={event => update({ to: event.target.value, event: null, mode: 'all' })} placeholder="2026" /></div></details>
            </form>
            <div className="history-tool-options"><div className="history-view-controls"><span>Ansicht</span><button aria-label="Zeitstrahl anzeigen" aria-pressed={view === 'timeline'} onClick={() => update({ view: 'timeline' })}><BookOpen size={18} aria-hidden="true" /></button><button aria-label="Liste anzeigen" aria-pressed={view === 'list'} onClick={() => update({ view: 'list', mode: 'all' })}><List size={18} aria-hidden="true" /></button><span className="history-zoom-label">Detailgröße</span><button aria-label="Detailgröße verkleinern" disabled={zoom === 1} onClick={() => update({ zoom: String(zoom - 1) })}><Minus size={18} aria-hidden="true" /></button><output aria-label="Detailgröße">{zoom}</output><button aria-label="Detailgröße vergrößern" disabled={zoom === 3} onClick={() => update({ zoom: String(zoom + 1) })}><Plus size={18} aria-hidden="true" /></button></div><div className="history-jump"><label htmlFor={`${filtersId}-jump`}>Zu einem Jahr springen</label><input id={`${filtersId}-jump`} inputMode="numeric" type="number" min="1863" max="2026" value={jumpYear} onChange={event => setJumpYear(event.target.value)} /><button className="text-link" onClick={jump} disabled={!shown.length}>Eintrag zeigen <ArrowDown size={16} aria-hidden="true" /></button></div></div>
          </div>
        </details>

        <div className="history-results"><p aria-live="polite">{isOverview ? `${overviewEvents.length} von ${chronology.length} Ereignissen im Überblick` : `${chronology.length} ${chronology.length === 1 ? 'Ereignis' : 'Ereignisse'}`}, {openPeriods.length} {openPeriods.length === 1 ? 'offener Zeitraum' : 'offene Zeiträume'}</p>{hasFilters && <button className="history-reset" onClick={resetFilters}>Filter zurücksetzen <X size={15} aria-hidden="true" /></button>}</div>
        {level === 'buedingen' && isOverview && <p className="history-overview-note">Die lokalen Stationen reichen bis zum Neubeginn 1945. Für spätere Jahre sind offene Recherchezeiträume verzeichnet.</p>}
        {selectedOutsideView && <p className="history-overview-note">Das direkt aufgerufene Ereignis wird zusätzlich zur Auswahl gezeigt.</p>}
        {from && to && Number(from) > Number(to) && <p className="history-validation" role="alert">Das Anfangsjahr muss vor dem Endjahr liegen.</p>}

        {stations.length > 0 ? <div className="history-workspace">
          <ol className={`history-events history-stations history-events--${view} history-zoom-${zoom}`} aria-label={isOverview ? 'Ausgewählte Meilensteine' : 'Historische Ereignisse'}>{stations.map(event => <li key={event.id} id={event.id} className={`${activeEvent?.id === event.id ? 'is-selected' : ''} ${event.category === 'Verfolgung' ? 'history-respectful' : ''}`}><a href={`?level=${event.level}&event=${event.id}#${event.id}`} aria-current={activeEvent?.id === event.id ? 'step' : undefined} aria-controls="history-event-panel" onClick={e => { e.preventDefault(); chooseEvent(event.id); }}><span className="history-station-year">{event.year}</span><span className="history-station-copy"><span className="history-station-level">{level === 'all' ? `${event.level === 'buedingen' ? 'Büdingen' : 'Deutschland'} / ${event.era}` : event.era}</span><strong>{event.title}</strong>{!isOverview && <span className="history-station-summary">{event.summary}</span>}</span><ChevronRight size={18} aria-hidden="true" /></a></li>)}</ol>
          {activeEvent && <article className="history-detail-panel" id="history-event-panel" aria-labelledby="history-detail-title" key={activeEvent.id}>
            <div className="history-detail-heading"><span>{activeEvent.dateLabel}</span><span>{activeEvent.level === 'buedingen' ? 'Büdingen' : 'Deutschland'}</span></div>
            <h3 id="history-detail-title" tabIndex={-1}>{activeEvent.title}</h3><p className="history-detail-intro">{activeEvent.summary}</p>
            <details className="history-context" open={Boolean(selected) || undefined}><summary>Kontext und Details</summary><div className="history-event-body">{activeEvent.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div></details>
            <p className="history-source-status">{statusLabels[activeEvent.status]}</p>
            <details className="history-detail-sources" open={Boolean(selected) || undefined}><summary>Quellen und Einordnung</summary><SourceList sources={activeEvent.sources} /></details>
            {activeEvent.relatedIds?.length ? <details className="history-related-disclosure"><summary>Verwandte Ereignisse</summary><div className="history-related">{activeEvent.relatedIds.map(id => { const related = events.find(item => item.id === id); return related ? <a href={`?level=all&event=${id}#${id}`} key={id} onClick={e => { e.preventDefault(); chooseEvent(id); }}>{related.dateLabel}: {related.title}</a> : null; })}</div></details> : null}
            <a className="history-permalink" href={`?level=${activeEvent.level}&event=${activeEvent.id}#${activeEvent.id}`} onClick={e => { e.preventDefault(); chooseEvent(activeEvent.id); }} aria-label={`Direktlink: ${activeEvent.title}`}><Link2 size={15} aria-hidden="true" />Direktlink zum Ereignis</a>
          </article>}
        </div> : <div className="history-empty"><h3>{openPeriods.length ? 'Hier ist die Recherche noch offen.' : 'Hier fehlt noch ein Treffer.'}</h3><p>{openPeriods.length ? 'Die überlieferten Informationen reichen für diesen Zeitraum noch nicht aus. Die offenen Angaben stehen im Archivbereich.' : 'Versuche einen anderen Suchbegriff oder einen größeren Zeitraum.'}</p><button className="button quiet" onClick={resetFilters}>Alle Einträge zeigen</button></div>}
        <noscript><details className="history-noscript"><summary>Vollständiges Archiv ohne interaktive Auswahl</summary>{localEvents.map(event => <article key={event.id} id={`archive-${event.id}`}><h3>{event.dateLabel}: {event.title}</h3><p>{event.summary}</p>{event.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}<SourceList sources={event.sources} /></article>)}</details></noscript>
      </div>
    </section>

    <section className="container history-archive" aria-labelledby="history-archive-heading">
      <div className="section-head"><h2 id="history-archive-heading">Im Archiv<br />weiterstöbern.</h2><p>Menschen, Materialien und offene Fragen.</p></div>
      {openPeriods.length > 0 && <details className="history-archive-section" open={selectedEvent?.status === 'pending' || (Boolean(era) && !chronology.length) || undefined}><summary><span>Offene Zeiträume</span><small>{openPeriods.length} Recherchefelder</small><Plus size={20} aria-hidden="true" /></summary><div className="history-open-periods" aria-labelledby="history-open-heading"><div><h3 id="history-open-heading">Offene Zeiträume</h3><p>Hier fehlen geprüfte Ereignisse. Die Recherchefelder bleiben einzeln aufrufbar.</p></div><div>{openPeriods.map(event => <details key={event.id} id={event.id} open={selected === event.id || undefined} className={selected === event.id ? 'is-selected' : undefined}><summary><strong>{event.dateLabel}</strong><span>{event.level === 'buedingen' ? 'Büdingen' : 'Deutschland'}</span></summary><div className="history-open-body"><p>{event.summary}</p>{event.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}<p className="history-source-status">{statusLabels[event.status]}</p><h4>Quellen und Einordnung</h4><SourceList sources={event.sources} /><a className="history-permalink" href={`?level=${event.level}&event=${event.id}#${event.id}`} onClick={e => { e.preventDefault(); chooseEvent(event.id); }} aria-label={`Direktlink: Offener Zeitraum ${event.dateLabel}`}><Link2 size={15} aria-hidden="true" />Direktlink</a></div></details>)}</div></div></details>}
      <details className="history-archive-section"><summary><span>Historische Personen</span><small>{shownPeople.length} Profile</small><Plus size={20} aria-hidden="true" /></summary><div className="history-people" aria-labelledby="history-people-heading"><h3 id="history-people-heading" className="sr-only">Menschen hinter der Geschichte</h3>{shownPeople.map(person => <article key={person.id} id={person.id}><p className="history-person-period">{person.period}</p><h3>{person.name}</h3><p>{person.summary}</p><details><summary>Historisches Profil</summary><p>{person.role}</p>{person.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}<p className="history-source-status">{statusLabels[person.status]}</p><SourceList sources={person.sources} /><div className="history-related">{person.eventIds.map(id => <a key={id} href={`/geschichte?level=all&event=${id}#${id}`}>Zum Ereignis {events.find(event => event.id === id)?.dateLabel}</a>)}</div></details></article>)}</div></details>
      <details className="history-archive-section"><summary><span>Historische Vorsitzende</span><small>Die überlieferte Liste</small><Plus size={20} aria-hidden="true" /></summary><div className="history-chairpersons"><div><h3>Verantwortung im Wandel.</h3><p>Frühere Vorsitzende des Ortsvereins nach der überlieferten Chronik. Offene Amtszeiten bleiben offen.</p></div><details open><summary>Die historische Vorsitzendenliste öffnen</summary><p className="small muted">Die Liste wurde noch nicht vollständig mit Originalunterlagen abgeglichen. Sie bestätigt keine aktuellen Funktionen.</p><dl>{chairpersons.map(person => <div key={person.id}><dt>{person.period}</dt><dd><strong>{person.name}</strong><small>{person.note}</small></dd></div>)}</dl></details></div></details>
      <details className="history-archive-section history-material-section"><summary><span>Fotos und Dokumente</span><small>Ein offenes Archiv</small><Plus size={20} aria-hidden="true" /></summary><div className="history-gallery">{gallery.image ? <figure className="history-gallery-image history-gallery-photo"><Image src={gallery.image} alt={gallery.alt || gallery.title} width={1200} height={900} sizes="(max-width: 650px) 100vw, 50vw" /><figcaption>{gallery.title}</figcaption></figure> : <ImagePlaceholder title="Das Archiv wächst mit euch." description={gallery.title} className="history-gallery-image" />}<div className="history-gallery-copy"><p className="history-person-period">{galleryIndex + 1} von {artifactData.length} Materialplätzen</p><h3>{gallery.title}</h3><p>{gallery.description}</p><p className="small muted">{gallery.dateLabel}</p><button className="text-link" aria-expanded={galleryOpen} onClick={() => setGalleryOpen(!galleryOpen)}>Materialangaben {galleryOpen ? <Minus size={17} aria-hidden="true" /> : <Plus size={17} aria-hidden="true" />}</button>{galleryOpen && <dl className="history-artifact-details"><dt>Quelle</dt><dd>{gallery.source}</dd><dt>Bildrechte</dt><dd>{gallery.copyright}</dd><dt>Verknüpftes Ereignis</dt><dd><a href={`/geschichte?level=buedingen&event=${gallery.eventId}#${gallery.eventId}`}>{events.find(event => event.id === gallery.eventId)?.title}</a></dd></dl>}<div className="history-gallery-controls"><button className="button quiet" aria-label="Vorherigen Materialplatz anzeigen" onClick={() => setGalleryIndex((galleryIndex + artifactData.length - 1) % artifactData.length)}><ChevronLeft size={20} aria-hidden="true" /></button><button className="button quiet" aria-label="Nächsten Materialplatz anzeigen" onClick={() => setGalleryIndex((galleryIndex + 1) % artifactData.length)}><ChevronRight size={20} aria-hidden="true" /></button></div></div></div><noscript><div className="history-archive-noscript">{artifactData.map(artifact => <article key={artifact.id}><h3>{artifact.title}</h3><p>{artifact.description}</p><p>{artifact.source}. {artifact.copyright}.</p></article>)}</div></noscript></details>
      <details className="history-archive-section history-source-note"><summary><span>Über die Quellen</span><small>Historische Einordnung</small><Plus size={20} aria-hidden="true" /></summary><div><h3>Geschichte braucht Quellen.</h3><p>Die Büdinger Chronik ist eine historische Ausgangsdarstellung. Unklare Angaben und fehlende Materialien bleiben sichtbar. Sie werden nicht durch Vermutungen ergänzt.</p><details><summary>Was bedeuten die Quellenhinweise?</summary><p>„Aus der Chronik“ bezeichnet die bereitgestellte historische Darstellung. „Mit Quelle eingeordnet“ verweist auf ergänzende institutionelle Nachweise. „Redaktionell zu ergänzen“ markiert offene Forschung oder fehlendes Material.</p></details></div></details>
    </section>
    <div className="container history-return"><a className="text-link" href="#timeline-heading">Zurück zum Zeitstrahl <ArrowUp size={17} aria-hidden="true" /></a><Link className="text-link" href="/kontakt">Historisches Material beitragen</Link></div>
  </>;
}
