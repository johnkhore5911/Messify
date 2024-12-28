import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null); 
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {

    if (!password && !email) {
      Toast.show({
        type: 'error',  
        text1: 'Login Failed!',
        text2: `Please fill all details!`,
        visibilityTime: 2500,
      });
      return; 
    }

    setLoading(true);
    try {
      const response = await axios.post('http://192.168.18.235:3000/api/auth/login', {
        email,
        password,
      });

      if (response.status === 200) {
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('name', response.data.user.name);

        Toast.show({
          type: 'success',
          text1: 'Login Successful',
          text2: `Welcome back, ${response.data.user.name || 'User'}!`,
          visibilityTime: 2500,
        });

        if(response.data.user.role=='Student'){
          navigation.navigate('Main'); 
        }
        else if(response.data.user.role=='Mess'){
          navigation.navigate('Main2');
        }
        else{
          navigation.navigate("Login");
        }
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: error.response?.data?.message || 'An error occurred. Please try again.',
        visibilityTime: 3000,
      }); 
    }
    finally {
      setLoading(false);
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

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonLoading]}
        onPress={handleSignIn}
        disabled={loading} 
      >
        <Text style={styles.buttonText}>
          {loading ? 'Signing In...' : 'Sign In'}
        </Text>
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
  buttonLoading: {
    backgroundColor: '#4e2cbf',
  },
});

export default LoginPage;