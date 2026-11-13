import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PeopleExplorer } from '@/components/directories/PeopleExplorer';
import { DirectoryIntro } from '@/components/directories/DirectoryParts';
import '@/styles/directories.css';
export const dynamic='force-dynamic';
export const metadata:Metadata={title:'Weitere Mandatsträgerinnen und Mandatsträger'};
export default function MandatesPage(){return <><DirectoryIntro title="Weitere Mandate"><p>Politisches Engagement verbindet kommunale und weitere Ebenen. Aktuelle Mandate werden mit Funktion und Quelle ergänzt.</p></DirectoryIntro><Suspense fallback={<p className="container directory-content" role="status">Mandatsprofile werden geladen …</p>}><PeopleExplorer initialGroup="Mandatsträger"/></Suspense></>}
