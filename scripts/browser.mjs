import { chromium } from '@playwright/test';
import { existsSync } from 'node:fs';

export const baseURL = process.env.SITE_URL || 'http://127.0.0.1:4322';
export async function launchBrowser() {
  const paths = [process.env.BROWSER_PATH, 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Google/Chrome/Application/chrome.exe'].filter(Boolean);
  const executablePath = paths.find(path => existsSync(path));
  return chromium.launch({ ...(executablePath ? { executablePath } : {}), headless: true });
}
export async function ready(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map(async image => { image.loading = 'eager'; await image.decode().catch(() => {}); }));
  });
}
