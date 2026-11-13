# UX revision review · 13 November 2026

The attached UX brief explicitly authorizes the programme/topic route deletions, the retired Jusos sections, central policy reading, graphical education, an epoch-led historical overview and the motion traffic lights. The locked SPD system and all source data remain.

## Before and after

The initial production build was captured on the same five routes: policy, Jusos, guides, history and motions. Hallmark recorded 158 initial links and 11 fields. The initial design scan found one field-edge contrast failure on the old motions page.

The final static scan has **0 FAIL, 0 WARN**, with the existing recorded brand/reading exceptions. The final rendered scan covers five routes at the Hallmark responsive widths and produces 25 screenshots. It has **no colour, contrast, layout, wrapping, focus or responsive failures**. A progress-fill warning was confirmed as non-text: its 4.20:1 contrast exceeds the applicable 3:1 component requirement. Text contrast is checked separately.

The `--kept` inventory comparison was also run. Requested removals, renamed headings and conditionally mounted guide/history references are recorded in `revision-acknowledgements.css`; the script and its gates were not modified. Source links were checked against the unchanged guide sources and term IDs, and historical links against the unchanged event IDs.

One inventory limitation remains explicitly reported: the tool counts one fewer anonymous select on the motions page. The old status dropdown has been replaced by the four requested labelled buttons, retaining the `status` URL parameter. The tool's anonymous-field count branch does not consult its approved-removal list, so it still reports `FAIL kept` despite the change being recorded. This is a known comparison limitation, not a missing filter; normalisation, filtering, search/reset and filled/empty cards passed the functional tests. The raw comparison also notes the year 1931 disappearing from the initial visible excerpt; historical data is unchanged and remains available in the archive/details. No clean full-inventory pass is claimed.

Local raw reports: `work/ux-before-lint.txt`, `work/ux-final-lint.txt`, `work/ux-acknowledged-lint.txt`. The generated comparison is `.hallmark/compare.html`; screenshots are ignored rather than committed.

## Independent finish review

Fresh-context review verdict: **fix**, two concrete findings. The reviewer found the revised history, process graphics and Jusos participation clearer and asked to preserve the SPD identity, source quality and honest gaps.

1. The motion empty state was too far below the status legend and filters. A compact explicit notice now appears before both; the redundant late empty block was removed. **Resolved** by recapture and targeted tests.
2. The motion search icon sat outside the field, with duplicate horizontal inset. The field now spans its available width, with an integrated icon and one correct inner inset. **Resolved** by recapture and targeted tests.

Additional mechanical fixes: one-column topic anchors at very narrow widths and tabular historical years. The original knowledge landing page, glossary component/styles and every `content/` source file have no diff against the starting commit.

## Functional evidence and material

The 50-test main run passed, a separate mobile-diagram test passed for all seven modules at 320/375 pixels, and eight targeted final checks passed. Sixteen main axe views and four final affected views have no WCAG-A/AA findings. Exact run boundaries and limits are in `docs/QA-REVISION.md`.

No records were fabricated. Verified motion data is still required in `content/politics/motions.json`; maintenance and the distinction between preparation, submission, decision and implementation are documented in `docs/MOTIONS-GUIDE.md`. Existing photo/logo slots and other editorial gaps remain unchanged. No production deployment occurred.
