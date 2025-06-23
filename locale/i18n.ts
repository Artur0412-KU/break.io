import i18n  from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from 'expo-localization'
import { I18nManager } from "react-native";

import en from './en';
import ua from './ua'

const resources = {
    en,
    ua
}

i18n.use(initReactI18next).init({
    resources,
    lng: Localization.locale,
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false
    },
    react: {
        useSuspense: false
    }
})

export default i18n