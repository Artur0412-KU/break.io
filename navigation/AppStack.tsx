import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import HomeStack from './HomeStack';
import Settings from '../pages/Settings';
import { useTheme } from 'components/Theme/ThemeContext';

const colorByTheme: Record<'light' | 'dark', {
  backgroundColor: string,
  tabBarTintColor?: string
}> = {
    light: {
       backgroundColor: '#FAFAFF',
       tabBarTintColor: '#77B1D4'
    },
    dark: {
        backgroundColor: '#070417',
        tabBarTintColor: '#90D5FF'
    }
}
export default function AppStack() {
    const Tab = createBottomTabNavigator();
    const {colorScheme} = useTheme()
  return (
    <Tab.Navigator
        screenOptions={{
            tabBarInactiveTintColor: colorByTheme[colorScheme].tabBarTintColor,
            tabBarActiveTintColor: colorByTheme[colorScheme].tabBarTintColor,
            headerShown: false,
            tabBarStyle: {
                backgroundColor: colorByTheme[colorScheme].backgroundColor
            }
        }}
    >
        <Tab.Screen component={HomeStack}  
        name='HomeStack'
        options={{
            tabBarLabel:  "Головна",
            tabBarIcon: () => <Feather name="home" size={24} color={colorByTheme[colorScheme].tabBarTintColor} />,
        }}/>
        <Tab.Screen component={Settings} name="Налаштування"
        options={{
            tabBarIcon: () => <Feather name="settings" size={24} color={colorByTheme[colorScheme].tabBarTintColor} />,
        }}/>
    </Tab.Navigator>
  )
}
