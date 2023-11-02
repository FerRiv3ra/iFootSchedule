import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from './languages/en.json'; // Archivo JSON con las traducciones en inglés
import es from './languages/es.json'; // Archivo JSON con las traducciones en español

const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
  resources,
  lng: 'es', // idioma predeterminado
  fallbackLng: 'es', // si una traducción no se encuentra en el idioma actual, se usará el idioma predeterminado
});

export default i18n;
