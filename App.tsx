import './global.css';
import { NavigationContainer} from '@react-navigation/native';
import AppStack from 'navigation/AppStack';
import ThemeProvider from 'components/Theme/ThemeContext'; 
import { I18nextProvider } from 'react-i18next';

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <AppStack/>
      </NavigationContainer>
    </ThemeProvider>
    
    
  );
}
