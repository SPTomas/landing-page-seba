import { create } from 'fontkit';
import { readFile, writeFile, mkdir } from 'node:fs/promises';

const serif = create(await readFile('node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff'));
const sans = create(await readFile('node_modules/@fontsource/manrope/files/manrope-latin-500-normal.woff'));
const bold = create(await readFile('node_modules/@fontsource/manrope/files/manrope-latin-600-normal.woff'));

// Output outlined paths: these logos need no installed fonts and remain fully vectorial.
function outlined(text, font, size, baseline, color, tracking = 0) {
  const run = font.layout(text);
  const scale = size / font.unitsPerEm;
  const width = run.positions.reduce((sum, position) => sum + position.xAdvance * scale + tracking, -tracking);
  let x = (840 - width) / 2;
  let paths = '';
  for (let i = 0; i < run.glyphs.length; i++) {
    const glyph = run.glyphs[i];
    const position = run.positions[i];
    paths += `<path d="${glyph.path.toSVG()}" transform="translate(${x + position.xOffset * scale} ${baseline - position.yOffset * scale}) scale(${scale} ${-scale})"/>`;
    x += position.xAdvance * scale + tracking;
  }
  return `<g fill="${color}">${paths}</g>`;
}

const mark = {
  noche: '<path d="M47 18C39 10 17 12 16 30C15 45 52 47 51 65C50 85 24 91 13 77L11 63M48 14V33M40 28H66C90 28 92 57 65 59H49M51 29V86M41 87H64M64 59L86 87H94" fill="none" stroke="currentColor" stroke-width="3"/><path d="M52 29V86M66 60L85 86" fill="none" stroke="currentColor" stroke-width="6"/>',
  oliva: '<path d="M27 87H10V10H90V87H78M48 25C38 16 23 22 23 34C23 47 52 45 52 60C52 77 28 79 21 65M49 20V35M43 41H64C85 41 84 63 64 64H51M53 42V90M44 90H65M64 64L82 90H91" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M54 42V89" fill="none" stroke="currentColor" stroke-width="4"/>',
  grafito: '<path d="M47 20H26C4 20 4 48 26 48H35C57 48 57 78 35 78H10M59 20H73C95 20 95 49 73 49H61L88 78" fill="none" stroke="currentColor" stroke-width="12"/>',
};
const palettes = { noche: ['#101f30', '#b28c56'], oliva: ['#34453b', '#627253'], grafito: ['#222326', '#bd795f'] };
await mkdir('public/logos', { recursive: true });
for (const [theme, [ink, accent]] of Object.entries(palettes)) {
  for (const white of [false, true]) {
    const primary = white ? '#ffffff' : ink;
    const secondary = white ? '#ffffff' : accent;
    const nameFont = theme === 'grafito' ? bold : serif;
    const nameSize = theme === 'grafito' ? 39 : 46;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 460" role="img" aria-labelledby="title"><title id="title">Sebastián Reinoso · Abogado · ${theme}</title><g transform="translate(302 16) scale(2.36)" color="${secondary}">${mark[theme]}</g>${outlined('SEBASTIÁN REINOSO', nameFont, nameSize, 322, primary, theme === 'grafito' ? .2 : 2.4)}${outlined('ABOGADO', sans, 17, 372, secondary, 9)}<path d="M200 366H280M560 366H640" stroke="${secondary}" stroke-width="1"/></svg>`;
    await writeFile(`public/logos/sr-${theme}${white ? '-blanco' : ''}.svg`, svg);
  }
}
console.log('Six fully outlined, font-independent SVG logos generated.');
