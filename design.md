# SPD Büdingen design system

Basis: supplied SPD-CD-Manual, August 2024, and the user's explicit website brief. See docs/BRAND-ANALYSIS.md for page references.

- Red #E3000F and white #FFFFFF dominate. Black #000000 is text and a restrained accent. Online grey #EDEDED is the secondary surface. No additional brand hues or large black surfaces.
- Open Sans is the sole family by explicit request, hosted locally with its license. Four weights separate poster headings, navigation, source links and prose.
- Tokens live in src/styles/tokens.css. All colours, font families and spacing use tokens. One capped container, 1380px; growing gutters at large widths. Shared column gap below the hero.
- The character is a local political magazine: strong poster typography, asymmetric reading areas, fine rules, generous section rhythm and still content. Functional state transitions only.
- Home opens with Büdingen and its local chronicle since 1893. Jusos has a red poster; education uses typographic reference tools; history uses dated entries with explicit source quality.
- The official logo is an unmodified future asset, separate from the local text name. Missing images are explicit placeholders at the user's request; no invented faces or photographs.
- Article headlines, glossary office names and source citations may wrap. Navigation and action labels remain compact. Large process and timeline selectors are the reading material being selected.
- One primary action recipe. Filled selected states are filters, not competing calls to action. Visible instant focus, readable contrast, 44px touch targets, reduced motion, native accessible disclosures.

Hallmark's automatic Open Sans gate assumes a second font family. The explicit SPD requirement takes precedence; this is documented as a user override, not a fabricated lint pass.
