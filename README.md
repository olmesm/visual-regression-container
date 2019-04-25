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

```sh
# To Run for development
sh scripts/run-local.sh

# To Run for production
#   First Run
sh scripts/build.sh

#   To Run
sh scripts/run.sh

```

<!-- Markdown References -->

[blink-diff]: https://github.com/yahoo/blink-diff
[puppeteer]: https://github.com/GoogleChrome/puppeteer/