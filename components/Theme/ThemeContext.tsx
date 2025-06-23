import React, { Children, createContext, useContext, useState } from 'react'
import { useColorScheme } from 'react-native';

type Theme = 'dark' | 'light';

const ThemeContext = createContext<{
    colorScheme: Theme;
    toggleTheme: () => void;
}>({
    colorScheme: 'light',
    toggleTheme: () => {}
})

interface ThemeProviderProps {
    children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
    const systemTheme = useColorScheme() || 'light';
    const [colorScheme, setColorScheme] = useState<Theme>(systemTheme)

    const toggleTheme = () => {
        setColorScheme(colorScheme === 'light' ? 'dark' : 'light')
    }
  return (
    <ThemeContext.Provider value={{ colorScheme, toggleTheme }}>
        {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
