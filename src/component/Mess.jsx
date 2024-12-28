import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput,Platform, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import io from 'socket.io-client';
import PushNotification from 'react-native-push-notification';


const MessStaffPage = ({ navigation }) => {
  const [student, setStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [messStaff, setMessStaff] = useState(null);
  const [message, setMessage] = useState('');

  const socket = io('http://192.168.18.235:3000', {
    transports: ['websocket'],
  });


  const getData = async () => {
    console.log("Getting data");
    try {
      const token = await AsyncStorage.getItem('token');
      console.log("token: ",token);
      const response = await axios.get("http://192.168.18.235:3000/api/auth/getUserData", 
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
  
      if (response.data.success) {
        console.log("response.data.data: ",response.data.data);
        setMessStaff(response.data.data);
        console.log("response.data.data.bill: ",response.data.data.bill);
      } else {
        setError('MessStaff not found');
      }
    } 
    catch (error) {
      setError('Failed to fetch data. Please try again later.');
      console.log("Failed to fetch data. Please try again later.")
    } 
  };

  useEffect(()=>{
    getData();
  },[]);



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
        channelId: 'student-channel',
        channelName: 'Student Notifications', 
        channelDescription: 'Notifications for student updates', 
        soundName: 'default', 
        importance: 4, 
        vibrate: true, 
      },
      (created) => console.log(`Channel created: ${created}`) 
    );

    socket.on('message', (data) => {
      const { title, message } = data;

      // Trigger a notification when a message is received
      PushNotification.localNotification({
        channelId: 'student-channel',
        title: title,
        message: message,
        bigText: message,
        color: 'blue',
      });
      if(title==="Meal Cancelled"){
      Alert.alert("Meal Cancelled","Meal has been Cancelled by the Student.");
      }
      else{
        Alert.alert("Successfully Confirmed!","Meal Confirmed by the Student!");
      }

      setMessage(message);
      getData();
    });

    socket.on('MealUpdated', (messageData) => {
      console.log("New meal update:", messageData);
      const { title, message } = messageData;
      console.log("MessageData: ",messageData);

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



    // Clean up the connection when the component unmounts
    return () => {
    getData();
      socket.disconnect();
    };
  }, []);


  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
  );
  

  const handleAddMeal = () => {
    navigation.navigate('AddMealPage',{messNumber:messStaff.messNumber}); 
  };

  const handleSearch = async () => {
    if (!searchQuery) {
      alert('Please enter a roll number');
      return;
    }

    setLoading(true);
    setError(null); 
    console.log("search query:",searchQuery)
    console.log(typeof(searchQuery));
    const token = await AsyncStorage.getItem('token');
    console.log("token: ",token);
    try {
      const response = await axios.post("http://192.168.18.235:3000/api/auth/getUserDataByRoll", 
        {
          rollNumber: searchQuery
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
      console.log("response.data: ", response.data);
  
      if (response.data.success) {
        setStudent(response.data.data); 
      } else {
        setError('Student not found');
      }
    } catch (error) {
      setError('Failed to fetch data. Please try again later.');
      console.log("Failed to fetch data. Please try again later.")
    } finally {
      setLoading(false); 
    }
  };


  const handleDeleteMeal = async (itemId,itemName) => {
    console.log("Item id: ",itemId);
    console.log("Item Name: ",itemName)
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.delete(`http://192.168.18.235:3000/api/auth/deleteTodaysMealItem/${itemId}/${itemName}`, 
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        
      if (response.data.success) {
        setMessStaff(prevState => {
          const updatedMeals = prevState.todaysMeal.filter(item => item.item !== item);
          return { ...prevState, todaysMeal: updatedMeals };
        });
        getData();
      } else {
        alert('Failed to delete the meal item');
      }
    } catch (error) {
      console.log("Error deleting meal item", error);
      alert('Failed to delete the meal item');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mess Staff</Text>

      <TouchableOpacity style={styles.addMealButton} onPress={handleAddMeal}>
        <Text style={styles.addMealButtonText}>Add Today's Meal</Text>
      </TouchableOpacity>
      
      <View style={styles.mealContainer}>
        <Text style={styles.mealHeader}>Today's Meal</Text>
          {messStaff?.todaysMeal && messStaff?.todaysMeal.map((item, index) => (
            <View key={index} style={styles.mealItemContainer}>
              <Text style={styles.mealText}>{item.item} - ₹{item.price}</Text>
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => handleDeleteMeal(item._id,item.item)}>
                <Ionicons name="trash-bin" size={20} color="red" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

      <View style={styles.searchContainer}>
        <Text style={styles.searchLabel}>Search Student</Text>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Roll Number"
            placeholderTextColor="#aaa"
            value={searchQuery}
            onChangeText={setSearchQuery} 
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>

      {loading && <Text style={styles.loadingText}>Loading...</Text>}

      {error && <Text style={styles.errorText}>{error}</Text>}

      {student && (
        <TouchableOpacity style={styles.studentInfoContainer} onPress={()=> navigation.navigate("ServeMealPage",{student})}>
          <Text style={styles.studentName}>{student.name}</Text>
          <View style={styles.studentDetails}>
            <Text style={styles.studentDetail}>
              Hostel: {student.hostelNumber}, Room: {student.roomDetails}, Roll No: {student.rollNumber}
            </Text>
            <TouchableOpacity style={styles.rightArrowButton}>
              <Ionicons name="arrow-forward" size={24} color="#2596be" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212', 
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  addMealButton: {
    width: '100%',
    backgroundColor: '#6200ea',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom:10
  },
  addMealButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchContainer: {
    marginVertical: 20,
  },
  searchLabel: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#1e1e1e',
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#1e88e5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    color: '#ff0000',
    fontSize: 16,
    textAlign: 'center',
  },
  studentInfoContainer: {
    marginTop: 30,
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 10,
  },
  studentName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  studentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  studentDetail: {
    color: '#fff',
    fontSize: 16,
  },
  rightArrowButton: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  mealContainer: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 15,
    marginVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    width:"99%",
  },
  mealItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  mealHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  mealText: {
    fontSize: 18,
    color: '#fff',
  },
  
});

export default MessStaffPage;
