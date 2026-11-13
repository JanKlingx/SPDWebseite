# Lokale Verzeichnisse pflegen

Die Personen-, Termin- und Vorgangsdaten sind absichtlich leer. Es liegen keine ausreichend aktuell bestätigten, zur Übernahme freigegebenen Datensätze vor. Leere Listen sind echte redaktionelle Zustände und enthalten keine erfundenen Vorschaupersonen, Veranstaltungen oder Beschlüsse. Nach Ergänzung der JSON-Dateien erscheinen die Inhalte automatisch in Listen, Filtern und Detailseiten; Layoutänderungen sind nicht nötig.

Die verbindlichen TypeScript-Modelle stehen in `src/lib/local-data.ts`. IDs müssen in ihrer Datei eindeutig sein und aus URL-tauglichen Kleinbuchstaben, Ziffern und Bindestrichen bestehen. Text wird von React als Text ausgegeben. Nur überprüfte `https://`-Quellen, lokale Bildpfade und persönlich freigegebene Kontaktdaten eintragen.

## Termine

Datei: `content/events/events.json`, Array von `LocalEvent`.

| Feld | Inhalt |
| --- | --- |
| `id` | Eindeutiger URL-Schlüssel für `/termine/[id]` |
| `title` | Bestätigter Veranstaltungstitel |
| `start` | ISO-Datum mit Uhrzeit und Zeitzone, beispielsweise nach Schema `YYYY-MM-DDTHH:mm:ss+01:00` beziehungsweise `+02:00` in der Sommerzeit |
| `end` | Optionaler bestätigter Endzeitpunkt im selben Format |
| `category` | Kategorie, etwa Gespräch, Sitzung, Veranstaltung oder Jusos |
| `location` | Bestätigter Veranstaltungsort |
| `summary` | Kurze sachliche Beschreibung |
| `description` | Array mit Absätzen für die Detailseite |
| `audience` | Optionale Angabe zur Zielgruppe beziehungsweise Öffentlichkeit |
| `registrationUrl` | Optionaler echter Anmeldelink |
| `source` | Objekt mit `title` und `url` der bestätigenden Quelle |

Die Oberfläche verwendet `Europe/Berlin`. Die aktuelle Terminseite wird dynamisch gerendert, damit die Einordnung in kommende und vergangene Termine nicht am Buildtag stehenbleibt. Mehrtägige Veranstaltungen bleiben bis zu ihrem Enddatum im Bereich „Kommend“. Im Kalender wird der Starttag angezeigt. Die Monate werden montags beginnend mit der korrekten Anzahl an Tagen aufgebaut. Ein Kalenderdatum filtert die Liste darunter; erneut anklicken oder „Alle Tage anzeigen“ hebt den Tagesfilter auf.

URLs speichern `q`, `kategorie`, `zeitraum` (`kommend`, `vergangen`, `alle`), `ansicht` (`liste`, `kalender`), `monat` (`YYYY-MM`) und optional `tag` (`YYYY-MM-DD`). Beim Monatswechsel wird der Zeitraum auf „Alle Termine“ gestellt, damit auch vergangene Monate aufrufbar sind. Suche und Filter funktionieren auch bei leeren Daten; es wird kein Treffer behauptet.

## Personen

Datei: `content/people/people.json`, Array von `Person`.

Erforderlich: `id`, `name`, `role`, `groups`, `biography`, `interests`, `source` (`title`, `url`) und `verifiedAt` (ISO-Datum). Für `groups` sind `Vorstand`, `Fraktion`, `Ortsbeiräte`, `Mandatsträger`, `Jusos` vorgesehen. Eine Person darf mehreren Bereichen angehören. Optional: `body` (Gremium), `district` (Stadtteil), `image` (lokaler Pfad unter `/images/people/`), `imageAlt`, `email`.

Neue Profile erscheinen automatisch unter `/menschen/[id]`. Wenn kein Foto vorliegt, zeigt die Oberfläche einen ausdrücklich beschrifteten Bildplatzhalter. Funktionen müssen nach Wahlen und personellen Änderungen neu überprüft werden. Ein archivierter Pressebericht genügt nicht als Beleg für ein gegenwärtiges Amt. Biografien, Kontaktangaben und Bildrechte vor Übernahme freigeben lassen.

Die Verzeichnisse sind unter `/menschen`, `/menschen/vorstand`, `/menschen/ortsbeiraete`, `/menschen/mandatstraeger` und `/politik/fraktion` erreichbar. Die Unterseiten wählen die jeweilige Gruppe vor. URL-Parameter: `q`, `gruppe`, `stadtteil`; `gruppe=alle` hebt eine Vorwahl auf. Stadtteilfilter erscheinen in der Oberfläche, sobald mindestens ein Profil einen Stadtteil hat.

## Anträge und Beschlüsse

Datei: `content/politics/motions.json`, Array von `Motion`.

Für neue Vorgänge werden `id`, `title`, `status`, `reason`, `citizenImpact`, `impactKind` und `source` (`title`, `url`) gepflegt. Antragstag, Beschlusstag, Gremium, Antragstellende und Originaldokument werden ergänzt, soweit belegt. Das vollständige Modell, eine Redaktionsvorlage und die Statusregeln stehen in [MOTIONS-GUIDE.md](MOTIONS-GUIDE.md).

Die Ampel unterscheidet `Angenommen`, `In Planung` und `Abgelehnt`. Eingereichte, noch nicht entschiedene Anträge erscheinen neutral als `Entscheidung offen` in der Ansicht „Alle“. Eine Ausschussempfehlung darf nicht als endgültiger Beschluss und ein Beschluss nicht als abgeschlossene Umsetzung dargestellt werden. Frühere Datenwerte bleiben lesbar und werden sachlich normalisiert; es werden keine Vorgänge aus anderen Texten abgeleitet oder erfunden.

Unter `/politik/antraege` werden Suche, Status und Gremium in `q`, `status` und `gremium` gespeichert. Einzelne Vorgänge besitzen aufklappbare Karten mit Begründung, Auswirkungen und Quellen; `?antrag=ID#ID` öffnet eine Karte direkt. Gremienoptionen entstehen aus den Datensätzen.

## Stadtteile

Datei: `content/places/districts.json`. Die 16 Namen wurden anhand der offiziellen [Stadtteilübersicht der Stadt Büdingen](https://www.stadt-buedingen.de/Stadtleben/Die-Stadt/Stadtteile/) per Webrecherche am 12. November 2026 geprüft. Die Quelle war im Recherchewerkzeug mit einem Crawlzeitpunkt des Vormonats verfügbar; direkter Terminalabruf war durch den Umgebungsproxy gesperrt. Es wurden ausschließlich die stabilen Stadtteilnamen übernommen, keine aktuellen Amtsinhaber oder Kontaktdaten.

`/vor-ort` bietet die Stadtteilsuche (`q`) und aufklappbare Abschnitte. Links führen zur entsprechenden Nachrichtensuche und nach Stadtteil gefilterten Ortsbeiratsübersicht. Ortsbezogene politische Aussagen und SPD-Ansprechpersonen bleiben bis zur gesonderten Verifikation redaktionell offen.

## Prüfen

Nach Änderungen `npm run typecheck`, `npm run lint` und `npm run build` ausführen. Personen-, Termin- und Vorgangsfilter sind zusätzlich als reine Funktionen exportiert (`filterPeople`, `filterEvents`, `filterMotions`), damit Tests Datensätze als Fixtures ausschließlich im Testbereich verwenden können. Testdaten dürfen nicht in den öffentlichen Inhaltsdateien veröffentlicht werden.
