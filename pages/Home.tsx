import { SafeAreaView, Text} from 'react-native'
import { useTheme } from 'components/Theme/ThemeContext'

export default function Home() {
  const {colorScheme} = useTheme()
  return (
    <SafeAreaView className={` h-full w-full ${colorScheme === 'dark' ? 'bg-[#070417]' : 'bg-[#FAFAFF]'}`}>
      <Text>Time</Text>
    </SafeAreaView>
  )
}
