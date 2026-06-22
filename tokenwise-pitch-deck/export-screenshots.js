const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const OUT_DIR = path.join(__dirname, 'exports');
const SLIDE_COUNT = 10;

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 2 });
  await page.goto(`file://${path.join(__dirname, 'index.html')}`, { waitUntil: 'networkidle0' });
  await page.evaluateHandle('document.fonts.ready');

  for (let i = 0; i < SLIDE_COUNT; i++) {
    await page.evaluate((idx) => {
      document.querySelectorAll('.slide').forEach((s, j) => s.classList.toggle('active', j === idx));
    }, i);
    await new Promise((r) => setTimeout(r, 300));
    await page.screenshot({
      path: path.join(OUT_DIR, `slide-${String(i + 1).padStart(2, '0')}.png`),
      clip: { x: 60, y: 90, width: 1280, height: 720 },
    });
    console.log(`Captured slide ${i + 1}`);
  }

  await browser.close();
  console.log(`Screenshots saved to ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
