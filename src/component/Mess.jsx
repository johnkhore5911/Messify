import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';  // Import axios for making API requests
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const MessStaffPage = ({ navigation }) => {
  const [student, setStudent] = useState(null); // State to hold student data
  const [searchQuery, setSearchQuery] = useState(''); // State to handle search input
  const [loading, setLoading] = useState(false); // State to show loading indicator
  const [error, setError] = useState(null); // State to hold error messages
  const [messStaff, setMessStaff] = useState(null); // State to hold error messages

  const getData = async () => {
    console.log("Getting data");
    // setLoading(true);
    // setError(null); // Reset any previous errors
    try {
      const token = await AsyncStorage.getItem('token');
      console.log("token: ",token);
      const response = await axios.get("https://messify-backend.vercel.app/api/auth/getUserData", 
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
  
      // Assuming the data is in response.data.data
      if (response.data.success) {
        console.log("response.data.data: ",response.data.data);
        setMessStaff(response.data.data); // Set student data from the response
        console.log("response.data.data.bill: ",response.data.data.bill);
      } else {
        setError('MessStaff not found');
      }
    } 
    catch (error) {
      setError('Failed to fetch data. Please try again later.');
      console.log("Failed to fetch data. Please try again later.")
    } 
    // finally {
    //   setLoading(false); // Stop loading indicator
    // }
  };

  useEffect(()=>{
    getData();
  },[]);


  // Re-fetch data when the screen is focused (e.g., after navigating back from TodayMealPage)
  useFocusEffect(
    React.useCallback(() => {
      getData(); // Fetch data when the screen comes into focus
    }, [])
  );
  

  const handleAddMeal = () => {
    // Redirect to Add Meal page
    navigation.navigate('AddMealPage',{messNumber:messStaff.messNumber}); // Ensure 'AddMealPage' is registered in your navigation
  };

  const handleSearch = async () => {
    if (!searchQuery) {
      alert('Please enter a roll number');
      return;
    }

    setLoading(true);
    setError(null); // Reset any previous errors
    console.log("search query:",searchQuery)
    console.log(typeof(searchQuery));
    const token = await AsyncStorage.getItem('token');
    console.log("token: ",token);
    try {
      const response = await axios.post("https://messify-backend.vercel.app/api/auth/getUserDataByRoll", 
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
  
      // Assuming the data is in response.data.data
      if (response.data.success) {
        setStudent(response.data.data); // Set student data from the response
      } else {
        setError('Student not found');
      }
    } catch (error) {
      setError('Failed to fetch data. Please try again later.');
      console.log("Failed to fetch data. Please try again later.")
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };


  const handleDeleteMeal = async (itemId,itemName) => {
    console.log("Item id: ",itemId);
    console.log("Item Name: ",itemName)
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.delete(`https://messify-backend.vercel.app/api/auth/deleteTodaysMealItem/${itemId}/${itemName}`, 
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        
      if (response.data.success) {

        // Update the meal items in the state
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
      {/* Header */}
      <Text style={styles.header}>Mess Staff</Text>

      {/* Add Today's Meal Button */}
      <TouchableOpacity style={styles.addMealButton} onPress={handleAddMeal}>
        <Text style={styles.addMealButtonText}>Add Today's Meal</Text>
      </TouchableOpacity>

            {/* Today's Meal Section */}
      {/* <View style={styles.mealContainer}>
            <Text style={styles.mealHeader}>Today's Meal</Text>
            <View>
              {messStaff?.todaysMeal && messStaff?.todaysMeal.map((item, index) => (
                <Text key={index} style={styles.mealText}>
                  {item.item} - ₹{item.price}
                </Text>
              ))}
            </View>
      </View> */}
      
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

      {/* Search Student Section */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchLabel}>Search Student</Text>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Roll Number"
            placeholderTextColor="#aaa"
            value={searchQuery}
            onChangeText={setSearchQuery} // Update search query on input change
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Loading Spinner */}
      {loading && <Text style={styles.loadingText}>Loading...</Text>}

      {/* Error Message */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Display Student Information if available */}
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
    backgroundColor: '#121212', // Blackish background
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    // marginVertical: 20,
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
