# Prüfplan für die UX- und Inhaltsüberarbeitung

Grundlage ist der bereitgestellte Überarbeitungsauftrag. Die bewährten Prüfungen für Lexikon, Kontakt, Nachrichten, Kalender, Personen und Stadtteile bleiben erhalten. Prüfungen für bewusst entfernte oder neu gestaltete Funktionen werden an die tatsächlichen Nutzeraufgaben angepasst.

## Geplante Abnahme

| Bereich | Nutzeraufgabe und erwartetes Verhalten |
| --- | --- |
| Navigation und entfernte Routen | Anträge und Beschlüsse ist ein sichtbarer Hauptpunkt. Wahlprogramm und alle neun bisherigen Themendetailrouten liefern 404. Startseite, Suche und Inhaltsseiten enthalten keine Links zu diesen entfernten Zielen. |
| Unsere Politik | Alle neun Themen sind auf der zentralen Seite lesbar, einschließlich Einleitung, belegter Positionen und Quellen. Der Bereich Politik nachvollziehen bleibt als funktionierender Weg zu den übrigen Informationen erhalten. |
| Jusos | Die Seite erklärt die Jusos und bietet nachvollziehbare Beteiligungsmöglichkeiten. Archiv, Was dich bewegt und der Kennenlernen-Link entfallen. Die verbleibenden Verweise führen zu passenden Inhalten und Filtern. |
| Politik verstehen | Das Lexikon und Ein Wort. Mehr Durchblick bleiben erhalten. Alle sieben Abläufe bieten verbundene, anklickbare Stationen, eine erkennbare Auswahl, verständliche Details und Fortschritt. Direktlinks, Vorwärts-/Rückwärtsbedienung, Tastatur und mobile Auswahl funktionieren. Quellen sind dezent am Inhalt vorhanden; ein großer separater Quellen-und-Vertiefung-Abschnitt fehlt. |
| Geschichte | Der Einstieg zeigt wenige Meilensteine statt der vollständigen Chronik. Epochen und Vertiefung machen sämtliche 41 vorhandenen Datensätze auffindbar. Beide Ebenen, Suche, Jahresfilter, Ansichten, Details und Direktlinks bleiben nutzbar. |
| Anträge und Beschlüsse | Ampelfarben haben eindeutige Textbezeichnungen. Angenommen, In Planung und Abgelehnt werden korrekt gefiltert. Eingereichte, noch offene Anträge werden nicht als Planung umgedeutet. Mögliche Auswirkungen sind von beschlossener Umsetzung getrennt. Reine Testdatensätze prüfen die Darstellung, ohne politische Produktdaten zu erfinden. |
| Darstellung und Zugang | Hauptseiten und interaktive Zustände passen bei 320, 375, 768 und 1440 Pixeln. Mobile Navigation und Touch-Ziele funktionieren. Ausgewählte Hauptseiten werden mit axe auf WCAG-A/AA-Funde geprüft. Wesentliche Inhalte bleiben ohne JavaScript lesbar. |

## Ausführung

Browserprüfungen starten erst nach dem Signal für den aktualisierten lokalen Produktionsserver. Es werden keine externen Nachrichten versendet, keine Produktdaten mit Testdaten überschrieben und keine Deployments vorgenommen.

Nach einem vollständigen Lauf werden echte UI-Probleme an die zuständigen Implementierenden gemeldet. Gezielte Bestätigungen prüfen danach die betroffenen Funktionen. Ergebniszahlen werden erst nach tatsächlicher Ausführung eingetragen.

## Ergebnis

Stand: 13. November 2026. Geprüft wurde gegen den lokalen Produktionsserver nach dem erfolgreichen Build.

| Ausführung | Ergebnis |
| --- | --- |
| Vollständige überarbeitete Suite | 50 von 50 Tests bestanden, etwa 1,5 Minuten |
| Zusätzliche Prüfung aller sieben mobilen Diagramme | 1 von 1 Test bestanden, 17,5 Sekunden |
| Gezielte Bestätigung des abschließenden Layoutbatches | 8 von 8 Tests bestanden, 24,2 Sekunden |
| Automatisierte Barrierefreiheitsprüfung innerhalb der Vollsuite | 16 axe-Ansichten ohne WCAG-A/AA-Funde |
| ESLint für Testdateien und Playwright-Konfiguration | Bestanden |

Der Zusatzlauf wurde nachträglich ergänzt und separat ausgeführt; er wird nicht als Bestandteil des vorherigen 50er-Gesamtlaufs ausgegeben. Sein gespeicherter HTML-Bericht wurde vor den Folgeprüfungen kontrolliert: ein erwartungsgemäß bestandener Test, keine Fehler, keine übersprungenen Tests und keine instabilen Ergebnisse. Playwright ersetzt den Standardbericht beim nächsten Lauf; der abschließende Standardbericht enthält deshalb die acht gezielten Bestätigungsprüfungen. `work/qa/results/.last-run.json` meldet weiterhin `passed` mit leerer Fehlerliste.

Der gebündelte Mobiltest wählt alle sieben Module sowohl bei **375 als auch 320 Pixeln** aus. Jede Diagrammstation wird per Touch aktiviert; die zugehörige Erklärung und der URL-Zustand werden geprüft. Alle Stationen erreichen mindestens 44 × 44 Pixel, und keine der 14 Modul-/Breitenkombinationen verursacht horizontales Überlaufen.

Für die visuelle Kontrolle wurden sieben vollständige Bildschirmaufnahmen gespeichert:

```text
work/qa-revision/guide-bundesgesetz-375.png
work/qa-revision/guide-kommunaler-beschluss-375.png
work/qa-revision/guide-gremien-375.png
work/qa-revision/guide-haushalt-375.png
work/qa-revision/guide-kommunalwahl-375.png
work/qa-revision/guide-ebenen-375.png
work/qa-revision/guide-beteiligung-375.png
```

Die Vollsuite bestätigt insbesondere:

- Die Wahlprogrammroute und alle neun Themendetailrouten liefern 404. Die geprüften aktuellen Einstiegsseiten und Suchergebnisse verweisen auf keine dieser gelöschten Routen.
- Alle neun politischen Themen mit Positionen und Quellen sowie alle vier Programmkapitel sind auf der zentralen Politikseite zugänglich.
- Der Jusos-Bereich enthält nachvollziehbare Beteiligungswege und funktionierende Kontakt-/Kalenderverweise, ohne die entfernten Archiv- und Themenabschnitte.
- Alle sieben Erklärmodule reagieren auf Stationenauswahl, Navigation und Direktlinks. Die Quellen stehen an den Erklärungen. Der erhaltene Lexikon-Einstieg funktioniert weiterhin.
- Der Geschichtseinstieg zeigt sechs Meilensteine. Epochenwahl, vollständiges Archiv, beide Ebenen, Werkzeuge und Direktlinks erhalten Zugriff auf sämtliche 41 Datensätze.
- Ampelfilter und Statuskarten zeigen Farbe und Text. Die isolierten Testfälle mit `In Planung` plus `Eingereicht` oder `Ausschussempfehlung` werden als offen behandelt und aus dem Planungsfilter ausgeschlossen. Annahme und nachgewiesene Umsetzung werden getrennt.
- Bewährte Funktionen für Nachrichten, Lexikon, Kontakt, Kalender, Personen, Stadtteile, Tastaturbedienung und Lesen ohne JavaScript bestehen weiterhin.

Reale Antragsdaten bleiben unverändert leer. Befüllte Karten werden ausschließlich als isolierte Testansicht im Browser gerendert; Testdatensätze werden weder in Inhaltsdateien gespeichert noch veröffentlicht.

Der abschließende Layoutbatch wurde nach einem erneuten Produktionsbuild gezielt bestätigt:

```sh
npm test -- --grep 'all political topics|isolated populated cards|public status controls|main pages fit a 320px|WCAG automated checks /politik'
```

Alle acht ausgewählten Prüfungen bestehen. Sie bestätigen die zentralen Politiktexte und Quellen, ausreichend große und vollständig sichtbare Politikanker bei 320 Pixeln, die Suche und das Zurücksetzen der Antragsfilter, den vorangestellten Leerhinweis und befüllte isolierte Statuskarten. Die Hauptseiten einschließlich Geschichte verursachen bei 320 Pixeln kein horizontales Überlaufen. Die vier erneut geprüften axe-Ansichten für Politik und Anträge bei 375 und 1440 Pixeln bleiben ohne WCAG-A/AA-Funde. Unveränderte Prüffälle wurden nach ihrem erfolgreichen Gesamtlauf nicht erneut ausgeführt.

Die automatisierten axe-Ergebnisse ersetzen keine vollständige manuelle Prüfung mit assistiven Technologien und begründen keine umfassende WCAG-Konformitätsbehauptung.
