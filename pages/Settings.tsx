import { Feather } from '@expo/vector-icons';
import LangaugePicker from 'components/Language/LangaugePicker';
import { useTheme } from 'components/Theme/ThemeContext';
import ThemeSwitcher from 'components/Theme/ThemeSwitcher';
import React, { useState } from 'react'
import { SafeAreaView, Switch, Text, View } from 'react-native'
import { useColorScheme } from 'react-native'

const colorByTheme: Record<'light' | 'dark', {
  iconTheme: string,
}> = {
  light: {
    iconTheme: 'black'
  },
  dark: {
    iconTheme: 'white'
  }
}


export default function Settings() {
  const {colorScheme, toggleTheme} = useTheme()

  return (
    <SafeAreaView className={`h-full w-full ${colorScheme === "dark" ? "bg-[#03002E]" : "bg-white"}`}>
      <View className='flex flex-row items-center gap-3 justify-center'>
        <Feather name='sun' size={24} color={colorByTheme[colorScheme].iconTheme}/>
        <ThemeSwitcher onValueChange={toggleTheme} colorScheme={colorScheme}/>
        <Feather name='moon' size={24} color={colorByTheme[colorScheme].iconTheme}/>
      </View>

      <LangaugePicker/>
      
    </SafeAreaView>
  )
    
}

