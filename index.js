const puppeteer = require("puppeteer");

(async () => {
  // const browser = await puppeteer.launch();
  const browser = await puppeteer.launch({
    args: [
      "--disable-features=site-per-process",
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage"
    ],
    headless: false,
    slowMo: 150
  });

  const page = await browser.newPage();
  await page.goto("https://www.google.com");
  await page.screenshot({ path: "screenshot.png" });

  await browser.close();
})();
