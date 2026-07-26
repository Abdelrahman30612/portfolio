const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 633 });
  
  const htmlPath = path.join(__dirname, 'og-image.html');
  await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
  
  await page.screenshot({
    path: path.join(__dirname, 'og-image.png'),
    type: 'png',
    clip: { x: 0, y: 0, width: 1200, height: 633 }
  });
  
  await browser.close();
  console.log('✅ og-image.png created!');
})();
