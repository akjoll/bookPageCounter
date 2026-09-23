import { describe, expect, it } from 'vitest'
import { validateEntry } from './validation.js'

describe('validateEntry', () => {
  it('passes for a valid entry', () => {
    const result = validateEntry({ name: 'Аяжан', date: '2026-09-22', pages: 20 })
    expect(result.valid).toBe(true)
    expect(result.errors).toEqual({})
  })

  it('requires a non-empty name', () => {
    const result = validateEntry({ name: '  ', date: '2026-09-22', pages: 20 })
    expect(result.valid).toBe(false)
    expect(result.errors.name).toBeDefined()
  })

  it('requires a date', () => {
    const result = validateEntry({ name: 'Аяжан', date: '', pages: 20 })
    expect(result.valid).toBe(false)
    expect(result.errors.date).toBeDefined()
  })

  it('rejects zero or negative page counts', () => {
    expect(validateEntry({ name: 'Аяжан', date: '2026-09-22', pages: 0 }).valid).toBe(false)
    expect(validateEntry({ name: 'Аяжан', date: '2026-09-22', pages: -5 }).valid).toBe(false)
  })

  it('rejects non-integer page counts', () => {
    const result = validateEntry({ name: 'Аяжан', date: '2026-09-22', pages: 3.5 })
    expect(result.valid).toBe(false)
    expect(result.errors.pages).toBeDefined()
  })

  it('rejects an empty pages field', () => {
    const result = validateEntry({ name: 'Аяжан', date: '2026-09-22', pages: '' })
    expect(result.valid).toBe(false)
    expect(result.errors.pages).toBeDefined()
  })
})
