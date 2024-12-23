import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';  // Correct import
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/component/Login';

const Stack = createNativeStackNavigator(); // Proper creation of stack navigator

export default function App() {
  return (
    <NavigationContainer> 
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
