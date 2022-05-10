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
          header: {
            lng: 'Language'
          },
          description: {
            part1: 'Edit <1>src/App.js</1> and save to reload.',
            part2: 'Learn React'
          },
          users: {
            controls: {
              firstName: 'First name',
              lastName: 'Last name',
              fetchUsers: 'Fetch Users',
              addUser: 'Add User'
            }
          }
        }
      },
      po: {
        translation: {
          header: {
            lng: 'Język'
          },
          description: {
            part1: 'Edytuj <1>src/App.js</1> i zapisz, aby ponownie załadować.',
            part2: 'Uczyć się React'
          },
          users: {
            controls: {
              firstName: 'Imię',
              lastName: 'Nazwisko',
              fetchUsers: 'Pobierz użytkowników',
              addUser: 'Dodaj użytkownika'
            }
          }
        }
      }
    }
  });

export default i18n;
