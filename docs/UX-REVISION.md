# Überarbeitung von Navigation und Inhalten

Die Überarbeitung setzt auf dem vorhandenen Next.js-Projekt und dem in `design.md` festgehaltenen SPD-Design auf. Rot und Weiß, Open Sans, die gemeinsame Kopf-/Fußnavigation, zentrale Tokens sowie die ausdrücklichen Bildplatzhalter bleiben die Grundlage. Es werden keine neuen lokalen Personen, Gruppen, Termine oder politischen Fakten ergänzt.

## Unsere Politik auf einer Seite

Alle politischen Inhalte sind unter `/politik` zusammengeführt. Eine Themenübersicht verlinkt direkt auf die neun Abschnitte der Seite:

- `#bildung-jugend`
- `#wohnen`
- `#stadtentwicklung`
- `#finanzen`
- `#verkehr`
- `#umwelt`
- `#wirtschaft`
- `#ehrenamt`
- `#soziales`

Jeder Abschnitt zeigt Überschrift, Einleitung und belegte politische Position direkt. Native Aufklappbereiche enthalten die kommunale Einordnung, Hinweise zum überprüften Umsetzungsstand, die vorhandenen Quellen und passende Nachrichten. Die Inhalte bleiben auf derselben Seite lesbar; die Bedienung funktioniert auch ohne JavaScript. Rückverweise führen zur Themenübersicht.

Auch die vier vorhandenen Programmkapitel stehen direkt auf `/politik`, ohne neue inhaltliche Behauptungen. Ihre Anker tragen das Präfix `programm-`, damit das Kapitel „Umwelt“ nicht mit dem gleichnamigen Themenabschnitt kollidiert:

- `#programm-familien`
- `#programm-zusammenleben`
- `#programm-umwelt`
- `#programm-entwicklung`

Die Daten bleiben in `content/topics/topics.json` und `content/politics/program.json` pflegbar. Einträge werden weiterhin aus diesen Dateien generiert. Die Quellenhinweise und die Unterscheidung zwischen politischem Ziel und nachgewiesener Umsetzung bleiben erhalten.

Der Bereich „Politik nachvollziehen“ enthält weiterhin die Fraktion und „Anträge und Beschlüsse“. Der bisherige Wahlprogramm-Eintrag und der Button „Wahlprogramm lesen“ wurden entfernt.

## Entfernte Politikrouten

Auf ausdrücklichen Nutzerwunsch wurden gelöscht:

- `/politik/wahlprogramm`, bisher `src/app/politik/wahlprogramm/page.tsx`.
- `/politik/themen/[slug]`, bisher `src/app/politik/themen/[slug]/page.tsx`.

Diese Inhalte werden nicht umgeleitet oder zusätzlich als Unterseiten weitergeführt. Interne Verweise sollen `/politik#<themen-id>` beziehungsweise `/politik#programm-<kapitel-id>` verwenden. Die Entfernung der Routen und die Bereinigung übergreifender Links gehören zur abschließenden Browser-/Linkprüfung.

## Jusos: Beteiligung verständlich machen

Der rote Einstieg und der sachliche Abschnitt „Was sind die Jusos?“ bleiben erhalten. Der Link „Die Jusos kennenlernen“, der gesamte Archivabschnitt samt Archivverweisen und der unklare Bereich „Was dich bewegt“ wurden entfernt. Die nicht mehr benötigte Komponente `src/components/JusosTopics.tsx` wurde gelöscht; ihre Schalter und Zustandslogik werden nicht weiter ausgeliefert.

Der neue Abschnitt `#mitmachen` nennt konkrete nächste Schritte:

- Eine Frage oder Idee für Büdingen formulieren und auf der Kontaktseite einen Nachrichtenentwurf vorbereiten. Der Hinweis, dass nichts automatisch versendet wird, steht unmittelbar daneben.
- Beteiligungsmöglichkeiten im bestehenden Erklärmodul kennenlernen.
- Bestätigte Jugendveranstaltungen im vorhandenen, nach Jusos gefilterten Kalender aufrufen.

Die Seite behauptet weiterhin keine derzeit aktive örtliche Gruppe oder unbestätigte Mitglieder und Funktionen. Der allgemeine historische Nachrichtenartikel über Jugendpolitik von 2018 bleibt im Nachrichtensystem erhalten; nur das eigenständige Archivangebot der Jusos-Seite wurde entfernt.

## Qualitätsstand dieser Teilbereiche

Die Hallmark-Referenz für Überarbeitungen wurde gelesen. Das bestehende Design bleibt erhalten; die strukturellen Änderungen und Dateilöschungen entsprechen dem ausdrücklichen Auftrag. Die neuen Bereichsstyles verwenden vorhandene Tokens und die globalen Fokus-/Bewegungsregeln. Native Details, Seitenanker und normale Links bilden die Interaktionen.

Die statische Hallmark-Prüfung der Politik-/Jusos-Dateien zusammen mit den globalen Styles und Tokens meldete `0 FAIL` und `0 WARN`. Die vorhandenen dokumentierten Marken-Ausnahmen werden geerbt. Dieser Teillauf ist kein Render-, Build- oder Browsernachweis; die abschließenden Gesamtergebnisse werden im QA-Bericht dokumentiert.

## Politik aktiv nachvollziehen

Die sieben bestehenden Wissensmodule erhalten jeweils eine passende grafische Darstellung: verbundene Verfahrensstationen, Gremienbeziehungen, zwei Haushaltssichten, Wahlverzweigungen, Zuständigkeiten oder Beteiligungswege. Eine Auswahl zeigt unmittelbar eine kurze Erklärung; weitere Details und Quellen sind am Inhalt aufklappbar. Fortschritt wird nur für tatsächliche Abläufe angezeigt. Vermittlung im Gesetzgebungsverfahren ist ausdrücklich ein möglicher Abzweig. Modul- und Schritt-Direktlinks, Tastatursteuerung und die mobile Bedienung bleiben erhalten.

Der Bereich „Ein Wort. Mehr Durchblick.“, die Lexikon-Komponente und deren Styles wurden nicht verändert. Der eigenständige große Quellenabschnitt der Ablaufansicht entfällt; die Nachweise bleiben dezent bei den ausgewählten Inhalten.

## Geschichte mit Überblick und Epochen

Der Einstieg zeigt je Perspektive sechs ausgewählte, belegte Meilensteine. Die verbundene Chronologie öffnet auf Auswahl ein Detailpanel. Epochen, „Alle Ereignisse“ und die aufklappbaren Werkzeuge erschließen weiterhin sämtliche 41 Datensätze. Büdingen und Deutschland bleiben getrennt beziehungsweise ausdrücklich gemeinsam auswählbar. Profile, Vorsitzendenliste, Materialien und offene Forschungszeiträume bleiben im aufklappbaren Archiv erhalten. Die Datendateien wurden nicht gekürzt oder verändert.

## Anträge und Beschlüsse

`/politik/antraege` ist ein eigener sichtbarer Hauptnavigationspunkt. Ampelfarbe, Text und Symbol kennzeichnen Angenommen, In Planung und Abgelehnt. Eingereichte, noch nicht entschiedene Vorgänge bleiben neutral „Entscheidung offen“. Vier Filter, Suche und aufklappbare Karten unterscheiden Anlass, mögliche Bürgerauswirkungen, Entscheidung und belegte Umsetzung.

Die zentrale Datenquelle bleibt `content/politics/motions.json`. Es fehlen weiterhin verifizierte reale Anträge; deshalb steht der entsprechende Hinweis sofort vor Legende und Filtern. Vorlage und Pflege sind in [MOTIONS-GUIDE.md](MOTIONS-GUIDE.md) beschrieben. Testdaten werden ausschließlich in isolierten Tests verwendet.

## Abschließende Prüfung

Produktionsbuild, TypeScript und Linting sind erfolgreich. Der Prüfzyklus umfasst den erfolgreichen 50er-Gesamtlauf, eine zusätzliche Mobilprüfung aller sieben Grafiken und acht gezielte Bestätigungen der letzten Korrekturen. Details und tatsächliche Laufgrenzen stehen in [QA-REVISION.md](QA-REVISION.md). Der unabhängige Hallmark-Review und die ausdrücklich dokumentierte Inventarvergleichsgrenze stehen in [.hallmark/revision-review.md](../.hallmark/revision-review.md).
