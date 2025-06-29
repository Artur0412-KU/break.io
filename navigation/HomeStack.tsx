import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'components/Theme/ThemeContext';
import Home from 'pages/Home';

const Stack = createStackNavigator();

const colorByTheme: Record<'light' | 'dark', {
  backgroundColor: string,
  titleColor?: string
}> = {
    light: {
      backgroundColor: '#FAFAFF',
      titleColor: 'black'
    },
    dark: {
      backgroundColor: '#070417',
      titleColor: 'white'
    }
}

const HomeStack = () => {
  const { colorScheme } = useTheme();
  const { t } = useTranslation();

  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerStyle: { backgroundColor: colorByTheme[colorScheme].backgroundColor },
        headerTitleStyle: {
          color: colorByTheme[colorScheme].titleColor
        }
      }}
    >
      <Stack.Screen component={Home} name="Home"/>
    </Stack.Navigator>
  );
};

export default HomeStack;
