# UX revision · 13 November 2026

The user's attached “Überarbeitung der SPD-Büdingen-Webseite – UX, Navigation und Inhalte” explicitly authorizes the structural changes and route removals below. Existing brand, source facts, unrelated functions and the knowledge portal's “Ein Wort. Mehr Durchblick.” area remain.

## Files and ownership

- Edit `src/app/politik/page.tsx`: all nine topics and four programme chapters on one page, topic anchors, existing transparency links.
- Delete `src/app/politik/wahlprogramm/page.tsx` and `src/app/politik/themen/[slug]/page.tsx`, exactly as requested. Their structured content is retained and rendered centrally. The retired URLs return 404.
- Edit `src/app/jusos/page.tsx` and its styles. Delete the now-unused `src/components/JusosTopics.tsx`. Remove the archive feature, abstract theme switcher and “Jusos kennenlernen” action. Unrelated news articles remain in the general news system.
- Recompose `src/components/education/GuideExplorer.tsx` and guide-only styles: seven interactive connected systems, short selected explanations, optional depth and inline source disclosures. Preserve module/step URL identifiers, facts and accessible text fallback.
- Recompose `src/components/history/HistoryExplorer.tsx` and history styles: milestone overview, epochs and selectable detail, full records accessible; keep both historical levels and sources.
- Extend `src/components/directories/MotionsExplorer.tsx`, its page, data model and styles: accessible semantic traffic lights, filters, reasons and citizen implications. Real records remain empty until verified.
- Edit `src/components/layout/Header.tsx`, home policy links and `src/lib/search.ts` to make motions prominent and remove every live reference to retired routes.
- Update affected tests to the changed product requirements; keep unrelated regression coverage.

## Hallmark direction

Locked system from `design.md`; red/white editorial identity and local Open Sans stay. Existing heroes are retained. Functional screens are recomposed within the existing site, rather than rebuilding the website. New green/yellow tokens are semantic states explicitly required by the user.

Pre-flight: `src/styles/tokens.css` provides brand and type; `src/app/layout.tsx` hosts local font files; `package.json` provides Next.js/React/TypeScript. Before captures use the unchanged production build on port 3000; records and screenshots stay under ignored `.hallmark/before*` and `work/`.

The previous template-level font warning remains a documented explicit-user override. The final report will record measured checks, genuine approved deletions and review outcomes without claiming an unrun pass.
