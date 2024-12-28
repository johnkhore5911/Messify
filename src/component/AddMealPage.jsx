import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const TodayMealPage = () => {
  const [meals, setMeals] = useState([]); 
  const navigation = useNavigation();
  const route = useRoute();
  const {messNumber} = route.params;

  const handleAddMeal = () => {
    setMeals([...meals, { itemName: '', price: '' }]);
  };

  const handleMealChange = (index, field, value) => {
    const updatedMeals = [...meals];
    updatedMeals[index][field] = value;
    setMeals(updatedMeals);
  };


  const handleDeleteMeal = (index) => {
    const updatedMeals = meals.filter((_, i) => i !== index);
    setMeals(updatedMeals);
  };

  const handleUpdate = async() => {
    const updatedMeals = meals.map(meal => ({
      ...meal,
      itemName: meal.itemName.trimEnd(), 
      price: parseFloat(meal.price), 
    }));
    const data ={
      hostelNumber: messNumber,
      items:updatedMeals
    }
    console.log("DATA: ",data);
    try{
      const token = await AsyncStorage.getItem('token');
      console.log("token: ",token);
      const response = await axios.post("http://192.168.18.235:3000/api/auth/updateTodaysMeal",
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    
    );
      if(response.data){
        console.log("Meal Updated Successfully!", response.data.message);
        Alert.alert("Meal Updated Successfully!",response.data.message)
        navigation.goBack();
      }
    }
    catch(error){
      console.log("Error while updating the meal");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mess Stuff</Text>

      <ScrollView style={styles.mealList}>
        <Text style={styles.label}>Today's Meal</Text>
        {meals.map((meal, index) => (
          <View key={index} style={styles.mealRow}>
            <TextInput
              style={[styles.input, { flex: 3 }]} 
              placeholder="Meal Name"
              placeholderTextColor="#aaa"
              value={meal.itemName}
              onChangeText={(text) =>
                handleMealChange(index, 'itemName', text)
              }
            />
            <TextInput
              style={[styles.input, { flex: 1 }]} 
              placeholder="Price"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
              value={meal.price}
              onChangeText={(text) => handleMealChange(index, 'price', text)}
            />
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteMeal(index)}
            >
              <Text style={styles.deleteButtonText}>DEL</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity style={styles.addButton} onPress={handleAddMeal}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.updateButtonText}>Update</Text>
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
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  mealList: {
    flex: 1,
  },
  mealRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#e53935', 
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e88e5', 
    borderRadius: 50,
    width: 50,
    height: 50,
    alignSelf: 'center',
    marginVertical: 20,
  },
  addButtonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  updateButton: {
    backgroundColor: '#1e88e5',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TodayMealPage;
