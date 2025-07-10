import React, { useState } from 'react'
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useTheme } from 'components/Theme/ThemeContext'

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

  const saveLesson = async () => {
    if (!title.trim() || !teacher.trim() || !startTime.trim() || !endTime.trim()) {
      Alert.alert('Validation', 'Please fill in all fields.')
      return
    }
    if (!isValidTime(startTime) || !isValidTime(endTime)) {
      Alert.alert('Validation', 'Please enter time in HH:MM format (24-hour).')
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
      setIsCompleted(false)
      Alert.alert('Success', 'Lesson saved!')
      setTitle('')
      setTeacher('')
      setStartTime('')
      setEndTime('')
    } catch (e) {
      Alert.alert('Error', 'Failed to save lesson.')
    }
  }

  const isDark = colorScheme === 'dark'

  return (
    <View className={`px-5 py-7 rounded-2xl ${isDark ? 'bg-[#18122B]' : 'bg-white'}`}> 
      <Text className={`mb-2 text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>Add Lesson:</Text>
      <TextInput
        className={`border px-2 py-2 mb-3 text-lg rounded-xl ${isDark ? 'bg-[#232042] border-[#393053] text-white' : 'bg-white border-gray-300 text-black'}`}
        placeholder='Title'
        placeholderTextColor={isDark ? '#aaa' : '#888'}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        className={`border px-2 py-2 mb-3 text-lg rounded-xl ${isDark ? 'bg-[#232042] border-[#393053] text-white' : 'bg-white border-gray-300 text-black'}`}
        placeholder='Teacher'
        placeholderTextColor={isDark ? '#aaa' : '#888'}
        value={teacher}
        onChangeText={setTeacher}
      />
      <TextInput
        className={`border px-2 py-2 mb-3 text-lg rounded-xl ${isDark ? 'bg-[#232042] border-[#393053] text-white' : 'bg-white border-gray-300 text-black'}`}
        placeholder='Start Time (HH:MM)'
        placeholderTextColor={isDark ? '#aaa' : '#888'}
        value={startTime}
        onChangeText={text => setStartTime(text.replace(/[^0-9:]/g, ''))}
        keyboardType='numeric'
        maxLength={5}
      />
      <TextInput
        className={`border px-2 py-2 mb-3 text-lg rounded-xl ${isDark ? 'bg-[#232042] border-[#393053] text-white' : 'bg-white border-gray-300 text-black'}`}
        placeholder='End Time (HH:MM)'
        placeholderTextColor={isDark ? '#aaa' : '#888'}
        value={endTime}
        onChangeText={text => setEndTime(text.replace(/[^0-9:]/g, ''))}
        keyboardType='numeric'
        maxLength={5}
      />
      <TouchableOpacity className={`py-4 rounded-xl mt-4 ${isDark ? 'bg-[#7c5fff]' : 'bg-blue-500'}`} onPress={saveLesson}>
        <Text className='text-center text-white font-bold text-lg'>Add Lesson</Text>
      </TouchableOpacity>
    </View>
  )
}
