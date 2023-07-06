import { Redis } from 'ioredis'

export const redis = new Redis({
  host: '192.168.5.103',
  port: 6379,
  connectTimeout: 1000 * 10,
  retryStrategy: () => 1000,
  db: 0,
})
