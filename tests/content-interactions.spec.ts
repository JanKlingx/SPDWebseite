import { test, expect } from '@playwright/test';
import glossary from '../content/glossary/entries.json';
import guides from '../content/guides/guides.json';
import history from '../content/history/events.json';

test('educational and historical content meets required coverage and referential integrity', () => {
  expect(glossary.length).toBeGreaterThanOrEqual(70);
  expect(guides).toHaveLength(7);
  const glossaryIds = new Set(glossary.map(entry => entry.id));
  expect(glossaryIds.size).toBe(glossary.length);
  for (const entry of glossary) {
    expect(entry.definition.length, entry.term).toBeGreaterThan(20);
    expect(entry.explanation.length, entry.term).toBeGreaterThan(40);
    expect(entry.example.length, entry.term).toBeGreaterThan(20);
    expect(entry.sources.length, entry.term).toBeGreaterThan(0);
    for (const id of entry.relatedIds) expect(glossaryIds.has(id), `${entry.id} -> ${id}`).toBe(true);
  }
  const historyIds = new Set(history.map(entry => entry.id));
  expect(historyIds.size).toBe(history.length);
  expect(history.some(entry => entry.level === 'buedingen' && entry.year === 1893)).toBe(true);
  expect(history.some(entry => entry.level === 'germany' && entry.year === 1863)).toBe(true);
  for (const entry of history) {
    expect(entry.sources.length, entry.id).toBeGreaterThan(0);
    for (const id of entry.relatedIds || []) expect(historyIds.has(id), `${entry.id} -> ${id}`).toBe(true);
  }
  for (const guide of guides) {
    expect(guide.steps.length, guide.title).toBeGreaterThan(2);
    for (const step of guide.steps) {
      for (const id of step.glossaryIds) expect(glossaryIds.has(id), `${guide.id}/${step.id} -> ${id}`).toBe(true);
    }
  }
});

test('news search and categories filter real content and article pages open', async ({ page }) => {
  await page.goto('/aktuelles');
  await expect(page.getByRole('status')).toContainText('4 Beiträge');
  await page.getByLabel('Nachrichten durchsuchen', { exact: true }).fill('Wohnraum');
  await page.getByRole('button', { name: 'Filtern', exact: true }).click();
  await expect(page).toHaveURL(/q=Wohnraum/);
  await expect(page.getByRole('status')).toContainText('1 Beitrag');
  await page.getByRole('link', { name: 'Beitrag lesen', exact: true }).click();
  await expect(page).toHaveURL(/\/aktuelles\/sozialer-wohnraum-duedelsheim/);
  await expect(page.locator('main h1')).toBeVisible();
  await expect(page.locator('main a[href="https://www.spd-buedingen.de/meldungen/haupt-und-finanzausschuss-stimmt-gegen-sozialen-wohnungsbau-in-duedelsheim/"]')).toHaveCount(1);
  await page.goto('/aktuelles?category=Jusos');
  await expect(page.getByLabel('Kategorie', { exact: true })).toHaveValue('Jusos');
  await expect(page.getByRole('status')).toContainText('1 Beitrag');
  await expect(page.locator('main')).toContainText('Archiv');
  await page.getByLabel('Nachrichten durchsuchen', { exact: true }).fill('qwertz-kein-beitrag');
  await page.getByRole('button', { name: 'Filtern', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Kein passender Beitrag' })).toBeVisible();
  await page.getByRole('link', { name: 'Alle Beiträge anzeigen' }).click();
  await expect(page.getByRole('status')).toContainText('4 Beiträge');
  const repeatedQuery = await page.request.get('/aktuelles?q=Wohnraum&q=Jugend');
  expect(repeatedQuery.status()).toBe(200);
});

test('history level, search, view and event permalinks preserve state', async ({ page }) => {
  await page.goto('/geschichte');
  const perspectives = page.getByRole('navigation', { name: 'Historische Perspektive' });
  await perspectives.getByRole('link', { name: /^Deutschland/ }).click();
  await expect(page).toHaveURL(/level=germany/);
  await page.getByLabel('Geschichte durchsuchen').fill('1863');
  await expect(page).toHaveURL(/q=1863/);
  await expect(page.locator('.history-events > li')).toHaveCount(1);
  await expect(page.locator('.history-events')).toContainText('Allgemeine Deutsche Arbeiterverein');
  await page.getByRole('button', { name: 'Liste anzeigen' }).click();
  await expect(page).toHaveURL(/view=list/);
  await expect(page.getByRole('button', { name: 'Liste anzeigen' })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Detailgröße vergrößern' }).click();
  await expect(page).toHaveURL(/zoom=3/);
  await expect(page.getByRole('button', { name: 'Detailgröße vergrößern' })).toBeDisabled();
  await page.getByRole('link', { name: /^Direktlink:/ }).click();
  await expect(page).toHaveURL(/event=germany-1863/);
  await expect(page.locator('#germany-1863 details')).toHaveAttribute('open', '');
  await page.reload();
  await expect(page.getByLabel('Geschichte durchsuchen')).toHaveValue('1863');
  await expect(page.locator('#germany-1863 details')).toHaveAttribute('open', '');
  await page.goto('/geschichte?level=buedingen&event=buedingen-1893#buedingen-1893');
  await expect(page.locator('#buedingen-1893 details')).toHaveAttribute('open', '');
  await expect(page.locator('#buedingen-1893')).toContainText('Aus der Chronik');
  await page.goto('/geschichte?level=buedingen&event=buedingen-1949-1969#buedingen-1949-1969');
  await expect(page.locator('details#buedingen-1949-1969')).toHaveAttribute('open', '');
  await expect(page.locator('details#buedingen-1949-1969')).toContainText('Redaktionell zu ergänzen');
});

test('history filters, date range, empty state and gallery operate', async ({ page }) => {
  await page.goto('/geschichte?level=all');
  await page.getByLabel('Thema', { exact: true }).selectOption('Verfolgung');
  await expect(page).toHaveURL(/category=Verfolgung/);
  expect(await page.locator('.history-events > li').count()).toBeGreaterThan(0);
  await page.getByText('Jahre eingrenzen', { exact: true }).click();
  await page.getByLabel('Ab Jahr', { exact: true }).fill('1933');
  await page.getByLabel('Bis Jahr', { exact: true }).fill('1945');
  await expect(page).toHaveURL(/from=1933/);
  await expect(page).toHaveURL(/to=1945/);
  await page.getByLabel('Geschichte durchsuchen').fill('qwertz-kein-treffer');
  await expect(page.getByRole('heading', { name: 'Hier fehlt noch ein Treffer.' })).toBeVisible();
  await page.getByRole('button', { name: 'Alle Einträge zeigen' }).click();
  await expect(page.getByLabel('Geschichte durchsuchen')).toHaveValue('');
  expect(await page.locator('.history-events > li').count()).toBeGreaterThan(10);
  const gallery = page.locator('.history-gallery');
  const title = await gallery.locator('h3').textContent();
  await page.getByRole('button', { name: 'Nächsten Materialplatz anzeigen' }).click();
  await expect(gallery.locator('h3')).not.toHaveText(title!);
  await page.getByRole('button', { name: 'Materialangaben' }).click();
  await expect(gallery.locator('dl')).toBeVisible();
  await expect(gallery.locator('dl')).toContainText('Bildrechte');
});
