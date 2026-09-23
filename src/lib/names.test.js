import { describe, expect, it } from 'vitest'
import { getUniqueNames } from './names.js'

describe('getUniqueNames', () => {
  it('returns an empty array when there are no entries', () => {
    expect(getUniqueNames([])).toEqual([])
  })

  it('deduplicates repeated names, keeping first-seen order', () => {
    const entries = [
      { name: 'Аяжан', date: '2026-09-22', pages: 20 },
      { name: 'Бек', date: '2026-09-21', pages: 10 },
      { name: 'Аяжан', date: '2026-09-20', pages: 15 },
    ]

    expect(getUniqueNames(entries)).toEqual(['Аяжан', 'Бек'])
  })
})
