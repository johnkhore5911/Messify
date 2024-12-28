import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { useRoute } from '@react-navigation/native'; // Import the useRoute hook
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import PushNotification from 'react-native-push-notification';
import io from 'socket.io-client';

const ServeMealPage = () => {
  const route = useRoute(); // Get route to access passed parameters
  const { student } = route.params; // Get the student object from params
  
  const [meals, setMeals] = useState(student?.todaysMeal);
  const [selectedItems, setSelectedItems] = useState([]);
  const [manualItem, setManualItem] = useState('');
  const [manualPrice, setManualPrice] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  const socket = io('http://192.168.18.235:3000', {
    transports: ['websocket'],
  });

    socket.on('message', (data) => {
      console.log("meal is confirmed and this message is send to messStaff")
    });

  const handleAddMeal = (meal) => {
    setSelectedItems((prev) => [...prev, meal]);
    setTotalPrice((prev) => prev + parseInt(meal.price));
  };

  const handleAddManualMeal = () => {
    if (manualItem && manualPrice) {
      const newItem = { item: manualItem, price: parseInt(manualPrice) };
      setSelectedItems((prev) => [...prev, newItem]);
      setTotalPrice((prev) => prev + newItem.price);
      setManualItem('');
      setManualPrice('');
    }
  };

  const handleDeleteMeal = (index) => {
    const itemToDelete = selectedItems[index];
    setTotalPrice((prev) => prev - parseInt(itemToDelete.price));
    setSelectedItems((prev) => prev.filter((_, i) => i !== index));
  };


  const handleConfirm = async () => {

    if (totalPrice === 0) {
      Toast.show({
        type: 'error',
        text1: 'Meal Selection Error',
        text2: 'Please select at least one meal to proceed.',
        position: 'top',
        visibilityTime: 3000,
      });
      return;
    }
  
    const output = {
      totalBill: totalPrice,
      items: selectedItems,
      rollNumber: student.rollNumber,
    };
  
    console.log("Output:", output);
    try {
      const token = await AsyncStorage.getItem('token');
      console.log("token: ", token);
      const response = await axios.post(
        'http://192.168.18.235:3000/trigger',
        output,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
  
      console.log("response: ", response.data?.success);
      if(response.status===200 && response.data?.success===false){
        Alert.alert("Waiting...","Waiting for the Student to Confirm the Meal!");
      }
  
      else if (response.status === 200 && response?.data?.messageData?.message2 ) {
        Toast.show({
          type: 'success',
          text1: 'Confirmation Success',
          position: 'top',
          visibilityTime: 6500,
        });
        Alert.alert("Confirm Successfully!", `${response.data.messageData.message2}`);
      } 
      else {
        Alert.alert("Error", "Unable to update the bill amount. Please try again.");
      }

    } 
    catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          const errorMessage = error.response.data.message || "User security is locked";
          Toast.show({
            type: 'error',
            text1: 'Error Meal Locked',
            text2: errorMessage,
            position: 'top',
            visibilityTime: 6000,
          });
          Alert.alert("Error Meal Locked", errorMessage);
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: error.response.data.message || "An unexpected error occurred.",
            position: 'top',
            visibilityTime: 6000,
          });
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'Network Error',
          text2: "There was an issue confirming the data. Please check your network connection.",
          position: 'top',
          visibilityTime: 6000,
        });
        Alert.alert("Error", "There was an issue confirming the data.");
      }
    }
  };

  
  return (
    <View style={styles.container}>
      <View style={styles.studentDetails}>
        <Image
          style={styles.image}
          source={{uri:"https://api.dicebear.com/5.x/initials/svg?seed=John"}}
          onError={(e) => console.log('Image loading error:', e.nativeEvent.error)}
        />
        <View>
          <Text style={styles.studentName}>{student.name}</Text>
          <Text style={styles.billAmount}>Bill Amount: ₹{student.bill}</Text>
        </View>
      </View>

      <View style={styles.dropdownSection}>
        <ScrollView>
          {selectedItems.map((item, index) => (
            <View key={index} style={styles.dropdownItem}>
              <Text style={styles.itemText}>
                {item.item} - ₹{item.price}
              </Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteMeal(index)}
              >
                <Text style={styles.deleteButtonText}>DEL</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <Text style={styles.label}>Dropdown</Text>
        <ScrollView style={styles.dropdownOptions}>
          {meals.map((meal, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => handleAddMeal(meal)}
            >
              <Text style={styles.optionText}>
                {meal.item} - ₹{meal.price}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.manualSection}>
        <Text style={styles.label}>Manual Add</Text>
        <View style={styles.manualInput}>
          <TextInput
            style={styles.input}
            placeholder="Item Name"
            placeholderTextColor="#aaa"
            value={manualItem}
            onChangeText={setManualItem}
          />
          <TextInput
            style={styles.input}
            placeholder="Price"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
            value={manualPrice}
            onChangeText={setManualPrice}
          />
        <TouchableOpacity style={styles.addButton} onPress={handleAddManualMeal}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Confirm ₹{totalPrice}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  studentDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  studentName: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  billAmount: {
    fontSize: 16,
    color: '#aaa',
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginTop:20,
    marginBottom: 5,
  },
  dropdownSection: {
    marginBottom: 20,
  },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    width:"90%"
  },
  itemText: {
    color: '#fff',
  },
  deleteButton: {
    backgroundColor: '#e53935',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  dropdownOptions: {
    maxHeight: 150,
    backgroundColor: '#1e1e1e',
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
  },
  option: {
    paddingVertical: 8,
  },
  optionText: {
    color: '#fff',
  },
  manualSection: {
    marginBottom: 20,
  },
  manualInput: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#1e88e5',
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#1e88e5',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ServeMealPage;
