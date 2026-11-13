# Politische Bildung: Quellen und redaktioneller Stand

Stand: 12. November 2026. Die Inhalte sind ein sachliches Bildungsangebot, keine Positionensammlung der SPD Büdingen und keine Rechtsberatung. Beispiele sind ausdrücklich als Veranschaulichung formuliert und beschreiben keine echten Büdinger Vorgänge.

## Inhalt

- `content/glossary/entries.json`: 84 vollständige Einträge einschließlich sämtlicher im Master-Prompt vorgegebener Begriffe; Definition, Einordnung, Beispiel, Querverweise und offizielle Referenzen.
- `content/guides/guides.json`: sieben Module mit auswählbaren Stationen: Bundesgesetz, kommunaler Beschluss, Gremien, Haushalt, Kommunalwahl, politische Ebenen und Beteiligung.
- `reviewStatus` benennt die noch offene fachliche und rechtliche Schlussprüfung. Keiner der Datensätze wird als vollständig rechtlich geprüft ausgegeben.

## Durchgeführter Quellenabgleich

Direkte HTTPS-Anfragen aus der Cloud-Umgebung an Bundestag, Bundesrat und Hessen wurden vom Umgebungsproxy mit HTTP 403 abgewiesen. Anschließend wurde das verfügbare Web-Recherchewerkzeug verwendet. Damit waren am 12.11.2026 folgende offizielle Quellen inhaltlich erreichbar beziehungsweise als amtliche Suchtreffer prüfbar:

- [Land Hessen: Wahlsystem der allgemeinen Kommunalwahlen](https://wahlen.hessen.de/kommunalwahlen/allgemeine-kommunalwahlen/wahlsystem): Volltext geprüft. Bestätigt wurden insbesondere Verhältniswahl mit Personenwahl bei mehreren Listen, bis zu drei Stimmen je Person, Panaschieren, Gesamtstimmenbegrenzung, Listenstimmen, Hare/Niemeyer und fehlende allgemeine Fünf-Prozent-Sperrklausel. Nur eine zugelassene Liste ist ein eigener Verfahrensfall.
- [Land Hessen: Informationen und Rechtsgrundlagen](https://wahlen.hessen.de/kommunalwahlen/allgemeine-kommunalwahlen/allgemeine-informationen-und-rechtsgrundlagen): amtlicher Suchtreffer bestätigt den Rechtsgrundlagenbereich und die Anwendung des Hare/Niemeyer-Verfahrens zur Kommunalwahl 2026. Die Rechtsgeschichte der Wahlrechtsänderungen wird im Prototyp nicht eigenständig nacherzählt.
- [Hessisches Statistisches Landesamt: Wahlberechtigung 2026](https://statistik.hessen.de/presse/kommunalwahlen-am-15-maerz-2026-in-hessen-wahlberechtigte): amtliche Suchtreffer zu Deutscher/EU-Staatsangehörigkeit, Mindestalter 18 und sechs Wochen im jeweiligen Wahlgebiet. Die Erklärung nennt gesetzliche Ausnahmen und verweist auf die individuelle Wahlprüfung.
- [Bundestag: Weg der Gesetzgebung](https://www.bundestag.de/parlament/aufgaben/gesetzgebung_neu/gesetzgebung/weg-255468): Volltext geprüft. Initiativrechte, drei Beratungen, Ausschussphase, Beteiligung des Bundesrates sowie Ausfertigung/Verkündung wurden abgeglichen. Zur differenzierten Überstimmung von Bundesratseinsprüchen verweist der Text auf die erforderliche Mehrheit nach Art. 77 Abs. 4 GG statt pauschal nur eine absolute Mehrheit zu nennen.
- [Bundestag: Vermittlungsverfahren](https://www.bundestag.de/parlament/aufgaben/gesetzgebung_neu/gesetzgebung/verm-255464): amtliche Treffer zu unterschiedlichen Verfahrensfolgen bei Zustimmung und Einspruch.
- [Stadt Büdingen: Stadtpolitik](https://www.stadt-buedingen.de/B%C3%BCrgerservice/Stadtpolitik/), [Magistrat](https://www.stadt-buedingen.de/B%C3%BCrgerservice/Stadtpolitik/Magistrat/), [Ortsrecht](https://www.stadt-buedingen.de/B%C3%BCrgerservice/Anliegen-A-Z/Ortsrecht-und-Satzungen): amtliche Treffer bestätigen Organe, Ehrenamt und die verfügbare Geschäftsordnung. Es wurden keine aktuellen Amtsinhaber oder Gremienbesetzungen übernommen.
- [Büdingen: Geschäftsordnung Stadtverordnetenversammlung](https://www.stadt-buedingen.de/media/custom/3139_1064_1.PDF?1718280934=): amtlicher Dokumenttreffer. Keine vollständige PDF-Rechtsstandsprüfung; Aussagen zu konkreten Fristen werden deshalb vermieden.
- [Regierungspräsidium Darmstadt: Kommunaler Finanzausgleich](https://rp-darmstadt.hessen.de/sicherheit-und-kommunales/kommunalaufsicht/finanzausgleich) und [Hessisches Innenministerium: Kommunale Finanzen](https://innen.hessen.de/Kommunales/Kommunale-Finanzen/Kommunale-Finanzen): amtliche Suchtreffer zu den Finanzierungsarten und der Unterscheidung von Zuweisungen. Keine örtlichen Zahlen wurden verwendet.

## Grenzen und notwendige Schlussprüfung

Die amtliche HGO-Fassung im Bürgerservice Hessenrecht war über das Web-Werkzeug nur als JavaScript-Hinweisseite lesbar. Einzelne Normen waren in amtlichen Suchtreffern teilweise zugänglich; dies ersetzt keinen vollständigen Gesetzesabgleich. Die HGO, HKO, GemHVO, Grundgesetz und Fachgesetze sind als amtliche Referenzlinks pro Eintrag hinterlegt. Nicht jeder Link und nicht jede verknüpfte Norm wurde vollständig abgerufen.

Vor einer öffentlichen Veröffentlichung sind alle Einträge fachlich gegenzulesen, der dann geltende Rechtsstand und die örtliche Hauptsatzung/Geschäftsordnung abzugleichen sowie die Quellenlinks zu prüfen. Besonders zu prüfen: Bürgerbegehren/Bürgerentscheid (Ausschlüsse, Fristen, Quoren), Aufgabenzuweisungen und Übertragungen, Haushaltsrecht/Genehmigungen sowie aktives und passives Wahlrecht. Der Prototyp vermeidet ungeprüfte Detailzahlen und konkrete Zuständigkeitsbehauptungen bei einzelnen Büdinger Vorgängen.

## Pflege

Begriffs-IDs und verwandte IDs müssen stabil bleiben. Neue Begriffe unter `content/glossary/entries.json` ergänzen; Quellen und `reviewStatus` immer mitpflegen. Guides verknüpfen Glossarbegriffe über `glossaryIds`. Filterzustände und Prozessauswahl werden in der URL gespeichert, sodass Ansichten teilbar sind. Kein Tracking und keine externen Einbettungen.
