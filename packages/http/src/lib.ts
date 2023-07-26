/**
 * 选择对象中的部分属性
 * @param obj - 要选择属性的对象
 * @param keys - 要选择的属性列表
 * @returns 一个新对象，包含原对象中指定的属性
 */
export function pick<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const ret = {} as Pick<T, K>
  keys.forEach(key => ret[key] = obj[key])
  return ret
}

/**
 * 删除对象中的部分属性
 * @param obj - 要删除属性的对象
 * @param keys - 要删除的属性列表
 * @returns 一个新对象，不包含原对象中指定的属性
 */
export function omit<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const ret = {} as any
  Object.keys(obj).forEach(key => keys.includes(key as K) || (ret[key] = obj[key]))
  return ret as Omit<T, K>
}
