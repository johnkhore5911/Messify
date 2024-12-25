// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';

// const StudentPage = () => {
//   const [student, setStudent] = useState(null);
//   const navigation = useNavigation();

//   const getData = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       const response = await axios.get("https://messify-backend.vercel.app/api/auth/getUserData", {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       if (response.data.success) {
//         setStudent(response.data.data);
//       }
//     } catch (error) {
//       console.error("Failed to fetch data. Please try again later.");
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <Text style={styles.header}>Student </Text>

//       {/* Bill Section */}
//       <View style={styles.section}>
//         <Text style={styles.billText}>Bill Due: ₹{student?.bill || '0'}</Text>
//         <TouchableOpacity style={styles.actionButton}>
//           <Text style={styles.actionButtonText}>Pay Now</Text>
//         </TouchableOpacity>
//       </View>

//       {/* History Section */}
//       <TouchableOpacity
//         style={styles.section}
//         onPress={() => navigation.navigate("StudentHistory", { History: student?.history })}
//       >
//         <Text style={styles.sectionText}>View Payment History</Text>
//         <Text style={styles.arrow}>&gt;</Text>
//       </TouchableOpacity>

//       {/* Today's Meal Section */}
//       <View style={[ styles.mealSection]}>
//         <Text style={styles.sectionTitle}>Today's Meal</Text>
//         <ScrollView>
//           {student?.todaysMeal?.length > 0 ? (
//             student.todaysMeal.map((item, index) => (
//               <View key={index} style={styles.mealCard}>
//                 <Text style={styles.mealItem}>{item.item}</Text>
//                 <Text style={styles.mealPrice}>₹{item.price}</Text>
//               </View>
//             ))
//           ) : (
//             <Text style={styles.noDataText}>No meal items available.</Text>
//           )}
//         </ScrollView>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#121212',
//     padding: 20,
//   },
//   header: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#ffffff',
//     textAlign: 'center',
//     marginVertical: 20,
//   },
//   section: {
//     backgroundColor: '#1f1f1f',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//   },
//   mealSection: {
//     flexDirection: 'column',
//     // padding: 20,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#ffffff',
//     marginBottom: 10,
//   },
//   sectionText: {
//     fontSize: 18,
//     color: '#ffffff',
//   },
//   arrow: {
//     fontSize: 20,
//     color: '#007bff',
//   },
//   billText: {
//     fontSize: 20,
//     color: '#ffffff',
//   },
//   actionButton: {
//     backgroundColor: '#007bff',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//   },
//   actionButtonText: {
//     color: '#ffffff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   mealCard: {
//     backgroundColor: '#2a2a2a',
//     padding: 15,
//     borderRadius: 10,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//   },
//   mealItem: {
//     fontSize: 16,
//     color: '#ffffff',
//     fontWeight: 'bold',
//   },
//   mealPrice: {
//     fontSize: 16,
//     color: '#007bff',
//   },
//   noDataText: {
//     fontSize: 16,
//     color: '#888',
//     textAlign: 'center',
//     marginTop: 10,
//   },
// });

// export default StudentPage;





// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import io from 'socket.io-client';

// const App = () => {
//   const [message, setMessage] = useState('');

//   // Connect to the backend Socket.IO server
//   const socket = io('http://192.168.18.227:3000', {
//     transports: ['websocket'], // Ensures WebSocket is used
//   });

//   useEffect(() => {
//     // Listen for 'message' event from the server
//     socket.on('message', (msg) => {
//       setMessage(msg); // Update state with the message
//     });

//     // Clean up the connection when the component unmounts
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.messageText}>
//         {message ? message : 'Waiting for message from server...'}
//       </Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   messageText: {
//     fontSize: 18,
//     textAlign: 'center',
//   },
// });

// export default App;


// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import io from 'socket.io-client';
// import PushNotification from 'react-native-push-notification';

// const App = () => {
//   const [message, setMessage] = useState('');

//   // Connect to the backend Socket.IO server
//   const socket = io('http://192.168.18.227:3000', {
//     transports: ['websocket'],
//   });

//   useEffect(() => {
//     // Configure Push Notifications
//     PushNotification.configure({
//       onNotification: function (notification) {
//         console.log('Notification received:', notification);
//       },
//       requestPermissions: Platform.OS === 'ios', // Request permission for iOS
//     });

//     // Listen for 'message' event from the server
//     socket.on('message', (msg) => {
//       setMessage(msg); // Update state with the message
//       // Trigger a notification when a message is received
//       PushNotification.localNotification({
//         title: "New Message",
//         message: msg,
//         playSound: true,
//         soundName: 'default',
//       });
//     });

//     // Clean up the connection when the component unmounts
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.messageText}>
//         {message ? message : 'Waiting for message from server...'}
//       </Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   messageText: {
//     fontSize: 18,
//     textAlign: 'center',
//   },
// });

// export default App;


// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Platform } from 'react-native';
// import io from 'socket.io-client';
// import PushNotification from 'react-native-push-notification';

// const App = () => {
//   const [message, setMessage] = useState('');

//   // Connect to the backend Socket.IO server
//   const socket = io('http://192.168.18.227:3000', {
//     transports: ['websocket'],
//   });

//   useEffect(() => {
//     // Configure Push Notifications
//     PushNotification.configure({
//       onNotification: function (notification) {
//         console.log('Notification received:', notification);
//       },
//       // Request permission for iOS, for Android request is done at runtime
//       requestPermissions: Platform.OS === 'ios',
//     });

//     // Ensure notification permissions for Android 13+
//     if (Platform.OS === 'android' && Platform.Version >= 33) {
//       PushNotification.requestPermissions().then(response => {
//         console.log('Notification permission status:', response);
//       }).catch(err => {
//         console.log('Permission request failed:', err);
//       });
//     }

//     // Listen for 'message' event from the server
//     socket.on('message', (msg) => {
//       setMessage(msg); // Update state with the message
//       // Trigger a notification when a message is received
//       PushNotification.localNotification({
//         title: "New Message",
//         message: msg,
//         playSound: true,
//         soundName: 'default',
//       });
//     });

//     // Clean up the connection when the component unmounts
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.messageText}>
//         {message ? message : 'Waiting for message from server...'}
//       </Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   messageText: {
//     fontSize: 18,
//     textAlign: 'center',
//   },
// });

// export default App;



import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import io from 'socket.io-client';
import PushNotification from 'react-native-push-notification';

const App = () => {
  const [message, setMessage] = useState('');

  // Connect to the backend Socket.IO server
  const socket = io('http://192.168.18.227:3000', {
    transports: ['websocket'],
  });

  useEffect(() => {
    // Configure Push Notifications
    PushNotification.configure({
      onNotification: function (notification) {
        console.log('Notification received:', notification);
      },
      // Request permission for iOS
      requestPermissions: Platform.OS === 'ios',
    });

    // Ensure notification permissions for Android 13+
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      PushNotification.requestPermissions().then(response => {
        console.log('Notification permission status:', response);
      }).catch(err => {
        console.log('Permission request failed:', err);
      });
    }

    // Create a notification channel
    PushNotification.createChannel({
      channelId: "default-channel-id",
      channelName: "Default Channel",
      channelDescription: "A default channel for notifications",
      importance: PushNotification.Importance.HIGH,
      soundName: 'default',
    }, (created) => console.log(`Notification channel created: ${created}`));

    // Listen for 'message' event from the server
    socket.on('message', (msg) => {
      setMessage(msg); // Update state with the message
      // Trigger a notification when a message is received
      PushNotification.localNotification({
        title: "New Message",
        message: msg,
        playSound: true,
        soundName: 'default',
        channelId: "default-channel-id", // Specify the channel
      });
    });

    // Clean up the connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.messageText}>
        {message ? message : 'Waiting for message from server...'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  messageText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default App;
