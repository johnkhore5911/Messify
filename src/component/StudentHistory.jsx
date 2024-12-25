import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

const StudentHistory = () => {
  const route = useRoute();
  const { History } = route.params;

  // Reverse the History array to show the latest first
  const reversedHistory = [...History].reverse();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {reversedHistory.map((historyItem, index) => (
          <View key={index} style={styles.historyItem}>
            <Text style={styles.actionText}>{historyItem.action}</Text>
            <Text style={styles.dateText}>{new Date(historyItem.date).toLocaleString()}</Text>

            <View style={styles.billDetails}>
              <Text style={styles.billLabel}>Previous Bill: <Text style={styles.billValue}>₹{historyItem.previousBill}</Text></Text>
              <Text style={styles.billLabel}>New Bill: <Text style={styles.billValue}>₹{historyItem.newBill}</Text></Text>
            </View>

            <Text style={styles.amountText}>Amount Added: <Text style={styles.amountValue}>₹{historyItem.amount}</Text></Text>

            {historyItem.items.length > 0 && (
              <View style={styles.itemsContainer}>
                <Text style={styles.itemsHeader}>Items:</Text>
                {historyItem.items.map((item, itemIndex) => (
                  <Text key={itemIndex} style={styles.itemText}>
                    {item.item} - ₹{item.price}
                  </Text>
                ))}
              </View>
            )}

            {/* <Text style={styles.descriptionText}>{historyItem.description}</Text> */}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default StudentHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background for the page
    padding: 16,
  },
  scrollView: {
    paddingBottom: 20,
  },
  historyItem: {
    backgroundColor: '#1e1e1e', // Dark card for each history item
    marginBottom: 16,
    padding: 16,
    borderRadius: 10,
  },
  actionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  dateText: {
    fontSize: 14,
    color: '#aaaaaa',
    marginVertical: 4,
  },
  billDetails: {
    marginVertical: 12,
  },
  billLabel: {
    fontSize: 16,
    color: '#bbbbbb',
  },
  billValue: {
    fontWeight: 'bold',
    color: '#ffffff',
  },
  amountText: {
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 8,
  },
  amountValue: {
    fontWeight: 'bold',
    color: '#ff7043',
  },
  itemsContainer: {
    marginVertical: 12,
    backgroundColor: '#2c2c2c',
    padding: 8,
    borderRadius: 8,
  },
  itemsHeader: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  itemText: {
    fontSize: 14,
    color: '#ffffff',
    marginVertical: 4,
  },
  descriptionText: {
    fontSize: 14,
    color: '#bbbbbb',
    marginVertical: 8,
  },
});