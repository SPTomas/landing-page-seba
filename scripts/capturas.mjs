import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { launchBrowser, ready, baseURL } from './browser.mjs';

const output = 'docs/capturas';
await mkdir(output, { recursive: true });
const browser = await launchBrowser();
try {
  for (const [name, viewport] of [
    ['escritorio', { width: 1440, height: 1080 }],
    ['movil', { width: 390, height: 1080 }],
  ]) {
    const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
    const response = await page.goto(`${baseURL}/`);
    assert.ok(response.ok(), 'El sitio debe estar disponible antes de exportar.');
    assert.equal(await page.locator('html').getAttribute('data-theme'), 'noche');
    assert.equal(await page.locator('.preview-dock').count(), 0);
    await ready(page);
    await page.screenshot({ path: `${output}/inicio-${name}.png`, animations: 'disabled' });
    if (name === 'escritorio') {
      await page.screenshot({ path: `${output}/pagina-completa.png`, fullPage: true, animations: 'disabled' });
    }
    await page.close();
    console.log(`Captura del sitio elegido: ${name}`);
  }
} finally {
  await browser.close();
}
