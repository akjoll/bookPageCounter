import { afterEach, describe, expect, it, vi } from 'vitest'
import { sendEntryToSheet } from './sheetsSync.js'

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('sendEntryToSheet', () => {
  it('does nothing when no webhook URL is configured', () => {
    vi.stubEnv('VITE_SHEET_WEBHOOK_URL', '')
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    sendEntryToSheet({ name: 'Аяжан', date: '2026-09-22', pages: 20 })

    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('posts the entry as form data to the configured webhook', () => {
    vi.stubEnv('VITE_SHEET_WEBHOOK_URL', 'https://script.google.com/macros/s/fake/exec')
    const fetchMock = vi.fn().mockResolvedValue({})
    vi.stubGlobal('fetch', fetchMock)

    sendEntryToSheet({ name: 'Аяжан', date: '2026-09-22', pages: 20 })

    expect(fetchMock).toHaveBeenCalledTimes(1)
    const [url, options] = fetchMock.mock.calls[0]
    expect(url).toBe('https://script.google.com/macros/s/fake/exec')
    expect(options.method).toBe('POST')
    expect(options.mode).toBe('no-cors')
    expect(options.body.get('name')).toBe('Аяжан')
    expect(options.body.get('date')).toBe('2026-09-22')
    expect(options.body.get('pages')).toBe('20')
  })
})
