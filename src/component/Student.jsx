import React, { useEffect, useState,useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, Alert } from 'react-native';
import io from 'socket.io-client';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation,useFocusEffect } from '@react-navigation/native';
import { usePaymentHistory } from '../context/PaymentHistoryContext';
import Toast from 'react-native-toast-message';

const Student = () => {
  const [message, setMessage] = useState('');
  const [student, setStudent] = useState(null);
  const navigation = useNavigation();
  const {setPaymentHistory} = usePaymentHistory()

  

  const socket = io('http://192.168.18.235:3000', {
    transports: ['websocket'],
  });

  useEffect(() => {
    const initializeSocket = async () => {
      const token = await AsyncStorage.getItem('token'); 
      if (token) {
        socket.emit('register', token); 
      }
    };

    initializeSocket();
    

    // Push Notification configuration
    PushNotification.configure({
      onNotification: function (notification) {
        console.log('Notification received:', notification);
      },
      requestPermissions: Platform.OS === 'ios',
    });

    // Ensure notification permissions for Android 13+
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      PushNotification.requestPermissions()
        .then((response) => {
          console.log('Notification permission status:', response);
        })
        .catch((err) => {
          console.log('Permission request failed:', err);
        });
    }

    // Create a notification channel (required for Android 8+)
    PushNotification.createChannel(
      {
        channelId: 'student-channel', // Unique ID
        channelName: 'Student Notifications', // Displayed Name
        channelDescription: 'Notifications for student updates', // Description
        soundName: 'default', // Optional
        importance: 4, // Importance level
        vibrate: true, // Default vibration for notifications
      },
      (created) => console.log(`Channel created: ${created}`) // Callback for channel creation
    );

    // Listen for 'message' event from the server
    socket.on('message', (data) => {
      const { title, message } = data;

      PushNotification.localNotification({
        channelId: 'student-channel',
        title: title,
        message: message,
        bigText: message, 
        color: 'blue',
      });

      setMessage(message);
      getData();
    });

    socket.on('MealUpdated', (messageData) => {
      const { title, message } = messageData;

      // Trigger a notification when a message is received
      PushNotification.localNotification({
        channelId: 'student-channel',
        title: title,
        message: message,
        bigText: message, 
        color: 'blue',
      });
      setMessage(message);
      getData();
  });


  socket.on('message1', (data) => {
    if (data.action === 'confirmMeal') {
      Alert.alert(
        data.title,
        data.message,
        [
          {
            text: 'Cancel',
            onPress: () => {
              socket.emit('confirmMealResponse', { userId: data.studentId, confirm: false,totalBill:data.totalBill,items:data.items,messStaffId:data.messStaffId });
            },
            style: 'cancel',
          },
          {
            text: 'Confirm',
            onPress: () => {
              socket.emit('confirmMealResponse', { userId: data.studentId, confirm: true,totalBill:data.totalBill,items:data.items,messStaffId:data.messStaffId });
            },
          },
        ]
      );
      
    }
  });


    return () => {
    getData();
      socket.disconnect();
    };
  }, []);

  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get('http://192.168.18.235:3000/api/auth/getUserData', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setStudent(response.data.data);
        await AsyncStorage.setItem('name', response.data.data.name);
        setPaymentHistory(response.data.data?.paymentHistory)
      }
    } catch (error) {
      console.error('Failed to fetch data. Please try again later.');
    }
  };

  useEffect(() => {
    getData();
  }, []);
  

  useFocusEffect(
    useCallback(() => {
      getData(); 
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Student</Text>

      <View style={styles.section}>
        <Text style={styles.billText}>Bill Due: ₹{student?.bill || '0'}</Text>
        <TouchableOpacity 
        style={styles.actionButton}         
        onPress={() => {
          if(student.bill <100){
            Toast.show({
              type: 'error',
              text1: 'Insufficient Amount',
              text2: 'Your bill amount is too low to proceed.',
            });
          }
          else{
            navigation.navigate('Payment', { student})
          }
        }} 
        >
          <Text style={styles.actionButtonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.section}
        onPress={() => { navigation.navigate('StudentHistory', { History: student?.history })}}
      >
        <Text style={styles.sectionText}>View Meal History</Text>
        <Text style={styles.arrow}>&gt;</Text>
      </TouchableOpacity>

      <View style={styles.mealSection}>
        <Text style={styles.sectionTitle}>Today's Meal</Text>
        <ScrollView>
          {student?.todaysMeal?.length > 0 ? (
            student.todaysMeal.map((item, index) => (
              <View key={index} style={styles.mealCard}>
                <Text style={styles.mealItem}>{item.item}</Text>
                <Text style={styles.mealPrice}>₹{item.price}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>No meal items available.</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginVertical: 20,
  },
  section: {
    backgroundColor: '#1f1f1f',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  messageText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
    color: '#ffffff',
  },
  billText: {
    fontSize: 20,
    color: '#ffffff',
  },
  actionButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  actionButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionText: {
    fontSize: 18,
    color: '#ffffff',
  },
  arrow: {
    fontSize: 20,
    color: '#007bff',
  },
  mealSection: {
    flexDirection: 'column',
  },
  mealCard: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  mealItem: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  mealPrice: {
    fontSize: 16,
    color: '#007bff',
  },
  noDataText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Student;
