import { Feather } from '@expo/vector-icons';
import { useTheme } from 'components/Theme/ThemeContext';
import ThemeSwitcher from 'components/Theme/ThemeSwitcher';
import { SafeAreaView, View } from 'react-native'

const colorByTheme: Record<'light' | 'dark', {
  iconTheme: string,
}> = {
  light: {
    iconTheme: 'black'
  },
  dark: {
    iconTheme: 'white'
  }
}


export default function Settings() {
  const {colorScheme, toggleTheme} = useTheme()

  return (
    <SafeAreaView className={`h-full w-full ${colorScheme === "dark" ? "bg-[#070417]" : "bg-[#FAFAFF]"}`}>
      <View className='flex flex-row items-center gap-3 justify-center'>
        <Feather name='sun' size={24} color={colorByTheme[colorScheme].iconTheme}/>
        <ThemeSwitcher onValueChange={toggleTheme} colorScheme={colorScheme}/>
        <Feather name='moon' size={24} color={colorByTheme[colorScheme].iconTheme}/>
      </View>
      
    </SafeAreaView>
  )
    
}

