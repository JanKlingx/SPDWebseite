import type { Metadata } from 'next';
import { Suspense } from 'react';
import { DistrictExplorer } from '@/components/directories/DistrictExplorer';
import { DirectoryIntro } from '@/components/directories/DirectoryParts';
import '@/styles/directories.css';
export const dynamic='force-dynamic';
export const metadata:Metadata={title:'Vor Ort in den Stadtteilen'};
export default function DistrictsPage(){return <><DirectoryIntro title="Büdingen ist überall vor Ort."><p>Vom eigenen Stadtteil auf die ganze Stadt schauen. Entdecken Sie die Stadtteile und die zugehörigen Beiträge.</p></DirectoryIntro><Suspense fallback={<p className="container directory-content" role="status">Stadtteile werden geladen …</p>}><DistrictExplorer/></Suspense></>}
