import type { Item } from './types'
import type { AxiosRequestConfig } from 'axios'

// 示例定义接口
export const api = {
  ok(params: Item): AxiosRequestConfig {
    return {
      params,
      method: 'GET',
      url: '/merge/userVerify',
    }
  }
}

export type Api = typeof api
