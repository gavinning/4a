import type { AxiosRequestConfig } from 'axios'

export type Item = Record<string, any>
export type AnyFunction<T> = (...args: any[]) => T
export type API = Record<string, AnyFunction<AxiosRequestConfig>>
