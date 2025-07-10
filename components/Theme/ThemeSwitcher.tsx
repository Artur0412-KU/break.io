import React from 'react'
import { Switch } from 'react-native';

type ThemeSwitcherProps = {
    colorScheme: string;
    onValueChange: (event: any) => void;
}

export default function ThemeSwitcher({colorScheme, onValueChange}: ThemeSwitcherProps) {
  return (
    <Switch trackColor={{false: '#767577', true: '#7c5fff'}}
      ios_backgroundColor="#3e3e3e"
      onValueChange={onValueChange}
      value={colorScheme === "dark"}
      style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
    />
  )
}
