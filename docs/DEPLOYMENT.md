# Vorschau und spätere Hostingmöglichkeiten

Es wurde keine produktive Veröffentlichung beauftragt. Die bestehende Domain, Website und Hostingumgebung bleiben unangetastet. Dieser Prototyp ist ein eigenes Next.js-Projekt im Repository `JanKlingx/SPDWebseite`.

## Vorschau in der ausgewählten Cloud-Umgebung

Im Terminal der Umgebung `SPDWebseite`:

```bash
cd /workspace/SPDWebseite
npm ci
npm run dev
```

Der Entwicklungsserver lauscht auf Port `3000` und `0.0.0.0`. In der Cloud-Oberfläche die Port-/Vorschauansicht öffnen und Port `3000` im Browser anzeigen. In einem Browser derselben Umgebung ist die Adresse `http://localhost:3000` erreichbar. Die Cloud-Oberfläche kann dafür eine eigene weitergeleitete Vorschauadresse erzeugen; `localhost` auf einem anderen Rechner bezeichnet diesen anderen Rechner und ist dort nicht automatisch die Cloud-Vorschau.

Die Portvorschau ist ein Arbeitszugang für diesen Prototyp. Sie ändert keine bestehende öffentliche Website. Der Server muss laufen, solange die Vorschau genutzt wird. Mit `Ctrl+C` im zugehörigen Terminal stoppen.

## Lokal vom GitHub-Branch öffnen

Voraussetzung: Git, eine zum Lockfile passende Node.js-Version (Next.js 16 benötigt mindestens Node.js 20.9; empfohlen Node.js 22 LTS) und npm.

```bash
git clone --branch codex/ux-navigation-inhalte https://github.com/JanKlingx/SPDWebseite.git
cd SPDWebseite
npm ci
npm run dev
```

Anschließend `http://localhost:3000` öffnen. Bei einem privaten Repository muss GitHub-Zugriff bereits eingerichtet sein. Wenn der Branch später übernommen wurde, kann der Standardbranch verwendet werden. Keine Zugangsdaten in Dateien oder Chat kopieren.

## Produktionsmodus lokal prüfen

```bash
npm run build
npm run start
```

Der Build erzeugt `.next/`; `start` bedient diesen Build auf Port `3000`. Ein bereits laufender Entwicklungsserver muss dafür gestoppt oder ein anderer freier Port gewählt werden:

```bash
npm run start -- --port 3001
```

Die Routen mit serverseitiger Such-/Filterauswertung benötigen die Next.js-Laufzeit. Das Projekt ist derzeit kein reiner Ordner statischer HTML-Dateien; nicht ungeprüft nur `public/` oder `.next/` auf gewöhnliches statisches Hosting kopieren.

## Prüfungen

```bash
npm run typecheck
npm run lint
npm run build
```

Mit laufender Vorschau auf Port `3000` können die Browserprüfungen ausgeführt werden:

```bash
npm test
```

Die Playwright-Konfiguration verwendet in dieser Linux-Cloudumgebung `/usr/bin/chromium`. Auf einem anderen System `CHROME_PATH` auf eine tatsächlich installierte Chrome-/Chromium-Datei setzen. Eine andere bereits laufende Vorschau kann über `PLAYWRIGHT_BASE_URL` ausgewählt werden. Prüfberichte liegen unter `work/qa/` und sind nicht zur Veröffentlichung bestimmt. Hallmark wird nach Layoutänderungen zusätzlich gemäß dem Projekt-Workflow ausgeführt; aktuelle Ergebnisse und Grenzen stehen in `docs/QA.md`.

## Später mögliche Hostingwege

Das Projekt kann nach gesonderter Entscheidung auf einem Node.js-Server, in einem dafür vorbereiteten Container oder auf einem Next.js-kompatiblen Hostinganbieter laufen. Dafür sind insbesondere Runtime-Version, Build-/Startbefehl, Domain, HTTPS, Betrieb, Zugriffsschutz für Entwürfe und Umgang mit fehlenden Inhalten zu entscheiden.

Diese Varianten wurden nicht produktiv eingerichtet. Es gibt keine automatisierte Produktiv-Veröffentlichung und keine Migration der vorhandenen Website. Vor einer späteren Veröffentlichung müssen Betreiberangaben/Rechtstexte, aktuelle Personen und Kontakte, Bildrechte sowie fachliche Inhaltsprüfung abgeschlossen und redaktionelle Platzhalter ersetzt oder bewusst entfernt werden.
