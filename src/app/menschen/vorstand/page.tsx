import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PeopleExplorer } from '@/components/directories/PeopleExplorer';
import { DirectoryIntro } from '@/components/directories/DirectoryParts';
import '@/styles/directories.css';
export const dynamic='force-dynamic';
export const metadata:Metadata={title:'Ortsvereinsvorstand'};
export default function BoardPage(){return <><DirectoryIntro title="Unser Vorstand"><p>Der Ortsvereinsvorstand organisiert die politische Arbeit der SPD Büdingen. Die aktuelle Besetzung wird redaktionell abgeglichen.</p></DirectoryIntro><Suspense fallback={<p className="container directory-content" role="status">Vorstandsprofile werden geladen …</p>}><PeopleExplorer initialGroup="Vorstand"/></Suspense></>}
