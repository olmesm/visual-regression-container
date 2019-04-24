const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium-browser'
  })
  const page = await browser.newPage()
  await page.goto('https://example.com')
  await page.screenshot({ path: 'screenshots/example.png' })

  await browser.close()
})()
