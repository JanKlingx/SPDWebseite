import { getNews } from './news';
import glossary from '../../content/glossary/entries.json';
import events from '../../content/history/events.json';
import guides from '../../content/guides/guides.json';
import topics from '../../content/topics/topics.json';
export interface SearchEntry {id:string;title:string;description:string;category:string;href:string;text:string}
export function getSearchEntries():SearchEntry[]{return [
 ...getNews().map(a=>({id:`news-${a.id}`,title:a.title,description:a.summary,category:'Nachrichten',href:`/aktuelles/${a.id}`,text:a.body})),
 ...glossary.map(e=>({id:`glossary-${e.id}`,title:e.term,description:e.definition,category:'Lexikon',href:`/wissen/lexikon?begriff=${e.id}#${e.id}`,text:`${e.explanation} ${e.example}`})),
 ...events.map(e=>({id:`history-${e.id}`,title:e.title,description:`${e.dateLabel}: ${e.summary}`,category:'Geschichte',href:`/geschichte/${e.level==='germany'?'deutschland':'buedingen'}?event=${e.id}#${e.id}`,text:e.body.join(' ')})),
 ...guides.map(g=>({id:`guide-${g.id}`,title:g.title,description:g.intro,category:'Politik verstehen',href:`/wissen/ablaeufe?modul=${g.id}`,text:g.steps.map(s=>`${s.title} ${s.detail}`).join(' ')})),
 ...topics.map(t=>({id:`topic-${t.id}`,title:t.title,description:t.intro,category:'Unsere Politik',href:`/politik/themen/${t.id}`,text:`${t.localRelevance} ${t.position}`})),
 ...[{title:'Unsere Menschen',href:'/menschen',description:'Vorstand, Fraktion und Ortsbeiräte.'},{title:'Jusos',href:'/jusos',description:'Junge Perspektiven und Möglichkeiten zum Mitmachen.'},{title:'Termine',href:'/termine',description:'Kalender und Liste bestätigter Veranstaltungen.'},{title:'Mitmachen',href:'/mitmachen',description:'Ideen einbringen und politisch aktiv werden.'},{title:'Kontakt',href:'/kontakt',description:'Eine Nachricht an die SPD Büdingen vorbereiten.'},{title:'Vor Ort',href:'/vor-ort',description:'Büdingen und seine Stadtteile.'},{title:'Wahlprogramm',href:'/politik/wahlprogramm',description:'Die veröffentlichten Positionen für 2026 bis 2031.'},{title:'Anträge und Beschlüsse',href:'/politik/antraege',description:'Politische Vorgänge und ihr belegter Status.'}].map((p,i)=>({id:`page-${i}`,...p,category:'Seiten',text:''}))
]}
