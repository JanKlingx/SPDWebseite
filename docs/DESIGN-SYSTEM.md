# Designsystem SPD Büdingen

Der Prototyp verbindet das vom Nutzer gelieferte SPD-CD-Manual 2024 mit Hallmarks Regeln für bewusst gestaltete Oberflächen. Die Markenquelle ist in [BRAND-ANALYSIS.md](BRAND-ANALYSIS.md) mit Seitenverweisen dokumentiert.

## Markenmaterial

Rot `#E3000F`, Weiß und Schwarz bilden die offizielle Palette. Rot und Weiß tragen die Flächen, Schwarz dient als Schrift und kleiner Akzent. `#EDEDED` ist die ergänzende Online-Hilfsfläche. Keine weiteren Markenfarben oder Farbverläufe hinzufügen. Neutrale Abstufungen im Code dienen Konturen und lesbarer Hierarchie, nicht eigenständigen Themenpaletten.

Open Sans wird lokal aus `@fontsource/open-sans` geladen. Die Lizenz liegt im installierten Paket; sie muss bei Weitergabe der Schriftdateien erhalten bleiben. SPD The Sans ist kein Bestandteil der Website. Kräftige Überschriften tragen die Marke, Beschriftungen bleiben in Satzschreibung ohne gesperrte Großbuchstaben.

Das spätere Original-Logo bleibt eine austauschbare Datei. Die Textbezeichnung „SPD Büdingen“ ist eine regionale Benennung, kein neu gezeichnetes Ortsvereinslogo.

## Zentrale Tokens

`src/styles/tokens.css` ist die Quelle für Farben, Schriftfamilien, Größen, Abstände, Container und Bewegungsdauer. Neue CSS-Dateien konsumieren diese Variablen. Keine individuellen Farb- oder Fontliterale in Komponenten oder nach dem Tokenblock einführen.

Wichtige Rollen:

- `--color-accent`, `--color-accent-ink`: Markenfläche und zugehöriger Text.
- `--color-paper`, `--color-paper-2`, `--color-paper-3`: Seiten- und Hilfsflächen.
- `--color-ink`, `--color-muted`, `--color-rule`: Text und Trennlinien.
- `--color-focus`, `--color-inverse-focus`: sichtbarer Tastaturfokus.
- `--font-body`, `--font-display`: Open Sans mit Fallback.
- `--space-*`, `--gap-columns`, `--gutter`, `--container`: gemeinsame räumliche Skala.
- `--text-*`: typografische Rollen statt zufälliger Größen.
- `--dur-micro`, `--dur-short`, `--ease-out`: kurze zustandsbezogene Übergänge.

## Komposition

Die gemeinsame Seite hat einen begrenzten zentrierten Container und wachsende Außenränder auf sehr breiten Bildschirmen. Große typografische Einstiege, klare Linien und unterschiedlich gewichtete Informationsflächen ersetzen austauschbare Kachelserien. Hauptbereiche teilen Kopf-/Fußnavigation und Tokens, erhalten aber passende Kompositionen für Nachrichten, Jugendthemen, Wissen und Geschichte.

Bildtragende Raster verwenden `minmax(0, 1fr)`. Überschriften dürfen umbrechen und tragen `overflow-wrap: break-word` und `min-width: 0`. `html` und `body` nutzen `overflow-x: clip`, damit Inhalte und Sticky-Verhalten kontrollierbar bleiben. Kein `100vw` als Layoutabkürzung.

## Gemeinsame Klassen

`src/styles/globals.css` definiert unter anderem `container`, `section`, `section-head`, `grid-two`, `grid-three`, `button`, `text-link`, `small`, `muted`, `surface`, `red-section`. Die Bereichsstyles ergänzen diese Sprache, ohne einen zweiten Container oder abweichende Primärbuttonfamilien einzuführen.

`src/styles/editorial.css` trägt Nachrichten, Themen und Programm. Weitere Bereichsstyles liegen ebenfalls unter `src/styles/`; ihr Hallmark-Stempel steht in der ersten nicht leeren Zeile. Die zweite Zeile beschreibt die gestalterische Prüfung. Vorhandene Styles im Rahmen des Hallmark-Workflows behutsam ergänzen und tatsächliche Ausnahmen dokumentieren.

## Zustände und Zugänglichkeit

Alle Interaktionen brauchen klaren Standard-, Hover-, Fokus- und Druckzustand. Native Buttons, Links, Eingaben, Selects und Details-Elemente sind die Basis. Fokus ist sofort sichtbar, Textfelder haben echte sichtbare Labels. Status und Fehler werden durch Text und semantische Attribute vermittelt.

URL-Parameter und verlinkbare IDs erhalten Such-, Filter- und Detailzustände. Die Nachrichtensuche ist ein GET-Formular und benötigt für ihre Grundfunktion kein JavaScript. Tabs und dynamische Filter müssen Tastatur- und Touchbedienung berücksichtigen. Keine Erfolgsmeldung ohne tatsächliche Übermittlung oder Prüfung erzeugen.

Leere Bestände erklären, welches Material fehlt und wie man weiterkommt. Fehlende Porträts werden nicht durch erfundene Gesichter ersetzt. Datenschutz- und Impressumsentwürfe bleiben ausdrücklich als Entwurf erkennbar.

## Bewegung und Mobilgeräte

Bewegung unterstützt eine Zustandsänderung. Keine dekorativen Endlosschleifen, kein Parallaxeffekt und kein `transition: all`. Keine Animation von Breite, Höhe, Position oben oder links. `prefers-reduced-motion: reduce` setzt unnötige Bewegung aus; Inhalte sind standardmäßig sichtbar.

Auf kleinen Bildschirmen wird Navigation als bedienbares Menü angeboten, Raster stapeln sich und die Geschichtslinie bleibt vertikal. Filter bekommen ausreichend Platz, Eingaben behalten eine lesbare Schriftgröße. Kleine Beschriftungen ersetzen keine ausreichend großen Berührungsziele. Mindestens 375 beziehungsweise 390 Pixel und ein breiter Desktop werden tatsächlich geprüft; 320 Pixel sind ein zusätzlicher Grenzfall.

## Material und Qualität

Jeder Platzhalter benennt Motiv und fehlendes freigegebenes Original. Authentische Büdingen-Fotografie verbessert die Website am stärksten. Bei jedem Bild Herkunft, Rechte, Credit und Alttext prüfen; bei historischen Bildern zusätzlich Datierung und Kontext.

Hallmarks Static- und Render-Prüfungen werden ergänzend zu TypeScript, ESLint, Produktions-Build und Browser-/Barrierefreiheitstests genutzt. Das tatsächliche Ergebnis steht im QA-Bericht. Ein erfolgreicher Build ist kein Beleg für vollständige WCAG-Konformität oder eine abgeschlossene fachliche Inhaltsprüfung.
