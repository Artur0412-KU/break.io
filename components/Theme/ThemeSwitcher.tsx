import React from 'react'
import { Switch } from 'react-native';

type ThemeSwitcherProps = {
    colorScheme: string;
    onValueChange: (event: any) => void;
}

export default function ThemeSwitcher({colorScheme, onValueChange}: ThemeSwitcherProps) {
  return (
    <Switch trackColor={{false: '#767577', true: '#90D5FF'}}
      ios_backgroundColor="#3e3e3e"
      onValueChange={onValueChange}
      value={colorScheme === "dark"}
    />
  )
}
