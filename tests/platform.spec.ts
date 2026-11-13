import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFile } from 'node:fs/promises';

const primaryRoutes = ['/', '/aktuelles', '/politik', '/menschen', '/jusos', '/wissen', '/geschichte', '/termine', '/mitmachen'];

test('all primary pages render and internal navigation resolves', async ({ page, request, baseURL }) => {
  const found = new Set<string>(primaryRoutes);
  for (const route of primaryRoutes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator('main h1').first()).toBeVisible();
    const links = await page.locator('a[href]').evaluateAll(nodes => nodes.map(node => (node as HTMLAnchorElement).getAttribute('href') || ''));
    for (const href of links) {
      if (href.startsWith('/') && !href.startsWith('//')) found.add(href.split('#')[0]);
    }
  }
  for (const href of found) {
    const response = await request.get(new URL(href, baseURL).toString());
    expect(response.status(), href).toBe(200);
  }
});

test('contact creates a local draft download and does not send a message', async ({ page }) => {
  await page.goto('/kontakt');
  const requests: string[] = [];
  page.on('request', request => { if (request.method() === 'POST') requests.push(request.url()); });
  await page.getByLabel('Dein Name (Pflichtfeld)').fill('Testperson');
  await page.getByLabel('E-Mail-Adresse (Pflichtfeld)').fill('test@example.org');
  await page.getByLabel('Deine Nachricht (Pflichtfeld)').fill('Ich möchte einen Hinweis zu einer historischen Quelle vorbereiten.');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Entwurf herunterladen' }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('kontaktanfrage-spd-buedingen.txt');
  const downloadPath = await download.path();
  expect(downloadPath).toBeTruthy();
  const text = await readFile(downloadPath!, 'utf8');
  expect(text).toContain('Testperson');
  expect(text).toContain('test@example.org');
  await expect(page.getByRole('status')).toContainText('Es wurde nichts versendet');
  expect(requests).toEqual([]);
});

test('contact required fields prevent an empty download', async ({ page }) => {
  await page.goto('/kontakt');
  await page.getByRole('button', { name: 'Entwurf herunterladen' }).click();
  expect(await page.locator('form').evaluate(form => (form as HTMLFormElement).checkValidity())).toBe(false);
  await expect(page.getByRole('status')).toBeEmpty();
});

test('mobile menu opens, closes with Escape and navigates', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  const open = page.getByRole('button', { name: 'Menü öffnen' });
  await open.click();
  const nav = page.getByRole('navigation', { name: 'Hauptnavigation' });
  await expect(nav).toBeVisible();
  await nav.getByRole('link', { name: 'Aktuelles', exact: true }).focus();
  await page.keyboard.press('Escape');
  await expect(nav).toBeHidden();
  await expect(open).toBeFocused();
  await open.click();
  await nav.getByRole('link', { name: 'SPD-Geschichte', exact: true }).click();
  await expect(page).toHaveURL(/\/geschichte/);
  await expect(nav).toBeHidden();
});

test('global search filters content, paginates and opens glossary deep links', async ({ page }) => {
  await page.goto('/suche');
  await expect(page.locator('.search-results > li')).toHaveCount(20);
  const firstPageTitle = await page.locator('.search-results h2').first().textContent();
  await page.getByRole('link', { name: 'Nächste Seite', exact: true }).click();
  await expect(page).toHaveURL(/seite=2/);
  await expect(page.locator('.search-results h2').first()).not.toHaveText(firstPageTitle!);
  await page.getByLabel('Suchbegriff', { exact: true }).fill('Gewaltenteilung');
  await page.getByLabel('Bereich', { exact: true }).selectOption('Lexikon');
  await page.getByRole('button', { name: 'Suchen', exact: true }).click();
  await expect(page).toHaveURL(/q=Gewaltenteilung/);
  await expect(page).toHaveURL(/bereich=Lexikon/);
  await page.locator('.search-results').getByRole('link', { name: 'Gewaltenteilung', exact: true }).click();
  await expect(page).toHaveURL(/begriff=gewaltenteilung/);
  await expect(page.locator('#gewaltenteilung')).toHaveAttribute('open', '');
  await page.goto('/suche?q=qwertz-kein-treffer');
  await expect(page.getByRole('heading', { name: 'Kein passender Treffer.' })).toBeVisible();
  await expect(page.getByRole('status')).toContainText('0 Treffer');
});

test('skip link supports keyboard navigation', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Zum Inhalt' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main$/);
});

test('unknown routes return a helpful 404', async ({ page }) => {
  const response = await page.goto('/nicht-vorhandene-testseite');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: 'Hier geht es nicht weiter.' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Zur Startseite', exact: true })).toBeVisible();
});

test('essential content and native history disclosures remain available without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('main h1')).toBeVisible();
  await page.goto('/geschichte/buedingen');
  await expect(page.locator('#buedingen-1893')).toBeVisible();
  await page.locator('#buedingen-1893 summary').click();
  await expect(page.locator('#buedingen-1893 details')).toHaveAttribute('open', '');
  await page.goto('/aktuelles?q=Wohnraum');
  await expect(page.locator('main article')).toHaveCount(1);
  await expect(page.locator('main article')).toBeVisible();
  await page.goto('/wissen/ablaeufe');
  await expect(page.getByRole('heading', { name: 'Alle Erklärungen zum Lesen' })).toBeVisible();
  await page.goto('/kontakt');
  await expect(page.getByRole('button', { name: 'Entwurf herunterladen', exact: true })).toBeDisabled();
  await context.close();
});

for (const width of [320, 375, 768, 1440]) {
  test(`main pages fit a ${width}px viewport`, async ({ page }) => {
    await page.setViewportSize({ width, height: width > 1000 ? 900 : 812 });
    const issues: { route: string; document: number; body: number; viewport: number }[] = [];
    for (const route of [...primaryRoutes, '/wissen/lexikon', '/wissen/ablaeufe', '/kontakt']) {
      await page.goto(route);
      await expect(page.locator('main h1').first()).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      const overflow = await page.evaluate(() => ({
        document: document.documentElement.scrollWidth,
        body: document.body.scrollWidth,
        viewport: window.innerWidth,
      }));
      if (overflow.document > overflow.viewport + 1 || overflow.body > overflow.viewport + 1) issues.push({ route, ...overflow });
    }
    expect(issues, 'All tested pages must fit the viewport').toEqual([]);
  });
}

for (const width of [375, 1440]) {
  for (const route of ['/', '/jusos', '/wissen/lexikon', '/wissen/ablaeufe', '/geschichte', '/termine']) {
    test(`WCAG automated checks ${route} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: width > 1000 ? 900 : 812 });
      await page.goto(route);
      await expect(page.locator('main h1').first()).toBeVisible();
      const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      expect(result.violations.map(violation => ({ id: violation.id, impact: violation.impact, nodes: violation.nodes.map(node => node.target) }))).toEqual([]);
      await page.screenshot({ path: `work/qa/${route === '/' ? 'home' : route.replaceAll('/', '-')}-${width}.png`, fullPage: true });
    });
  }
}
