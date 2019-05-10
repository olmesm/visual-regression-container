# Visual Regression Puppet

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

![Puppet being stroked](https://i.giphy.com/xWZcTvh1cuAaSi7HeI.gif)

Runs visual regression tests inside a docker container. See [blink-diff] for more info and examples.

## Features

- [blink-diff]
- [puppeteer]

## TODO

- [ ] parallelization
- [ ] mapping of a JSON file into the docker image of URLs.
- [ ] extend for pa11y

## Running

This should be run in a docker container. The consistent environment will ensure rendered images are uniform across different machines.

### Development

```sh
# To Run for development
sh scripts/run-dev.sh
```

### Production

```sh
# To Run for production
#   First Run
sh scripts/build.sh

# To Run
sh scripts/run.sh
```

## Runninng on mac

Set `PATH_CHROMIUM` to the location of chromium browser

## Webpack

If serving from localhost and using webpack dev server, you'll need to add to your allowedHosts settings;

```js
{
    ...
    devServer: {
        ...
        allowedHosts: ['host.docker.internal']
    }
}
```
<!-- Markdown References -->

[blink-diff]: https://github.com/yahoo/blink-diff
[puppeteer]: https://github.com/GoogleChrome/puppeteer/
https://kb.apify.com/overcoming-anti-scraping-protection/using-man-in-the-middle-proxy-to-intercept-requests-in-puppeteer