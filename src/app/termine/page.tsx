import type { Metadata } from 'next';
import { Suspense } from 'react';
import { EventsExplorer } from '@/components/directories/EventsExplorer';
import { DirectoryIntro } from '@/components/directories/DirectoryParts';
import { localDay } from '@/lib/local-data';
import '@/styles/directories.css';
export const metadata:Metadata={title:'Termine'};
export const dynamic='force-dynamic';
export default function EventsPage(){return <><DirectoryIntro title="Termine"><p>Ins Gespräch kommen. Veranstaltungen und Begegnungen in Büdingen, sobald ihre Angaben bestätigt sind.</p></DirectoryIntro><Suspense fallback={<div className="container directory-content" role="status">Terminkalender wird geladen …</div>}><EventsExplorer today={localDay(new Date().toISOString())}/></Suspense></>}
