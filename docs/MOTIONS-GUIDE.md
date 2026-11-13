# Anträge und Beschlüsse pflegen

Die zentrale Datenquelle ist `content/politics/motions.json`. Sie bleibt ein leeres Array, bis verifizierte Vorgänge vorliegen. Es gibt keine öffentlichen Demo-Anträge. Die Darstellung unter `/politik/antraege` erzeugt Statusanzeigen, Suche, Gremienfilter und aufklappbare Karten direkt aus diesen Daten.

## Einen verifizierten Vorgang ergänzen

Für neue Datensätze aus einem geprüften Original werden folgende Felder gepflegt:

| Feld | Inhalt |
| --- | --- |
| `id` | Eindeutige, dauerhafte ID ohne Leerzeichen, für Direktlinks |
| `title` | Verständlicher Titel des tatsächlichen Vorgangs |
| `status` | `Angenommen`, `In Planung`, `Abgelehnt` oder `Entscheidung offen` |
| `reason` | Welches konkrete Problem der Antrag lösen soll |
| `citizenImpact` | Verständliche Auswirkungen, bei Vorhaben ausdrücklich im Konjunktiv |
| `impactKind` | `geplant`, `beschlossen` oder `umgesetzt`, nur mit entsprechendem Beleg |
| `source` | Objekt mit `title` und HTTPS-`url` des überprüften Nachweises |
| `date` | Optional: tatsächliches Antragsdatum in `YYYY-MM-DD` |
| `decisionDate` | Optional: belegtes Entscheidungsdatum in `YYYY-MM-DD` |
| `committee` | Optional: zuständiges Gremium |
| `stage` | Optional: `Vorbereitung`, `Eingereicht`, `Ausschussempfehlung`, `Beschlossen`, `In Umsetzung`, `Umgesetzt` oder `Abgelehnt` |
| `documentUrl` | Optional: Originaldokument als HTTPS-URL oder lokaler Dokumentpfad |
| `applicants` | Optional: Array der belegten Antragstellenden |
| `outcome` | Optional: nachgewiesenes Abstimmungsergebnis |
| `implementation` | Optional: belegter Stand der tatsächlichen Umsetzung |

Die vollständigen Typen und die Normalisierung liegen in `src/lib/motions.ts`; `src/lib/local-data.ts` stellt die bisher verwendeten Exports weiterhin bereit. `reason`, `citizenImpact` und `impactKind` sind im TypeScript-Modell zur Lesbarkeit älterer Datensätze optional, sollen bei neuen Einträgen aber redaktionell vollständig ausgefüllt werden. Fehlende Angaben erhalten einen sichtbaren Hinweis, keine erfundene Aussage.

## Status sachlich richtig wählen

- **Angenommen (Grün, Häkchen):** Die Zustimmung des tatsächlich zuständigen Gremiums ist belegt. Eine Empfehlung eines Ausschusses ist noch kein abschließender Beschluss. Die Anzeige belegt keine Umsetzung.
- **In Planung (Gelb, Uhr):** Es handelt sich um eine vorbereitete Idee, die noch nicht eingereicht wurde.
- **Abgelehnt (Rot, Kreuz):** Eine ablehnende Entscheidung ist belegt. Vorgeschlagene Vorteile dürfen nicht als eingetretene Wirkungen beschrieben werden.
- **Entscheidung offen (neutral, Fragezeichen):** Ein Antrag ist eingereicht oder es liegt erst eine Ausschussempfehlung vor. Solche Fälle stehen in der Ansicht „Alle“ und werden nicht als „In Planung“ einsortiert.

Bei `stage: "Eingereicht"` oder `stage: "Ausschussempfehlung"` korrigiert die Darstellung ein versehentlich gesetztes `In Planung` auf `Entscheidung offen`. Widersprüche müssen trotzdem in der Datenpflege geklärt werden. Ein explizit belegter Endstatus bleibt maßgeblich.

Die früheren Werte `Antrag` und `Ausschussempfehlung` werden als offene Entscheidung gelesen. `Beschluss`, `In Umsetzung` und `Umgesetzt` werden dem Status `Angenommen` zugeordnet; die tatsächliche Stufe bleibt sichtbar. Bestehende Felder `type` und `summary` bleiben lesbar. Neue Datensätze verwenden die vier klaren Statusbezeichnungen.

## Begründung und Auswirkungen schreiben

`reason` beantwortet „Warum dieser Antrag?“ mit dem belegten Anlass. `citizenImpact` beantwortet „Was bedeutet das für dich?“.

Für ein noch offenes Vorhaben sind Formulierungen wie „Wenn der Antrag angenommen würde, könnte …“ geeignet. Für angenommene Vorgänge muss zwischen beschlossener Wirkung und tatsächlich nachgewiesener Umsetzung unterschieden werden. Die Karte kennzeichnet diese Ebenen zusätzlich zum redaktionellen Text. `impactKind: "umgesetzt"` nur nach gesonderter Quellenprüfung verwenden. Die Software kann den Wahrheitsgehalt freier Texte nicht prüfen.

## Redaktionsvorlage

Dies ist ausschließlich eine Strukturvorlage für die Dokumentation. Alle Platzhalter vor einer Übernahme ersetzen; nicht als Beispielvorgang veröffentlichen.

```json
{
  "id": "eindeutige-id-nach-original",
  "title": "Geprüften Titel eintragen",
  "status": "Entscheidung offen",
  "stage": "Eingereicht",
  "reason": "Belegten Anlass beschreiben",
  "citizenImpact": "Wenn der Antrag angenommen würde, könnte …",
  "impactKind": "geplant",
  "source": {
    "title": "Titel des geprüften Originalnachweises",
    "url": "HTTPS-URL des geprüften Originalnachweises"
  }
}
```

Suche und Filter speichern ihren Zustand in `q`, `status` und `gremium`. Einzelne Karten können über `?antrag=ID#ID` direkt geöffnet werden. Die vier Filter lauten „Alle“, „Angenommen“, „In Planung“ und „Abgelehnt“. Offene Entscheidungen bleiben in „Alle“ sichtbar.

Nach Änderungen TypeScript, Linting, Build und die passenden Tests ausführen. Fixtures für Testzwecke gehören ausschließlich nach `tests/`, niemals in die öffentliche Inhaltsdatei.
