import './global.css';
import { NavigationContainer} from '@react-navigation/native';
import AppStack from 'navigation/AppStack';
import ThemeProvider from 'components/Theme/ThemeContext'; 

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <AppStack/>
      </NavigationContainer>
    </ThemeProvider>
    
  );
}
