import React, { useState, useEffect } from 'react'
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useTheme } from 'components/Theme/ThemeContext'
import NotificationService from '../../services/NotificationService'

function isValidTime(time: string) {
  // Matches HH:MM, 24-hour format
  return /^([01]\d|2[0-3]):([0-5]\d)$/.test(time)
}

export default function LessonSheet() {
  const [title, setTitle] = useState('')
  const [teacher, setTeacher] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [isCompleted, setIsCompleted] = useState(false)
  const { colorScheme } = useTheme()

  // Request notification permissions on mount
  useEffect(() => {
    NotificationService.requestPermissions()
  }, [])

  const saveLesson = async () => {
    if (!title.trim() || !teacher.trim() || !startTime.trim() || !endTime.trim()) {
      Alert.alert('Перевірка', 'Заповніть всі поля.')
      return
    }
    if (!isValidTime(startTime) || !isValidTime(endTime)) {
      Alert.alert('Перевірка', 'Введіть час у форматі ГГ:ХХ (24-годинний).')
      return
    }
    const lesson = {
      title,
      teacher,
      start_time: startTime,
      end_time: endTime,
      isCompleted: false,
    }
    try {
      const existing = await AsyncStorage.getItem('lessons')
      const lessons = existing ? JSON.parse(existing) : []
      lessons.push(lesson)
      await AsyncStorage.setItem('lessons', JSON.stringify(lessons))
      
      // Schedule notification for the new lesson
      await NotificationService.scheduleLessonReminder({
        id: lessons.length - 1, // Use array index as ID
        title: lesson.title,
        teacher: lesson.teacher,
        start_time: lesson.start_time,
      })
      
      setIsCompleted(false)
      Alert.alert('Успіх', 'Урок додано з нагадуванням!')
      setTitle('')
      setTeacher('')
      setStartTime('')
      setEndTime('')
    } catch (e) {
      Alert.alert('Помилка', 'Не вдалося додати урок.')
    }
  }

  const isDark = colorScheme === 'dark'

  return (
    <View className={`px-5 py-7 rounded-2xl ${isDark ? 'bg-[#18122B]' : 'bg-white'}`}> 
      <Text className={`mb-2 text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>Додати урок:</Text>
      <TextInput
        className={`border px-2 py-2 mb-3 text-base rounded-xl ${isDark ? 'bg-[#232042] border-[#393053] text-white' : 'bg-white border-gray-300 text-black'}`}
        placeholder='Назва'
        placeholderTextColor={isDark ? '#aaa' : '#888'}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        className={`border px-2 py-2 mb-3 text-base rounded-xl ${isDark ? 'bg-[#232042] border-[#393053] text-white' : 'bg-white border-gray-300 text-black'}`}
        placeholder='Викладач'
        placeholderTextColor={isDark ? '#aaa' : '#888'}
        value={teacher}
        onChangeText={setTeacher}
      />
      <TextInput
        className={`border px-2 py-2 mb-3 text-base rounded-xl ${isDark ? 'bg-[#232042] border-[#393053] text-white' : 'bg-white border-gray-300 text-black'}`}
        placeholder='Початок (ГГ:ХХ)'
        placeholderTextColor={isDark ? '#aaa' : '#888'}
        value={startTime}
        onChangeText={text => setStartTime(text.replace(/[^0-9:]/g, ''))}
        maxLength={5}
      />
      <TextInput
        className={`border px-2 py-2 mb-3 text-base rounded-xl ${isDark ? 'bg-[#232042] border-[#393053] text-white' : 'bg-white border-gray-300 text-black'}`}
        placeholder='Кінець (ГГ:ХХ)'
        placeholderTextColor={isDark ? '#aaa' : '#888'}
        value={endTime}
        onChangeText={text => setEndTime(text.replace(/[^0-9:]/g, ''))}
        maxLength={5}
      />
      <TouchableOpacity className={`py-4 rounded-xl mt-4 bg-[#7c5fff]`} onPress={saveLesson}>
        <Text className='text-center text-white font-bold text-lg'>Додати урок</Text>
      </TouchableOpacity>
    </View>
  )
}
