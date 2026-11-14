import { mkdir, readFile } from 'node:fs/promises';
import { launchBrowser, ready, baseURL } from './browser.mjs';

const output = 'public/propuestas';
await mkdir(output, { recursive: true });
const browser = await launchBrowser();
const identities = [
  { key: 'noche', path: '/', title: 'Noche & bronce', no: '01', palette: ['#101f30','#c5a477','#f5f1e9'], traits: 'Solidez. Confianza. Elegancia.' },
  { key: 'oliva', path: '/oliva/', title: 'Marfil & oliva', no: '02', palette: ['#34453b','#78816c','#f4f1e9'], traits: 'Cercanía. Equilibrio. Calidez.' },
  { key: 'grafito', path: '/grafito/', title: 'Grafito editorial', no: '03', palette: ['#222326','#bd795f','#f7f6f2'], traits: 'Precisión. Carácter. Actualidad.' },
];
try {
  for (const identity of identities) {
    const desktop = await browser.newPage({ viewport: { width: 1440, height: 1080 }, deviceScaleFactor: 1 });
    await desktop.goto(`${baseURL}${identity.path}?presentacion=1`);
    await ready(desktop);
    await desktop.screenshot({ path: `${output}/web-${identity.key}-desktop.png` });
    await desktop.screenshot({ path: `${output}/web-${identity.key}-completa.png`, fullPage: true });
    const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    await mobile.goto(`${baseURL}${identity.path}?presentacion=1`);
    await ready(mobile);
    await mobile.screenshot({ path: `${output}/web-${identity.key}-movil.png` });
    await mobile.screenshot({ path: `${output}/web-${identity.key}-movil-completa.png`, fullPage: true });
    // Transparent PNG version of each outlined SVG logo.
    const logo = await browser.newPage({ viewport: { width: 1200, height: 660 }, deviceScaleFactor: 1 });
    const svg = await readFile(`public/logos/sr-${identity.key}.svg`, 'utf8');
    await logo.setContent(`<style>html,body{margin:0;background:transparent}svg{width:1200px;height:660px;display:block}</style>${svg}`);
    await logo.screenshot({ path: `${output}/logo-${identity.key}.png`, omitBackground: true });
    await logo.close();
    await desktop.close();
    await mobile.close();
    console.log(`Exported desktop, mobile, full-page and logo: ${identity.title}`);
  }
  // A shareable landscape slide, made from the actual site rather than an invented AI screenshot.
  for (const identity of identities) {
    const page = await browser.newPage({ viewport: { width: 1600, height: 1120 }, deviceScaleFactor: 1 });
    await page.goto(`${baseURL}/propuestas/`);
    const logoData = `data:image/svg+xml;base64,${Buffer.from(await readFile(`public/logos/sr-${identity.key}-blanco.svg`)).toString('base64')}`;
    await page.setContent(`<!doctype html><html><head><meta charset="UTF-8"><style>
      @font-face{font-family:Editorial;src:url('${baseURL}/fonts/editorial.woff2')}@font-face{font-family:Manrope;src:url('${baseURL}/fonts/manrope.woff2')}
      .browser{height:700px}
      .web .caption{top:727px;bottom:auto;max-width:800px}.web .caption strong{font-size:29px}.web .phone img{width:100%;height:100%;object-fit:cover;object-position:top}
      *{box-sizing:border-box}body{margin:0;background:#f4f1e9;color:#182536;font-family:Manrope,sans-serif;padding:48px 55px}header{display:flex;justify-content:space-between;align-items:end;border-bottom:1px solid #18253640;padding-bottom:22px;margin-bottom:28px}header h1{font:500 53px/.98 Editorial,Georgia;margin:0;letter-spacing:-1.3px}header span{font-size:11px;letter-spacing:3px}main{display:grid;grid-template-columns:330px 1fr;gap:33px}.identity{background:${identity.palette[0]};color:#f5f1e9;padding:29px 26px;height:840px;display:flex;flex-direction:column}.number{font-size:10px;letter-spacing:2px;opacity:.75}.identity h2{font:400 43px/1 Editorial,Georgia;letter-spacing:-1px;margin:18px 0 0}.logo{width:100%;margin-top:42px;margin-bottom:40px}.traits{font-size:12px;line-height:1.8;margin-top:0}.swatches{display:flex;gap:10px;margin-top:25px}.swatches i{width:37px;height:37px;border:1px solid #ffffff50;border-radius:50%}.note{margin-top:auto;font-size:10px;line-height:1.9;opacity:.7}.web{position:relative;padding-top:0}.browser{width:100%;border:1px solid #18253630;box-shadow:0 15px 35px #00000015;overflow:hidden;background:#e9e5dc}.bar{height:29px;display:flex;align-items:center;gap:5px;padding:0 12px;font-size:8px;color:#62666b}.bar i{width:5px;height:5px;background:#999b95;border-radius:50%}.bar span{margin-left:10px}.desktop{display:block;width:100%}.phone{position:absolute;bottom:26px;right:12px;width:207px;height:448px;border:7px solid #20262a;border-radius:25px;overflow:hidden;box-shadow:0 12px 35px #0004;background:#fff}.phone img{display:block;width:100%;height:auto}.caption{position:absolute;left:0;bottom:38px;font-size:12px;line-height:1.9;max-width:560px}.caption strong{font:500 31px Editorial,Georgia;display:block;margin-bottom:10px}footer{display:flex;justify-content:space-between;font-size:10px;color:#62666b;margin-top:28px}
      </style></head><body><header><h1>Sebastián Reynoso <em>/ ${identity.title}</em></h1><span>PROPUESTA ${identity.no} · IDENTIDAD & WEB</span></header><main><section class="identity"><span class="number">${identity.no} / DIRECCIÓN DE MARCA</span><h2>${identity.title}</h2><img class="logo" src="${logoData}"/><p class="traits">${identity.traits}</p><div class="swatches">${identity.palette.map(c => `<i style="background:${c}"></i>`).join('')}</div><p class="note">Una presencia profesional<br/>con una identidad propia.<br/><br/>Logo vectorial · Paleta de marca<br/>Web responsive · Foto original</p></section><section class="web"><div class="browser"><div class="bar"><i></i><i></i><i></i><span>Sebastián Reynoso · Abogado</span></div><img class="desktop" src="${baseURL}/propuestas/web-${identity.key}-desktop.png"/></div><div class="phone"><img src="${baseURL}/propuestas/web-${identity.key}-movil.png"/></div><div class="caption"><strong>Una mirada cercana. Un compromiso profesional.</strong>Capturas reales de la propuesta en escritorio y celular.<br/>Página navegable, áreas de práctica y formulario de consulta.</div></section></main><footer><span>Propuesta visual · Datos profesionales y contacto a confirmar</span><span>SEBASTIÁN REYNOSO / ABOGADO</span></footer></body></html>`);
    await ready(page);
    await page.screenshot({ path: `${output}/presentacion-${identity.key}.png` });
    await page.close();
  }
  const comparison = await browser.newPage({ viewport: { width: 1800, height: 1140 }, deviceScaleFactor: 1 });
  await comparison.goto(`${baseURL}/comparativa/`);
  await ready(comparison);
  await comparison.screenshot({ path: `${output}/00-comparativa.png`, fullPage: true });
  console.log('Three presentation slides and the comparison board exported.');
} finally { await browser.close(); }
