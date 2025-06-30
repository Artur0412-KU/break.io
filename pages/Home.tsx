import { SafeAreaView, Text, TouchableOpacity, View} from 'react-native'
import { useTheme } from 'components/Theme/ThemeContext'
import { Ionicons } from '@expo/vector-icons'
import RBSheet from 'react-native-raw-bottom-sheet'
import { useRef } from 'react'
import LessonSheet from 'components/LessonSheet/LessonSheet'
export default function Home() {
  const rbsheet = useRef(null)
  const {colorScheme} = useTheme()
  const handleOpenModal = () => {
    rbsheet.current?.open()
  }
  return (
    <SafeAreaView className={` h-full w-full ${colorScheme === 'dark' ? 'bg-[#070417]' : 'bg-[#FAFAFF]'}`}>
      <View className='p-5 flex flex-row justify-between items-center'>
        <Text className='text-3xl font-bold'>Break.io</Text>
        <TouchableOpacity className='bg-blue-500 p-2 rounded-full' onPress={handleOpenModal}>
          <Ionicons name='add' size={24} color={"white"} />
        </TouchableOpacity>
      </View>
      <RBSheet ref={rbsheet} height={400}  customStyles={{
        container: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20
        }
      }}>
        <LessonSheet/>
      </RBSheet>
    </SafeAreaView>
  )
}
