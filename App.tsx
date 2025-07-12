import './global.css';
import { NavigationContainer} from '@react-navigation/native';
import AppStack from 'navigation/AppStack';
import ThemeProvider from 'components/Theme/ThemeContext'; 
import { I18nextProvider } from 'react-i18next';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    // Handle notification responses
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification response received:', response);
      // You can navigate to specific screens or perform actions based on the notification
    });

    return () => subscription.remove();
  }, []);

  return (
    <ThemeProvider>
      <NavigationContainer>
        <AppStack/>
      </NavigationContainer>
    </ThemeProvider>
  );
}
