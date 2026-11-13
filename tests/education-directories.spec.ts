import { test, expect } from '@playwright/test';
import guides from '../content/guides/guides.json';
import glossary from '../content/glossary/entries.json';
import { filterEvents, filterPeople, filterMotions, localDay, type LocalEvent, type Person, type Motion } from '../src/lib/local-data';

test('glossary supports search, alphabet, topics, empty results and direct links', async ({ page }) => {
  await page.goto('/wissen/lexikon');
  await expect(page.getByRole('status')).toContainText(`${glossary.length} Begriffe`);
  await page.getByRole('button', { name: 'Buchstabe M', exact: true }).click();
  await expect(page).toHaveURL(/buchstabe=M/);
  await expect(page.locator('#magistrat')).toBeVisible();
  await expect(page.locator('#antrag')).toHaveCount(0);
  await page.getByRole('button', { name: 'Filter zurücksetzen' }).click();
  await page.getByLabel('Thema', { exact: true }).selectOption('Finanzen');
  await expect(page).toHaveURL(/thema=Finanzen/);
  await expect(page.locator('#ergebnishaushalt')).toBeVisible();
  await expect(page.locator('#magistrat')).toHaveCount(0);
  await page.getByLabel('Welchen Begriff suchst du?').fill('qwertz-kein-begriff');
  await expect(page.getByRole('heading', { name: 'Kein Begriff passt zur Auswahl.' })).toBeVisible();
  await page.getByRole('button', { name: 'Alle Begriffe anzeigen' }).click();
  await expect(page.getByRole('status')).toContainText(`${glossary.length} Begriffe`);
  await page.goto('/wissen/lexikon?begriff=magistrat#magistrat');
  await expect(page.locator('#magistrat')).toHaveAttribute('open', '');
  await expect(page.locator('#magistrat .glossary-body')).toBeVisible();
  const related = page.locator('#magistrat .glossary-related a').first();
  const href = await related.getAttribute('href');
  await related.click();
  await expect(page).toHaveURL(new RegExp(`begriff=${new URL(href!, 'http://localhost').searchParams.get('begriff')}`));
});

test('all seven political guides support step changes, direct links and keyboard tabs', async ({ page }) => {
  await page.goto('/wissen/ablaeufe');
  const tabs = page.getByRole('tablist', { name: 'Politische Abläufe' });
  await expect(tabs.getByRole('tab')).toHaveCount(7);
  for (const guide of guides) {
    await tabs.getByRole('tab', { name: guide.title, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`modul=${guide.id}`));
    const panel = page.getByRole('tabpanel', { name: guide.title, exact: true });
    await expect(panel).toBeVisible();
    await expect(panel.getByRole('button', { name: 'Zurück', exact: true })).toBeDisabled();
    await panel.getByRole('button', { name: 'Weiter', exact: true }).click();
    await expect(panel.getByRole('status')).toContainText(`Station 2 von ${guide.steps.length}`);
    await expect(page).toHaveURL(new RegExp(`schritt=${guide.steps[1].id}`));
    await panel.getByRole('button', { name: guide.steps[guide.steps.length - 1].title, exact: false }).click();
    await expect(panel.getByRole('button', { name: 'Weiter', exact: true })).toBeDisabled();
  }
  await tabs.getByRole('tab').last().focus();
  await page.keyboard.press('Home');
  await expect(tabs.getByRole('tab').first()).toBeFocused();
  await expect(tabs.getByRole('tab').first()).toHaveAttribute('aria-selected', 'true');
  await page.keyboard.press('ArrowDown');
  await expect(tabs.getByRole('tab').nth(1)).toBeFocused();
  await expect(tabs.getByRole('tab').nth(1)).toHaveAttribute('aria-selected', 'true');
  await page.reload();
  await expect(tabs.getByRole('tab').nth(1)).toHaveAttribute('aria-selected', 'true');
});

test('mobile political guides offer native module and station selection', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/wissen/ablaeufe');
  const guide = guides.find(item => item.id === 'kommunalwahl')!;
  await page.getByRole('combobox', { name: 'Erklärung auswählen', exact: true }).selectOption(guide.id);
  await expect(page).toHaveURL(/modul=kommunalwahl/);
  await page.getByRole('combobox', { name: 'Station auswählen', exact: true }).selectOption(guide.steps[2].id);
  await expect(page).toHaveURL(new RegExp(`schritt=${guide.steps[2].id}`));
  const panel = page.getByRole('tabpanel');
  await expect(panel.getByRole('heading', { name: guide.steps[2].title, exact: true })).toBeVisible();
  await panel.getByRole('button', { name: 'Weiter', exact: true }).click();
  await expect(panel.getByRole('status')).toContainText(`Station 4 von ${guide.steps.length}`);
});

test('calendar changes months, selects days and preserves URL filters', async ({ page }) => {
  await page.goto('/termine?ansicht=kalender&monat=2026-11');
  const calendar = page.locator('.calendar');
  await expect(calendar.getByRole('heading', { name: 'November 2026' })).toBeVisible();
  await page.getByRole('button', { name: 'Nächster Monat', exact: true }).click();
  await expect(calendar.getByRole('heading', { name: 'Dezember 2026' })).toBeVisible();
  await expect(page).toHaveURL(/monat=2026-12/);
  await page.getByRole('button', { name: 'Vorheriger Monat', exact: true }).click();
  await expect(calendar.getByRole('heading', { name: 'November 2026' })).toBeVisible();
  await calendar.getByRole('button', { name: '12. November 2026, 0 Termine', exact: true }).click();
  await expect(page).toHaveURL(/tag=2026-11-12/);
  await expect(page.getByRole('status')).toContainText('0 Termine am 12. November 2026');
  await page.getByRole('button', { name: 'Alle Tage anzeigen' }).click();
  await expect(page).not.toHaveURL(/tag=/);
  await page.getByRole('combobox', { name: 'Kategorie', exact: true }).selectOption('Jusos');
  await expect(page).toHaveURL(/kategorie=Jusos/);
  await page.getByRole('button', { name: 'Liste', exact: true }).click();
  await expect(calendar).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Liste', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('combobox', { name: 'Zeitraum', exact: true }).selectOption('vergangen');
  await expect(page).toHaveURL(/zeitraum=vergangen/);
  await expect(page.getByRole('heading', { name: 'Neue Begegnungen brauchen echte Termine.' })).toBeVisible();
});

test('people and motions expose honest empty states and usable filters', async ({ page }) => {
  await page.goto('/menschen');
  await page.getByLabel('Menschen suchen', { exact: true }).fill('Testsuche');
  await page.getByRole('combobox', { name: 'Bereich', exact: true }).selectOption('Jusos');
  await expect(page).toHaveURL(/gruppe=Jusos/);
  await expect(page.getByRole('status')).toContainText('0 Profile');
  await expect(page.getByRole('heading', { name: 'Menschen verdienen ein richtiges Porträt.' })).toBeVisible();
  await page.goto('/politik/antraege');
  await page.getByLabel('Vorgänge suchen', { exact: true }).fill('Testsuche');
  await page.getByRole('combobox', { name: 'Status', exact: true }).selectOption('Beschluss');
  await expect(page).toHaveURL(/status=Beschluss/);
  await expect(page.getByRole('status')).toContainText('0 Vorgänge');
  await expect(page.getByRole('heading', { name: 'Vom Antrag bis zur Umsetzung.' })).toBeVisible();
});

test('district search opens local context and links to filtered news', async ({ page }) => {
  await page.goto('/vor-ort');
  await expect(page.getByRole('status')).toContainText('16 Stadtteile');
  await page.getByLabel('Stadtteil suchen', { exact: true }).fill('Düdelsheim');
  await expect(page.getByRole('status')).toContainText('1 Stadtteil');
  await page.locator('.district-list summary').click();
  await page.getByRole('link', { name: 'Beiträge zu Düdelsheim' }).click();
  await expect(page).toHaveURL(/\/aktuelles\?q=D%C3%BCdelsheim/);
  await expect(page.getByRole('status')).toContainText('1 Beitrag');
});

test('home history preview selects real events and opens their details', async ({ page }) => {
  await page.goto('/');
  await page.locator('.home-history-years').getByRole('button', { name: '1922', exact: true }).click();
  await expect(page.locator('.home-history-years').getByRole('button', { name: '1922', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.home-history-story')).toContainText('Arbeiterjugend');
  await page.getByRole('link', { name: 'Das Ereignis entdecken' }).click();
  await expect(page).toHaveURL(/event=buedingen-1922/);
  await expect(page.locator('#buedingen-1922 details')).toHaveAttribute('open', '');
});

test('Jusos topics update the page and link to relevant content', async ({ page }) => {
  await page.goto('/jusos');
  await page.getByRole('button', { name: 'Zuhause finden', exact: true }).click();
  await expect(page).toHaveURL(/thema=wohnen/);
  await expect(page.locator('.jusos-topic-panel h3')).toHaveText('Zuhause finden');
  await page.reload();
  await expect(page.getByRole('button', { name: 'Zuhause finden', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('link', { name: 'Zum Thema', exact: true }).click();
  await expect(page).toHaveURL(/\/politik\/themen\/wohnen/);
  await expect(page.locator('main h1')).toContainText('Wohnen');
  await page.goto('/jusos');
  await page.getByRole('link', { name: 'Junge Engagierte', exact: true }).click();
  await expect(page).toHaveURL(/gruppe=Jusos/);
  await expect(page.getByRole('combobox', { name: 'Bereich', exact: true })).toHaveValue('Jusos');
  await page.goto('/jusos');
  await page.getByRole('link', { name: 'Jugendtermine', exact: true }).click();
  await expect(page).toHaveURL(/kategorie=Jusos/);
  await expect(page.getByRole('combobox', { name: 'Kategorie', exact: true })).toHaveValue('Jusos');
});

test('local data filters handle populated records, date boundaries and chronology', () => {
  // These fixtures exist only in tests and are never published as local political facts.
  const source = { title: 'Testquelle', url: 'https://example.org/test' };
  const records: LocalEvent[] = [
    { id: 'test-later', title: 'Testtermin später', start: '2026-11-12T17:30:00Z', category: 'Sitzung', location: 'Testort', summary: 'Test', description: [], source },
    { id: 'test-earlier', title: 'Testtermin früher', start: '2026-11-12T18:00:00+01:00', category: 'Jusos', location: 'Testort', summary: 'Jugend Test', description: [], source },
    { id: 'test-past', title: 'Vergangener Testtermin', start: '2026-11-10T12:00:00+01:00', category: 'Sitzung', location: 'Testort', summary: 'Test', description: [], source },
  ];
  expect(localDay('2026-11-12T23:30:00Z')).toBe('2026-11-13');
  expect(filterEvents(records, { today: '2026-11-12', category: 'Jusos' }).map(event => event.id)).toEqual(['test-earlier']);
  expect(filterEvents(records, { today: '2026-11-12', period: 'vergangen' }).map(event => event.id)).toEqual(['test-past']);
  expect(filterEvents(records, { today: '2026-11-12' }).map(event => event.id)).toEqual(['test-earlier', 'test-later']);
  const persons: Person[] = [
    { id: 'test-a', name: 'Testprofil A', role: 'Testfunktion', groups: ['Vorstand'], biography: 'Test', interests: ['Wohnen'], district: 'Testviertel', source, verifiedAt: '2026-11-12' },
    { id: 'test-b', name: 'Testprofil B', role: 'Testfunktion', groups: ['Jusos'], biography: 'Test', interests: ['Jugend'], source, verifiedAt: '2026-11-12' },
  ];
  expect(filterPeople(persons, { group: 'alle' })).toHaveLength(2);
  expect(filterPeople(persons, { group: 'Jusos', query: 'jugend' }).map(person => person.id)).toEqual(['test-b']);
  expect(filterPeople(persons, { district: 'Testviertel' }).map(person => person.id)).toEqual(['test-a']);
  const motions: Motion[] = [
    { id: 'test-proposal', title: 'Testvorgang', date: '2026-10-01', type: 'Antrag', applicants: ['Testgruppe'], committee: 'Testgremium', summary: 'Test', status: 'Antrag', source },
    { id: 'test-resolution', title: 'Testbeschluss', date: '2026-11-01', type: 'Beschluss', applicants: ['Testgruppe'], committee: 'Testgremium', summary: 'Test', status: 'Beschluss', source },
  ];
  expect(filterMotions(motions, { status: 'Beschluss' }).map(motion => motion.id)).toEqual(['test-resolution']);
  expect(filterMotions(motions, { query: 'Testgruppe' }).map(motion => motion.id)).toEqual(['test-resolution', 'test-proposal']);
});
