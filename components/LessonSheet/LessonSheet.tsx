import React, { useState } from 'react'
import { Text, View, TextInput, Button, Platform, TouchableOpacity, Alert, Touchable } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import DateTimePicker from '@react-native-community/datetimepicker'

function isValidTime(time: string) {
  // Matches HH:MM, 24-hour format
  return /^([01]\d|2[0-3]):([0-5]\d)$/.test(time)
}

export default function LessonSheet() {
  const [title, setTitle] = useState('')
  const [teacher, setTeacher] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

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
    }
    try {
      const existing = await AsyncStorage.getItem('lessons')
      const lessons = existing ? JSON.parse(existing) : []
      lessons.push(lesson)
      await AsyncStorage.setItem('lessons', JSON.stringify(lessons))
      Alert.alert('Success', 'Lesson saved!')
      setTitle('')
      setTeacher('')
      setStartTime('')
      setEndTime('')
    } catch (e) {
      Alert.alert('Error', 'Failed to save lesson.')
    }
  }

  return (
    <View className='px-5 py-7'>
      <Text className='mb-2 text-2xl font-bold'>Add Lesson:</Text>
      <TextInput
        className='border rounded px-2 py-2 mb-3 text-lg rounded-xl'
        placeholder='Title'
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        className='border border-grey px-2 py-2 mb-3 text-lg rounded-xl'
        placeholder='Teacher'
        value={teacher}
        onChangeText={setTeacher}
      />
      <TextInput
        className='border border-grey px-2 py-2 mb-3 text-lg rounded-xl'
        placeholder='Start Time (HH:MM)'
        value={startTime}
        onChangeText={text => setStartTime(text.replace(/[^0-9:]/g, ''))}
        keyboardType='numeric'
        maxLength={5}
      />
      <TextInput
        className='border border-grey px-2 py-2 mb-3 text-lg rounded-xl'
        placeholder='End Time (HH:MM)'
        value={endTime}
        onChangeText={text => setEndTime(text.replace(/[^0-9:]/g, ''))}
        keyboardType='numeric'
        maxLength={5}
      />
      <TouchableOpacity className='py-4 bg-blue-500 rounded-xl mt-4' onPress={saveLesson}>
        <Text className='text-center text-white font-bold text-lg'>Add Lesson</Text>
      </TouchableOpacity>
    </View>
  )
}
