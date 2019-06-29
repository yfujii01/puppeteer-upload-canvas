const puppeteer = require("puppeteer");
const filePath = process.env.uploadfile;

(async () => {
  // const browser = await puppeteer.launch();
  const browser = await puppeteer.launch({
    args: [
      "--disable-features=site-per-process",
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage"
    ],
    // headless: false,
    slowMo: 150
  });

  const page = await browser.newPage();
  await page.goto("https://canvasworkspace.brother.com/jp/");
  // await page.screenshot({ path: "screenshot.png" });

  // ログインする
  // await page.type("#UserName", process.env.uid);
  // await page.type("#Password", process.env.pwd);
  console.log("login!");
  await page.evaluate(
    (id, pw) => {
      document.querySelector("#UserName").value = id;
      document.querySelector("#Password").value = pw;
      document
        .querySelector(
          "#loginForm > section > form > div:nth-child(6) > button"
        )
        .click();
    },
    process.env.id,
    process.env.pw
  );

  // キャンバスワークスペースPC版がアップデートしましたダイアログを消す
  console.log("dialog clear");
  await page.waitFor("#cw-close-btn", { timeout: 120000 });
  await page.waitFor(5000);
  await page.click("#cw-close-btn");
  // await page.evaluate(document.querySelector("#cw-close-btn").click());

  console.log("new page");
  await page.waitFor(
    "#cpcontainer > div.box.box0.cp.create.masonry-brick > div",
    { timeout: 120000 }
  );
  await page.click("#cpcontainer > div.box.box0.cp.create.masonry-brick > div");
  // await page.evaluate(
  //   document
  //     .querySelector(
  //       "#cpcontainer > div.box.box0.cp.create.masonry-brick > div"
  //     )
  //     .click()
  // );

  // await page.evaluate(() => {
  //   document.querySelector("#canvas_title").value = "title";
  // });
  await page.type("#canvas_title", "title");

  await page.waitFor("#tool_importvec", { timeout: 120000 });
  await page.click("#tool_importvec");

  console.log("ファイルアップロード開始");
  
  const input = await page.$("#importfile");
  await input.uploadFile(filePath);
  console.log("ファイルアップロード終了");

  await page.click("#import_wiz_ok");

  await page.waitFor(5000);
  // 縮小インポート
  console.log("縮小インポート");
  try {
    await page.click(
      "body > div:nth-child(32) > \
      div.ui-dialog-buttonpane.ui-widget-content.ui-helper-clearfix \
      > div > button"
    );
  } catch (error) {
    console.log("縮小インポートの必要なし");
  }

  console.log("保存開始");
  await page.click("#tool_save");
  console.log("保存終了");

  await page.waitFor(5000);
  console.log("end!");
  console.log('チェック用URL')
  console.log('https://canvasworkspace.brother.com/jp/Home?show=myproj')
  await browser.close();
})();
