import axios from 'axios'
import type { Item } from './types'
import type { AxiosResponse, AxiosRequestConfig } from 'axios'

export * from './types'

// 生成http实例
export function createHttp<T extends Item, R extends Record<keyof T, any>>(api: T, opt?: AxiosRequestConfig) {

  // 自定义axios实例
  const instance = axios.create({ timeout: 10000, ...opt })

  type Http = {
    [K in keyof T]: (...args: Parameters<T[K]>) => Promise<AxiosResponse<R[K]>> //ReturnType<T[K]>
  }

  const http = {} as Http

  // 遍历API接口列表，动态生成实例方法
  for (const name in api) {
    Object.defineProperty(http, name, {
      writable: false,
      value: (...args: any[]) => instance(api[name](...args))
    })
  }

  return http
}
