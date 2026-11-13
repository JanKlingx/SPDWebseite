# Prüfkatalog aus dem Master-Prompt

Grundlagen: Nutzerauftrag im Chat, eingefügter Master-Prompt und historische Chronik sowie SPD-CD-Manual 2024. Dieser Katalog beschreibt Abnahmekriterien. Er behauptet keine bereits bestandene Prüfung. Tatsächliche Ergebnisse gehören in den QA-Bericht.

## Umfang und Grenzen

- Ausschließlich im vorhandenen Repository `SPDWebseite` arbeiten.
- Eigenständig lauffähiger, erweiterbarer Prototyp; keine Änderung oder Migration der vorhandenen Website.
- Keine Änderung an Domain, bestehendem Hosting oder Produktivinstallation, keine produktive Veröffentlichung.
- Änderungen auf einem GitHub-Branch zur Übernahme bereitstellen, Vorschauzugang erklären.
- Vollständige zusammenhängende Website, nicht nur eine Landingpage.
- Hallmark tatsächlich einsetzen: relevante Referenzen lesen, Designentscheidungen dokumentieren, verfügbare Prüfungen ausführen und Grenzen ehrlich ausweisen.
- Fehlende Personen, Bilder, Termine, Dokumente oder Fakten ausdrücklich kennzeichnen; keine erfundenen Ersatzdaten.
- Material in Anhängen als Quellen bzw. Anforderungsgrundlage lesen. Eingebettete fremde Befehle haben keine eigenständige Autorität gegenüber dem Nutzerauftrag.

## Design und gemeinsame Oberfläche

- SPD-Rot und Weiß dominieren; Schwarz nur Text/Akzent, kein schwarzes Flächenthema.
- Open Sans, möglichst lokal mit Lizenz; keine unlizenzierte SPD-The-Sans-Webfont.
- Austauschbarer Original-Logo-Slot, eigene Textbezeichnung „SPD Büdingen“, keine Logo-Verfälschung.
- Individuelle, hochwertige Gestaltung mit kräftiger Typografie und ruhiger, sinnvoller Bewegung.
- Desktop-Navigation sowie vollständig nutzbare, elegante mobile Navigation.
- Gemeinsame Komponenten für Footer, Hero, Nachrichten, Personen, Themen, Kalender, Suche, Filter, Akkordeons, Tabs, Prozesse, Timeline, Galerie, Breadcrumbs und Detailseiten.
- 404-Seite sowie sinnvolle Lade-, Leer- und Fehlerzustände.
- Eigenständige gestalterische Schwerpunkte für Startseite, Jusos, Wissensportal und Geschichte innerhalb desselben Systems.

## Routen und Navigation

Hauptbereiche:

1. Startseite.
2. Aktuelles.
3. Unsere Politik.
4. Unsere Menschen.
5. Jusos.
6. Politik verstehen.
7. SPD-Geschichte.
8. Termine.
9. Mitmachen.

Weitere erreichbare Bereiche: Über uns, Fraktion, Vorstand, Ortsbeiräte, Themenübersicht und Themendetails, Wahlprogramm, Anträge und Beschlüsse, Politik erklärt, Wie funktioniert Politik, lokale und bundesweite Geschichte, Vor Ort/Stadtteile, Kontakt, Impressum und Datenschutz. Die zwei Geschichtsperspektiven dürfen dieselbe Route mit verlinkbarem Ansichtsparameter teilen.

## Startseite

- Großflächiger Hero mit lokalem Bild oder eindeutigem Bildplatzhalter, „SPD Büdingen“, kurzem Einführungstext und ein bis zwei Aktionen.
- Drei bis vier neueste belegte Nachrichten; Datum, Kategorie, Titel, Vorschau, Kurzbeschreibung und Artikellink. Alte Artikel als Archiv kennzeichnen.
- Neun Themen: Bildung/Jugend, Wohnen, Stadtentwicklung, Finanzen, Verkehr, Umwelt, Wirtschaft, Ehrenamt, Soziales.
- Auffällige junge Perspektiven mit sichtbarem Jusos-Link; bei fehlenden aktuellen Daten ehrlicher Materialhinweis.
- Zwei interaktive Bildungs-Vorschauen für Lexikon und Politikabläufe.
- Interaktive Geschichtsvorschau, mindestens Anfänge 1893, Neuorganisation 1919, Arbeiterjugend 1922 nach Chronikprüfung; Link zur vollständigen Geschichte.
- Menschen aus den relevanten Gruppen bzw. klar gekennzeichnete fehlende Profile.
- Kommende Termine bzw. ehrlicher Leerzustand, keine erfundenen Einladungen.
- Footer mit Navigation, Kontakt, SPD-Verweisen, Rechtstexten und nur belegten Social-Media-Zielen.

## Aktuelles und Redaktion

- Chronologische Übersicht, kombinierbare Textsuche und Kategorienfilter, responsive Artikelkarten.
- Artikeldetails mit Titel, Datum, Kategorie, Zusammenfassung, Bildslot, gegliedertem Text, Quellen und verwandten Beiträgen.
- Optionale Bildergalerie, wenn Material verfügbar ist.
- Nachrichten als Markdown/MDX; neue Dateien erscheinen ohne Änderungen an Layout-Komponenten.
- Archiv-/Quellenstatus und Stand von Aussagen werden nachvollziehbar dargestellt.

## Politik, Programm, Transparenz

- Jede Themenseite erklärt kommunale Bedeutung, belegte SPD-Position, belegbare Maßnahmen und verwandte Nachrichten; fehlende Positionen/Umsetzungsnachweise offen benennen.
- Wahlprogramm 2026–2031 mit thematischer Webgliederung. PDF nur anbieten, wenn eine tatsächliche Datei vorhanden ist.
- Fraktionsseite mit belegten Personen, Funktionen und Arbeitsfeldern; Verknüpfung zu Themen und Vorgängen.
- Vorgänge unterscheiden Antrag, Ausschussempfehlung, Beschluss und Umsetzung.
- Vorgangsdatenmodell kann Titel, Datum, Antragstellende, Gremium, Kurzbeschreibung, Status, Abstimmung, Dokument und Quelle aufnehmen.
- Keine Abstimmungsergebnisse, Dokumente oder Umsetzungsstände aus einer Parteimeldung ableiten, die sie nicht belegt.

## Menschen, Organisation und Stadtteile

- Bearbeitbares Personenmodell, Gruppen Vorstand/Fraktion/Ortsbeiräte/weitere Mandate/Jusos.
- Profilfelder Foto, Name, Funktion, Gremium, Kurzbiografie, Themen und freigegebener Kontakt; fehlende Angaben nicht erfinden.
- Aktuelle Funktionen mit aktuellen Quellen prüfen; Kandidatur ist kein Mandat.
- Über uns erklärt Organisation, Grundwerte, kommunale Arbeit, Vorstand/Fraktion, Ortsbezirksbezug und verweist zur Geschichte.
- Vor Ort bietet eine belegte Stadtteilübersicht und passende lokale Nachrichten/Themen; keine erfundenen Ortsvereine oder Mitglieder.

## Jusos

- Eigenständiger auffälliger Hero, austauschbarer Gruppenfoto-Slot.
- Sachliche Erklärung der Jusos und der Verbindung zur SPD; Möglichkeit des Engagements.
- Existenz und Ansprechpartner einer aktuell aktiven örtlichen Gruppe prüfen; historische Aktivität nicht als heutige Struktur behaupten.
- Profile, Projekte und Termine nur aus gesicherten Informationen.
- Jugendbezogene Nachrichten aus demselben Nachrichtensystem filtern.
- Jugendbeteiligung, Bildung, Digitalisierung, Mobilität, Wohnen und Freizeit als Themen; Forderungen nur mit Quelle.
- Interaktive Inhaltsbereiche und funktionierende Kontakt-/Mitmachverweise.

## Politik-Lexikon

- Mindestens 70 vollständige Einträge, alle vom Master-Prompt vorgegebenen Begriffe.
- Strukturierte Dateien unter `content/glossary/`.
- Jeder Eintrag hat Begriff, Anfangsbuchstabe, Kurzdefinition, ausführliche Erklärung und verständliches Beispiel.
- Große Suche, A–Z-Navigation, Themenfilter, aufklappbare Definitionen.
- Verlinkbare Einzelbegriffe und funktionierende verwandte Begriffe.
- Bedienung mit Tastatur und auf Smartphone.
- Schwerpunkt hessische Kommunalpolitik; offizielle Quellen und Rechtsstand prüfen. Wenn eine unabhängige Fachprüfung aussteht, keine solche Prüfung behaupten.

## Sieben politische Erklärmodule

1. Bundesgesetz: Idee, Initiative, Entwurf, erste Lesung, Ausschuss, zweite/dritte Lesung, Beschluss, Bundesrat, gegebenenfalls Vermittlung, Ausfertigung/Verkündung, Inkrafttreten. Zustimmungsgesetze und Einspruchsgesetze unterscheiden.
2. Kommunaler Beschluss: Initiative, Antrag, Magistrat/Verwaltung, Ausschüsse, Stadtverordnetenversammlung, Beschluss, Umsetzung. Keine allgemeingültige Reihenfolge für alle Zuständigkeiten behaupten.
3. Gremien in Büdingen: Bürgerschaft, Stadtverordnetenversammlung, Magistrat, Bürgermeister, Ausschüsse, Ortsbeiräte, Verwaltung.
4. Haushalt: Einnahmen/Ausgaben, Erträge/Aufwendungen, Steuern, Investitionen, Plan/Satzung, Defizit und Sperre; verständliche Diagramme. Fiktive Zahlen nur ausdrücklich markiert.
5. Kommunalwahl Hessen: Wahlrecht, Stimmabgabe, Kumulieren/Panaschieren, Sitzverteilung, Ortsbeirat und Bürgermeisterwahl, Rechtsstand prüfen.
6. Kommune, Land und Bund: Ebenen mit typischen Aufgaben und Zuständigkeiten.
7. Bürgerbeteiligung: rechtliche und praktische Wege der Beteiligung.

Alle Module verbinden klickbare Schritte/Informationen, Detailerklärungen und passende Lexikonlinks. Es genügt nicht, ein Prozessdiagramm nur als Bild oder Fließtext zu zeigen.

## Termine

- Wechsel zwischen Kalender und Liste.
- Kategorienfilter, Jusos separat filterbar.
- Vergangene Termine erreichbar.
- Veranstaltungsdetailseiten aus strukturierten Inhaltsdateien.
- Keine erfundenen Veranstaltungen; Kalender und Filter auch im Leerzustand funktionsfähig.
- ICS-Export ist optional; wenn angeboten, eine echte gültige Datei liefern.

## Mitmachen und Kontakt

- Verifizierte Kontaktmöglichkeiten und zuständige Ansprechpartner, soweit aktuell bestätigt.
- Informationen zur Mitgliedschaft und Link zum offiziellen SPD-Mitgliedsantrag.
- Belegte Social-Media-Ziele und Veranstaltungshinweise.
- Kontaktformular optional; ohne Versanddienst keine erfolgreiche Übermittlung vortäuschen.
- Impressum und Datenschutz als ausdrücklich gekennzeichnete Entwürfe, solange rechtliche Betreiberangaben fehlen.

## Historisches Portal

- Sichtbarer Wechsel Büdingen/Deutschland; historische Ebenen klar unterscheiden.
- Automatisch aus strukturierten Dateien generierter Zeitstrahl, große Jahre, Jahres-/Epochenzugang und Ereignisdetails.
- Auf Smartphone vertikal und ohne erzwungenes horizontales Navigieren.
- Ereignisdetails mit Kontext, Quellen, gegebenenfalls Material und verwandten Ereignissen.
- Verlinkbare Einzelereignisse, Rückweg zur Timeline; Zeiträume/Themen/Jahressprung sind geeignete Zusatzfunktionen.
- Informationen auch ohne Animationen/Scroll-Effekte zugänglich.
- Historische Galerie mit Titel, Datum, Beschreibung, Quelle, Copyright und Ereignisbezug; ohne Bildrechte klarer Platzhalter.
- Historische Personenprofile, soweit durch Chronik belegt.
- Aufklappbare frühere Vorsitzende mit überlieferten Amtszeiten, Lücken und Unklarheiten. Keine fehlenden Namen ergänzen.
- Daten mindestens ID, Titel, Zeitangabe, Beschreibung, Kategorie, historische Ebene und Quellen; optionale Bilder/Querverweise.

### Lokale Zeiträume und Inhalte

- 1893–1903: Versammlung am 28. Mai 1893, Heinrich Prinz, Kaiserreich/Wahlrecht, Sozialistengesetz und Risiken des Engagements.
- 1903–1919: Heinrich Busold, Arbeitervereine/-turnen/-gesang/Radfahren, Saalbau Valentin, Glasfabrik, Krieg und Novemberrevolution.
- 1919–1933: Neuorganisation, Friedrich Stübing, Arbeiterjugend 1922, Reichsbanner, Frauen, AWO, kommunale Arbeit, Krisen und Bedrohung der Demokratie.
- 1933–1945: Ausschaltung/Verfolgung, Auflösung des Ortsvereins, begrenzte Quellenlage, dokumentierte Schicksale. Sachlich-respektvoll, keine spielerische Gewalt-/Verfolgungsanimation.
- 1945–1949: lokale Treffen, Besatzungsrahmen, Wiederorganisation und klar getrennter bundesweiter Neubeginn.
- 1949–1969, 1969–1982, 1982–1989 und 1989–2000: Chronikmaterial und bundesweite Kontexte auseinanderhalten.
- 2000 bis heute: nur belegte lokale Ergänzungen; sonst ausdrücklich redaktionelle Lücken.

### Bundesweite Meilensteine

1863 ADAV, 1875 Gotha, 1878–1890 Sozialistengesetz, 1890 SPD-Bezeichnung, 1918/1919 Republik, 1933 Gegenstimmen zum Ermächtigungsgesetz und Verbot, Wiederaufbau 1945, Godesberg 1959, Brandt 1969/Nobelpreis 1971, Schmidt 1974, 1989/1990 Einheit und ostdeutsche Sozialdemokratie, Regierungswechsel 1998, wesentliche Entwicklungen der 2000er, Scholz 2021; spätere Ereignisse nur aktuell verifiziert. Zusätzliche Programme/Personen nur mit seriöser Quelle.

## Architektur und Pflege

- Vorzugsweise Next.js App Router, TypeScript und React; Tailwind/Lucide sind vorgeschlagen, keine Bedingung für die inhaltliche Funktion.
- Inhalt von Layout/Logik trennen; zentrale Tokens und wiederverwendbare Komponenten.
- Längere Texte als Markdown/MDX, strukturierte Daten als JSON/TypeScript.
- Dokumentation für neue Nachrichten, Personen, Termine, Glossar, Geschichte, Bildtausch und Änderungen über Codex.
- Hostinganbieter offenhalten, lokale Vorschau und mögliche spätere Hostingwege dokumentieren, nichts produktiv deployen.

## Nachweisbare Qualitätsprüfung

- Erfolgreicher Produktions-Build.
- Linting und geeignete automatisierte Funktionsprüfungen.
- Alle internen Links und Routen, Suche, A–Z, Filter, Prozesse, Timeline-Wechsel, Galerie und Kalender prüfen.
- Mobile Darstellung, Navigation, Überläufe und Touchziele tatsächlich im Browser prüfen.
- Semantisches HTML, sichtbarer Fokus, Tastatur, Beschriftungen, Screenreaderzustände, Alttexte, Kontraste und reduzierte Bewegung prüfen; Ziel WCAG 2.2 AA, keine ungeprüfte Konformitätsbehauptung.
- Responsive optimierte Bilder, Lazy Loading, geringe unnötige Skriptlast.
- Keine Tracker oder ungefragten externen Einbettungen; keine Geheimnisse; sichere Behandlung von Eingaben.
- Verfügbare Hallmark-Static-/Render-Prüfungen durchführen, Befunde beheben oder begründete Ausnahmen dokumentieren.
- Fertige Änderungen und verbleibende redaktionelle Materiallücken im Abschluss offen benennen.

## Abschlussabgleich mit der Implementierung

Der folgende Stand beruht auf einer Gegenprüfung der Routen, Komponenten, Inhaltsdateien und Pflegedokumentation. Er ist keine Behauptung über noch nicht ausgeführte finale Tests. Tatsächliche Build-, Browser- und Hallmark-Ergebnisse werden in [QA.md](QA.md) dokumentiert.

| Anforderungsbereich | Vorhandene Umsetzung |
| --- | --- |
| Seitenstruktur | Alle neun Hauptbereiche sowie Über uns, Kontakt, Rechtstextentwürfe, Vorstand, Fraktion, Ortsbeiräte, weitere Mandate, Stadtteile, Themen und Wahlprogramm sind als Routen vorhanden |
| Nachrichten | Vier belegte Markdown-Artikel; Übersicht mit kombinierter Suche, Kategorie und Thema als URL-Parameter, Detailseiten, Quellen und verwandten Beiträgen; doppelte Suchparameter werden als ungültiger Mehrfachwert verworfen statt einen Serverfehler auszulösen |
| Politik | Neun Themendetails, vier Kapitel der Programmzusammenfassung sowie durchsuchbare/filterbare Vorgangsübersicht und Erklärung der Statusunterschiede |
| Wissen | 84 vollständige Glossareinträge mit A–Z, Suche, Themen, nativen Aufklappdetails, Direktlinks und Querverweisen; sieben interaktive Erklärmodule, Bundesgesetz mit zwölf Stationen und Verfahrensvarianten |
| Geschichte | Getrennte Routen für Büdingen und Deutschland sowie kombinierte Ansicht; Suche, Epochen-/Themen-/Jahresfilter, Jahresnavigation, verlinkbare Ereignisse, Größen-/Ansichtswechsel, historische Personen, Galerie und Vorsitzendenliste |
| Lokale historische Lücken | In den 19 lokalen Datensätzen sind die fünf offenen Zeiträume 1949–1969, 1969–1982, 1982–1989, 1989–2000 und 2000 bis heute als `pending` enthalten und sichtbar unter „Offene Zeiträume“ aufrufbar. Die 22 bundesweiten Datensätze enthalten ebenfalls einen gekennzeichneten offenen Anschlusszeitraum |
| Termine und Verzeichnisse | Kalender-/Listenwechsel, Monats- und Tageswahl, Kategorien einschließlich Jusos, vergangene Termine und Detailrouten; Personen-/Gremienfilter sowie Stadtteilsuche sind implementiert. Öffentliche Bestände bleiben ohne gesicherte Daten leer |
| Kontakt | Funktionierender lokaler Download eines Nachrichtenentwurfs, keine vorgetäuschte Übermittlung; weiterführendes Kontaktangebot und offizielle Mitgliedschaftsseite verlinkt |
| Bildpflege | Hauptmotive und Original-Logo über `content/media.json`; Nachrichtenbilder über Markdown-Felder. Die Startseite übernimmt ebenfalls vorhandene Nachrichtenbilder mit responsive Bildgrößen und Alttext |
| Wartung und Vorschau | [CONTENT-GUIDE.md](CONTENT-GUIDE.md) erklärt alle Inhaltstypen und Codex-Pflege; [LOCAL-DATA.md](LOCAL-DATA.md) vertieft lokale Datenmodelle. [DEPLOYMENT.md](DEPLOYMENT.md) und README erklären GitHub-Branch, lokale Vorschau, Cloud-Port 3000 und lokalen Produktionsmodus |

Im Gegenabgleich wurde kein fehlender verpflichtender Funktionsbereich festgestellt. Redaktionelle Lücken sind gesondert sichtbar und stellen keine erfundenen Beispielinhalte dar. Optionale Funktionen wie ein ICS-Export oder eine zusätzliche Artikelbildergalerie werden nicht als vorhanden behauptet.

Eine fachliche und rechtliche Schlussprüfung sämtlicher Bildungsinhalte ist weiterhin offen und wird im jeweiligen `reviewStatus` erklärt. Die vorhandenen 84 Einträge erfüllen Umfang und Datenstruktur; eine abgeschlossene unabhängige Fachprüfung wird ausdrücklich nicht behauptet. Ebenso bleiben ungeklärte aktuelle Personen, kommende Termine, Bildrechte, vollständige lokale Nachkriegsgeschichte und rechtliche Betreiberangaben redaktionelle Aufgaben vor einer späteren Veröffentlichung.
