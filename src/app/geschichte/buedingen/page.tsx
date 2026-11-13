import type { Metadata } from 'next';
import { HistoryExplorer } from '@/components/history/HistoryExplorer';
import '@/styles/history.css';
export const metadata: Metadata = { title: 'Geschichte der SPD in Büdingen' };
export default function LocalHistoryPage() { return <HistoryExplorer initialLevel="buedingen" />; }
