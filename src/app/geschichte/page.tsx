import type { Metadata } from 'next';
import { HistoryExplorer } from '@/components/history/HistoryExplorer';
import '@/styles/history.css';
export const metadata: Metadata = { title: 'SPD-Geschichte' };
export default function HistoryPage() { return <HistoryExplorer initialLevel="buedingen" />; }
