import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import '@/styles/jusos.css';

export const metadata = { title: 'Jusos | Junge Politik' };

export default function Jusos() {
  return <>
    <section className="jusos-hero"><div className="container"><div>
      <h1>Deine Stadt.<br />Deine Stimme.</h1>
      <p>Junge Perspektiven gehören mitten in die Politik.</p>
      <a className="button" href="#mitmachen">So kannst du mitmachen<ArrowDown size={20} aria-hidden="true" /></a>
    </div><ImagePlaceholder mediaKey="jusosHero" title="Platz für junge Perspektiven." description="Freigegebenes Foto junger Engagierter folgt" /></div></section>

    <section className="section container jusos-intro" aria-labelledby="jusos-about-heading"><h2 id="jusos-about-heading">Was sind<br />die Jusos?</h2><div>
      <p>Die Jusos sind die Jugendorganisation der SPD. Sie bringen junge Perspektiven in politische Debatten ein und bieten Möglichkeiten, sich politisch zu engagieren.</p>
      <p className="muted">Ob derzeit eine aktive örtliche Gruppe in Büdingen besteht, ist noch zu bestätigen. Lokale Mitglieder und Funktionen werden erst nach Prüfung vorgestellt.</p>
    </div></section>

    <section className="surface" id="mitmachen" aria-labelledby="jusos-join-heading"><div className="container section">
      <div className="section-head"><h2 id="jusos-join-heading">So kannst du<br />mitmachen.</h2><p>Stelle deine Fragen, bring eine Idee ein oder lerne politische Beteiligung kennen.</p></div>
      <div className="jusos-participation">
        <article><h3>Fragen und Ideen einbringen</h3><p>Was sollte sich für junge Menschen in Büdingen ändern? Schreib auf, was dir wichtig ist. Du brauchst dafür keine politischen Vorkenntnisse.</p><Link className="text-link" href="/kontakt">Nachricht vorbereiten<ArrowUpRight size={20} aria-hidden="true" /></Link><p className="small muted">Das Kontaktangebot erstellt einen Entwurf. Es versendet keine Nachricht automatisch.</p></article>
        <article><h3>Beteiligung verstehen</h3><p>Wie wird aus deiner Idee ein politisches Anliegen? Entdecke, welche Wege es gibt, Fragen zu stellen und Entscheidungen mitzugestalten.</p><Link className="text-link" href="/wissen/ablaeufe?modul=beteiligung">Möglichkeiten entdecken<ArrowUpRight size={20} aria-hidden="true" /></Link></article>
      </div>
      <div className="jusos-meetings"><h3>Persönlich ins Gespräch kommen</h3><p>Bestätigte Jugendveranstaltungen werden im Kalender ergänzt, sobald Ort, Zeit und Ansprechpersonen geprüft sind.</p><Link className="text-link" href="/termine?kategorie=Jusos">Zu den Jugendterminen<ArrowUpRight size={20} aria-hidden="true" /></Link></div>
    </div></section>
  </>;
}
