const puppeteer = require('puppeteer')
const { PATH_CHALLENGER, OUTPUT_EXTENSION } = require('../config/config.json')

exports.puppet = async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium-browser'
  })
  const page = await browser.newPage()
  await page.goto('https://example.com')
  await page.screenshot({ path: `${PATH_CHALLENGER}/example.${OUTPUT_EXTENSION}` })

  await browser.close()
}
