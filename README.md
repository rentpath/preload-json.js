# Preload JSON
`preload-json.js` allows you to prefetch JSON before it's needed. This lib exists
until [`link[rel=prefetch]`](http://caniuse.com/#feat=link-rel-prefetch) or [`link[rel=preload]`](https://w3c.github.io/preload/) are widely adopted.

## Scenarios

There are times when this is useful:

- Page is heavily cached and you need to load dynamic content (e.g. user data)
- Preload data for content below the fold or behind an interaction.

For more rationale, read about [Prefetching, preloading, and prebrowsing](https://css-tricks.com/prefetching-preloading-prebrowsing/)

## Installation
```bash
$ npm i --save preload-json
```

## Usage
```bash
npm run demo
open http://localhost:3000/
Now open your console
```

## Scripts
* `npm run compile` - Compiles the module to disk (~/lib).
* `npm run compile:watch` - Same as `npm run compile` but watches files for changes.
* `npm run lint` - Lints all files.
* `npm run lint:fix` - Lints all files and attempts to fix any issues.
* `npm run test` - Runs unit tests.
* `npm run test:watch` - Same as `npm test` but watches files for changes.
* `npm run test:cov` - Generates a test coverage report.

## Distribution
Execute one of the following commands
```bash
npm version patch -m "Bumped to %s"
npm version minor -m "Bumped to %s"
npm version major -m "Bumped to %s"
```
