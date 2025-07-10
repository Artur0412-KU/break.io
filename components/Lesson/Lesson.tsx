import { Text, View, TouchableOpacity, Animated } from 'react-native'
import { useRef } from 'react'
import { useTheme } from 'components/Theme/ThemeContext'
import { Ionicons } from '@expo/vector-icons'

type LessonProps = {
    id: number | string,
    title: string,
    teacher?: string,
    start_time: string,
    end_time?: string,
    isCompleted: boolean,
    onToggleComplete?: (id: number | string) => void,
    onDelete?: (id: number | string) => void,
}

export default function Lesson({ id, title, start_time, isCompleted, onToggleComplete, onDelete }: LessonProps) {
  const scale = useRef(new Animated.Value(1)).current

  const handlePress = () => {
    if (onToggleComplete) onToggleComplete(id)
  }

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 30,
      bounciness: 8,
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 8,
    }).start()
  }

  return (
    <Animated.View
      style={{
        transform: [{ scale }],
        backgroundColor: isCompleted ? '#22c55e' : '#7c5fff',
      }}
      className="mb-4 w-full rounded-2xl min-h-[70px] flex-row items-center px-4 py-4"
    >
      <TouchableOpacity
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
        className="flex-1 justify-center"
        style={{ backgroundColor: 'transparent' }}
      >
        <Text className="text-white font-bold text-lg mb-1">{title}</Text>
        <Text className="text-white text-[15px] opacity-85">{start_time}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onDelete && onDelete(id)}
        className="ml-4 p-2 rounded-full"
        activeOpacity={0.7}
      >
        <Ionicons name="trash" size={22} color="#fff" />
      </TouchableOpacity>
    </Animated.View>
  )
}
