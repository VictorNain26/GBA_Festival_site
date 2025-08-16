import { detectBrowserLanguage } from '@/hooks/useBrowserLanguage'

describe('detectBrowserLanguage', () => {
  const originalNavigator = global.navigator

  beforeEach(() => {
    // Reset navigator
    Object.defineProperty(global, 'navigator', {
      value: {
        language: 'en-US',
      },
      writable: true,
    })
  })

  afterEach(() => {
    global.navigator = originalNavigator
  })

  it('returns "fr" for French language', () => {
    Object.defineProperty(global.navigator, 'language', {
      value: 'fr-FR',
      writable: true,
    })

    expect(detectBrowserLanguage()).toBe('fr')
  })

  it('returns "fr" for French Canadian', () => {
    Object.defineProperty(global.navigator, 'language', {
      value: 'fr-CA',
      writable: true,
    })

    expect(detectBrowserLanguage()).toBe('fr')
  })

  it('returns "en" for English language', () => {
    Object.defineProperty(global.navigator, 'language', {
      value: 'en-US',
      writable: true,
    })

    expect(detectBrowserLanguage()).toBe('en')
  })

  it('returns "en" for unsupported language', () => {
    Object.defineProperty(global.navigator, 'language', {
      value: 'es-ES',
      writable: true,
    })

    expect(detectBrowserLanguage()).toBe('en')
  })

  it('returns "en" when running server-side', () => {
    // Mock server-side environment
    const originalWindow = global.window
    delete global.window

    expect(detectBrowserLanguage()).toBe('en')

    global.window = originalWindow
  })
})