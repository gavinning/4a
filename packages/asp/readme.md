## asp

染色日志，推荐配合 iTerm 使用，非标准日志模块，方便日志聚焦

### Install

```sh
npm i @4a/asp
pnpm add @4a/asp
```

### Usage

```js
import asp from '@4a/asp'
// or
import { asp, Asp } from '@4a/asp'
```

```js
asp.gray('message', { app: '@4a/asp' })
asp.log('message', { app: '@4a/asp' })
asp.info('message', { app: '@4a/asp' })
asp.debug('message', { app: '@4a/asp' })
asp.warn('message', { app: '@4a/asp' })
asp.error('message', { app: '@4a/asp' })

// pretty once
asp.pretty().error('message', { app: '@4a/asp' })
```

### Preview

<!-- https://raw.githubusercontent.com/gavinning/4a/main/packages/asp/preview.png -->
![@4a/asp:preview](https://raw.githubusercontent.com/gavinning/4a/main/packages/asp/preview.png)

### class Asp

```js
// pretty anywhere
const asp = new Asp({ pretty: true })
```

### Level

分级显示

```sh
Level=0 node app.js # only error
Level=1 node app.js # warn, error
Level=2 node app.js # info, warn, error
Level=3 node app.js # debug, info, warn, error
Level=4 node app.js # log, debug, info, warn, error
Level=5 node app.js # all
```

level

```ts
enum Level {
  error,
  warn,
  debug,
  info,
  log,
  gray,
}
```

### Example

```sh
node example/demo.js
```
