const puppeteer = require('puppeteer')
const { PATH_CHALLENGER, OUTPUT_EXTENSION } = require('../config/config.json')

const LOCALHOST = 'localhost'
const DOCKER_LOCALHOST = 'host.docker.internal'
const CHROMIUM_PATH = process.env.PATH_CHROMIUM = '/usr/bin/chromium-browser'

const ssFunc = async ({ browser, url }) => {
  const page = await browser.newPage()

  await page.setRequestInterception(true)
  page.on('request', interceptedRequest => {
    const requestUrl = interceptedRequest.url()
    if (requestUrl.includes(LOCALHOST)) {
      interceptedRequest.continue({ url: requestUrl.replace(LOCALHOST, DOCKER_LOCALHOST) })
      return
    }

    interceptedRequest.continue()
  })

  await page.goto(url)
  await page.waitFor(10000)
  await page.screenshot({
    fullPage: true,
    path: `${PATH_CHALLENGER}/${url.replace(/(http(s)*:\/\/)|\W/g, '_')}.${OUTPUT_EXTENSION}`
  })
}

exports.puppet = async (urlList) => {
  try {
    const browser = await puppeteer.launch({ executablePath: CHROMIUM_PATH })

    const promiseList = urlList.map(url => ssFunc({ browser, url }))

    await Promise.all(promiseList)

    await browser.close()
  } catch (e) {
    throw new Error(e)
  }
}
