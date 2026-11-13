# Qualitätsprüfung

Die automatisierten Browserprüfungen liegen in `tests/`, die Konfiguration in `playwright.config.ts`.
Der Browser ist das im Cloud-System vorhandene Chromium unter `/usr/bin/chromium`; ein zusätzlicher Browserdownload ist nicht erforderlich.

## Ausführen

```sh
npm run build
npm start
```

In einem zweiten Terminal:

```sh
npm test
```

Der Standard ist `http://127.0.0.1:3000`. Für einen anderen laufenden Server:

```sh
PLAYWRIGHT_BASE_URL=http://127.0.0.1:3001 npm test
```

Bericht, Bildschirmaufnahmen und Fehler-Traces werden unter `work/qa/` abgelegt und nicht eingecheckt.
Geprüft werden Hauptseiten und interne Links, Tastatur- und mobile Navigation, das lokale Kontaktformular, interaktive Bildungs- und Geschichtsbereiche, Kalender und Verzeichnisse sowie horizontales Überlaufen bei 320, 375, 768 und 1440 Pixeln.
Automatisierte axe-Prüfungen auf ausgewählten Hauptseiten laufen bei 375 und 1440 Pixeln mit WCAG-A/AA-Regeln.
Sie ersetzen keine vollständige manuelle Barrierefreiheitsprüfung, insbesondere keine Screenreader-Prüfung.

## Ergebnisstand: 13. November 2026

Alle 37 definierten Prüffälle wurden im Prüfzyklus gegen den lokalen Produktionsserver erfolgreich bestätigt:

| Prüfbereich | Ergebnis |
| --- | --- |
| 21 Funktions- und Datenprüfungen | Bestanden |
| Vier Darstellungsprüfungen bei 320, 375, 768 und 1440 Pixeln | Bestanden |
| Zwölf automatisierte axe-Prüfungen bei 375 und 1440 Pixeln | Keine WCAG-A/AA-Funde |

Der vollständige Produktionslauf am 12. November bestand 35 von 37 Tests. Nach den Korrekturen wurden am 13. November die beiden offenen Fälle und die betroffenen Funktionen gezielt erneut geprüft:

```sh
npm test -- --grep '320px|mobile political|essential content|Jusos topics|news search'
```

Dieser abschließende Lauf bestand **5 von 5 Tests** in 11,1 Sekunden. Er bestätigt insbesondere die langen deutschen Begriffe bei 320 Pixeln, die mobile Modul- und Stationsauswahl, sichtbare Inhalte ohne JavaScript, die Jusos-Verweise mit tatsächlich ausgewählten Filtern sowie Nachrichtensuche mit wiederholten Query-Parametern. Die unveränderten anderen Prüfungen wurden nach ihrem erfolgreichen Lauf nicht unnötig wiederholt.

Zusätzlich wurden die Testdateien und die Playwright-Konfiguration mit ESLint geprüft.

## Was konkret geprüft wurde

- Alle Hauptseiten und die von ihnen verlinkten internen Ziele liefern gültige Seiten; eine unbekannte Route liefert eine hilfreiche 404-Seite.
- Nachrichten lassen sich durchsuchen und filtern. Artikeldetails, Quellen, Archivkennzeichnung und leere Suchergebnisse funktionieren.
- Das Lexikon enthält 84 vollständige Einträge. Suche, A–Z, Themen, Querverweise und aufgeklappte Direktlinks funktionieren.
- Alle sieben Erklärmodule unterstützen Modul- und Stationswechsel, Direktlinks und Tastatursteuerung. Auf Mobilgeräten funktionieren die nativen Auswahlfelder.
- Beide Geschichtsebenen, Suche, Zeiträume, Themen, Jahresgrenzen, Listenansicht, Detailgröße, Ereignis-Direktlinks, offene Forschungszeiträume und Materialgalerie funktionieren.
- Kalendernavigation, Tagesauswahl, Kategorien, Listenansicht und vergangene Termine funktionieren. Personen- und Vorgangsfilter behalten ihren Zustand in der URL.
- Die 16 Stadtteile lassen sich durchsuchen; lokale Nachrichten werden über passende Links gefiltert.
- Startseiten-Zeitstrahl, Jusos-Themen, globale Suche und deren Seitennavigation funktionieren.
- Das Kontaktformular validiert Pflichtfelder und lädt den richtigen lokalen Textentwurf herunter. Es versendet keine Nachricht. Ohne JavaScript bleibt der Download gesperrt.
- Mobile Navigation, Escape mit Fokusrückgabe, Sprunglink und Inhalte ohne JavaScript wurden geprüft. Nachrichten, historische Details und die vollständigen Erklärtexte bleiben lesbar.

Aktuelle Personen, Veranstaltungen und politische Vorgänge bleiben mangels bestätigter Daten bewusst leer. Die Filterlogik für befüllte Verzeichnisse wurde mit ausschließlich in den Tests enthaltenen Datensätzen geprüft, einschließlich Zeitzonengrenzen und chronologischer Sortierung. Diese Testdaten erscheinen nicht auf der Website.

Die fachliche und rechtliche Schlussprüfung der redaktionellen Inhalte sowie eine vollständige Prüfung mit Screenreader bleiben Aufgaben vor einer Veröffentlichung. Die automatisierten Ergebnisse behaupten keine umfassende WCAG-Konformität.
