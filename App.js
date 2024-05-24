import HomeScreen from './screens/HomeScreen';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from './screens/welcomeScreen';
import RecepeScreen from './screens/RecepeScreen';

export default function App() {
  const Stack = createStackNavigator();  

  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{headerShown: false}}/>
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
          <Stack.Screen name="RecepeScreen" component={RecepeScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

  