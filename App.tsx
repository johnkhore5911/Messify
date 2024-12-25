import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginScreen from './src/component/Login';
import SignUpScreen from './src/component/SignUp';
import Student from './src/component/Student';
import StudentProfile from './src/component/StudentProfile';
import Mess from './src/component/Mess';
import MessProfile from './src/component/MessProfile';
import AddMealPage from './src/component/AddMealPage';
import ServeMealPage from './src/component/ServeMeal';
import StudentHistory from './src/component/StudentHistory';

// Stack Navigator
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Student Bottom Tabs
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          height: 60,
          // borderTopLeftRadius: 15,
          // borderTopRightRadius: 15,
          backgroundColor: '#333',  // Dark background for the tab bar
        },
        tabBarLabelStyle: {
          fontSize: 12,
          color: '#fff',  // White label color for better contrast
        },
        tabBarIcon: ({ focused }) => {
          let iconName;
          let iconColor = focused ? '#2596be' : '#bbb';  // Blue when focused, light gray when not
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'circle';
          }
          return <Ionicons name={iconName} size={24} color={iconColor} />;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Student} options={{ tabBarLabel: 'Student Home' }} />
      <Tab.Screen name="Profile" component={StudentProfile} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
}

// Mess Bottom Tabs
function MainTabs2() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          height: 60,
          // borderTopLeftRadius: 15,
          // borderTopRightRadius: 15,
          backgroundColor: '#333',  // Dark background for the tab bar
        },
        tabBarLabelStyle: {
          fontSize: 12,
          color: '#fff',  // White label color for better contrast
        },
        tabBarIcon: ({ focused }) => {
          let iconName;
          let iconColor = focused ? '#2596be' : '#bbb';  // Blue when focused, light gray when not
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'circle';
          }
          return <Ionicons name={iconName} size={24} color={iconColor} />;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Mess} options={{ tabBarLabel: 'Mess Home' }} />
      <Tab.Screen name="Profile" component={MessProfile} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
}

// App Component
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Main2" component={MainTabs2} options={{ headerShown: false }} />
        <Stack.Screen name="ServeMealPage" component={ServeMealPage} options={{ headerShown: false }} />
        <Stack.Screen name="AddMealPage" component={AddMealPage} options={{ headerShown: false }} />
        <Stack.Screen name="StudentHistory" component={StudentHistory} options={{ headerShown: false }} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
