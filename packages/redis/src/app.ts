import { Redis } from 'ioredis'

export default class App {
  public readonly key: string
  public readonly redis: any

  constructor(key: string, redis: Redis) {
    this.key = key
    this.redis = redis
  }

  async get() {
    return App.encode(await this.redis.get(this.key))
  }

  set(value: any, time?: number) {
    value = App.stringify(value)
    return time
      ? this.redis.set(this.key, value, 'EX', time)
      : this.redis.set(this.key, value)
  }

  save(value: any, time?: number) {
    return this.set(value, time)
  }

  clear() {
    return this.redis.del(this.key)
  }

  expire(time = 0) {
    return this.redis.expire(this.key, time)
  }

  static encode(value?: string | null) {
    try {
      return JSON.parse(value!)
    } catch (err) {
      return value
    }
  }

  static stringify(value: any) {
    return 'object' === typeof value ? JSON.stringify(value) : value.toString()
  }

  static getKey() {
    return Array.from(arguments).join(':')
  }
}
