# SPD Büdingen

Eigenständig lauffähiger Website-Prototyp für Kommunalpolitik, politische Bildung und die Geschichte der Sozialdemokratie in Büdingen. Entwickelt mit Next.js App Router, React und TypeScript; gestaltet mit Hallmark auf Grundlage des bereitgestellten SPD-CD-Manuals 2024.

## Vorschau öffnen

```bash
npm ci
npm run dev
```

Lokal `http://localhost:3000` öffnen. In der ausgewählten Cloud-Umgebung `SPDWebseite` die Vorschau für Port `3000` öffnen. Der Server muss währenddessen laufen. Der Arbeitsbranch heißt `codex/ux-navigation-inhalte`; ausführliche Anleitung für Git-Clone und lokale Produktionsvorschau: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Inhalte und Pflege

Nachrichten liegen als Markdown unter `content/news/`. Strukturierte Inhalte für Themen, Personen, Termine, Glossar, Prozesse und Geschichte liegen in den übrigen `content/`-Verzeichnissen. Seiten und Such-/Filteransichten werden daraus erzeugt.

- [Inhalte mit GitHub/Codex pflegen](docs/CONTENT-GUIDE.md)
- [Designsystem und Tokens](docs/DESIGN-SYSTEM.md)
- [Corporate-Design-Analyse](docs/BRAND-ANALYSIS.md)
- [Anforderungskatalog](docs/REQUIREMENTS.md)
- [Quellenrecherche und offene Angaben](docs/SOURCE-RESEARCH.md)
- [Historische Quellenkritik](docs/HISTORY-SOURCES.md)
- [Überarbeitete Navigation und Inhalte](docs/UX-REVISION.md)
- [Anträge und Beschlüsse pflegen](docs/MOTIONS-GUIDE.md)
- [Prüfbericht der UX-Überarbeitung](docs/QA-REVISION.md)
- [Erstimplementierung: Prüfbericht](docs/QA.md)

Personen, aktuelle Funktionen, kommende Termine und Bilder werden nur mit belastbaren Quellen und Freigaben ergänzt. Deshalb sind einzelne Bestände bewusst leer und Bildstellen klar als Platzhalter gekennzeichnet. Impressum und Datenschutz sind redaktionelle Entwürfe. Die Bildungsinhalte nennen ihren tatsächlichen Prüfstand.

## Entwicklung prüfen

```bash
npm run typecheck
npm run lint
npm run build
```

Für Browserprüfungen mit laufender Vorschau zusätzlich `npm test`. Das Projekt benötigt eine unterstützte Node.js-Version; empfohlen wird Node.js 22 LTS. Die Cloud-Testkonfiguration nutzt Chromium, Details und alternative Browserpfade stehen in der Vorschauanleitung.

Ein Produktions-Build kann lokal mit `npm run start` geöffnet werden. Es ist keine produktive Veröffentlichung eingerichtet. Die bestehende Website und ihre Domain werden durch dieses Repository nicht verändert.
