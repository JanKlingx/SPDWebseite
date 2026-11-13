import type { Metadata } from 'next';
import { Suspense } from 'react';
import { MotionsExplorer } from '@/components/directories/MotionsExplorer';
import { DirectoryIntro } from '@/components/directories/DirectoryParts';
import '@/styles/directories.css';
import '@/styles/motions.css';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Anträge und Beschlüsse',
  description: 'Ziele, belegte Entscheidungen und Auswirkungen der Anträge der SPD Büdingen verständlich nachvollziehen.',
};

export default function MotionsPage() {
  return <><DirectoryIntro title="Anträge und Beschlüsse"><p>Was will die SPD Büdingen verändern? Hier werden Anträge, Entscheidungen und ihre Auswirkungen nachvollziehbar.</p></DirectoryIntro><Suspense fallback={<p className="container directory-content" role="status">Antragsübersicht wird geladen …</p>}><MotionsExplorer /></Suspense></>;
}
