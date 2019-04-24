# Visual Regression Puppet

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

Runs visual regression tests inside a docker container. See [blink-diff] for more info and examples.

## Features

- [blink-diff]
- [puppeteer]

## TODO

- [ ] parallelization
- [ ] mapping of a JSON file into the docker image of URLs.
- [ ] extend for pa11y

```sh
# First Run
sh scripts/run.sh

# To Run
sh scripts/run.sh
```

<!-- Markdown References -->

[blink-diff]: https://github.com/yahoo/blink-diff
[puppeteer]: https://github.com/GoogleChrome/puppeteer/