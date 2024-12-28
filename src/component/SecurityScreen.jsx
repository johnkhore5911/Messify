import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const StudentProfile = () => {
  const [securityLevel, setSecurityLevel] = useState(1);

  useEffect(() => {
    const loadSecurityLevel = async () => {
      try {
        const savedLevel = await AsyncStorage.getItem('securityLevel');
        if (savedLevel) {
          setSecurityLevel(parseInt(savedLevel));
        } else {
          setSecurityLevel(1); 
        }
      } catch (error) {
        console.error('Error loading security level:', error);
      }
    };

    loadSecurityLevel();
  }, []);

  const getSecurityStyle = () => {
    switch (securityLevel) {
      case 1:
        return { backgroundColor: 'green', text: 'Level 1 - Low Security' };
      case 2:
        return { backgroundColor: 'orange', text: 'Level 2 - Medium Security' };
      case 3:
        return { backgroundColor: 'red', text: 'Level 3 - High Security' };
      default:
        return { backgroundColor: 'green', text: 'Level 1 - Low Security' };
    }
  };

  const getSecurityDescription = () => {
    switch (securityLevel) {
      case 1:
        return 'You will get notifications whenever there is a bill order.';
      case 2:
        return 'In this level, no one can change the bill amount. You need to turn this off to confirm the bill amount by MessStaff.';
      case 3:
        return 'Confirm a message (Yes/No) will be sent to confirm the meal.';
      default:
        return '';
    }
  };

  const changeSecurityLevel = async (level) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post('http://192.168.18.235:3000/api/auth/updateSecurityLevel', 
        { securityLevel: level },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        await AsyncStorage.setItem('securityLevel', level.toString());

        Toast.show({
          type: 'success',
          text1: 'Security Level Updated',
          text2: `Your security level has been set to ${level}`,
          visibilityTime: 2500,
        });
        setSecurityLevel(level);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'There was an issue updating the security level.',
          visibilityTime: 2500,
        });
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Network error or server issue. Please try again later.',
        visibilityTime: 2500,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Student Profile</Text>
      <View style={[styles.securityBox, { backgroundColor: getSecurityStyle().backgroundColor }]} >
        <Text style={styles.securityText}>{getSecurityStyle().text}</Text>
      </View>

      <Text style={styles.label}>Select Security Level:</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, securityLevel === 1 && styles.activeButton]}
          onPress={() => changeSecurityLevel(1)}
        >
          <Text style={styles.buttonText}>Level 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, securityLevel === 2 && styles.activeButton]}
          onPress={() => changeSecurityLevel(2)}
        >
          <Text style={styles.buttonText}>Level 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, securityLevel === 3 && styles.activeButton]}
          onPress={() => changeSecurityLevel(3)}
        >
          <Text style={styles.buttonText}>Level 3</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{getSecurityDescription()}</Text>
      </View>
    </View>
  );
};

export default StudentProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  header: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  securityBox: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  securityText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    margin: 5,
    borderWidth: 2,
    borderColor: '#555',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeButton: {
    backgroundColor: '#007BFF',
    borderColor: '#0056b3',
  },
  descriptionContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#1c1c1c',
    borderRadius: 10,
    width: '100%',
  },
  descriptionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
