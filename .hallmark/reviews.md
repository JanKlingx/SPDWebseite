# Hallmark review record

Build completed 13 November 2026. Brand prescribed by the supplied SPD manual and explicit user brief. No theme lottery replaced the official identity. The brand scaffold and relevant layout, imagery, craft, interaction, genre, brand and gate references were read and used.

## Hero review

Independent reviewer, fresh context. Verdict: **fix**, three findings.

1. Broken “Gemeinsam”: whole-word line spans and responsive display size. Resolved in 320/375/1280/1440/1920 checks.
2. The local 1893 reference was below the fold: moved into the hero's one-sentence introduction. Resolved.
3. Decorative offset frame around the missing photograph: removed. Resolved.

## Finish review

Independent reviewer, fresh context. Verdict: **fix**, five findings. Resolution scored by the builder against new Hallmark captures and the source.

1. Mobile guides buried explanations below seven tabs and twelve nodes: replaced the mobile navigation with two labelled native selectors. Resolved.
2. Repetitive unresearched local timeline periods: grouped in “Offene Zeiträume”, retaining search, dates and permalinks. Resolved.
3. Thin pre-footer people/events panels: condensed into a compact directory area. Resolved.
4. Footer wordmark underline touched its caption: block layout, no underline, explicit spacing. Resolved.
5. Generic home section names: changed to Büdingen's political topics and the specific reference/decision tools. Resolved.

## Final mechanical checks

- Static application scan: 59 files, **0 FAIL, 0 WARN**.
- Render application scan: 59 files plus Jusos, guides and history routes, **0 FAIL, 0 WARN**. Includes responsive captures and contrast checks.
- Home page scan with full editorial page gates: **0 FAIL, 2 REFLEX, 0 WARN**. Both REFLEX findings are gate 1 detecting the same mandatory Open Sans display family in the shared rule and token declaration. The user's explicit single-family corporate-design requirement supersedes this default. The script's waiver guard requires a second family; it was not altered and no fake second font was added.
- Recorded brand/reading exceptions: absolute corporate colours, neutral surfaces, generous interactive timeline/process targets, complete multiline headlines/official terms/source titles. The system is documented in `design.md`.
- All Finish warnings were fixed or answered on the record. Four Open Sans weights serve distinct reading roles; consistent rectangular form controls are part of the shared information system.

Raw local reports and captures are in ignored `work/` and `.hallmark/shots/`. Browser test evidence and exact run history are documented in `docs/QA.md`.

## Material handoff

The homepage hero and Jusos hero accept originals via `content/media.json` (1600 × 1200 source slots). The logo slot accepts an unchanged official logo at its original proportions. News images belong in Markdown frontmatter; portraits in people data; historical images in the artifact register with source and rights. Sizes and replacement instructions are in `docs/CONTENT-GUIDE.md`.

The single most useful next asset is an approved original photograph of Büdingen for the homepage. Current people, future events, legal operator data and the final specialist review of educational content remain explicit editorial work, without invented replacements.
