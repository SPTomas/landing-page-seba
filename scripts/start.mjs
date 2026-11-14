import { spawn } from 'node:child_process';

const url = 'http://127.0.0.1:4322/propuestas/';
function open() {
  const command = process.platform === 'win32' ? 'rundll32.exe' : process.platform === 'darwin' ? 'open' : 'xdg-open';
  const args = process.platform === 'win32' ? ['url.dll,FileProtocolHandler', url] : [url];
  spawn(command, args, { detached: true, stdio: 'ignore' }).unref();
  console.log(`\nPropuestas listas: ${url}\n`);
}
let alreadyRunning = false;
try {
  const response = await fetch(url, { signal: AbortSignal.timeout(1500) });
  alreadyRunning = response.ok && (await response.text()).includes('Tres propuestas · Sebastián Reynoso');
} catch { /* No existing preview. Start this project's server below. */ }
if (alreadyRunning) open();
else {
  const child = spawn(process.execPath, ['node_modules/astro/bin/astro.mjs', 'dev', '--host', '127.0.0.1', '--port', '4322'], { stdio: ['inherit','pipe','inherit'] });
  let opened = false;
  child.stdout.on('data', data => {
    process.stdout.write(data);
    if (!opened && data.toString().includes('127.0.0.1:4322')) { opened = true; open(); }
  });
  child.on('exit', code => { process.exitCode = code ?? 0; });
  process.on('SIGINT', () => child.kill('SIGINT'));
  process.on('SIGTERM', () => child.kill('SIGTERM'));
}
