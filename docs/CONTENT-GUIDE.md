# Inhalte über GitHub und Codex pflegen

Alle Inhalte liegen im Repository. Ein CMS oder ein externer Dienst wird nicht benötigt. Änderungen zunächst auf einem Branch vornehmen, lokal prüfen und anschließend als Pull Request übernehmen. Die bestehende öffentliche Website wird dadurch nicht automatisch geändert.

## Quellen vor Inhalt

Für jede politische Aussage, Person, Veranstaltung und historische Behauptung eine belastbare Quelle angeben. Die Felder `sourceUrl`, `source` oder `sources` sind Teil der jeweiligen Datenmodelle. Politische Ziele sind keine nachgewiesenen Beschlüsse; eine Kandidatur ist kein Mandat. Aktuelle Funktionen und Termine nachprüfen. Die Berichte [SOURCE-RESEARCH.md](SOURCE-RESEARCH.md), [HISTORY-SOURCES.md](HISTORY-SOURCES.md) und gegebenenfalls `EDUCATION-SOURCES.md` dokumentieren Quellen und offene Prüfungen.

Fehlende Bilder und Freigaben werden ausdrücklich als solche gezeigt. Leere Personen- und Termindateien sind ein bewusster Redaktionsstand, kein technischer Fehler. Nur verifizierte Daten ergänzen, keine Musterpersonen in die öffentlichen Daten übernehmen.

## Neue Nachricht

Unter `content/news/` eine UTF-8-Datei mit Endung `.md` anlegen. Die eindeutige `id` bestimmt die URL `/aktuelles/<id>` und darf nur Kleinbuchstaben, Ziffern und Bindestriche enthalten. Der Dateiname sollte der ID entsprechen.

```markdown
---
id: "eindeutige-artikel-id"
title: "Der belegte Titel"
date: "YYYY-MM-DD"
category: "Lokalpolitik"
summary: "Eine kurze eigenständige Zusammenfassung."
sourceUrl: "https://offizielle-quelle.example/beitrag"
sourceTitle: "Bezeichnung der tatsächlichen Quelle"
tags: ["wohnen"]
status: "source-summary"
---

## Hintergrund

Hier steht der geprüfte Text in eigenen Worten.
```

Die Beispieldomain im Muster ist ausdrücklich kein Veröffentlichungsziel. Vor dem Speichern durch eine echte HTTPS-Quellenadresse ersetzen und ein echtes Datum einsetzen. `status: "archive"` kennzeichnet historische Nachrichten sichtbar als Archiv. `source-summary` bezeichnet eine eigenständige Quellenzusammenfassung, nicht eine unabhängige amtliche Bestätigung.

Optional `image: "/images/news/dateiname.webp"` und `imageAlt: "Sachliche Bildbeschreibung"` ergänzen. Ohne Bildpfad erscheint ein klarer Platzhalter. Bilddatei, Freigabe und Bildnachweis zuvor ergänzen. Der Markdown-Loader ignoriert rohes HTML; Formatierung über Überschriften, Absätze und normale Markdown-Links vornehmen. Nachrichten erscheinen chronologisch sowie automatisch in der Suche und ihren Kategorien. `tags` steuern die Themenfilter, darunter `jusos` und `jugend`.

## Personen bearbeiten

`content/people/people.json` ist ein Array. Aktuell sind keine ungeprüften Amtsträger eingetragen. Das Schema steht in `src/lib/local-data.ts`:

- `id`, `name`, `role`: eindeutige Kennung, echter Name und bestätigte Funktion.
- `groups`: eine oder mehrere Gruppen aus `Vorstand`, `Fraktion`, `Ortsbeiräte`, `Mandatsträger`, `Jusos`.
- `biography`, `interests`: geprüfte Kurzbiografie und Themen als String-Array.
- Optional `body`, `district`, `image`, `imageAlt`, `email`.
- `source: { "title": "…", "url": "https://…" }` und `verifiedAt: "YYYY-MM-DD"`.

Nur veröffentlichte und freigegebene Kontaktdaten aufnehmen. Für Fotos Einwilligung, Urheberrecht und Credit klären. Gruppenfilter nutzen dasselbe zentrale Datenmodell.

## Termine ergänzen

`content/events/events.json` ist ein Array. Das Modell `LocalEvent` in `src/lib/local-data.ts` enthält:

- `id`, `title`, `category`, `location`, `summary`.
- `start`, optional `end`: ISO-8601-Datum mit Uhrzeit und Zeitzone, etwa dem zutreffenden Offset für Berlin. Sommer-/Winterzeit beachten.
- `description`: ausführlichere Absätze als String-Array.
- Optional `audience`, `registrationUrl`.
- `source: { "title": "…", "url": "https://…" }`.

Die Kategorien sind zentral definiert: `Gespräch`, `Sitzung`, `Veranstaltung`, `Jusos`. Eine echte Jusos-Veranstaltung mit `category: "Jusos"` kann separat gefiltert werden. Termine erscheinen automatisch in Kalender, Listenansicht und Detailseiten. Vergangene Termine bleiben über die entsprechende Ansicht erreichbar. Ein leeres Array erzeugt einen ehrlichen Leerzustand und keine fingierten Veranstaltungen.

## Politische Themen und Wahlprogramm

`content/topics/topics.json` enthält die Themen. Die `id` bestimmt `/politik/themen/<id>`. `intro` und `localRelevance` erklären das Thema; `position` darf nur aus einer belegten Position abgeleitet sein. `sourceTitle` und `sourceUrl` dokumentieren diese. `relatedNewsIds` verknüpft vorhandene Artikel-IDs. `programChapterId` verweist auf ein Kapitel im Wahlprogramm. `measuresNotice` trennt Ziel und überprüften Umsetzungsstand.

`content/politics/program.json` enthält Quellenangaben und `chapters` mit `id`, `title`, `summary`, `topicIds`. Ein PDF nur dann als Link ergänzen, wenn eine reale freigegebene Datei vorliegt und der Link in der Oberfläche eingebunden wurde. Der aktuelle Prototyp enthält eine belegte Webzusammenfassung und keinen vorgetäuschten PDF-Download.

## Anträge und Beschlüsse

`content/politics/motions.json` enthält `Motion`-Einträge. Erforderlich sind `id`, `title`, `date`, `type`, `applicants`, `committee`, `summary`, `status` und `source`. Optional: `outcome`, `implementation`, `documentUrl`.

Zulässige Statuswerte sind `Antrag`, `Ausschussempfehlung`, `Beschluss`, `In Umsetzung`, `Umgesetzt`, `Abgelehnt`. Einen Status nur mit passendem Nachweis setzen. Eine Parteimeldung über eine Ausschusssitzung reicht nicht automatisch für einen abschließenden Beschluss oder eine Umsetzung. Amtliche Originaldokumente bevorzugen.

## Glossarbegriff ergänzen

In `content/glossary/entries.json` einen vollständigen Eintrag ergänzen:

- `id`, `term`, `letter`, `category`.
- `definition`: kurzer Einstieg; `explanation`: verständliche fachliche Erklärung.
- `example`: als Beispiel kenntlich, keine erfundenen tatsächlichen Beschlüsse oder Zahlen.
- `relatedIds`: vorhandene Glossar-IDs, damit Querverweise funktionieren.
- `sources`: Array aus `{ "title": "…", "url": "https://…" }`.
- `reviewStatus`, `reviewedAt`: tatsächlicher Prüfstand und Datum.

Das Lexikon sortiert die Begriffe und erzeugt A–Z-Zugänge und Filter aus den Daten. Bei rechtlichen Begriffen die aktuelle amtliche Fassung prüfen. Einen fachlich oder rechtlich ungeprüften Eintrag nicht als abschließend geprüft kennzeichnen.

## Politikablauf ergänzen

`content/guides/guides.json` enthält Erklärmodule mit `id`, `title`, `intro`, `source` und `steps`. Jeder Schritt hat `id`, `title`, `summary`, `detail` und `glossaryIds`. Optionale `branches` erläutern Verfahrensvarianten. Die Reihenfolge im Array ist die dargestellte Schrittreihenfolge. Verlinkte Begriffe müssen im Glossar existieren. Bei Zuständigkeitsfragen keine schematische Reihenfolge als ausnahmslos geltendes Recht darstellen.

## Historisches Ereignis ergänzen

`content/history/events.json` wird automatisch in der Timeline verwendet. Ein Ereignis enthält:

- `id`, `year` als Zahl, `dateLabel`, `title`, `summary`.
- `body` als Absatz-Array, `category`, `era`.
- `level: "buedingen"` oder `"germany"`.
- `sources` mit Titel sowie optional URL oder Quellenhinweis.
- `status: "verified"`, `"chronicle"` oder `"pending"` entsprechend tatsächlicher Beleglage.
- Optional `relatedIds` mit existierenden Ereignis-IDs.

`chronicle` bedeutet Darstellung aus der bereitgestellten Chronik, keine unabhängige Bestätigung. `pending` markiert offene redaktionelle Ergänzungen. Keine präzisen Daten oder Lebensläufe aus Vermutungen erzeugen. Ereignisse der NS-Verfolgung sachlich und respektvoll bearbeiten.

Weitere Geschichtsdateien:

- `people.json`: historisches Personenprofil mit `name`, `role`, `period`, `summary`, `body`, Quellen und `eventIds`.
- `chairpersons.json`: überlieferter Name und `period`, Hinweis/Quellen/Prüfstand; Lücken nicht vervollständigen.
- `artifacts.json`: Titel, `dateLabel`, Beschreibung, Quelle, `copyright`, `eventId`, `status` und gegebenenfalls `image`. Material erst nach Rechteklärung einsetzen.

## Bilder und Logo

Freigegebene Dateien unter `public/images/` nach Bereich ablegen: `logo`, `people`, `news`, `history`, `jusos`, `buedingen`. Pfade in JSON/Markdown beginnen mit `/images/`, nicht mit `public/`. WebP/AVIF oder geeignete optimierte Originale verwenden, Seitenverhältnis und korrekten Alttext angeben. Bildnachweise dokumentieren und in der Oberfläche ergänzen.

Für die Hauptmotive und das Logo ist `content/media.json` die zentrale Bildliste. Die Schlüssel sind `homeHero`, `jusosHero` und `logo`. `src: null` lässt den Platzhalter stehen. Nach Freigabe `src` durch einen vorhandenen lokalen Pfad unter `/images/` ersetzen, `alt`, Original-`width`/`height`, `credit`, `sourceUrl` und `rights` vollständig pflegen. Die gemeinsame Bildkomponente zeigt dann das echte Bild und gegebenenfalls den Credit. Der Header liest den `logo`-Eintrag; Home und Jusos verwenden ihre jeweiligen Schlüssel. Externe Bild-Hotlinks werden in diesen Slots nicht geladen.

Das offizielle SPD-Logo wird unverändert als Datei eingesetzt. Kein Logo aus Text oder SVG nachzeichnen. Platzhalter und echte Bilder müssen weiterhin klar unterscheidbar sein. Beim Logo Schutzraum und Originalproportionen beachten.

## Mit Codex ändern

Eine gute Arbeitsanweisung nennt Datei, gewünschtes Verhalten, Quelle und Prüfbedarf, zum Beispiel: „Ergänze den freigegebenen Termin in `content/events/events.json` anhand dieser offiziellen Quelle; prüfe Datum, Zeitzone, Filter und Detailseite.“ Bei Designänderungen auf [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md) und Hallmark verweisen.

Nach Änderungen mindestens `npm run typecheck`, `npm run lint` und `npm run build` ausführen. Bei Interaktionsänderungen mit laufender Vorschau zusätzlich `npm test`; bei Bild- oder Layoutänderungen Desktop und Smartphone im Browser kontrollieren. Eine PR-Beschreibung nennt Änderung, Quellen und tatsächlich ausgeführte Prüfungen.
