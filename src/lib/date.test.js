import { describe, expect, it, vi } from 'vitest'
import { getTodayIsoDate } from './date.js'

describe('getTodayIsoDate', () => {
  it('formats a fixed date as YYYY-MM-DD', () => {
    vi.setSystemTime(new Date(2026, 8, 22))
    expect(getTodayIsoDate()).toBe('2026-09-22')
    vi.useRealTimers()
  })

  it('zero-pads single-digit month and day', () => {
    vi.setSystemTime(new Date(2026, 0, 5))
    expect(getTodayIsoDate()).toBe('2026-01-05')
    vi.useRealTimers()
  })
})
