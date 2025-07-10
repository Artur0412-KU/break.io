import { Feather } from '@expo/vector-icons';
import { useTheme } from 'components/Theme/ThemeContext';
import ThemeSwitcher from 'components/Theme/ThemeSwitcher';
import { SafeAreaView, View, Text } from 'react-native';
import Statistics from 'components/Statistics/Statistics';

const colorByTheme: Record<'light' | 'dark', {
  iconTheme: string,
}> = {
  light: {
    iconTheme: 'black',
  },
  dark: {
    iconTheme: 'white',
  },
};

export default function Settings() {
  const { colorScheme, toggleTheme } = useTheme();
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView className={`h-full w-full ${isDark ? 'bg-[#070417]' : 'bg-[#FAFAFF]'}`}>
      {/* Theme Switcher Row */}
      <View className="flex flex-row items-center px-4 pt-4 pb-2">
        <Text className={`text-lg font-bold mr-2 ${isDark ? 'text-white' : 'text-black'}`}>Theme</Text>
        <View className="flex-1" />
        <ThemeSwitcher onValueChange={toggleTheme} colorScheme={colorScheme} />
      </View>
      <View className="border-b border-gray-300 mx-2" />
      {/* Statistics Section */}
      <Statistics />
    </SafeAreaView>
  );
}

