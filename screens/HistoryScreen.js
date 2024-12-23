// // screens/HistoryScreen.js
// import React from 'react';
// import { View, Text, FlatList, StyleSheet } from 'react-native';

// const HistoryScreen = () => {
//   // Simulated history data
//   const history = [
//     { id: '1', foodName: 'Aloo Paratha', cost: 80, date: '2024-09-28' },
//     { id: '2', foodName: 'Chole Bhature', cost: 120, date: '2024-09-27' },
//     { id: '3', foodName: 'Pulao', cost: 90, date: '2024-09-26' },
//   ];

//   const renderItem = ({ item }) => (
//     <View style={styles.item}>
//       <Text style={styles.foodItem}>{item.foodName}</Text>
//       <Text style={styles.cost}>₹{item.cost}</Text>
//       <Text style={styles.date}>{item.date}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Meal History</Text>
//       <FlatList
//         data={history}
//         renderItem={renderItem}
//         keyExtractor={item => item.id}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   item: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     backgroundColor: '#fff',
//     padding: 15,
//     marginBottom: 10,
//     borderRadius: 5,
//     borderColor: '#ddd',
//     borderWidth: 1,
//   },
//   foodItem: {
//     fontSize: 18,
//   },
//   cost: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   date: {
//     fontSize: 14,
//     color: 'gray',
//   },
// });

// export default HistoryScreen;

// screens/HistoryScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const HistoryScreen = () => {
  const mealsHistory = [
    { id: '1', date: '2024-10-01', foodName: 'Paneer Butter Masala', cost: 150 },
    { id: '2', date: '2024-10-02', foodName: 'Roti', cost: 10 },
    { id: '3', date: '2024-10-03', foodName: 'Dal Makhani', cost: 100 },
    // Add more meal history entries as needed
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Meal History</Text>
      <FlatList
        data={mealsHistory}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.foodItem}>{item.foodName} - ₹{item.cost}</Text>
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
    fontWeight: 'bold',
  },
  foodItem: {
    fontSize: 16,
  },
});

export default HistoryScreen;

