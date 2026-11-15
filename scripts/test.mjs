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
    // All WhatsApp visits are mocked locally, including the floating action.
    await context.route('https://wa.me/**', route => route.fulfill({ status: 200, contentType: 'text/html', body: '<p>WhatsApp mock</p>' }));
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(`${path}: ${error.message}`));
    const external = [];
    page.on('request', request => { if (/^https?:/.test(request.url()) && !request.url().startsWith(baseURL)) external.push(request.url()); });
    const response = await page.goto(baseURL + path);
    check(response.ok(), `${path} responds successfully`);
    await ready(page);
    check(await page.title() === 'Sebastián Reinoso · Abogado', 'Correct title');
    check(!(await page.locator('body').textContent()).includes('Reynoso'), 'Visible text consistently uses Reinoso with an i');
    check((await page.locator('.brand-name').first().textContent()).includes('Sebastián Reinoso'), 'Header displays the corrected surname');
    check(await page.locator('h1').count() === 1, 'Exactly one H1');
    check(await page.locator('.preview-dock').count() === (path === '/' ? 0 : 1), 'Only archived alternatives show the design selector');
    if (path === '/') {
      const logoResponse = await page.request.get(`${baseURL}/logos/sr-noche.svg`);
      const logoSource = await logoResponse.text();
      check(logoResponse.ok() && logoSource.includes('Sebastián Reinoso') && !logoSource.includes('Reynoso'), 'Downloadable vector logo uses the corrected surname');
      check(await page.locator('html').getAttribute('data-theme') === 'noche', 'Selected blue-and-bronze identity is the main page');
      check(await page.locator('link[rel="icon"]').getAttribute('href') === '/logos/sr-noche.svg', 'Selected logo is used as favicon');
      check(await page.locator('.portrait-photo img').evaluate(image => image.naturalWidth === 768 && image.naturalHeight === 1152), 'Updated portrait is optimized without changing its proportions');
      check(await page.locator('.portrait-photo img').evaluate(image => getComputedStyle(image).filter === 'none'), 'Main portrait preserves the supplied colors');
    }
    check(await page.locator('[data-service]').count() === 6, 'Six practice areas');
    const practiceAreas = [
      ['civil', 'Derecho civil'],
      ['comercial', 'Derecho comercial'],
      ['laboral', 'Derecho laboral'],
      ['familia', 'Derecho de familia'],
      ['insolvencia', 'Concursos y quiebras (Insolvencia)'],
      ['penal', 'Derecho penal'],
    ];
    assert.deepEqual(await page.locator('.service-card h3').allTextContents(), practiceAreas.map(([, title]) => title));
    checks++;
    check((await page.locator('.hero-role').textContent()).includes('Profesor universitario'), 'Academic role is visible in the hero');
    check(await page.locator('.academic-profile').isVisible(), 'University teaching has a dedicated section');
    check((await page.locator('.professional-credentials').textContent()).includes('Matrícula Provincial 1-42921'), 'Confirmed provincial registration is visible');
    check((await page.locator('.professional-credentials').textContent()).includes('Primera Circunscripción Judicial de la Provincia de Córdoba'), 'Full jurisdiction is visible');
    check(await page.locator('.contact-methods a[href="tel:+5493515307287"]').count() === 1, 'Telephone uses the supplied number');
    check(await page.locator('.contact-methods a[href="mailto:reinososebastian8@gmail.com"]').count() === 1, 'Email uses the supplied address');
    check(await page.locator('.contact-methods a[href="https://wa.me/5493515307287"]').count() === 1, 'WhatsApp uses the Argentine international number');
    check(await page.locator('.floating-contact').getAttribute('href') === 'https://wa.me/5493515307287', 'Floating action opens the configured WhatsApp');
    check(await page.locator('.floating-contact [data-icon="whatsapp"]').count() === 1, 'Floating action uses the recognizable WhatsApp logo instead of a generic chat icon');
    check(await page.locator('.floating-contact').getAttribute('aria-label') === '¿Tenés una consulta? Escribime por WhatsApp · Sebastián Reinoso', 'WhatsApp action has an accessible name matching its visible invitation');
    check(await page.locator('.floating-label').isVisible(), 'WhatsApp invitation is visible without hovering or using a keyboard');
    check((await page.locator('.nav-cta').textContent()).trim() === 'Contactame', 'Header uses the requested Contactame label');
    check((await page.locator('.hero-actions .button-primary').textContent()).trim() === 'Contame tu caso', 'Hero uses a personal invitation instead of repeating the platform name');
    check(await page.locator('.hero-actions .button-primary').getAttribute('href') === 'https://wa.me/5493515307287', 'Primary hero action starts a direct WhatsApp conversation');
    check(await page.locator('.nav-cta [data-icon="whatsapp"]').count() === 1, 'Header action consistently identifies WhatsApp');
    check(await page.locator('.professional-strip strong').count() === 3, 'Professional facts have a readable summary below the hero');
    if (path === '/') {
      await page.keyboard.press('Tab');
      await page.locator('.floating-contact').focus();
      check(await page.locator('.floating-label').isVisible(), 'Persistent WhatsApp invitation also remains available to keyboard users');
      const directPopupPromise = page.waitForEvent('popup');
      await page.locator('.floating-contact').click();
      const directPopup = await directPopupPromise;
      await directPopup.waitForURL('https://wa.me/**');
      check(new URL(directPopup.url()).pathname === '/5493515307287', 'Floating WhatsApp action opens the supplied number without sending a message');
      await directPopup.close();
    }
    const mapURL = new URL(await page.locator('.contact-methods a[href^="https://www.google.com/maps/"]').getAttribute('href'));
    check(mapURL.searchParams.get('query') === 'Juan del Campillo 747, barrio Cofico, Córdoba, Argentina', 'Map points to the supplied office address');
    check((await page.locator('button[type="submit"]').textContent()).includes('Continuar por WhatsApp'), 'Submit button describes the actual handoff, not a completed send');
    for (const width of [320, 360, 390, 414, 700, 768, 820, 1024, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${path} has no horizontal overflow at ${width}px`);
      check(await page.locator('.floating-contact').evaluate(link => {
        const rect = link.getBoundingClientRect();
        return rect.width >= 44 && rect.height >= 44 && rect.left >= 0 && rect.right <= innerWidth && rect.bottom <= innerHeight;
      }), `${path} WhatsApp touch target is large enough and stays within the viewport at ${width}px`);
    }
    await page.setViewportSize({ width: 1440, height: 1080 });
    if (path === '/') {
      await page.locator('.desktop-nav a[href="#areas"]').click();
      await page.locator('.desktop-nav a[href="#areas"][aria-current="location"]').waitFor();
      check(true, 'Desktop navigation highlights the currently viewed section');
    }
    check(await page.evaluate(() => [...document.images].every(image => image.naturalWidth > 0)), `${path} no broken images`);
    for (const [id, title] of practiceAreas) {
      await page.locator(`[data-service="${id}"]`).click();
      check(await page.locator('#service-dialog-title').textContent() === title, `${id} opens its correct detail`);
      check(await page.locator('.dialog-examples li').count() >= 2, `${id} includes concrete consultation examples`);
      await page.locator('.dialog-contact').click();
      check(await page.locator('#contact-area').inputValue() === title, `${id} is preselected when consulting`);
    }
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
    check(await page.locator('#privacy-dialog a[href="mailto:reinososebastian8@gmail.com"]').count() === 1, 'Privacy includes a real channel for data-rights requests');
    await page.keyboard.press('Escape');
    check(!await page.locator('#contact-form').evaluate(form => form.checkValidity()), 'Empty form cannot submit');
    await page.getByRole('textbox', { name: 'Nombre y apellido' }).fill('Persona de prueba');
    await page.getByRole('textbox', { name: 'Correo electrónico' }).fill('prueba@example.com');
    await page.getByRole('textbox', { name: 'Tu consulta' }).fill('Esta es una consulta de prueba sin información sensible.');
    await page.locator('[name="consentimiento"]').check();
    const outgoing = [];
    page.on('request', req => { if (req.method() === 'POST') outgoing.push(req.url()); });
    // Intercept the popup locally: no test data is sent to WhatsApp or any real service.
    const popupPromise = page.waitForEvent('popup');
    await page.locator('button[type="submit"]').click();
    const popup = await popupPromise;
    await popup.waitForURL('https://wa.me/**');
    const whatsappURL = new URL(popup.url());
    check(whatsappURL.pathname === '/5493515307287', 'Prepared message targets the correct WhatsApp');
    check(whatsappURL.searchParams.get('text').includes('Persona de prueba') && whatsappURL.searchParams.get('text').includes('Derecho laboral'), 'WhatsApp message includes the entered data and selected area');
    check(whatsappURL.searchParams.get('text').startsWith('Consulta para Sebastián Reinoso'), 'WhatsApp message uses the corrected professional name');
    check((await page.locator('.form-status').textContent()).includes('Confirmá el envío allí'), 'WhatsApp handoff does not claim the consultation was sent');
    check(outgoing.length === 0, 'Configured WhatsApp form makes no POST requests');
    check(await page.getByRole('textbox', { name: 'Nombre y apellido' }).inputValue() === 'Persona de prueba', 'WhatsApp handoff preserves form data');
    await popup.close();

    // Keep the offline fallback covered if contact channels are removed in the future.
    await page.locator('#contact-form').evaluate(form => { form.dataset.whatsapp = ''; form.dataset.email = ''; });
    await page.locator('button[type="submit"]').click();
    check((await page.locator('.form-status').textContent()).includes('no envía datos'), 'Demo accurately reports that nothing was sent');
    check(outgoing.length === 0, 'Demo form makes no POST requests');
    check(await page.locator('#download-consultation').isVisible(), 'Download is offered');
    const downloadPromise = page.waitForEvent('download');
    await page.locator('#download-consultation').click();
    const download = await downloadPromise;
    const contents = await readFile(await download.path(), 'utf8');
    check(contents.includes('Persona de prueba') && contents.includes('Derecho laboral'), 'Download contains the entered consultation and selected area');
    check(contents.startsWith('Consulta para Sebastián Reinoso'), 'Offline download uses the corrected surname');
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
    await page.getByRole('textbox', { name: 'Nombre y apellido' }).focus();
    check(!await page.locator('.floating-label').isVisible(), 'Mobile invitation collapses while filling the form so it does not cover inputs');
    check((await page.locator('.floating-contact').boundingBox()).width <= 70, 'Collapsed mobile WhatsApp remains a compact touch target');
    await page.evaluate(() => scrollTo(0,0));
    await page.locator('.menu-toggle').click();
    check(await page.locator('.floating-label').isVisible(), 'Mobile invitation expands again after leaving the form');
    check(await page.locator('#mobile-menu').isVisible(), 'Mobile navigation opens');
    await page.keyboard.press('Escape');
    check(!await page.locator('#mobile-menu').isVisible(), 'Escape closes mobile navigation');
    check(await page.locator('.menu-toggle').evaluate(button => button === document.activeElement), 'Escape returns keyboard focus to the menu button');
    await page.locator('.menu-toggle').click();
    await page.locator('#mobile-menu a[href="#areas"]').click();
    check(!await page.locator('#mobile-menu').isVisible(), 'Mobile menu closes after navigation');
    await page.locator('.site-footer .privacy-trigger').click();
    check(await page.locator('#privacy-dialog').isVisible(), 'Footer privacy remains clickable above the expanded WhatsApp invitation');
    await page.keyboard.press('Escape');
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
  check(await noJS.locator('button[type="submit"]').isDisabled(), 'Without JavaScript, the form cannot accidentally submit data');
  check(await noJS.locator('.contact-methods a[href="tel:+5493515307287"]').isVisible(), 'Telephone remains available without JavaScript');
  check(await noJS.locator('.contact-methods a[href="https://wa.me/5493515307287"]').isVisible(), 'Direct WhatsApp remains available without JavaScript');
  check(await noJS.locator('.floating-label').isVisible(), 'Persistent invitation works without JavaScript');
  const reducedMotion = await browser.newPage({ reducedMotion: 'reduce' });
  await reducedMotion.goto(baseURL + '/');
  check(await reducedMotion.locator('.floating-icon').evaluate(icon => getComputedStyle(icon, '::after').animationName === 'none'), 'WhatsApp attention effect respects reduced-motion preferences');
  check(await reducedMotion.locator('.floating-label').isVisible(), 'Reduced-motion users keep the visible WhatsApp invitation');
  check(errors.length === 0, `No browser errors: ${errors.join('; ')}`);
  console.log(`PASS ${checks} checks. No browser errors.`);
} finally { await browser.close(); }
