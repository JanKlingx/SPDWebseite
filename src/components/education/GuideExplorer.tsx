'use client';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import guides from '../../../content/guides/guides.json';
import glossary from '../../../content/glossary/entries.json';
import { useUrlState } from './useUrlState';
export function GuideExplorer(){
 const {params,update}=useUrlState();
 const active=guides.find(g=>g.id===params.get('modul'))||guides[0];
 const selectedStep=active.steps.find(s=>s.id===params.get('schritt'))||active.steps[0];
 const currentIndex=active.steps.findIndex(s=>s.id===selectedStep.id);
 function chooseModule(id:string){update({modul:id,schritt:''},true)}
 function chooseStep(id:string){update({modul:active.id,schritt:id})}
 function tabKeys(event:React.KeyboardEvent<HTMLDivElement>){const tabs=Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('[role=tab]'));const index=tabs.findIndex(t=>t===document.activeElement);let next=index;if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(index+1)%tabs.length;else if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(index-1+tabs.length)%tabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;else return;event.preventDefault();tabs[next].focus();chooseModule(guides[next].id)}
 return <div className="education-guides">
  <div className="education-mobile-controls">
   <div><label htmlFor="education-module">Erklärung auswählen</label><select id="education-module" value={active.id} aria-controls={`panel-${active.id}`} onChange={event=>chooseModule(event.target.value)}>{guides.map(guide=><option key={guide.id} value={guide.id}>{guide.title}</option>)}</select></div>
   <div><label htmlFor="education-station">Station auswählen</label><select id="education-station" value={selectedStep.id} aria-controls={`step-${selectedStep.id}`} onChange={event=>chooseStep(event.target.value)}>{active.steps.map((step,i)=><option key={step.id} value={step.id}>{i+1}. {step.title}</option>)}</select></div>
  </div>
  <div className="education-guide-tabs" role="tablist" aria-label="Politische Abläufe" aria-orientation="vertical" onKeyDown={tabKeys}>{guides.map((guide,i)=><button type="button" key={guide.id} role="tab" id={`tab-${guide.id}`} aria-controls={`panel-${guide.id}`} aria-selected={active.id===guide.id} tabIndex={active.id===guide.id?0:-1} onClick={()=>chooseModule(guide.id)}><span aria-hidden="true">{String(i+1).padStart(2,'0')}</span>{guide.title}</button>)}</div>
  <div className="education-guide-panels">{guides.map(guide=><section key={guide.id} role="tabpanel" id={`panel-${guide.id}`} aria-labelledby={`tab-${guide.id}`} hidden={active.id!==guide.id} tabIndex={0}>
   <h2>{guide.title}</h2><p className="guide-intro">{guide.intro}</p>
   <ol className="education-process" aria-label="Stationen der Erklärung">{guide.steps.map((step,i)=><li key={step.id}><button type="button" aria-current={selectedStep.id===step.id?'step':undefined} aria-controls={`step-${step.id}`} onClick={()=>chooseStep(step.id)}><span>{String(i+1).padStart(2,'0')}</span><strong>{step.title}</strong></button></li>)}</ol>
   {guide.steps.map((step,i)=><section className="education-step" key={step.id} id={`step-${step.id}`} hidden={selectedStep.id!==step.id} aria-labelledby={`heading-${step.id}`}>
    <div className="education-step-marker" aria-hidden="true">{String(i+1).padStart(2,'0')}<span>/ {String(guide.steps.length).padStart(2,'0')}</span></div><div><h3 id={`heading-${step.id}`}>{step.title}</h3><p className="education-step-summary">{step.summary}</p><p>{step.detail}</p><div className="glossary-related"><span>Begriffe nachschlagen</span>{step.glossaryIds.map(id=>{const entry=glossary.find(e=>e.id===id);return entry?<Link key={id} href={`/wissen/lexikon?begriff=${id}#${id}`}>{entry.term}</Link>:null})}</div></div>
   </section>)}
   <div className="education-step-navigation"><button type="button" className="button quiet" disabled={currentIndex===0} onClick={()=>chooseStep(active.steps[currentIndex-1].id)}><ChevronLeft size={20} aria-hidden="true"/>Zurück</button><p role="status" aria-live="polite">Station {currentIndex+1} von {active.steps.length}</p><button type="button" className="button" disabled={currentIndex===active.steps.length-1} onClick={()=>chooseStep(active.steps[currentIndex+1].id)}>Weiter<ChevronRight size={20} aria-hidden="true"/></button></div>
   {guide.branches.length>0&&<div className="education-branches"><h3>Was den Weg verändert</h3>{guide.branches.map(branch=><details key={branch.title}><summary>{branch.title}</summary><p>{branch.text}</p></details>)}</div>}
   {guide.id==='haushalt'&&<figure className="education-budget"><figcaption>Zwei Sichten auf den Haushalt</figcaption><div><span>Erträge</span><strong>Ergebnishaushalt</strong><span>Aufwendungen</span></div><div><span>Einzahlungen</span><strong>Finanzhaushalt</strong><span>Auszahlungen</span></div><p>Schema ohne Zahlen. Es bildet keinen konkreten Büdinger Haushalt ab.</p></figure>}
   <div className="education-sources"><strong>Quellen und Vertiefung</strong><ul>{guide.source.map(source=><li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title}<span className="sr-only"> (neuer Tab)</span></a></li>)}</ul></div><p className="education-review">{guide.reviewStatus}</p>
  </section>)}</div>
  <noscript><div className="education-noscript"><h2>Alle Erklärungen zum Lesen</h2>{guides.map(guide=><section key={guide.id}><h3>{guide.title}</h3><p>{guide.intro}</p><ol>{guide.steps.map(step=><li key={step.id}><strong>{step.title}</strong><p>{step.summary} {step.detail}</p></li>)}</ol></section>)}</div></noscript>
 </div>
}
