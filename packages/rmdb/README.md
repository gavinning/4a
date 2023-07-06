# rmdb

缓存与持久化策略  
优先从 Redis 缓存读取数据，当缓存过期或为空时，从数据源读取返回并更新到缓存

### Install

```sh
npm i rmdb
pnpm add rmdb
```

### Usage

```ts
// 使用ES6
import { regRmdb } from 'rmdb'
const creator = regRmdb(redis)
```

创建 rmdb 实例

```ts
// 默认更新时间 5分钟 缓存不会过期
const rmdb = creator(key).from(dataSource)

/**
 * @param {string} key                  必须，Redis Key
 * @param {number} autoUpdateSeconds    数据自动更新时间，默认5分钟
 * @param {number?} expireSeconds       数据过期时间，可选，默认不过期
 * @param {DataSource} dataSource       必须，数据来源
 * @returns {RMDB}
 */
const rmdb = creator(key).keep(autoUpdateTime, expireTime).from(dataSource)

// 对于配置类型的存储，推荐不设置expireTime时间
// 缓存本身不会过期，autoUpdateTime设置更新时间间隔
// 如果更新失败将会使用缓存输出
const rmdb = creator(key).keep(autoUpdateTime).from(dataSource)
```

#### Types

```ts
export type DataSource = (...args: any[]) => any | Promise<any>
```

#### Example 1

```ts
// 每5分钟自动从数据源更新数据到缓存
const rmdb = creator('test:f1').from(() => [1, 2, 3])
```

#### Example 2

```ts
// 每小时自动从数据源更新数据到缓存
const rmdb = creator('test:f1')
  .keep(3600)
  .from(() => [1, 2, 3])
```

#### Example 3

```ts
// 每小时自动从数据源更新数据到缓存
// 数据24小时过期，数据过期后再次请求将触发数据更新
const rmdb = creator('test:f1')
  .keep(3600, 3600 * 24)
  .from(() => [1, 2, 3])
```

### rmdb

rmdb 实例提供 3 个方法

```ts
// 查询数据
const data = await rmdb.get()
// 使用过滤条件
// 所有参数会被当做过滤条件透传给dataSource
// 过滤条件属于高级用法，多数时候不需要，谨慎使用
const data = await rmdb.get({ id: 1 })
```

```ts
// 更新数据，立即从数据源更新
// 注意！大多数时候应该使用get方法，程序会根据时间配置自动更新缓存，除非你知道自己在做什么
const result = await rmdb.update()
// 使用过滤条件
// 所有参数会被当做过滤条件透传给dataSource
// 过滤条件属于高级用法，多数时候不需要，谨慎使用
const result = await rmdb.update({ id: 1 })
```

```ts
// 清理缓存
await rmdb.clear()
```

### 环境变量下使用 rmdb

比如根据请求参数进行缓存

- 这种情况下不推荐使用 rmdb 实例 get 以外的方法
- 应使用 keep 方法设置`autoUpdateSeconds`和`expireSeconds`

#### Example 1

```ts
router.get('/posts', async ctx => {
  const user = ctx.state.user
  const posts = await db.post.find({ user: user.id })
  return creator('app:user:posts', user.id)
    .keep(5, 10)
    .from(() => posts)
    .get()
})
```

#### Example 2

> DataSource 闭包捕获环境变量，无需传递过滤条件 `推荐`

```ts
function getPosts(user) {
  return db.post.find({ user: user.id })
}

router.get('/posts', async ctx => {
  const user = ctx.state.user
  // DataSource闭包捕获环境变量，无需传递过滤条件
  return creator('app:user:posts', user.id)
    .keep(5, 10)
    .from(() => getPosts(user))
    .get()
})
```

#### Example 2

> 直接传入 DataSource 函数，可能需要向 get 方法传递过滤条件  
> get 获得的所有参数会被当做过滤条件透传给 DataSource

```ts
function getPosts(user) {
  return db.post.find({ user: user.id })
}

router.get('/posts', async ctx => {
  const user = ctx.state.user
  // 直接传入DataSource函数，可能需要向get方法传递过滤条件
  // get获得的所有参数会被当做过滤条件透传给DataSource
  return creator('app:user:posts', user.id).keep(5, 10).from(getPosts).get(user)
})
```

![](http://assets.processon.com/chart_image/5bdc11c0e4b00cdc18c90d9b.png)
