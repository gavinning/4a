import { describe, it, expect } from 'vitest'
import assert from 'assert'
import { redis } from './redis.mock'
import { regIncrement } from '../src'

const creator = regIncrement(redis)

describe('Class Increment test', async () => {
  it('test isRepeat', async () => {
    const incr = creator('test:Increment', 'isRepeat')
    await incr.increment()
    assert.ok(await incr.isRepeat())
    incr.expire()
  })

  it('test isNotRepeat', async () => {
    const incr = creator('test:Increment', 'isNotRepeat')
    assert.ok(await incr.isNotRepeat())
    incr.expire()
  })

  it('test isOutRange', async () => {
    const incr = creator('test:Increment', 'isOutRange')
    await incr.increment()
    assert.ok(await incr.isOutRange(1))
    incr.expire()
  })

  it('test isInRange', async () => {
    const incr = creator('test:Increment', 'isInRange')
    assert.ok(await incr.isInRange(1))
    incr.expire()
  })

  it('test getTimes', async () => {
    const incr = creator('test:Increment', 'getTimes')
    await incr.increment()
    assert.ok((await incr.getTimes()) === 1)
    incr.expire()
  })

  it('test clear', async () => {
    const incr = creator('test:Increment', 'clear')
    await incr.increment()
    await incr.clear()
    assert.ok((await incr.getTimes()) === 0)
    incr.expire()
  })

  it('test hasHistory', async () => {
    const incr = creator('test:Increment', 'hasHistory')
    await incr.increment()
    assert.ok(await incr.hasHistory())
    incr.expire()
  })
})
