import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message'; // Import Toast
import LoginScreen from './src/component/Login';
import SignUpScreen from './src/component/SignUp';
import Student from './src/component/Student';
import StudentProfile from './src/component/StudentProfile';
import Mess from './src/component/Mess';
import MessProfile from './src/component/MessProfile';
import AddMealPage from './src/component/AddMealPage';
import ServeMealPage from './src/component/ServeMeal';
import StudentHistory from './src/component/StudentHistory';
import SecurityScreen from './src/component/SecurityScreen';
import Payment from './src/component/Payment';
import { StripeProvider } from '@stripe/stripe-react-native';
import { PaymentHistoryProvider } from './src/context/PaymentHistoryContext';
import PaymentHistory from './src/component/PaymentHistory';
import HostelDetails from './src/component/HostelDetails';

// Stack Navigator
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Request user permissions for push notifications
async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Push notifications enabled:', authStatus);
  } else {
    console.log('Push notifications permission denied');
  }
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { height: 60, backgroundColor: '#333' },
        tabBarLabelStyle: { fontSize: 12, color: '#fff' },
        tabBarIcon: ({ focused }) => {
          let iconName;
          let iconColor = focused ? '#2596be' : '#bbb';
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            case 'Security':
              iconName = focused ? 'shield-checkmark' : 'shield-outline';
              break;
            case 'Payments':
              iconName = focused ? 'wallet' : 'wallet-outline';
            default:
              iconName = focused ? 'wallet' : 'wallet-outline';
          }
          return <Ionicons name={iconName} size={24} color={iconColor} />;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Student} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="Security" component={SecurityScreen} options={{ tabBarLabel: 'Security' }} />
      <Tab.Screen name="Payments" component={PaymentHistory} options={{ tabBarLabel: 'Payments' }} />
      <Tab.Screen name="Profile" component={StudentProfile} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
}

function MainTabs2() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { height: 60, backgroundColor: '#333' },
        tabBarLabelStyle: { fontSize: 12, color: '#fff' },
        tabBarIcon: ({ focused }) => {
          let iconName;
          let iconColor = focused ? '#2596be' : '#bbb';
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            case 'Hostel':
              iconName = focused ? 'people' : 'people-outline';
            default:
              iconName = focused ? 'people' : 'people-outline';

          }
          return <Ionicons name={iconName} size={24} color={iconColor} />;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Mess} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="Hostel" component={HostelDetails} options={{ tabBarLabel: 'Hostel student' }} />
      <Tab.Screen name="Profile" component={MessProfile} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    // Request permission
    requestUserPermission();

    // Foreground message handler
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe; // Cleanup on unmount
  }, []);

  return (
    <StripeProvider publishableKey="pk_test_51QaZa8SGPPeZ4GIadBnww6LxvNZwtHPJVMa62inb2VS1Kl88s74OtYwREvEIB9F461FCaISh8ICpsjaavpXgccVP00geB9U7eF">
      <PaymentHistoryProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
            <Stack.Screen name="Main2" component={MainTabs2} options={{ headerShown: false }} />
            <Stack.Screen name="ServeMealPage" component={ServeMealPage} options={{ headerShown: false }} />
            <Stack.Screen name="AddMealPage" component={AddMealPage} options={{ headerShown: false }} />
            <Stack.Screen name="StudentHistory" component={StudentHistory} options={{ headerShown: false }} />
            <Stack.Screen name="Payment" component={Payment} options={{ headerShown: false }} />
          </Stack.Navigator>
        <Toast /> 
        </NavigationContainer>
      </PaymentHistoryProvider>
    </StripeProvider>
  );
}
