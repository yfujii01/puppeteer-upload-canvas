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
  await page.goto("https://canvasworkspace.brother.com/jp/");
  // await page.screenshot({ path: "screenshot.png" });

  await page.type.$('#UserName',"hoge");
  await page.type.$('#Password',"hoge");

  await browser.close();
})();
