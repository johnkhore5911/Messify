import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const StudentProfile = () => {

  const [userName,setUserName] = useState('');
  
  useEffect(()=>{
    const getData= async()=>{
      const name = await AsyncStorage.getItem('name');
      setUserName(name);
    }
    getData();
  },[])

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.profilePicContainer}>
        <Image 
          source={{ uri: 'https://via.placeholder.com/150' }} 
          style={styles.profilePic}
        />
      </View>

      <Text style={styles.name}>{userName}</Text>
      <TouchableOpacity style={[styles.updateButton, {marginBottom:10}]} onPress={async() => {
      }}>
        <Text style={styles.updateButtonText}>Update Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.updateButton} onPress={async() => {
        await AsyncStorage.removeItem("name");
        await AsyncStorage.removeItem("token");
        navigation.navigate("Login");
      }}>
        <Text style={styles.updateButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StudentProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', 
    alignItems: 'center',
    paddingTop:60,
    padding: 20,
  },
  profilePicContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: '#2596be',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom:20
  },
  bio: {
    fontSize: 16,
    color: '#bbb',
    textAlign: 'center',
    marginBottom: 20,
  },
  securityContainer: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  securityTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  securityText: {
    fontSize: 16,
    color: '#bbb',
  },
  updateButton: {
    backgroundColor: '#2596be',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
  },
  updateButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
