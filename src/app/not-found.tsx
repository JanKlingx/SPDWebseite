import Link from 'next/link';
export default function NotFound(){return <div className="container section"><h1>Hier geht es nicht weiter.</h1><p>Diese Seite wurde nicht gefunden. Suche nach einem Thema oder kehre zur Startseite zurück.</p><div className="hero-actions"><Link className="button" href="/">Zur Startseite</Link><Link href="/suche">Website durchsuchen</Link></div></div>}
