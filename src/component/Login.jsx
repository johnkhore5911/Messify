import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null); // State to hold student data

  const handleSignIn = async () => {
    if(!password || !email){
      return Alert.alert("Please fill all details!");
    }
    try {
      const response = await axios.post('http://192.168.18.227:3000/api/auth/login', {
        email,
        password,
      });

      if (response.status === 200) {
        // Assuming the backend sends a token or user data upon successful login
        console.log('Login Successful:', response.data);
        console.log("User role is:",response.data.user.role);
        await AsyncStorage.setItem('token', response.data.token);
        console.log('Token saved!');

        if(response.data.user.role=='Student'){
          navigation.navigate('Main'); // Navigate to the Student screen upon success
        }
        else if(response.data.user.role=='Mess'){
          navigation.navigate('Main2'); // Navigate to the Mess screen upon success
        }
        else{
          navigation.navigate("Login");
        }
      }
    } catch (error) {
      console.error('Login Failed:', error.response?.data || error.message);
      Alert.alert('Login Failed', error.response?.data?.message || 'An error occurred. Please try again.');
      // navigation.navigate('Loginn'); // 
    }
  };


  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.linkContainer} onPress={handleSignUp}>
        <Text style={styles.linkText}>New User? </Text>
        <Text style={styles.linkTextBold}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1E1E1E',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#444',
    backgroundColor: '#2A2A2A',
    color: '#FFF',
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  linkContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  linkText: {
    fontSize: 16,
    color: '#CCC',
  },
  linkTextBold: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  button: {
    width: '100%',
    backgroundColor: '#6200ea',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginPage;
