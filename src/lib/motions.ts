export type PublicMotionStatus = 'Angenommen' | 'In Planung' | 'Abgelehnt' | 'Entscheidung offen';
export type LegacyMotionStatus = 'Antrag' | 'Ausschussempfehlung' | 'Beschluss' | 'In Umsetzung' | 'Umgesetzt';
export type MotionStatus = PublicMotionStatus | LegacyMotionStatus;
export type MotionStage = 'Vorbereitung' | 'Eingereicht' | 'Ausschussempfehlung' | 'Beschlossen' | 'In Umsetzung' | 'Umgesetzt' | 'Abgelehnt';
export type MotionImpactKind = 'geplant' | 'beschlossen' | 'umgesetzt';

export interface Motion {
  id: string;
  title: string;
  status: MotionStatus;
  reason?: string;
  citizenImpact?: string;
  impactKind?: MotionImpactKind;
  date?: string;
  decisionDate?: string;
  committee?: string;
  stage?: MotionStage;
  source: { title: string; url: string };
  documentUrl?: string;
  applicants?: string[];
  type?: 'Antrag' | 'Beschluss';
  summary?: string;
  outcome?: string;
  implementation?: string;
}

export const motionStatuses: PublicMotionStatus[] = ['Angenommen', 'In Planung', 'Abgelehnt', 'Entscheidung offen'];

export function getMotionStatus(motion: Motion): PublicMotionStatus {
  if (motion.status === 'Abgelehnt') return 'Abgelehnt';
  if (['Angenommen', 'Beschluss', 'In Umsetzung', 'Umgesetzt'].includes(motion.status)) return 'Angenommen';
  if (motion.stage === 'Eingereicht' || motion.stage === 'Ausschussempfehlung') return 'Entscheidung offen';
  if (motion.status === 'In Planung') return 'In Planung';
  return 'Entscheidung offen';
}

export function getMotionReason(motion: Motion): string {
  return motion.reason?.trim() || motion.summary?.trim() || 'Eine überprüfte Begründung wird mit dem Originalantrag ergänzt.';
}

export function getMotionImpact(motion: Motion): { kind: MotionImpactKind; label: string; text: string } {
  const status = getMotionStatus(motion);
  const kind = status === 'Angenommen'
    ? (motion.impactKind === 'umgesetzt' || motion.stage === 'Umgesetzt' || motion.status === 'Umgesetzt' ? 'umgesetzt' : 'beschlossen')
    : 'geplant';
  const label = status === 'Abgelehnt'
    ? 'Vorgeschlagene Wirkung, nicht beschlossen'
    : kind === 'umgesetzt'
      ? 'Nachgewiesene Umsetzung'
      : kind === 'beschlossen'
        ? 'Beschlossen; Umsetzung gesondert prüfen'
        : 'Geplante Wirkung, noch nicht beschlossen';
  return { kind, label, text: motion.citizenImpact?.trim() || 'Zu den konkreten Auswirkungen liegen hier noch keine überprüften Angaben vor.' };
}

export function filterMotions(records: Motion[], { query = '', status = '', committee = '' }: { query?: string; status?: string; committee?: string }) {
  const search = query.toLocaleLowerCase('de');
  return records.filter(motion => (
    (!status || getMotionStatus(motion) === status || (['Antrag', 'Ausschussempfehlung', 'Beschluss', 'In Umsetzung', 'Umgesetzt'].includes(status) && motion.status === status))
    && (!committee || motion.committee === committee)
    && [motion.title, motion.reason, motion.citizenImpact, motion.summary, ...(motion.applicants || [])].filter(Boolean).join(' ').toLocaleLowerCase('de').includes(search)
  )).sort((a, b) => (b.date || b.decisionDate || '').localeCompare(a.date || a.decisionDate || ''));
}
