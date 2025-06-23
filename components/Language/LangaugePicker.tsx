import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'locale/i18n';
import moment from 'moment';
import { Text, TouchableOpacity, View } from 'react-native'

export default function LangaugePicker() {
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    AsyncStorage.setItem('langauge', lang)
    moment.locale(lang === 'en' ? 'en' : 'ua')
    console.log('language', lang)
  }
  return (
    <View>
        <TouchableOpacity onPress={() => changeLanguage('en')}>
          <Text>English</Text>
       </TouchableOpacity>
       <TouchableOpacity onPress={() => changeLanguage('ua')}>
          <Text>Українська</Text>
       </TouchableOpacity>
    </View>
  )
}
