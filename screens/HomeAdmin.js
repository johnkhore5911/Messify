// // screens/HomeAdmin.js
// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { Calendar } from 'react-native-calendars';

// const HomeAdmin = () => {
//   const onDayPress = (day) => {
//     alert(`Selected day: ${day.dateString}`);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Admin - Meal Plan Calendar</Text>
//       <Calendar
//         onDayPress={onDayPress}
//         markingType={'simple'}
//         markedDates={{
//           '2024-10-15': { marked: true, dotColor: 'red' },
//           '2024-10-16': { marked: true, dotColor: 'blue' },
//         }}
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
// });

// export default HomeAdmin;


// screens/HomeAdmin.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const HomeAdmin = () => {
  const onDayPress = (day) => {
    alert(`Selected day: ${day.dateString}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Admin - Meal Plan Calendar</Text>
      <Calendar
        onDayPress={onDayPress}
        markingType={'simple'}
        markedDates={{
          '2024-10-15': { marked: true, dotColor: 'red' },
          '2024-10-16': { marked: true, dotColor: 'blue' },
        }}
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
});

export default HomeAdmin;
