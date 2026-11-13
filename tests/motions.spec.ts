import { test, expect } from '@playwright/test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { filterMotions, getMotionStatus, getMotionImpact, type Motion } from '../src/lib/motions';
import { MotionCard } from '../src/components/directories/MotionsExplorer';

// Isolated QA data. These records are never written to product content files.
const source = { title: 'Isolierte Testquelle', url: 'https://example.org/qa-source' };
const fixtures: Motion[] = [
  { id: 'qa-planning', title: 'Vorbereiteter Testantrag', status: 'In Planung', stage: 'Vorbereitung', reason: 'Ein ausschließlich für den Test beschriebenes Problem.', citizenImpact: 'Testfamilien könnten von der vorgeschlagenen Idee profitieren.', impactKind: 'geplant', date: '2026-11-01', committee: 'Testgremium A', source },
  { id: 'qa-accepted', title: 'Angenommener Testantrag', status: 'Angenommen', stage: 'Beschlossen', reason: 'Eine Testentscheidung wurde nachvollziehbar dokumentiert.', citizenImpact: 'Die beschlossene Testmaßnahme ist noch nicht als umgesetzt belegt.', impactKind: 'beschlossen', date: '2026-11-02', decisionDate: '2026-11-03', committee: 'Testgremium A', source },
  { id: 'qa-rejected', title: 'Abgelehnter Testantrag', status: 'Abgelehnt', stage: 'Abgelehnt', reason: 'Ein Testvorschlag fand keine Zustimmung.', citizenImpact: 'Die vorgeschlagene Testwirkung wird nicht als beschlossene Leistung dargestellt.', impactKind: 'geplant', date: '2026-11-04', committee: 'Testgremium B', source },
  { id: 'qa-submitted', title: 'Eingereichter offener Testantrag', status: 'In Planung', stage: 'Eingereicht', reason: 'Dieser Testantrag ist bereits eingereicht.', citizenImpact: 'Die möglichen Auswirkungen hängen noch von einer Entscheidung ab.', impactKind: 'geplant', date: '2026-11-05', source },
  { id: 'qa-recommended', title: 'Beratener offener Testantrag', status: 'In Planung', stage: 'Ausschussempfehlung', reason: 'Eine Ausschussempfehlung ersetzt keine zuständige Entscheidung.', citizenImpact: 'Die Testwirkung ist weiterhin nicht beschlossen.', impactKind: 'geplant', date: '2026-11-06', source },
  { id: 'qa-implemented', title: 'Umgesetzte Testmaßnahme', status: 'Angenommen', stage: 'Umgesetzt', reason: 'Ein gesonderter Testnachweis liegt für die Umsetzung vor.', citizenImpact: 'Diese Testwirkung ist ausdrücklich als nachgewiesene Umsetzung erfasst.', impactKind: 'umgesetzt', implementation: 'Ausschließlich ein Testnachweis, keine Büdinger Maßnahme.', date: '2026-11-07', source },
];

test('traffic-light filters distinguish preparation, decisions and undecided submissions', () => {
  expect(filterMotions(fixtures, { status: 'Angenommen' }).map(motion => motion.id)).toEqual(['qa-implemented', 'qa-accepted']);
  expect(filterMotions(fixtures, { status: 'In Planung' }).map(motion => motion.id)).toEqual(['qa-planning']);
  expect(filterMotions(fixtures, { status: 'Abgelehnt' }).map(motion => motion.id)).toEqual(['qa-rejected']);
  expect(filterMotions(fixtures, {})).toHaveLength(fixtures.length);
  for (const id of ['qa-submitted', 'qa-recommended']) {
    const motion = fixtures.find(item => item.id === id)!;
    expect(getMotionStatus(motion)).toBe('Entscheidung offen');
    expect(filterMotions([motion], { status: 'In Planung' })).toEqual([]);
    expect(filterMotions([motion], {})).toEqual([motion]);
  }
  expect(filterMotions(fixtures, { query: 'Testfamilien' }).map(motion => motion.id)).toEqual(['qa-planning']);
  expect(filterMotions(fixtures, { committee: 'Testgremium A' }).map(motion => motion.id)).toEqual(['qa-accepted', 'qa-planning']);
});

test('decision and implementation remain separate, including legacy records', () => {
  const accepted = fixtures.find(motion => motion.id === 'qa-accepted')!;
  expect(getMotionImpact(accepted).kind).toBe('beschlossen');
  expect(getMotionImpact(accepted).label).toContain('Umsetzung gesondert prüfen');
  expect(getMotionImpact(fixtures[0]).kind).toBe('geplant');
  expect(getMotionImpact(fixtures[0]).label).toContain('noch nicht beschlossen');
  expect(getMotionImpact(fixtures[2]).label).toContain('nicht beschlossen');
  expect(getMotionImpact(fixtures[5]).kind).toBe('umgesetzt');
  expect(getMotionStatus({ ...accepted, status: 'Antrag', stage: 'Eingereicht' })).toBe('Entscheidung offen');
  expect(getMotionStatus({ ...accepted, status: 'Ausschussempfehlung', stage: 'Ausschussempfehlung' })).toBe('Entscheidung offen');
  expect(getMotionStatus({ ...accepted, status: 'Beschluss' })).toBe('Angenommen');
  expect(getMotionImpact({ ...accepted, status: 'In Umsetzung', stage: 'In Umsetzung' }).kind).toBe('beschlossen');
  expect(getMotionImpact({ ...accepted, status: 'Umgesetzt', stage: 'Umgesetzt' }).kind).toBe('umgesetzt');
});

test('isolated populated cards show coloured text statuses, reasons and qualified citizen impacts', async ({ page }) => {
  await page.goto('/politik/antraege');
  const styles = await page.locator('link[rel="stylesheet"]').evaluateAll(nodes => nodes.map(node => `<link rel="stylesheet" href="${(node as HTMLLinkElement).href}">`).join(''));
  const cards = fixtures.map(motion => renderToStaticMarkup(createElement(MotionCard, { motion }))).join('');
  await page.setContent(`<!doctype html><html lang="de"><head>${styles}</head><body><main class="container section"><h1>Isolierte QA-Testansicht</h1>${cards}</main></body></html>`);
  const expectedStatus = ['In Planung', 'Angenommen', 'Abgelehnt', 'Entscheidung offen', 'Entscheidung offen', 'Angenommen'];
  for (const [index, motion] of fixtures.entries()) {
    const card = page.locator(`#${motion.id}`);
    await expect(card.locator('summary')).toContainText(expectedStatus[index]);
    await card.locator('summary').click();
    await expect(card.getByRole('heading', { name: 'Warum dieser Antrag?', exact: true })).toBeVisible();
    await expect(card.getByText(motion.reason!, { exact: true })).toBeVisible();
    await expect(card.getByRole('heading', { name: 'Was bedeutet das für dich?', exact: true })).toBeVisible();
    await expect(card.getByText(motion.citizenImpact!, { exact: true })).toBeVisible();
    await expect(card.getByRole('link', { name: `Quelle: ${source.title}`, exact: true })).toHaveAttribute('href', source.url);
  }
  await expect(page.locator('#qa-submitted .motion-status')).not.toContainText('In Planung');
  await expect(page.locator('#qa-accepted .motion-impact-note')).toContainText('Umsetzung gesondert prüfen');
  await expect(page.locator('#qa-rejected .motion-impact-note')).toContainText('nicht beschlossen');
  const colour = async (id: string) => page.locator(`#${id} .motion-status`).evaluate(node => getComputedStyle(node).backgroundColor);
  const rgb = (value: string) => (value.match(/[\d.]+/g) || []).slice(0, 3).map(Number);
  const [greenR, greenG, greenB] = rgb(await colour('qa-accepted'));
  expect(greenG).toBeGreaterThan(greenR);
  expect(greenG).toBeGreaterThan(greenB);
  const [yellowR, yellowG, yellowB] = rgb(await colour('qa-planning'));
  expect(yellowR).toBeGreaterThan(180);
  expect(yellowG).toBeGreaterThan(140);
  expect(yellowB).toBeLessThan(150);
  const [redR, redG, redB] = rgb(await colour('qa-rejected'));
  expect(redR).toBeGreaterThan(redG);
  expect(redR).toBeGreaterThan(redB);
});

test('public status controls stay usable while genuine motion data is still absent', async ({ page }) => {
  await page.goto('/politik/antraege');
  await page.getByLabel('Vorgänge suchen', { exact: true }).fill('Testsuche');
  await expect(page).toHaveURL(/q=Testsuche/);
  for (const status of ['Angenommen', 'In Planung', 'Abgelehnt']) {
    const button = page.getByRole('button', { name: status, exact: true });
    await button.click();
    await expect(button).toHaveAttribute('aria-pressed', 'true');
    await expect(page).toHaveURL(new RegExp(`status=${encodeURIComponent(status).replaceAll('%20', '\\+')}`));
    await expect(page.getByRole('status')).toContainText('0 Vorgänge');
    await expect(page.getByRole('heading', { name: 'Noch keine verifizierten Anträge.' })).toBeVisible();
  }
  await page.getByRole('button', { name: 'Alle', exact: true }).click();
  await expect(page).not.toHaveURL(/status=/);
  await expect(page.getByRole('button', { name: 'Alle', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.locator('.motions-results').getByRole('button', { name: 'Filter zurücksetzen', exact: true }).click();
  await expect(page.getByLabel('Vorgänge suchen', { exact: true })).toHaveValue('');
});
