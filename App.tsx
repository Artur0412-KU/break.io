import './global.css';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from 'pages/AppStack';

export default function App() {
  return (
    <NavigationContainer>
      <AppStack/>
    </NavigationContainer>
  );
}
