# Preload JSON
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=plastic)](https://github.com/semantic-release/semantic-release)

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

First, determine a name for the data set. This will be used when requesting and receiving it.

In `<head>`

```html
<script type="text/javascript">
  // Automatically setup JSONP receivers and interface with `preload-json.js`
  !function(n,e,i){function o(e){n["pjReceive_"+e]=function(o){n[i].push(["notify",e,o])}}n[i]=n[i]||[],n[e]={register:function(){for(var n=0,e=arguments.length;e>n;n++)o(arguments[n])}}}(window,"pj","pjQueue");

  // Register JSONP handlers
  pj.register('dataSetName')
</script>
```

Before the closing `</body>`

```html
<script src="http://example.com/data.json?callback=pjReceive_dataSetName" async defer></script>
```

**NOTE**: The JSONP callback *must* be prefixed with `pjReceive_`

In the app consuming the data

```js
import { subscribe } from 'preload-json'

subscribe('dataSetName', data => {
  console.log('my lib has the data!', data)
})

```


## Demo
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

## Semantic Release

## Distribution
Execute one of the following commands
```bash
npm version patch -m "Bumped to %s"
npm version minor -m "Bumped to %s"
npm version major -m "Bumped to %s"
```
