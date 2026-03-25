import { createContext, useContext, useState } from 'react'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en')

  const toggleLanguage = () => setLanguage(l => l === 'en' ? 'zh' : 'en')

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, isZH: language === 'zh' }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}

export function t(en, zh, language) {
  return language === 'zh' ? zh : en
}
