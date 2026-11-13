import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PeopleExplorer } from '@/components/directories/PeopleExplorer';
import { DirectoryIntro } from '@/components/directories/DirectoryParts';
import '@/styles/directories.css';
export const dynamic='force-dynamic';
export const metadata:Metadata={title:'Ortsbeiräte'};
export default function DistrictCouncilsPage(){return <><DirectoryIntro title="Unsere Ortsbeiräte"><p>Stadtteile haben eigene Perspektiven. Hier werden die geprüften SPD-Ansprechpersonen in den Ortsbeiräten vorgestellt.</p></DirectoryIntro><Suspense fallback={<p className="container directory-content" role="status">Ortsbeiratsprofile werden geladen …</p>}><PeopleExplorer initialGroup="Ortsbeiräte"/></Suspense></>}
