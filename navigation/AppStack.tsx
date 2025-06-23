import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import Home from '../pages/Home';
import { Feather } from '@expo/vector-icons';
import HomeStack from './HomeStack';
import Settings from '../pages/Settings';
import { useTheme } from 'components/Theme/ThemeContext';
import { useTranslation } from 'react-i18next';

const colorByTheme: Record<'light' | 'dark', {
  backgroundColor: string,
  tabBarTintColor?: string
}> = {
    light: {
       backgroundColor: 'white',
       tabBarTintColor: '#77B1D4'
    },
    dark: {
        backgroundColor: '#03002E',
        tabBarTintColor: '#90D5FF'
    }
}
export default function AppStack() {
    const Tab = createBottomTabNavigator();
    const {colorScheme} = useTheme()
    const {t} = useTranslation()
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
        <Tab.Screen component={HomeStack} name = {t('navigation:home')}  
        options={{
            tabBarIcon: () => <Feather name="home" size={24} color={colorByTheme[colorScheme].tabBarTintColor} />,
        }}/>
          <Tab.Screen component={Settings} name={t('navigation:settings')}
        options={{
            tabBarIcon: () => <Feather name="settings" size={24} color={colorByTheme[colorScheme].tabBarTintColor} />,
        }}/>
    </Tab.Navigator>
  )
}
