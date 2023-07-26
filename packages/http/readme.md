## HTTP

### peerDependencies
 * axios@^1.2.0


### Install

```sh
npm i @4a/http
pnpm add @4a/http
```

### Usage

```ts
import { createHttp } from '@4a/http'
```

```ts
type AnyFunction<T> = (...args: any[]) => T
type API = Record<string, AnyFunction<AxiosRequestConfig>>

createHttp(api: API, opt?: AxiosRequestConfig)
```

```ts
// api.ts
// Example
export const api = {
  ok(params: Item): AxiosRequestConfig {
    return {
      params,
      method: 'GET',
      url: '/ok',
    }
  }
}
```

```ts
const http = createHttp(api)

const http = createHttp(api, { timeout: 5000 })

http.ok({ a: 1 })
```

More
```ts
export function createFactory(config: any) {
  return createHttp(api(config), {
    headers: {
      'Content-Type': 'application/json',
    },
    transformRequest(data: any) {
      return JSON.stringify(signed(data, config.secret))
    }
  })
}
```
