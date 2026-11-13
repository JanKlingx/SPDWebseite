'use client';

import { Check, ChevronDown, CircleHelp, Clock3, Search, X } from 'lucide-react';
import {
  motions, formatLocalDate, filterMotions, getMotionStatus, getMotionReason, getMotionImpact,
  type Motion, type PublicMotionStatus,
} from '@/lib/local-data';
import { EmptyDirectory } from './DirectoryParts';
import { useDirectoryQuery } from './query';

const statuses = ['Angenommen', 'In Planung', 'Abgelehnt'] as const;
const statusClasses: Record<PublicMotionStatus, string> = {
  Angenommen: 'accepted', 'In Planung': 'planning', Abgelehnt: 'rejected', 'Entscheidung offen': 'open',
};
const statusDescriptions: Record<typeof statuses[number], string> = {
  Angenommen: 'Das zuständige Gremium hat zugestimmt.',
  'In Planung': 'Eine Idee wird vorbereitet; sie ist noch nicht eingereicht.',
  Abgelehnt: 'Das zuständige Gremium hat nicht zugestimmt.',
};

export function MotionStatusBadge({ status }: { status: PublicMotionStatus }) {
  const Icon = status === 'Angenommen' ? Check : status === 'In Planung' ? Clock3 : status === 'Abgelehnt' ? X : CircleHelp;
  return <span className={`motion-status motion-status--${statusClasses[status]}`}><Icon size={18} aria-hidden="true" /><span>{status}</span></span>;
}

export function MotionCard({ motion, permalink, selected = false }: { motion: Motion; permalink?: string; selected?: boolean }) {
  const status = getMotionStatus(motion);
  const impact = getMotionImpact(motion);
  const facts = [motion.date ? formatLocalDate(motion.date) : '', motion.committee || ''].filter(Boolean);
  return <details id={motion.id} className="motion-card" open={selected || undefined}>
    <summary>
      <span className="motion-card-heading"><MotionStatusBadge status={status} /><span className="motion-card-title">{motion.title}</span>{facts.length > 0 && <span className="motion-card-meta">{facts.map(fact => <span key={fact}>{fact}</span>)}</span>}</span>
      <ChevronDown className="motion-card-toggle" size={24} aria-hidden="true" />
    </summary>
    <div className="motion-card-body">
      <div className="motion-card-copy"><section><h3>Warum dieser Antrag?</h3><p>{getMotionReason(motion)}</p></section><section><h3>Was bedeutet das für dich?</h3><p className="motion-impact-note">{impact.label}</p><p>{impact.text}</p></section></div>
      <dl className="motion-card-facts">
        {motion.stage && <div><dt>Verfahrensstand</dt><dd>{motion.stage}</dd></div>}
        {motion.decisionDate && <div><dt>Beschlussdatum</dt><dd>{formatLocalDate(motion.decisionDate)}</dd></div>}
        {motion.applicants?.length ? <div><dt>Antragstellende</dt><dd>{motion.applicants.join(', ')}</dd></div> : null}
        {motion.outcome && <div><dt>Dokumentiertes Ergebnis</dt><dd>{motion.outcome}</dd></div>}
        <div><dt>Umsetzungsstand</dt><dd>{motion.implementation || (impact.kind === 'umgesetzt' ? 'Als umgesetzt dokumentiert; der Nachweis steht in der Quelle.' : 'Eine tatsächliche Umsetzung ist hier noch nicht gesondert belegt.')}</dd></div>
      </dl>
      <div className="motion-card-links">{motion.documentUrl && <a href={motion.documentUrl}>Originaldokument</a>}<a href={motion.source.url}>Quelle: {motion.source.title}</a><a href={permalink || `?antrag=${encodeURIComponent(motion.id)}#${encodeURIComponent(motion.id)}`}>Direktlink</a></div>
    </div>
  </details>;
}

export function MotionsExplorer({ records = motions }: { records?: Motion[] }) {
  const { params, setQuery } = useDirectoryQuery();
  const query = params.get('q') || '';
  const status = params.get('status') || '';
  const committee = params.get('gremium') || '';
  const selected = params.get('antrag') || '';
  const committees = [...new Set(records.flatMap(motion => motion.committee ? [motion.committee] : []))].sort((a, b) => a.localeCompare(b, 'de'));
  const matching = filterMotions(records, { query, status, committee });
  function permalink(id: string) { const next = new URLSearchParams(params.toString()); next.set('antrag', id); return `?${next}#${encodeURIComponent(id)}`; }
  return <section className="container directory-content motions-content" aria-labelledby="motions-heading">
    <div className="motions-section-heading"><h2 id="motions-heading">Anträge im Überblick</h2><p>Der Status ordnet den Vorgang ein. Eine Umsetzung braucht einen eigenen Nachweis.</p></div>
    {records.length === 0 && <aside className="motions-data-note"><h3>Noch keine verifizierten Anträge.</h3><p>Sobald geprüfte Originalanträge und Entscheidungen vorliegen, ergänzen wir hier ihre Ziele und ihre Bedeutung für Büdingen. Es werden keine Vorgänge oder Ergebnisse erfunden.</p></aside>}
    <dl className="motion-status-key" aria-label="Bedeutung der Statusfarben">{statuses.map(value => <div key={value}><dt><MotionStatusBadge status={value} /></dt><dd>{statusDescriptions[value]}</dd></div>)}</dl>
    <p className="motion-open-note">Bereits eingereichte Anträge ohne Entscheidung erscheinen als „Entscheidung offen“. Sie gehören nicht zur Planung.</p>
    <div className="motions-toolbar"><label className="directory-search"><span>Vorgänge suchen</span><span className="directory-input-wrap"><Search size={20} aria-hidden="true" /><input type="search" value={query} onChange={event => setQuery({ q: event.target.value, antrag: '' })} placeholder="Titel, Grund oder Wirkung" /></span></label><label>Gremium<select value={committee} onChange={event => setQuery({ gremium: event.target.value, antrag: '' })}><option value="">Alle Gremien</option>{committees.map(value => <option key={value}>{value}</option>)}</select></label></div>
    <fieldset className="motion-filters"><legend>Nach Status filtern</legend><div><button type="button" aria-pressed={!status} onClick={() => setQuery({ status: '', antrag: '' })}>Alle</button>{statuses.map(value => <button type="button" key={value} aria-pressed={status === value} onClick={() => setQuery({ status: value, antrag: '' })}>{value}</button>)}</div></fieldset>
    <div className="motions-results"><p role="status" aria-live="polite">{matching.length} {matching.length === 1 ? 'Vorgang' : 'Vorgänge'}</p>{(query || status || committee) && <button className="motion-reset" type="button" onClick={() => setQuery({ q: '', status: '', gremium: '', antrag: '' })}>Filter zurücksetzen</button>}</div>
    {matching.length > 0 ? <div className="motions-grid">{matching.map(motion => <MotionCard key={motion.id} motion={motion} permalink={permalink(motion.id)} selected={selected === motion.id} />)}</div> : records.length > 0 ? <EmptyDirectory title="Keine passenden Vorgänge." filtered={Boolean(query || status || committee)} onReset={() => setQuery({ q: '', status: '', gremium: '', antrag: '' })}><p>Versuche einen anderen Suchbegriff oder entferne einen Filter.</p></EmptyDirectory> : null}
    <aside className="motions-reading-note"><h3>Antrag, Entscheidung, Umsetzung.</h3><p>Ein Vorschlag beschreibt ein Ziel. Ein Beschluss hält eine Entscheidung fest. Ob und wie die Maßnahme umgesetzt wurde, braucht einen eigenen Nachweis.</p></aside>
  </section>;
}
