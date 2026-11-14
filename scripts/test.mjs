import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import AxeBuilder from '@axe-core/playwright';
import { launchBrowser, ready, baseURL } from './browser.mjs';

const browser = await launchBrowser();
let checks = 0;
const check = (condition, message) => { assert.ok(condition, message); checks++; };
const errors = [];
try {
  for (const path of ['/', '/oliva/', '/grafito/']) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1080 } });
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(`${path}: ${error.message}`));
    const external = [];
    page.on('request', request => { if (/^https?:/.test(request.url()) && !request.url().startsWith(baseURL)) external.push(request.url()); });
    const response = await page.goto(baseURL + path);
    check(response.ok(), `${path} responds successfully`);
    await ready(page);
    check(await page.title() === 'Sebastián Reynoso · Abogado', 'Correct title');
    check(await page.locator('h1').count() === 1, 'Exactly one H1');
    check(await page.locator('.preview-dock').count() === (path === '/' ? 0 : 1), 'Only archived alternatives show the design selector');
    if (path === '/') {
      check(await page.locator('html').getAttribute('data-theme') === 'noche', 'Selected blue-and-bronze identity is the main page');
      check(await page.locator('link[rel="icon"]').getAttribute('href') === '/logos/sr-noche.svg', 'Selected logo is used as favicon');
      check(await page.locator('.portrait-photo img').evaluate(image => image.naturalWidth === 768 && image.naturalHeight === 1152), 'Updated portrait is optimized without changing its proportions');
      check(await page.locator('.portrait-photo img').evaluate(image => getComputedStyle(image).filter === 'none'), 'Main portrait preserves the supplied colors');
    }
    check(await page.locator('[data-service]').count() === 6, 'Six practice areas');
    for (const width of [320, 390, 700, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${path} has no horizontal overflow at ${width}px`);
    }
    await page.setViewportSize({ width: 1440, height: 1080 });
    check(await page.evaluate(() => [...document.images].every(image => image.naturalWidth > 0)), `${path} no broken images`);
    await page.locator('[data-service="laboral"]').click();
    check(await page.locator('#service-dialog').isVisible(), 'Practice-area modal opens');
    check(await page.locator('#service-dialog-title').textContent() === 'Derecho laboral', 'Modal shows correct content');
    await page.locator('.dialog-contact').click();
    check(await page.locator('#contact-area').inputValue() === 'Derecho laboral', 'Area is preselected in contact form');
    check(!await page.locator('#service-dialog').isVisible(), 'Modal closes on consultation link');
    await page.locator('[data-service="civil"]').click();
    await page.keyboard.press('Escape');
    check(!await page.locator('#service-dialog').isVisible(), 'Escape closes the modal');
    await page.locator('summary').first().click();
    check(await page.locator('details').first().getAttribute('open') !== null, 'FAQ expands');
    await page.locator('.contact-form .privacy-trigger').click();
    check(await page.locator('#privacy-dialog').isVisible(), 'Privacy dialog opens');
    await page.keyboard.press('Escape');
    await page.getByRole('textbox', { name: 'Nombre y apellido' }).fill('Persona de prueba');
    await page.getByRole('textbox', { name: 'Correo electrónico' }).fill('prueba@example.com');
    await page.getByRole('textbox', { name: 'Tu consulta' }).fill('Esta es una consulta de prueba sin información sensible.');
    await page.locator('[name="consentimiento"]').check();
    const outgoing = [];
    page.on('request', req => { if (req.method() === 'POST') outgoing.push(req.url()); });
    await page.locator('button[type="submit"]').click();
    check((await page.locator('.form-status').textContent()).includes('no envía datos'), 'Demo accurately reports that nothing was sent');
    check(outgoing.length === 0, 'Demo form makes no POST requests');
    check(await page.locator('#download-consultation').isVisible(), 'Download is offered');
    const downloadPromise = page.waitForEvent('download');
    await page.locator('#download-consultation').click();
    const download = await downloadPromise;
    const contents = await readFile(await download.path(), 'utf8');
    check(contents.includes('Persona de prueba') && contents.includes('Derecho laboral'), 'Download contains the entered consultation and selected area');
    // Exercise both configured-endpoint outcomes without sending anything to a real service.
    await page.locator('#contact-form').evaluate((element, url) => { element.dataset.endpoint = url; }, `${baseURL}/__test-form`);
    await page.route('**/__test-form', route => route.fulfill({ status: 500, body: '{}' }));
    await page.locator('button[type="submit"]').click();
    await page.locator('.form-status.is-error').waitFor();
    check((await page.locator('.form-status').textContent()).includes('No se pudo enviar'), 'Failed endpoint is never reported as successful');
    check(await page.getByRole('textbox', { name: 'Nombre y apellido' }).inputValue() === 'Persona de prueba', 'Failed send preserves the entered data');
    await page.unroute('**/__test-form');
    await page.route('**/__test-form', route => route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }));
    await page.locator('button[type="submit"]').click();
    await page.waitForFunction(() => document.querySelector('.form-status').textContent.includes('fue enviada'));
    check(await page.getByRole('textbox', { name: 'Nombre y apellido' }).inputValue() === '', 'Successful endpoint resets the form');
    check(external.length === 0, 'No third-party network requests or remote font dependencies');
    const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
    check(accessibility.violations.length === 0, `${path} accessibility issues: ${JSON.stringify(accessibility.violations.map(v => ({id:v.id,nodes:v.nodes.map(n => n.target)})))}`);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => scrollTo(0,0));
    await page.locator('.menu-toggle').click();
    check(await page.locator('#mobile-menu').isVisible(), 'Mobile navigation opens');
    await page.locator('#mobile-menu a[href="#areas"]').click();
    check(!await page.locator('#mobile-menu').isVisible(), 'Mobile menu closes after navigation');
    await page.goto(`${baseURL}${path}?presentacion=1`);
    check(!await page.locator('.preview-dock').isVisible(), 'Presentation mode hides comparison toolbar');
    await context.close();
    console.log(`PASS ${path}: responsive layout, dialogs, FAQ, privacy, form, download and accessibility.`);
  }
  const galleryContext = await browser.newContext({ viewport: { width: 1440, height: 1080 } });
  const gallery = await galleryContext.newPage();
  await gallery.goto(baseURL + '/propuestas/');
  await ready(gallery);
  for (const width of [320,390,768,1440]) {
    await gallery.setViewportSize({width,height:1000});
    check(await gallery.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `Gallery no overflow at ${width}px`);
  }
  const hrefs = await gallery.locator('a[href]').evaluateAll(links => [...new Set(links.map(a => a.getAttribute('href')).filter(href => href.startsWith('/')))]);
  for (const href of hrefs) {
    const response = await gallery.request.get(baseURL + href);
    check(response.ok(), `Gallery link available: ${href}`);
  }
  const galleryAxe = await new AxeBuilder({ page: gallery }).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  check(galleryAxe.violations.length === 0, `Gallery accessibility: ${JSON.stringify(galleryAxe.violations.map(v => ({id:v.id,nodes:v.nodes.map(n => n.target)})))}`);
  const noJS = await browser.newPage({ javaScriptEnabled: false });
  await noJS.goto(baseURL + '/');
  check(await noJS.locator('button[type="submit"]').isDisabled(), 'Without JavaScript, the unconfigured form cannot accidentally submit data');
  check(errors.length === 0, `No browser errors: ${errors.join('; ')}`);
  console.log(`PASS ${checks} checks. No browser errors.`);
} finally { await browser.close(); }
