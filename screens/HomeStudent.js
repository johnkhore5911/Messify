// // screens/HomeStudent.js
// import React, { useState } from 'react';
// import { View, Text, Button, FlatList, TextInput, StyleSheet } from 'react-native';

// const HomeStudent = () => {
//   const [meals, setMeals] = useState([
//     { id: '1', foodName: 'Paneer Butter Masala', cost: 150, feedback: '' },
//     { id: '2', foodName: 'Roti', cost: 10, feedback: '' },
//   ]);
//   const [feedback, setFeedback] = useState('');

//   const handleFeedback = (mealId) => {
//     setMeals(prevMeals =>
//       prevMeals.map(meal => 
//         meal.id === mealId ? { ...meal, feedback: feedback } : meal
//       )
//     );
//     setFeedback(''); // Clear feedback input
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>MessMate - Today's Meals</Text>

//       <FlatList
//         data={meals}
//         renderItem={({ item }) => (
//           <View style={styles.item}>
//             <Text style={styles.foodItem}>{item.foodName}</Text>
//             <Text style={styles.cost}>₹{item.cost}</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Leave feedback"
//               value={item.feedback || feedback}
//               onChangeText={setFeedback}
//             />
//             <Button title="Submit Feedback" onPress={() => handleFeedback(item.id)} />
//           </View>
//         )}
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
//     padding: 15,
//     marginBottom: 10,
//     backgroundColor: '#fff',
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
//   input: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginTop: 10,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
// });

// export default HomeStudent;

// screens/HomeStudent.js
// import React, { useState } from 'react';
// import { View, Text, Button, FlatList, TextInput, StyleSheet } from 'react-native';

// const HomeStudent = ({ navigation }) => {
//   const [meals, setMeals] = useState([
//     { id: '1', foodName: 'Paneer Butter Masala', cost: 150, feedback: '' },
//     { id: '2', foodName: 'Roti', cost: 10, feedback: '' },
//   ]);
//   const [feedback, setFeedback] = useState('');

//   const handleFeedback = (mealId) => {
//     setMeals(prevMeals =>
//       prevMeals.map(meal => 
//         meal.id === mealId ? { ...meal, feedback: feedback } : meal
//       )
//     );
//     setFeedback(''); // Clear feedback input
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>MessMate - Today's Meals</Text>
//       <FlatList
//         data={meals}
//         renderItem={({ item }) => (
//           <View style={styles.item}>
//             <Text style={styles.foodItem}>{item.foodName}</Text>
//             <Text style={styles.cost}>₹{item.cost}</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Leave feedback"
//               value={item.feedback || feedback}
//               onChangeText={setFeedback}
//             />
//             <Button title="Submit Feedback" onPress={() => handleFeedback(item.id)} />
//           </View>
//         )}
//         keyExtractor={item => item.id}
//       />
//       <Button title="View History" onPress={() => navigation.navigate('History')} />
//       <Button title="View Transactions" onPress={() => navigation.navigate('Transactions')} />
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
//     padding: 15,
//     marginBottom: 10,
//     backgroundColor: '#fff',
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
//   input: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginTop: 10,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
// });

// export default HomeStudent;


import React, { useState } from 'react';
import { View, Text, Button, FlatList, TextInput, StyleSheet } from 'react-native';

const HomeStudent = ({ navigation }) => {
  const [meals, setMeals] = useState([
    { id: '1', foodName: 'Paneer Butter Masala', cost: 150, feedback: '' },
    { id: '2', foodName: 'Roti', cost: 10, feedback: '' },
  ]);
  const [feedback, setFeedback] = useState('');

  const handleFeedback = (mealId) => {
    setMeals(prevMeals =>
      prevMeals.map(meal => 
        meal.id === mealId ? { ...meal, feedback: feedback } : meal
      )
    );
    setFeedback(''); // Clear feedback input
  };

  // Function to set dynamic background color based on feedback
  const getBackgroundColor = (feedback) => {
    return feedback ? '#DFFFD6' : '#FFF'; // Light green if feedback exists, white if not
  };

  // Function to color code based on meal cost
  const getCostColor = (cost) => {
    return cost > 100 ? '#FF7043' : '#29B6F6'; // Red for expensive meals, blue for cheaper ones
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>MessMate - Today's Meals</Text>
      <FlatList
        data={meals}
        renderItem={({ item }) => (
          <View style={[styles.item, { backgroundColor: getBackgroundColor(item.feedback) }]}>
            <Text style={styles.foodItem}>{item.foodName}</Text>
            <Text style={[styles.cost, { color: getCostColor(item.cost) }]}>₹{item.cost}</Text>
            <TextInput
              style={styles.input}
              placeholder="Leave feedback"
              value={item.feedback || feedback}
              onChangeText={setFeedback}
              placeholderTextColor="#999"
            />
            <Button
              title="Submit Feedback"
              color="#4CAF50"
              onPress={() => handleFeedback(item.id)}
            />
          </View>
        )}
        keyExtractor={item => item.id}
      />
      <View style={styles.buttonContainer}>
        <Button title="View History" onPress={() => navigation.navigate('History')} color="#2196F3" />
        <Button title="View Transactions" onPress={() => navigation.navigate('Transactions')} color="#FF7043" />
      </View>
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
    fontSize: 26,
    fontWeight: 'bold',
    color: '#37474F',
    textAlign: 'center',
    marginBottom: 20,
  },
  item: {
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  foodItem: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
  },
  cost: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default HomeStudent;



