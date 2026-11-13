'use client';

import Link from 'next/link';
import { useEffect, useRef, type KeyboardEvent } from 'react';
import {
  ArrowRight, ArrowDown, ArrowLeftRight, BookOpen, Check, ChevronLeft, ChevronRight,
  FileText, GitBranch, Landmark, Layers, ListChecks, MessageCircle,
  Search, Users, Vote, Wallet,
} from 'lucide-react';
import guides from '../../../content/guides/guides.json';
import glossary from '../../../content/glossary/entries.json';
import { useUrlState } from './useUrlState';

type Guide = (typeof guides)[number];
type Step = Guide['steps'][number];
type DiagramProps = { guide: Guide; selected: Step; choose: (id: string) => void };
const moduleIcons = [Landmark, FileText, Users, Wallet, Vote, Layers, MessageCircle];
const moduleLabels = ['Bundesgesetz', 'Beschluss in Büdingen', 'Gremien', 'Städtischer Haushalt', 'Kommunalwahlen', 'Kommune, Land und Bund', 'Bürgerbeteiligung'];
const linearModules = new Set(['bundesgesetz', 'kommunaler-beschluss']);
const positionLabels: Record<string, string> = {
  bundesgesetz: 'Position im Gesetzgebungsweg',
  'kommunaler-beschluss': 'Position im typischen Beratungsweg',
};
const nodeLabels: Record<string, string> = {
  'gremien-2': 'Stadtverordnete', 'gremien-4': 'Bürgermeisteramt',
  'kommunalwahl-1': 'Wahlberechtigung', 'kommunalwahl-2': 'Stimmzettel',
  'kommunalwahl-5': 'Sitzverteilung', 'haushalt-5': 'Plan und Satzung',
};

function keyboardNodes(event: KeyboardEvent<HTMLElement>, choose: (id: string) => void) {
  if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
  const nodes = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('button[data-guide-node]'));
  const index = nodes.findIndex(node => node === document.activeElement);
  if (index < 0) return;
  let next = index;
  if (event.key === 'Home') next = 0;
  else if (event.key === 'End') next = nodes.length - 1;
  else next = (index + (['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : -1) + nodes.length) % nodes.length;
  event.preventDefault();
  nodes[next].focus();
  choose(nodes[next].dataset.guideNode!);
}

function Node({ step, selected, choose, short, className = '', icon: Icon }: {
  step: Step; selected: Step; choose: (id: string) => void; short?: string;
  className?: string; icon?: typeof Landmark;
}) {
  return <button type="button" data-guide-node={step.id} className={`guide-node ${className}`}
    aria-label={step.title} aria-pressed={selected.id === step.id} aria-controls={`step-${step.id}`}
    onClick={() => choose(step.id)}>
    {Icon && <Icon size={22} aria-hidden="true" />}
    <span>{short || nodeLabels[step.id] || step.title}</span>
  </button>;
}

function LinearDiagram({ guide, selected, choose }: DiagramProps) {
  const rail = useRef<HTMLOListElement>(null);
  const current = guide.steps.findIndex(step => step.id === selected.id);
  useEffect(() => {
    const track = rail.current;
    const item = track?.querySelector<HTMLElement>('[aria-current="step"]');
    if (track && item) track.scrollTo({ left: Math.max(0, item.offsetLeft - track.offsetLeft - (track.clientWidth - item.clientWidth) / 2), behavior: 'instant' });
  }, [selected.id]);
  return <div className="guide-flow" data-diagram="connected-flow">
    <div className="guide-flow-position"><label htmlFor={`progress-${guide.id}`}>{positionLabels[guide.id]}</label><span>{current + 1} / {guide.steps.length}</span></div>
    <progress id={`progress-${guide.id}`} max={guide.steps.length} value={current + 1} />
    <ol ref={rail} className="guide-flow-rail" aria-label="Verbundene Stationen" onKeyDown={event => keyboardNodes(event, choose)}>
      {guide.steps.map((step, index) => <li key={step.id} data-current={step.id === selected.id} data-before={index < current}
        data-conditional={guide.id === 'bundesgesetz' ? index === 9 : index === 3}>
        <button type="button" data-guide-node={step.id} aria-current={step.id === selected.id ? 'step' : undefined}
          aria-controls={`step-${step.id}`} onClick={() => choose(step.id)}>
          <span className="guide-flow-number">{index < current ? <Check size={16} aria-hidden="true" /> : String(index + 1).padStart(2, '0')}</span>
          <strong>{step.title}</strong>
          {(guide.id === 'bundesgesetz' ? index === 9 : index === 3) && <small>{guide.id === 'bundesgesetz' ? 'Bei Bedarf' : 'Je nach Zuständigkeit'}</small>}
        </button>
      </li>)}
    </ol>
    <p className="guide-diagram-hint">Stationen anklicken oder mit den Pfeiltasten erkunden. Die Leiste lässt sich seitlich verschieben.</p>
    {guide.id === 'bundesgesetz' && <p className="guide-qualification"><GitBranch size={18} aria-hidden="true" />Vermittlung ist ein möglicher Abzweig, kein Pflichtschritt.</p>}
    {guide.id === 'kommunaler-beschluss' && <p className="guide-qualification"><GitBranch size={18} aria-hidden="true" />Zuständigkeit, Anhörung und Übertragungen bestimmen den tatsächlichen Weg.</p>}
  </div>;
}

const civicPositions = [
  { x: 50, y: 10 }, { x: 25, y: 36 }, { x: 75, y: 62 }, { x: 75, y: 36 },
  { x: 25, y: 62 }, { x: 25, y: 88 }, { x: 75, y: 88 },
];
const civicConnections = [
  { from: 0, to: 1, label: 'wählt' }, { from: 0, to: 3, label: 'wählt direkt' },
  { from: 0, to: 5, label: 'wählt im Ortsbezirk' }, { from: 1, to: 2, label: 'wählt die Beigeordneten' },
  { from: 1, to: 4, label: 'bildet Ausschüsse' }, { from: 4, to: 1, label: 'berät und empfiehlt' },
  { from: 3, to: 2, label: 'führt den Vorsitz' }, { from: 3, to: 6, label: 'leitet die Verwaltung' },
  { from: 5, to: 1, label: 'wird angehört und macht Vorschläge' }, { from: 2, to: 6, label: 'erfüllt Verwaltungsaufgaben' },
];

function CivicDiagram({ guide, selected, choose }: DiagramProps) {
  const current = guide.steps.findIndex(step => step.id === selected.id);
  const connections = civicConnections.filter(connection => connection.from === current || connection.to === current);
  return <div className="guide-civic" data-diagram="relationships">
    <div className="guide-civic-map" role="group" aria-label="Beziehungsdiagramm der kommunalen Gremien" onKeyDown={event => keyboardNodes(event, choose)}>
      <svg className="guide-civic-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {civicConnections.map((connection, i) => <line key={i} x1={civicPositions[connection.from].x} y1={civicPositions[connection.from].y} x2={civicPositions[connection.to].x} y2={civicPositions[connection.to].y}
          data-connected={connection.from === current || connection.to === current} />)}
      </svg>
      {guide.steps.map((step, i) => <div key={step.id} className={`guide-civic-node guide-civic-node-${i}`}>
        <Node step={step} selected={selected} choose={choose} icon={i === 0 ? Users : i === 6 ? ListChecks : Landmark} />
      </div>)}
    </div>
    <div className="guide-relations" aria-label={`Verbindungen: ${selected.title}`}>
      {connections.map((connection, i) => <div key={i}><span>{nodeLabels[guide.steps[connection.from].id] || guide.steps[connection.from].title}</span><span className="guide-relation-label"><ArrowRight size={16} aria-hidden="true" />{connection.label}</span><button type="button" onClick={() => choose(guide.steps[connection.to].id)}>{nodeLabels[guide.steps[connection.to].id] || guide.steps[connection.to].title}</button></div>)}
    </div>
    <p className="guide-diagram-hint">Beziehungen und Zuständigkeiten, keine zeitliche Reihenfolge. Wähle ein Gremium.</p>
  </div>;
}

function BudgetDiagram({ guide, selected, choose }: DiagramProps) {
  return <div className="guide-budget-map" data-diagram="budget-perspectives" role="group" aria-label="Zwei verbundene Sichten auf den Haushalt" onKeyDown={event => keyboardNodes(event, choose)}>
    <div className="guide-budget-funding"><Node step={guide.steps[0]} selected={selected} choose={choose} icon={Wallet} /><span>Finanzierung kommunaler Aufgaben</span></div>
    <div className="guide-budget-lanes">
      <div className="guide-budget-lane"><span>Ressourcen</span><div><span>Erträge</span><ArrowLeftRight size={18} aria-hidden="true" /><span>Aufwendungen</span></div><Node step={guide.steps[1]} selected={selected} choose={choose} /><small>Auch ohne gleichzeitige Zahlung</small></div>
      <div className="guide-budget-lane"><span>Zahlungen</span><div><span>Einzahlungen</span><ArrowLeftRight size={18} aria-hidden="true" /><span>Auszahlungen</span></div><Node step={guide.steps[2]} selected={selected} choose={choose} /><small>Ein- und Auszahlungen</small></div>
    </div>
    <div className="guide-budget-bridge"><span>Abschreibung als Aufwand</span><Node step={guide.steps[3]} selected={selected} choose={choose} /><span>Auszahlung beim Erwerb oder Bau</span></div>
    <div className="guide-budget-management">{guide.steps.slice(4).map(step => <Node key={step.id} step={step} selected={selected} choose={choose} />)}</div>
    <p className="guide-diagram-hint">Zwei Betrachtungen derselben Haushaltswirtschaft. Schema ohne echte oder fiktive Haushaltszahlen.</p>
  </div>;
}

function ElectionDiagram({ guide, selected, choose }: DiagramProps) {
  return <div className="guide-election" data-diagram="election-branches" role="group" aria-label="Stimmabgabe und getrennte Kommunalwahlen" onKeyDown={event => keyboardNodes(event, choose)}>
    <div className="guide-election-start"><Node step={guide.steps[0]} selected={selected} choose={choose} icon={Users} /><ArrowRight aria-hidden="true" size={22} /><Node step={guide.steps[1]} selected={selected} choose={choose} icon={FileText} /></div>
    <div className="guide-election-branch"><ArrowDown size={22} aria-hidden="true" /><p>Personenstimmen können kombiniert werden</p><div><Node step={guide.steps[2]} selected={selected} choose={choose} short="Kumulieren" /><span>und / oder</span><Node step={guide.steps[3]} selected={selected} choose={choose} short="Panaschieren" /></div><ArrowDown size={22} aria-hidden="true" /><Node step={guide.steps[4]} selected={selected} choose={choose} icon={Vote} /></div>
    <div className="guide-election-separate"><span>Eigenständige Wahlen</span><div><Node step={guide.steps[5]} selected={selected} choose={choose} /><Node step={guide.steps[6]} selected={selected} choose={choose} /></div><p>Die Bürgermeisterwahl folgt eigenen Terminen und Regeln. Kumulieren und Panaschieren gelten dort nicht.</p></div>
  </div>;
}

function LevelsDiagram({ guide, selected, choose }: DiagramProps) {
  const labels = ['Örtliche Aufgaben', 'Landesgesetze', 'Bundesgesetze'];
  return <div className="guide-levels" data-diagram="responsibilities" role="group" aria-label="Zuständigkeiten von Kommune, Land und Bund" onKeyDown={event => keyboardNodes(event, choose)}>
    <div className="guide-level-nodes">{guide.steps.slice(0, 3).map((step, i) => <div key={step.id}><Node step={step} selected={selected} choose={choose} icon={Landmark} /><span>{labels[i]}</span></div>)}</div>
    <div className="guide-level-connections" aria-hidden="true"><span /><span /><span /></div>
    <div className="guide-level-cooperation"><Node step={guide.steps[3]} selected={selected} choose={choose} icon={GitBranch} /><p>Zum Beispiel: kommunale Planung, Landesförderung und bundesgesetzliche Vorgaben.</p></div>
    <p className="guide-diagram-hint">Zuständigkeit, Finanzierung und Ausführung sind zu unterscheiden. Die Grafik zeigt keine Rangfolge.</p>
  </div>;
}

function ParticipationDiagram({ guide, selected, choose }: DiagramProps) {
  const icons = [Search, MessageCircle, FileText, ListChecks, Vote];
  return <div className="guide-participation" data-diagram="participation-choices" role="group" aria-label="Wege zur Bürgerbeteiligung" onKeyDown={event => keyboardNodes(event, choose)}>
    <p className="guide-choice-question">Wie möchtest du dich einbringen?</p>
    <div className="guide-choice-paths">
      <svg className="guide-choice-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{['M50 0 V12 H25 V22', 'M50 0 V12 H75 V22', 'M50 0 V48 H25 V56', 'M50 0 V48 H75 V56', 'M50 0 V88'].map((path, i) => <path key={path} d={path} data-selected={selected.id === guide.steps[i].id} />)}</svg>
      {guide.steps.map((step, i) => <div key={step.id} className={`guide-choice-node guide-choice-node-${i}`}><Node step={step} selected={selected} choose={choose} icon={icons[i]} /></div>)}
    </div>
    <p className="guide-diagram-hint">Wähle einen Weg. Die Formen haben unterschiedliche Voraussetzungen und Wirkungen; sie sind keine aufeinanderfolgenden Pflichtschritte.</p>
  </div>;
}

function Diagram(props: DiagramProps) {
  if (linearModules.has(props.guide.id)) return <LinearDiagram {...props} />;
  if (props.guide.id === 'gremien') return <CivicDiagram {...props} />;
  if (props.guide.id === 'haushalt') return <BudgetDiagram {...props} />;
  if (props.guide.id === 'kommunalwahl') return <ElectionDiagram {...props} />;
  if (props.guide.id === 'ebenen') return <LevelsDiagram {...props} />;
  return <ParticipationDiagram {...props} />;
}

export function GuideExplorer() {
  const { params, update } = useUrlState();
  const active = guides.find(guide => guide.id === params.get('modul')) || guides[0];
  const selected = active.steps.find(step => step.id === params.get('schritt')) || active.steps[0];
  const index = active.steps.findIndex(step => step.id === selected.id);
  const isLinear = linearModules.has(active.id);
  const lawType = params.get('gesetzart') === 'einspruch' ? 1 : 0;
  function chooseModule(id: string) { update({ modul: id, schritt: '', gesetzart: '' }, true); }
  function chooseStep(id: string) { update({ modul: active.id, schritt: id }); }
  function tabKeys(event: KeyboardEvent<HTMLDivElement>) {
    const tabs = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('[role=tab]'));
    const current = tabs.findIndex(tab => tab === document.activeElement);
    let next = current;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (current + 1) % tabs.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (current - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else return;
    event.preventDefault(); tabs[next].focus(); chooseModule(guides[next].id);
  }
  return <div className="guide-lab">
    <div className="guide-mobile-module"><label htmlFor="education-module">Erklärung auswählen</label><select id="education-module" value={active.id} onChange={event => chooseModule(event.target.value)}>{guides.map((guide, i) => <option key={guide.id} value={guide.id}>{moduleLabels[i]}</option>)}</select></div>
    <div className="guide-module-tabs" role="tablist" aria-label="Politische Abläufe" aria-orientation="vertical" onKeyDown={tabKeys}>
      {guides.map((guide, i) => { const Icon = moduleIcons[i]; return <button type="button" key={guide.id} role="tab" id={`tab-${guide.id}`} aria-label={guide.title} aria-controls={`panel-${guide.id}`} aria-selected={active.id === guide.id} tabIndex={active.id === guide.id ? 0 : -1} onClick={() => chooseModule(guide.id)}><Icon size={22} aria-hidden="true" /><span>{moduleLabels[i]}</span><ChevronRight size={17} aria-hidden="true" /></button>; })}
    </div>
    <div className="guide-panels">{guides.map(guide => <section key={guide.id} role="tabpanel" id={`panel-${guide.id}`} aria-labelledby={`tab-${guide.id}`} hidden={guide.id !== active.id} tabIndex={0}>
      <h2>{guide.title}</h2><p className="guide-module-intro">{guide.intro}</p>
      {guide.id === active.id && <>
        <Diagram guide={guide} selected={selected} choose={chooseStep} />
        <div className="guide-reading">
          <div className="guide-reading-heading"><span>{isLinear ? 'Station' : 'Auswahl'} {index + 1} / {active.steps.length}</span><details className="guide-jump"><summary>{isLinear ? 'Direkt zur Station' : 'Anderes Thema auswählen'}</summary><label htmlFor="education-station">Station auswählen</label><select id="education-station" value={selected.id} onChange={event => chooseStep(event.target.value)}>{active.steps.map((step, i) => <option key={step.id} value={step.id}>{i + 1}. {step.title}</option>)}</select></details></div>
          {guide.steps.map(step => <section id={`step-${step.id}`} key={step.id} className="guide-explanation" hidden={selected.id !== step.id} aria-labelledby={`heading-${step.id}`}>
            <h3 id={`heading-${step.id}`}>{step.title}</h3><p className="guide-short-explanation">{step.summary}</p>
            <details className="guide-depth"><summary><BookOpen size={18} aria-hidden="true" />Genauer erklärt</summary><p>{step.detail}</p></details>
            <div className="guide-related">{step.glossaryIds.map(id => { const term = glossary.find(entry => entry.id === id); return term ? <Link key={id} href={`/wissen/lexikon?begriff=${id}#${id}`}>{term.term}</Link> : null; })}</div>
            <details className="guide-inline-source"><summary>Quellen zu diesem Inhalt</summary><ul>{guide.source.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title}<span className="sr-only"> (neuer Tab)</span></a></li>)}</ul><p>{guide.reviewStatus}</p></details>
          </section>)}
          <div className="guide-step-navigation"><button type="button" className="button quiet" disabled={index === 0} onClick={() => chooseStep(active.steps[index - 1].id)}><ChevronLeft size={19} aria-hidden="true" />Zurück</button><p role="status" aria-live="polite">{isLinear ? `Station ${index + 1} von ${active.steps.length}` : `${selected.title}`}</p><button type="button" className="button" disabled={index === active.steps.length - 1} onClick={() => chooseStep(active.steps[index + 1].id)}>Weiter<ChevronRight size={19} aria-hidden="true" /></button></div>
        </div>
        {guide.id === 'bundesgesetz' && index >= 8 && index <= 9 && <div className="guide-law-types"><fieldset><legend>Zwei Wege im Bundesrat</legend>{guide.branches.slice(0, 2).map((branch, i) => <label key={branch.title}><input type="radio" name="gesetzart" checked={lawType === i} onChange={() => update({ gesetzart: i === 0 ? 'zustimmung' : 'einspruch' })} />{branch.title}</label>)}</fieldset><p>{guide.branches[lawType].text}</p><p className="guide-law-note">{guide.branches[2].text}</p></div>}
        {guide.branches.length > 0 && <details className="guide-special-cases"><summary><GitBranch size={18} aria-hidden="true" />{guide.id === 'haushalt' ? 'Die beiden Sichtweisen einordnen' : 'Abzweigungen und Besonderheiten'}</summary>{guide.branches.map(branch => <div key={branch.title}><h3>{branch.title}</h3><p>{branch.text}</p></div>)}</details>}
        {guide.id === 'bundesgesetz' && <p className="guide-process-note">Ein Gesetz muss alle erforderlichen Mehrheiten erreichen. Die Darstellung zeigt den Weg beim Zustandekommen eines Gesetzes; Ablehnung oder eine fehlende Zustimmung können das Vorhaben beenden.</p>}
      </>}
    </section>)}</div>
    <noscript><div className="guide-noscript"><h2>Alle Erklärungen zum Lesen</h2><p>Ohne JavaScript sind alle Inhalte hier nacheinander lesbar.</p>{guides.map(guide => <section key={guide.id}><h3>{guide.title}</h3><p>{guide.intro}</p><ol>{guide.steps.map(step => <li key={step.id}><strong>{step.title}</strong><p>{step.summary} {step.detail}</p></li>)}</ol>{guide.branches.map(branch => <p key={branch.title}><strong>{branch.title}: </strong>{branch.text}</p>)}<details><summary>Quellen</summary><ul>{guide.source.map(source => <li key={source.url}><a href={source.url}>{source.title}</a></li>)}</ul></details></section>)}</div></noscript>
  </div>;
}
