import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import Timer from './Timer';
import Statistics from './Statistics';
import { Feather } from '@expo/vector-icons';

export default function AppStack() {
    const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
    screenOptions={{
        tabBarInactiveTintColor: 'purple',
        headerShown: false
    }}>
        <Tab.Screen component={Timer} name = "Timer"  
        options={{
            tabBarIcon: () => <Feather name="clock" size={24} color="purple" />,
            tabBarActiveTintColor: 'purple',
        }}/>
        <Tab.Screen component={Statistics} name='Statistics'
        options={{
            tabBarIcon: () => <Feather name="bar-chart" size={24} color="purple" />,
            tabBarActiveTintColor: 'purple'
        }}/>
    </Tab.Navigator>
  )
}
