RedisKit
---
Redis工具包

### Install
```sh
npm i @4a/rediskit
```

### Usage
```ts
// redis client需支持promise, 推荐使用ioredis
import { Redis } from 'ioredis'
import { regStock, regIncrement } from '@4a/rediskit'

const createIncr = regIncrement(new Redis())
const createStock = regIncrement(new Redis())
```

### Stock
基于``Redis``简单的队列操作
```ts
createStock('app:stock:apple')
createStock('app:stock', apple)
createStock('app:stock', apple, 'price', ...)

const stock = createStock('app:stock:apple', id)

await stock.get()
await stock.set(arr, time)
await stock.save(arr, time)

await stock.prepend(item)
await stock.append(item)
await stock.pop()
await stock.shift()
await stock.remove(item)
await stock.remove(item => item.type === 1)

await stock.find(callback)
await stock.findIndex(callback)

await stock.map(callback)
await stock.each(callback)
await stock.slice(start, end)

await stock.clear()
await stock.expire()
await stock.expire(60)
```


### Increment API
基于``Redis.incr``的安全计数
```ts
createIncr('app:incr:apple')
createIncr('app:stock', apple, 'price', ...)

const increment = createIncr('app:stock:apple', id)

await increment.isRepeat()
await increment.isNotRepeat()

await increment.isOutRange(10)
await increment.isInRange(10)
await increment.isInRange(10, 3)

await increment.increment()
await increment.decrement()

await increment.clear()
await increment.expire()
await increment.expire(60)
```

&nbsp;
Example
---
> npm test
