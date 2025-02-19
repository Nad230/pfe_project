"use client"

import { createContext, useContext, useState, ReactNode } from 'react'
import { IntlProvider } from 'react-intl'
import enMessages from './messages/en'
import arTNMessages from './messages/ar-TN'

type Locale = 'en' | 'ar-TN'

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const messages = {
  'en': enMessages,
  'ar-TN': arTNMessages,
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en')

  return (
    <I18nContext.Provider value={{ locale, setLocale }}>
      <IntlProvider
        messages={messages[locale]}
        locale={locale}
        defaultLocale="en"
      >
        <div dir={locale === 'ar-TN' ? 'rtl' : 'ltr'}>
          {children}
        </div>
      </IntlProvider>
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}