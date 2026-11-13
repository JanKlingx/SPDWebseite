import type { Metadata } from 'next';
import { Suspense } from 'react';
import { MotionsExplorer } from '@/components/directories/MotionsExplorer';
import { DirectoryIntro } from '@/components/directories/DirectoryParts';
import '@/styles/directories.css';
export const dynamic='force-dynamic';
export const metadata:Metadata={title:'Anträge und Beschlüsse'};
export default function MotionsPage(){return <><DirectoryIntro title="Anträge & Beschlüsse"><p>Was wird vorgeschlagen? Was ist beschlossen? Und was wurde umgesetzt? Die einzelnen Schritte bleiben klar unterscheidbar.</p></DirectoryIntro><Suspense fallback={<p className="container directory-content" role="status">Vorgangsübersicht wird geladen …</p>}><MotionsExplorer/></Suspense></>}
