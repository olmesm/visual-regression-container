const puppeteer = require('puppeteer')

const { PATH_CHALLENGER, OUTPUT_EXTENSION } = require('../config/config.json')
const VIEWPORTS = require('../config/viewports.json')

const LOCALHOST = 'localhost'
const DOCKER_LOCALHOST = 'host.docker.internal'
const CHROMIUM_PATH = process.env.PATH_CHROMIUM || '/usr/bin/chromium-browser'
const { VIEWPORT } = process.env

const ssFunc = async ({ browser, url, pageViewport }) => {
  let deviceType = 'default'
  const page = await browser.newPage()

  if (pageViewport) {
    const { name, ...viewportOptions } = pageViewport
    deviceType = name

    await page.setViewport(viewportOptions)
  }

  await page.setRequestInterception(true)
  page.on('request', interceptedRequest => {
    const requestUrl = interceptedRequest.url()
    if (requestUrl.includes(LOCALHOST)) {
      interceptedRequest.continue({ url: requestUrl.replace(LOCALHOST, DOCKER_LOCALHOST) })
      return
    }

    interceptedRequest.continue()
  })

  await page.goto(url, { waitUntil: 'networkidle2', timeout: 90 * 10000 })

  const safeUrlFileName = url.replace(/(http(s)*:\/\/)|\W/g, '_')

  await page.screenshot({
    fullPage: true,
    path: `${PATH_CHALLENGER}/${safeUrlFileName}--${deviceType}.${OUTPUT_EXTENSION}`
  })
}

const selectViewport = viewport => {
  const device = VIEWPORTS.find(({ name }) => name === viewport)

  if (!device) { return undefined }

  return device
}

exports.puppet = async (urlList) => {
  try {
    const browser = await puppeteer.launch({ executablePath: CHROMIUM_PATH })
    const pageViewport = selectViewport(VIEWPORT)
    const promiseList = urlList.map(url => ssFunc({ browser, url, pageViewport }))

    await Promise.all(promiseList)

    await browser.close()
  } catch (e) {
    throw new Error(e)
  }
}
