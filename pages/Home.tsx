import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from 'components/Theme/ThemeContext'
import { Ionicons } from '@expo/vector-icons'
import RBSheet from 'react-native-raw-bottom-sheet'
import { useRef, useState, useEffect } from 'react'
import LessonSheet from 'components/LessonSheet/LessonSheet'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Lesson from 'components/Lesson/Lesson'

export default function Home() {
  const rbsheet = useRef<any>(null)
  const { colorScheme } = useTheme()
  const [lessons, setLessons] = useState<any[]>([])
  const [sheetOpen, setSheetOpen] = useState(false)

  const handleOpenModal = () => {
    setSheetOpen(true)
    rbsheet.current?.open()
  }

  // Load lessons from AsyncStorage
  const loadLessons = async () => {
    try {
      const stored = await AsyncStorage.getItem('lessons')
      setLessons(stored ? JSON.parse(stored) : [])
    } catch {
      setLessons([])
    }
  }

  useEffect(() => {
    loadLessons()
  }, [])

  // Reload lessons when sheet closes
  useEffect(() => {
    if (!sheetOpen) loadLessons()
  }, [sheetOpen])

  return (
    <SafeAreaView className={` h-full w-full ${colorScheme === 'dark' ? 'bg-[#070417]' : 'bg-[#FAFAFF]'}`}>
      <View className='p-5 flex flex-row justify-between items-center'>
        <Text className={`text-3xl font-bold ${colorScheme === 'dark' ? 'text-white' : 'text-black'}`}>Break.io</Text>
        <TouchableOpacity className='bg-blue-500 p-2 rounded-full' onPress={handleOpenModal}>
          <Ionicons name='add' size={24} color={'white'} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={lessons}
        keyExtractor={(_, idx) => idx.toString()}
        contentContainerStyle={{ flexGrow: 1, padding: 16 }}
        ListEmptyComponent={<Text className='text-center text-gray-400 mt-10'>No lessons yet.</Text>}
        renderItem={({ item }) => (
          <Lesson title={item.title} teacher={item.teacher} start_time={item.start_time} end_time={item.end_time} />
        )}
      />
      <RBSheet
        ref={rbsheet}
        height={400}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}
        onClose={() => setSheetOpen(false)}
        onOpen={() => setSheetOpen(true)}
      >
        <LessonSheet />
      </RBSheet>
    </SafeAreaView>
  )
}
