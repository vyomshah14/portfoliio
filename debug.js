import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    headless: "new"
  });
  
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
  
  try {
    await page.goto('http://localhost:4173', { waitUntil: 'networkidle0', timeout: 5000 });
    console.log("Page loaded successfully.");
  } catch (e) {
    console.log("Error loading page:", e);
  }

  await browser.close();
})();
