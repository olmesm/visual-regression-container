const puppeteer = require('puppeteer')
const { PATH_CHALLENGER } = require('../config/config.json')

exports.puppet = async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium-browser'
  })
  const page = await browser.newPage()
  await page.goto('https://example.com')
  await page.screenshot({ path: `${PATH_CHALLENGER}/example.png` })

  await browser.close()
}
