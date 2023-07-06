import { Redis } from 'ioredis'

export class Increment {
  public readonly key: string
  public readonly redis: Redis

  constructor(key: string, redis: Redis) {
    this.key = key
    this.redis = redis
  }

  // 重复消费
  async isRepeat() {
    return this.isOutRange(1)
  }

  // 未重复消费
  async isNotRepeat() {
    return !(await this.isRepeat())
  }

  // 检查是否超出消费额度
  async isOutRange(max: number) {
    const times = await this.increment()
    return times > max
  }

  // 检查消费是否在库存之内
  async isInRange(max: number, min = 0) {
    const times = await this.increment()
    return times >= min && times <= max
  }

  // 新增一次消费计数
  async increment() {
    const times = await this.redis.incr(this.key)
    return times
  }

  // 减去一次消费计数
  async decrement() {
    const times = await this.redis.decr(this.key)
    return times
  }

  // 清理消费记录
  async clear() {
    return this.redis.del(this.key)
  }

  // 过期消费记录
  expire(time = 0) {
    return this.redis.expire(this.key, time)
  }

  // 查询历史消费记录
  async getTimes() {
    const times = await this.redis.get(this.key)
    return isNaN(Number(times)) ? 0 : Number(times)
  }

  async hasHistory() {
    return (await this.getTimes()) > 0
  }
}

export function regIncrement(redis: Redis) {
  return (...keys: Array<string | number>) => {
    return new Increment(keys.join(':'), redis)
  }
}
