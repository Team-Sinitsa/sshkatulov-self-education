import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    resources: {
      en: {
        translation: {
          description: {
            part1: 'Edit <1>src/App.js</1> and save to reload.',
            part2: 'Learn React'
          }
        }
      },
      po: {
        translation: {
          description: {
            part1: 'Edytuj <1>src/App.js</1> i zapisz, aby ponownie załadować.',
            part2: 'Uczyć się React'
          }
        }
      }
    }
  });

export default i18n;
