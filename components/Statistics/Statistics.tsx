import { PieChart } from 'react-native-svg-charts';
import { View, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useTheme } from 'components/Theme/ThemeContext';

const PIE_COLORS = [
  '#7c5fff', '#22c55e', '#f59e42', '#ef4444', '#3bb4e7', '#ff5fd2', '#d946ef', '#6366f1', '#fbbf24', '#10b981'
];

export default function Statistics() {
  const [stats, setStats] = useState({ completed: 0, uncompleted: 0, all: 0 });
  const [teacherStats, setTeacherStats] = useState<{ [teacher: string]: number }>({});
  const isFocused = useIsFocused();
  const { colorScheme } = useTheme();
  const isDark = colorScheme === 'dark';

  const loadStats = async () => {
    try {
      const stored = await AsyncStorage.getItem('lessons');
      const lessons = (stored ? JSON.parse(stored) : []).filter(
        (l: any) =>
          typeof l.title === 'string' &&
          typeof l.teacher === 'string' &&
          typeof l.start_time === 'string' &&
          typeof l.end_time === 'string'
      );
      const completed = lessons.filter((l: any) => l.isCompleted).length;
      const uncompleted = lessons.filter((l: any) => !l.isCompleted).length;
      setStats({ completed, uncompleted, all: lessons.length });
      // Teacher chart
      const teacherMap: { [teacher: string]: number } = {};
      lessons.forEach((l: any) => {
        if (typeof l.teacher === 'string' && l.teacher.trim()) {
          teacherMap[l.teacher] = (teacherMap[l.teacher] || 0) + 1;
        }
      });
      setTeacherStats(teacherMap);
    } catch {
      setStats({ completed: 0, uncompleted: 0, all: 0 });
      setTeacherStats({});
    }
  };

  useEffect(() => {
    if (isFocused) loadStats();
  }, [isFocused, colorScheme]);

  // Sort teachers by lesson count descending
  const sortedTeachers = Object.entries(teacherStats).sort((a, b) => b[1] - a[1]);

  // Prepare data for the pie chart
  const pieData = sortedTeachers
    .filter(([teacher, count]) => typeof teacher === 'string' && typeof count === 'number')
    .map(([teacher, count], idx) => ({
      value: count,
      svg: { fill: PIE_COLORS[idx % PIE_COLORS.length] },
      key: `pie-${teacher}`,
      teacher,
      count,
    }));

  return (
    <ScrollView>
      <Text className={`text-3xl font-extrabold mt-6 mb-4 ml-4 ${isDark ? 'text-white' : 'text-black'}`}>Статистика:</Text>
      <View className="flex flex-col gap-2">
        {/* Completed */}
        <View className="flex flex-row justify-between items-center px-4 py-2">
          <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-black'}`}>Завершено</Text>
          <Text className="text-lg font-bold text-blue-500">{stats.completed}</Text>
        </View>
        <View className="border-b border-gray-200 mx-2" />
        {/* Uncompleted */}
        <View className="flex flex-row justify-between items-center px-4 py-2">
          <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-black'}`}>Не завершено</Text>
          <Text className="text-lg font-bold text-red-500">{stats.uncompleted}</Text>
        </View>
        <View className="border-b border-gray-200 mx-2" />
        {/* All */}
        <View className="flex flex-row justify-between items-center px-4 py-2">
          <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-black'}`}>Всього</Text>
          <Text className="text-lg font-bold" style={{ color: '#d946ef' }}>{stats.all}</Text>
        </View>
        <View className="border-b border-gray-200 mx-2" />
      </View>
      {/* Teacher Pie Chart */}
      <Text className={`text-2xl font-bold mt-8 mb-2 ml-4 ${isDark ? 'text-white' : 'text-black'}`}>Уроки за викладачами:</Text>
      {pieData.length > 0 ? (
        <View className="px-4 mb-8 items-center justify-center">
          <PieChart
            style={{ height: 220, width: 220, alignSelf: 'center' }}
            data={pieData}
            padAngle={0.02}
            innerRadius={30}
            outerRadius={100}
          />
          {/* Legend */}
          <View className="mt-6 w-full items-center">
            {pieData.map((slice, idx) => (
              <View key={slice.key} className="flex flex-row items-center mb-1">
                <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: PIE_COLORS[idx % PIE_COLORS.length], marginRight: 8 }} />
                <Text className={`text-base font-medium ${isDark ? 'text-white' : 'text-black'}`}>{slice.teacher}</Text>
                <Text className="ml-2 text-base font-bold text-blue-500">{slice.count}</Text>
              </View>
            ))}
          </View>
        </View>
      ) : (
        <Text className={`ml-4 mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Немає даних про викладачів.</Text>
      )}
    </ScrollView>
  );
} 