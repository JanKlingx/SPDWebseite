import eventData from '../../content/events/events.json';
import personData from '../../content/people/people.json';
import motionData from '../../content/politics/motions.json';

export interface Source { title: string; url: string }
export interface LocalEvent {
  id: string; title: string; start: string; end?: string; category: string;
  location: string; summary: string; description: string[];
  audience?: string; registrationUrl?: string; source: Source;
}
export type PersonGroup = 'Vorstand' | 'Fraktion' | 'Ortsbeiräte' | 'Mandatsträger' | 'Jusos';
export interface Person {
  id: string; name: string; role: string; groups: PersonGroup[]; body?: string;
  district?: string; biography: string; interests: string[];
  image?: string; imageAlt?: string; email?: string; source: Source;
  verifiedAt: string;
}
export { filterMotions, getMotionStatus, getMotionReason, getMotionImpact, motionStatuses } from './motions';
export type { Motion, MotionStatus, PublicMotionStatus, MotionStage, MotionImpactKind } from './motions';
import type { Motion } from './motions';
export const events = eventData as LocalEvent[];
export const people = personData as Person[];
export const motions = motionData as Motion[];
export const personGroups: PersonGroup[] = ['Vorstand','Fraktion','Ortsbeiräte','Mandatsträger','Jusos'];
export const eventCategories = ['Gespräch','Sitzung','Veranstaltung','Jusos'];
export function formatLocalDate(date: string, withTime = false) {
  return new Intl.DateTimeFormat('de-DE', {timeZone:'Europe/Berlin',day:'numeric',month:'long',year:'numeric',...(withTime?{hour:'2-digit',minute:'2-digit'}:{})}).format(new Date(date));
}
export function localDay(date: string) { return new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Berlin',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(date)); }
export function filterPeople(records:Person[],{query='',group='',district=''}:{query?:string;group?:string;district?:string}) { return records.filter(p=>(!group||group==='alle'||p.groups.includes(group as PersonGroup))&&(!district||p.district===district)&&`${p.name} ${p.role} ${p.biography} ${p.interests.join(' ')}`.toLocaleLowerCase('de').includes(query.toLocaleLowerCase('de'))); }
export function filterEvents(records:LocalEvent[],{query='',category='',period='kommend',today}:{query?:string;category?:string;period?:string;today:string}) { return records.filter(e=>(!category||e.category===category)&&`${e.title} ${e.summary} ${e.location}`.toLocaleLowerCase('de').includes(query.toLocaleLowerCase('de'))&&(period==='alle'||(period==='vergangen'?localDay(e.end||e.start)<today:localDay(e.end||e.start)>=today))).sort((a,b)=>Date.parse(a.start)-Date.parse(b.start)); }
