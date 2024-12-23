// // screens/LoginScreen.js
// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

// const LoginScreen = ({ navigation }) => {
//   const [role, setRole] = useState('');

//   const handleLogin = () => {
//     if (role === 'admin') {
//       navigation.navigate('HomeAdmin'); // Navigate to admin home screen
//     } else {
//       navigation.navigate('HomeStudent'); // Navigate to student home screen
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Login as:</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter role (admin/student)"
//         value={role}
//         onChangeText={setRole}
//       />
//       <Button title="Login" onPress={handleLogin} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   heading: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
// });

// export default LoginScreen;

// screens/LoginScreen.js
// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

// const LoginScreen = ({ navigation }) => {
//   const [role, setRole] = useState('');

//   const handleLogin = () => {
//     if (role === 'admin') {
//       navigation.navigate('HomeAdmin');
//     } else {
//       navigation.navigate('HomeStudent');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Login as:</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter role (admin/student)"
//         value={role}
//         onChangeText={setRole}
//       />
//       <Button title="Login" onPress={handleLogin} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   heading: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
// });

// export default LoginScreen;


import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [role, setRole] = useState('');

  const handleLogin = () => {
    if (role.toLowerCase() === 'admin') {
      navigation.navigate('HomeAdmin');
    } else if (role.toLowerCase() === 'student') {
      navigation.navigate('HomeStudent');
    } else {
      alert("Please enter a valid role ('admin' or 'student')");
    }
  };

  // Dynamic background color based on role
  const getBackgroundColor = () => {
    switch (role.toLowerCase()) {
      case 'admin':
        return '#FF7043'; // Orange for admin
      case 'student':
        return '#29B6F6'; // Blue for student
      default:
        return '#f5f5f5'; // Default background color
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
      <Text style={styles.heading}>Login as:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter role (admin/student)"
        value={role}
        onChangeText={setRole}
        placeholderTextColor="#999"
      />
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} color="#4CAF50" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#37474F', // Dark text for contrast
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 18,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden', // Rounded corners for the button
  },
});

export default LoginScreen;

