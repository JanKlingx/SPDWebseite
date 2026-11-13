import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PeopleExplorer } from '@/components/directories/PeopleExplorer';
import { DirectoryIntro } from '@/components/directories/DirectoryParts';
import '@/styles/directories.css';
export const dynamic='force-dynamic';
export const metadata:Metadata={title:'Unsere Menschen'};
export default function PeoplePage(){return <><DirectoryIntro title="Unsere Menschen"><p>Die Menschen hinter der kommunalpolitischen Arbeit. Profile, Funktionen und Schwerpunkte nach persönlicher Freigabe.</p></DirectoryIntro><Suspense fallback={<p className="container directory-content" role="status">Personenverzeichnis wird geladen …</p>}><PeopleExplorer/></Suspense></>}
