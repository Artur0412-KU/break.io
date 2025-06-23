import { SafeAreaView, Text} from 'react-native'
import { useColorScheme } from 'react-native'
import { useTheme } from 'components/Theme/ThemeContext'

export default function Home() {
  const {colorScheme} = useTheme()
  console.log("Home",colorScheme)
  return (
    <SafeAreaView className={` h-full w-full ${colorScheme === 'dark' ? 'bg-[#03002E]' : 'bg-white'}`}>
      <Text>Time</Text>
    </SafeAreaView>
  )
}
