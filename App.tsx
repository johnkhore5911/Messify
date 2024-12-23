// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import HomeScreen from '././screens/HomeScreen';
// import HistoryScreen from '././screens/HistoryScreen';

// const Stack = createNativeStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="History" component={HistoryScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;


// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeAdmin from './screens/HomeAdmin';
import HomeStudent from './screens/HomeStudent';
import HistoryScreen from './screens/HistoryScreen';
// import TransactionScreen from './screens/TransactionScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="HomeAdmin" component={HomeAdmin} />
        <Stack.Screen name="HomeStudent" component={HomeStudent} />
        <Stack.Screen name="History" component={HistoryScreen} />
        {/* <Stack.Screen name="Transactions" component={TransactionScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;


