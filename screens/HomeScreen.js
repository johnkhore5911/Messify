import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  // Simulating meal data
  const [meals, setMeals] = useState([
    { id: '1', foodName: 'Paneer Butter Masala', cost: 150, bgColor: '#FFCC80' },
    { id: '2', foodName: 'Roti', cost: 10, bgColor: '#FFAB91' },
    { id: '3', foodName: 'Dal Makhani', cost: 120, bgColor: '#81C784' },
  ]);

  // Calculate total cost
  const totalCost = meals.reduce((acc, meal) => acc + meal.cost, 0);

  // Render each meal item with dynamic background color
  const renderItem = ({ item }) => (
    <View style={[styles.item, { backgroundColor: item.bgColor }]}>
      <Text style={styles.foodItem}>{item.foodName}</Text>
      <Text style={styles.cost}>₹{item.cost}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>MessMate - Today's Meals</Text>

      {/* FlatList to show meals */}
      <FlatList
        data={meals}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      {/* Display the total cost */}
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total Cost: ₹{totalCost}</Text>
      </View>

      {/* Button for navigating to the history screen */}
      <View style={styles.buttonContainer}>
        <Button
          title="View History"
          color="#FF7043"
          onPress={() => navigation.navigate('History')}
        />
      </View>

      {/* Button for Payment */}
      <View style={styles.buttonContainer}>
        <Button
          title="Pay Now"
          color="#29B6F6"
          onPress={() => {
            alert("Payment integration coming soon!");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0F4C3',  // Light background color for freshness
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#37474F',  // Darker text for contrast
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    // Adding shadow for elevation effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  foodItem: {
    fontSize: 20,
    color: '#37474F',  // Dark color for readability
  },
  cost: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#37474F',
  },
  footer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#FFF59D',  // Light yellow background
    borderRadius: 10,
    alignItems: 'center',
    // Adding shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  totalText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#37474F',
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',  // This ensures the button gets rounded corners
    elevation: 4,
  },
});

export default HomeScreen;
