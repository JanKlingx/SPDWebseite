import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { PeopleExplorer } from '@/components/directories/PeopleExplorer';
import { DirectoryIntro } from '@/components/directories/DirectoryParts';
import '@/styles/directories.css';
export const dynamic='force-dynamic';
export const metadata:Metadata={title:'SPD-Fraktion'};
export default function FactionPage(){return <><DirectoryIntro title="Die SPD-Fraktion"><p>Kommunalpolitische Arbeit in der Stadtverordnetenversammlung. Geprüfte Mitgliederprofile, politische Themen und nachvollziehbare Vorgänge an einem Ort.</p></DirectoryIntro><Suspense fallback={<p className="container directory-content" role="status">Fraktionsprofile werden geladen …</p>}><PeopleExplorer initialGroup="Fraktion"/></Suspense><section className="surface section"><div className="container"><div className="section-head"><h2>Politische Arbeit nachvollziehen.</h2></div><div className="grid-three"><div><h3>Themen</h3><p>Positionen aus dem veröffentlichten Wahlprogramm.</p><Link className="text-link" href="/politik">Unsere Politik</Link></div><div><h3>Anträge & Beschlüsse</h3><p>Verfahrensschritte und dokumentierte Entscheidungen.</p><Link className="text-link" href="/politik/antraege">Zur Vorgangsübersicht</Link></div><div><h3>Gremien verstehen</h3><p>Wer entscheidet was in der Kommune?</p><Link className="text-link" href="/wissen/ablaeufe">Politik verstehen</Link></div></div></div></section></>}
