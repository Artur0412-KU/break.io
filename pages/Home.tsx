import { FlatList, SafeAreaView, Text, TouchableOpacity, View, Animated } from 'react-native'
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
  const clearAnim = useRef(new Animated.Value(1)).current

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

  // Toggle isCompleted for a lesson
  const handleToggleComplete = (id: number | string) => {
    setLessons(prevLessons => {
      const updated = prevLessons.map((lesson, idx) => {
        // Use idx as id if no unique id is present
        const lessonId = lesson.id ?? idx
        if (lessonId === id) {
          return { ...lesson, isCompleted: !lesson.isCompleted }
        }
        return lesson
      })
      console.log('Updated lessons:', updated)
      AsyncStorage.setItem('lessons', JSON.stringify(updated))
      return updated
    })
  }

  // Delete a lesson by id
  const handleDeleteLesson = (id: number | string) => {
    setLessons(prevLessons => {
      const updated = prevLessons.filter((lesson, idx) => (lesson.id ?? idx) !== id)
      AsyncStorage.setItem('lessons', JSON.stringify(updated))
      return updated
    })
  }

  const animateClear = async () => {
    Animated.sequence([
      Animated.spring(clearAnim, {
        toValue: 0.85,
        useNativeDriver: true,
        speed: 30,
        bounciness: 8,
      }),
      Animated.spring(clearAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 20,
        bounciness: 8,
      }),
    ]).start()
    await AsyncStorage.removeItem('lessons')
    setLessons([])
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
        <TouchableOpacity className='bg-[#7c5fff] p-2 rounded-full' onPress={handleOpenModal}>
          <Ionicons name='add' size={24} color={'white'} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={lessons}
        keyExtractor={(_, idx) => (lessons[idx].id ?? idx).toString()}
        contentContainerStyle={{ flexGrow: 1, padding: 16 }}
        ListEmptyComponent={<Text className='text-center text-gray-400 mt-10'>Ще немає уроків.</Text>}
        renderItem={({ item, index }) => (
          <Lesson
            id={item.id ?? index}
            isCompleted={item.isCompleted ?? false}
            title={item.title}
            teacher={item.teacher}
            start_time={item.start_time}
            end_time={item.end_time}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDeleteLesson}
          />
        )}
      />
      <RBSheet
        ref={rbsheet}
        height={400}
        customStyles={{
        container: {
          borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: colorScheme === 'dark' ? '#18122B' : '#FAFAFF',
            width: '100%'
          },
        }}
        onClose={() => setSheetOpen(false)}
        onOpen={() => setSheetOpen(true)}
      >
        <LessonSheet />
      </RBSheet>
      <Animated.View
        style={{
          transform: [{ scale: clearAnim }],
          opacity: clearAnim,
        }}
      >
        <TouchableOpacity
          className='mt-4 mb-8 self-center px-6 py-3 rounded-xl'
          activeOpacity={0.8}
          onPress={animateClear}
        >
          <Text className='text-red-500 font-medium text-lg'>Очистити уроки</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  )
}
