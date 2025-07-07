import { useTheme } from 'components/Theme/ThemeContext'
import { Text, View } from 'react-native'

type LessonProps = {
    title: string,
    teacher: string,
    start_time: string,
    end_time: string,
}

export default function Lesson({title, teacher, start_time, end_time}: LessonProps) {
    const {colorScheme} = useTheme()
  return (
    <View className='mb-4 p-4 bg-white rounded-xl shadow' style={{ backgroundColor: colorScheme === 'dark' ? '#18122B' : 'white' }}>
        <Text className='text-lg font-bold mb-1'>{title}</Text>
        <Text className='mb-1'>Teacher: { teacher}</Text>
        <Text className='text-sm text-gray-500'>
            {start_time} - {end_time}
        </Text>
    </View>
  )
}
