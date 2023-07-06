import { describe, it, expect } from 'vitest'
import assert from 'assert'
import { redis } from './redis.mock'
import { regStock } from '../src'

const creator = regStock(redis)

describe('class Stock test', () => {

    it('test get', async () => {
        const stock = creator('app:test:stock:get')
        const result = await stock.get()
        assert.deepEqual(result, [])
        stock.expire()
    })

    it('test set', async () => {
        const stock = creator('app:test:stock:set')
        await stock.set([1, 2, 3])
        const result = await stock.get()
        assert.deepEqual(result, [1, 2, 3])
        stock.expire()
    })

    it('test prepend', async () => {
        const stock = creator('app:test:stock:prepend')
        await stock.set([1, 2, 3])
        await stock.prepend(0)
        const result = await stock.get()
        assert.deepEqual(result, [0, 1, 2, 3])
        stock.expire()
    })

    it('test append', async () => {
        const stock = creator('app:test:stock:append')
        await stock.set([1, 2, 3])
        await stock.append(4)
        const result = await stock.get()
        assert.deepEqual(result, [1, 2, 3, 4])
        stock.expire()
    })

    it('test pop', async () => {
        const stock = creator('app:test:stock:pop')
        await stock.set([1, 2, 3])
        await stock.pop()
        const result = await stock.get()
        assert.deepEqual(result, [1, 2])
        stock.expire()
    })

    it('test shift', async () => {
        const stock = creator('app:test:stock:shift')
        await stock.set([1, 2, 3])
        await stock.shift()
        const result = await stock.get()
        assert.deepEqual(result, [2, 3])
        stock.expire()
    })

    it('test remove', async () => {
        const stock = creator('app:test:stock:remove')
        await stock.set([1, 2, 3])
        await stock.remove(2)
        const result = await stock.get()
        assert.deepEqual(result, [1, 3])
        stock.expire()
    })

    it('test slice 1', async () => {
        const stock = creator('app:test:stock:slice1')
        await stock.set([0, 1, 2, 3])
        const result = await stock.slice(1)
        assert.deepEqual(result, [1, 2, 3])
        stock.expire()
    })

    it('test slice 0,1', async () => {
        const stock = creator('app:test:stock:slice2')
        await stock.set([0, 1, 2, 3])
        const result = await stock.slice(0, 1)
        assert.deepEqual(result, [0])
        stock.expire()
    })

    it('test slice 2,5', async () => {
        const stock = creator('app:test:stock:slice3')
        await stock.set([0, 1, 2, 3, 4, 5])
        const result = await stock.slice(2, 5)
        assert.deepEqual(result, [2, 3, 4])
        stock.expire()
    })

    it('test map', async () => {
        const stock = creator('app:test:stock:map')
        await stock.set([0, 1, 2])
        const result = await stock.map(item => item + 1)
        assert.deepEqual(result, [1, 2, 3])
        stock.expire()
    })

    it('test each', async () => {
        const arr = [] as any
        const stock = creator('app:test:stock:each')
        await stock.set([0, 1, 2])
        await stock.each(item => arr.push(item + 1))
        assert.deepEqual(arr, [1, 2, 3])
        stock.expire()
    })

    it('test find', async () => {
        const stock = creator('app:test:stock:find')
        await stock.set([0, 1, 2])
        const result = await stock.find(item => item === 1)
        assert.equal(result, 1)
        stock.expire()
    })

    it('test findIndex', async () => {
        const stock = creator('app:test:stock:findIndex')
        await stock.set([1, 2, 3])
        const result = await stock.findIndex(item => item === 2)
        assert.equal(result, 1)
        stock.expire()
    })

    it('test clear', async () => {
        const stock = creator('app:test:stock:remove')
        await stock.set([1, 2, 3])
        await stock.clear()
        const result = await stock.get()
        assert.deepEqual(result, [])
        stock.expire()
    })
})
