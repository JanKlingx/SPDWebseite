'use client';
import { useState } from 'react';
import Link from 'next/link';
import events from '../../content/history/events.json';
const featured=['buedingen-1893','buedingen-1919','buedingen-1922'].map(id=>events.find(event=>event.id===id)).filter((e):e is NonNullable<typeof e>=>Boolean(e));
export function HomeHistory(){const [id,setId]=useState(featured[0]?.id);const selected=featured.find(e=>e.id===id)||featured[0];if(!selected)return null;return <div className="home-history"><div className="home-history-years" aria-label="Büdinger Geschichte auswählen">{featured.map(event=><button key={event.id} aria-pressed={selected.id===event.id} onClick={()=>setId(event.id)}>{event.year}</button>)}</div><div className="home-history-story" aria-live="polite"><h3>{selected.title}</h3><p>{selected.summary}</p><Link href={`/geschichte/buedingen?event=${selected.id}#${selected.id}`} className="text-link">Das Ereignis entdecken</Link></div><noscript><Link href="/geschichte/buedingen">Alle historischen Ereignisse lesen</Link></noscript></div>}
