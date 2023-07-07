import { Redis } from 'ioredis'
import { Core, DataSource } from './core'

const defaultAutoUpdateTime = 5 * 60

export class RMDB {
  private expireTime?: number
  private autoUpdateTime?: number

  constructor(public readonly key: string, public readonly redis: Redis) {
    this.key = key
    this.redis = redis
    this.autoUpdateTime = defaultAutoUpdateTime
  }

  /**
   * 单位秒
   * @param autoUpdateSeconds 数据自动更新时间，默认5分钟
   * @param expireSeconds 数据过期时间，可选，默认不过期
   * @returns
   */
  keep(autoUpdateSeconds?: number, expireSeconds?: number) {
    this.autoUpdateTime = autoUpdateSeconds
    this.expireTime = expireSeconds
    return this
  }

  from(dataSource: DataSource) {
    return Core.init({
      key: this.key,
      redis: this.redis,
      timeout: this.expireTime,
      autoUpdateTime: this.autoUpdateTime || defaultAutoUpdateTime,
      dataSource,
    })
  }
}

export function regRmdb(redis: Redis) {
  return (...keys: Array<string | number>) => {
    return new RMDB(keys.join(':'), redis)
  }
}

// const creator = regRMDB(redis)
// creator('test:f1').from(() => dataSource())
// creator('test:f1').keep(60 * 5).from(() => dataSource())
