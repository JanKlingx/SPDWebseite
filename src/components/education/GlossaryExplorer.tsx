'use client';
import Link from 'next/link';
import { Search, Plus, X } from 'lucide-react';
import { useMemo } from 'react';
import entries from '../../../content/glossary/entries.json';
import { useUrlState } from './useUrlState';
const fold=(text:string)=>text.toLocaleLowerCase('de').normalize('NFD').replace(/\p{Diacritic}/gu,'').replace(/ß/g,'ss');
const categories=[...new Set(entries.map(e=>e.category))].sort((a,b)=>a.localeCompare(b,'de'));
const alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
export function GlossaryExplorer(){
 const {params,update}=useUrlState();
 const query=params.get('q')||'',category=params.get('thema')||'',letter=params.get('buchstabe')||'',selected=params.get('begriff')||'';
 const filtered=useMemo(()=>entries.filter(e=>(!query||fold(`${e.term} ${e.definition} ${e.explanation}`).includes(fold(query)))&&(!category||e.category===category)&&(!letter||fold(e.letter)===fold(letter))),[query,category,letter]);
 return <div className="education-explorer">
  <form className="education-filters" role="search" onSubmit={event=>event.preventDefault()}>
   <div className="education-search"><label htmlFor="glossary-search">Welchen Begriff suchst du?</label><div className="education-input-wrap"><Search size={22} aria-hidden="true"/><input id="glossary-search" name="q" type="search" value={query} onChange={event=>update({q:event.target.value,begriff:''})} placeholder="Zum Beispiel: Magistrat" autoComplete="off"/></div></div>
   <div className="education-select"><label htmlFor="glossary-topic">Thema</label><select id="glossary-topic" name="thema" value={category} onChange={event=>update({thema:event.target.value,begriff:''})}><option value="">Alle Themen</option>{categories.map(c=><option key={c}>{c}</option>)}</select></div>
  </form>
  <nav className="education-alphabet" aria-label="Begriffe nach Anfangsbuchstaben"><button type="button" aria-pressed={!letter} onClick={()=>update({buchstabe:'',begriff:''})}>Alle</button>{alphabet.map(char=><button type="button" key={char} aria-label={`Buchstabe ${char}`} aria-pressed={letter===char} disabled={!entries.some(e=>fold(e.letter)===fold(char))} onClick={()=>update({buchstabe:char,begriff:''})}>{char}</button>)}</nav>
  <div className="education-results-heading"><p role="status" aria-live="polite">{filtered.length} {filtered.length===1?'Begriff':'Begriffe'}</p>{(query||category||letter)&&<button className="education-reset" type="button" onClick={()=>update({q:'',thema:'',buchstabe:'',begriff:''})}><X size={18} aria-hidden="true"/>Filter zurücksetzen</button>}</div>
  {filtered.length===0?<div className="education-empty"><h2>Kein Begriff passt zur Auswahl.</h2><p>Probiere ein kürzeres Suchwort oder entferne die Filter.</p><button type="button" className="button" onClick={()=>update({q:'',thema:'',buchstabe:''})}>Alle Begriffe anzeigen</button></div>:<div className="glossary-list">{filtered.map(entry=><details className="glossary-entry" key={entry.id} id={entry.id} open={selected===entry.id||undefined}>
   <summary><span className="glossary-letter" aria-hidden="true">{entry.letter}</span><span><strong>{entry.term}</strong><span className="glossary-definition">{entry.definition}</span></span><Plus className="glossary-plus" size={26} aria-hidden="true"/></summary>
   <div className="glossary-body"><p>{entry.explanation}</p><p className="glossary-example">{entry.example}</p>{entry.relatedIds.length>0&&<div className="glossary-related"><span>Weiterlesen</span>{entry.relatedIds.map(id=>{const related=entries.find(e=>e.id===id);return related?<Link key={id} href={`/wissen/lexikon?begriff=${id}#${id}`} onClick={()=>update({q:'',thema:'',buchstabe:'',begriff:id})}>{related.term}</Link>:null})}</div>}
    <div className="education-sources"><strong>Quellen</strong><ul>{entry.sources.map(source=><li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title}<span className="sr-only"> (neuer Tab)</span></a></li>)}</ul></div><p className="education-review">{entry.reviewStatus}</p><Link className="education-permalink" href={`/wissen/lexikon?begriff=${entry.id}#${entry.id}`} onClick={()=>update({begriff:entry.id})}>Direktlink zu diesem Begriff</Link>
   </div>
  </details>)}</div>}
  <p className="education-note">Allgemeine politische Bildung, getrennt von Positionen der SPD Büdingen. Vereinfachte Erklärungen ersetzen keine Prüfung eines konkreten Rechtsfalls.</p>
 </div>
}
