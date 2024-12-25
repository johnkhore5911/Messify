import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); // Role: "Mess" or "Student"
  const [messNumber, setMessNumber] = useState('');
  const [hostelNumber, setHostelNumber] = useState('');
  const [roomDetails, setRoomDetails] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const navigation = useNavigation();

  const handleSignUp = async() => {
    const data = {
      name,
      email,
      password,
      role,
      ...(role === 'Mess' && { messNumber }),
      ...(role === 'Student' && { hostelNumber, roomDetails, rollNumber }),
    };
    console.log('Sign-Up Data:', data);

    try {
      const response = await axios.post('https://messify-backend.vercel.app/api/auth/register', data);
      if (response.data.success) {
        Alert.alert('Sign Up Successful', 'You can now log in!')

        navigation.navigate("Login");
      } else {
        Alert.alert('Sign Up Failed', response.data.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Error during sign up', error);
      Alert.alert('Sign Up Failed', 'An error occurred during sign up');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#777"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#777"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#777"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Text style={styles.label}>Select Role:</Text>
      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[styles.roleButton, role === 'Mess' && styles.selectedButton]}
          onPress={() => setRole('Mess')}
        >
          <Text style={styles.roleButtonText}>Mess Staff</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roleButton, role === 'Student' && styles.selectedButton]}
          onPress={() => setRole('Student')}
        >
          <Text style={styles.roleButtonText}>Student</Text>
        </TouchableOpacity>
      </View>

      {role === 'Mess' && (
        <TextInput
          style={styles.input}
          placeholder="Mess Number"
          placeholderTextColor="#777"
          value={messNumber}
          onChangeText={setMessNumber}
        />
      )}

      {role === 'Student' && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Hostel Number"
            placeholderTextColor="#777"
            value={hostelNumber}
            onChangeText={setHostelNumber}
          />
          <TextInput
            style={styles.input}
            placeholder="Room Number, Block, Floor"
            placeholderTextColor="#777"
            value={roomDetails}
            onChangeText={setRoomDetails}
          />
          <TextInput
            style={styles.input}
            placeholder="Roll Number"
            placeholderTextColor="#777"
            value={rollNumber}
            onChangeText={setRollNumber}
          />
        </>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkContainer} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Already have an account? </Text>
        <Text style={styles.linkTextBold}>Log In</Text>
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
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    color: '#fff',
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    color: '#bbb',
    marginBottom: 10,
  },
  roleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  roleButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: '#1e1e1e',
  },
  selectedButton: {
    backgroundColor: '#6200ea',
  },
  roleButtonText: {
    color: '#fff',
    fontSize: 16,
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
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  linkText: {
    color: '#bbb',
    fontSize: 14,
  },
  linkTextBold: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SignUpPage;
