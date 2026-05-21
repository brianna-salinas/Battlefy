/**
 * @file index.js
 * @summary Vue I18n configuration for multilingual support.
 * @author Brianna Salinas Guzman
 */
import { createI18n } from 'vue-i18n'
import en from './en.js'
import es from './es.js'

/** @type {import('vue-i18n').I18n} */
const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en, es }
})

export default i18n
