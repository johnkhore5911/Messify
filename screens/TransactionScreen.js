// screens/TransactionScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const TransactionScreen = () => {
  const transactions = [
    { id: '1', date: '2024-10-01', amount: 150, description: 'Paneer Butter Masala' },
    { id: '2', date: '2024-10-02', amount: 10, description: 'Roti' },
    { id: '3', date: '2024-10-03', amount: 100, description: 'Dal Makhani' },
    // Add more transactions if needed
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Transaction History</Text>
      <FlatList
        data={transactions}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.amount}>₹{item.amount}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TransactionScreen;
