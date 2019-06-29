# puppeteer-upload-canvas

This script is auto upload Canvas WorkSpace!

https://canvasworkspace.brother.com/

## Usage

1. clone this repository

2. package install
```
npm install
```

3. set environment

```
export id=xxxx;
export pw=xxxx;
export uploadfile=C:\\Users\\xxxx\\Downloads\\cut\\1.svg
```

We recommend using direnv

4. run script

```
node index.js
```

## Want to run head full?

Modify the source this way.

You will be able to run with full chrome.

index.js
```javascript
  const browser = await puppeteer.launch({
    args: [
      "--disable-features=site-per-process",
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage"
    ],
-    // headless: false,
+    headless: false,
    slowMo: 150
  });
```