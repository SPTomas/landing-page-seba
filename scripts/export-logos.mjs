import { readFile } from 'node:fs/promises';
import { launchBrowser } from './browser.mjs';

// Export the corrected outlined logos without regenerating the historical mockups.
const browser = await launchBrowser();
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 660 }, deviceScaleFactor: 1 });
  for (const theme of ['noche', 'oliva', 'grafito']) {
    const svg = await readFile(`public/logos/sr-${theme}.svg`, 'utf8');
    await page.setContent(`<style>html,body{margin:0;background:transparent}svg{width:1200px;height:660px;display:block}</style>${svg}`);
    await page.screenshot({ path: `public/propuestas/logo-${theme}.png`, omitBackground: true });
    console.log(`Logo PNG actualizado: ${theme}`);
  }
} finally {
  await browser.close();
}
