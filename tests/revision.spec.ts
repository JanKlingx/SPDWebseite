import { test, expect } from '@playwright/test';
import topics from '../content/topics/topics.json';
import program from '../content/politics/program.json';

const deletedRoutes = ['/politik/wahlprogramm', ...topics.map(topic => `/politik/themen/${topic.id}`)];

test('removed politics routes return 404 and no current entry point links to them', async ({ page, request }) => {
  for (const route of deletedRoutes) {
    const response = await request.get(route);
    expect(response.status(), route).toBe(404);
  }
  const problems: { route: string; href: string }[] = [];
  for (const route of ['/', '/politik', '/jusos', '/wissen', '/suche', '/suche?bereich=Unsere+Politik', '/suche?q=Wahlprogramm']) {
    await page.goto(route);
    const hrefs = await page.locator('a[href]').evaluateAll(nodes => nodes.map(node => node.getAttribute('href') || ''));
    for (const href of hrefs) {
      const path = new URL(href, page.url()).pathname;
      if (path === '/politik/wahlprogramm' || path.startsWith('/politik/themen/')) problems.push({ route, href });
    }
    await expect(page.getByRole('link', { name: 'Wahlprogramm lesen', exact: true })).toHaveCount(0);
  }
  expect(problems).toEqual([]);
});

test('all political topics and programme chapters can be read on the central page', async ({ page }) => {
  await page.goto('/politik');
  const topicNav = page.getByRole('navigation', { name: 'Politische Themen auf dieser Seite' });
  for (const topic of topics) {
    await topicNav.getByRole('link', { name: topic.title, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`/politik#${topic.id}$`));
    const section = page.locator(`section#${topic.id}`);
    await expect(section.getByRole('heading', { name: topic.title, exact: true })).toBeVisible();
    await expect(section.getByText(topic.intro, { exact: true })).toBeVisible();
    await expect(section.getByText(topic.position, { exact: true })).toBeVisible();
    await section.locator('summary').click();
    await expect(section.getByRole('link', { name: topic.sourceTitle, exact: true })).toHaveAttribute('href', topic.sourceUrl);
    await expect(section.getByText(topic.measuresNotice, { exact: true })).toBeVisible();
  }
  for (const chapter of program.chapters) {
    const section = page.locator(`section#programm-${chapter.id}`);
    await expect(section.getByRole('heading', { name: chapter.title, exact: true })).toBeVisible();
    await expect(section.getByText(chapter.summary, { exact: true })).toBeVisible();
  }
  const transparency = page.getByRole('region', { name: 'Politik nachvollziehen', exact: true });
  await expect(transparency.getByRole('link', { name: /Wahlprogramm/ })).toHaveCount(0);
  await expect(transparency.getByRole('link', { name: 'Zur Fraktion', exact: true })).toHaveAttribute('href', '/politik/fraktion');
  await expect(transparency.getByRole('link', { name: 'Vorgänge ansehen', exact: true })).toHaveAttribute('href', '/politik/antraege');
});

test('applications and resolutions is a clear primary navigation destination', async ({ page }) => {
  await page.goto('/');
  const navigation = page.getByRole('navigation', { name: 'Hauptnavigation', exact: true });
  await expect(navigation.getByRole('link')).toHaveCount(10);
  const motions = navigation.getByRole('link', { name: /Anträge.*Beschlüsse/ });
  await expect(motions).toBeVisible();
  await motions.click();
  await expect(page).toHaveURL(/\/politik\/antraege$/);
  await expect(page.locator('main h1')).toContainText('Anträge');
});

test('the unchanged lexicon entry point still opens the complete dictionary', async ({ page }) => {
  await page.goto('/wissen');
  const portal = page.getByRole('link').filter({ has: page.getByRole('heading', { name: 'Ein Wort. Mehr Durchblick.', exact: true }) });
  await expect(portal.getByText('Das Politik-Lexikon erklärt Begriffe aus Kommune, Land und Bund.', { exact: true })).toBeVisible();
  await portal.click();
  await expect(page).toHaveURL(/\/wissen\/lexikon$/);
  await expect(page.getByLabel('Welchen Begriff suchst du?')).toBeVisible();
  await expect(page.getByRole('status')).toContainText('84 Begriffe');
});
