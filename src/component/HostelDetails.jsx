import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import axios from 'axios'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const HostelDetails = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStudents = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setLoading(true);
        const response = await axios.get('http://192.168.18.235:3000/api/auth/getStudentsByHostel', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudents(response.data.students);
      } else {
        console.error('No token found');
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchText.toLowerCase()) ||
      student.email.toLowerCase().includes(searchText.toLowerCase()) ||
      student.roomDetails.toLowerCase().includes(searchText.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchText.toLowerCase());

    if (selectedTab === 'zero') {
      return matchesSearch && student.bill === 0;
    } else if (selectedTab === 'due') {
      return matchesSearch && student.bill > 0;
    }
    return matchesSearch;
  });

  const renderStudent = ({ item }) => (
    <View style={styles.studentCard}>
      <Text style={styles.studentText}>Name: {item.name}</Text>
      <Text style={styles.studentText}>Bill due: ₹ {item.bill}</Text>
      <Text style={styles.studentText}>Email: {item.email}</Text>
      <Text style={styles.studentText}>Room: {item.roomDetails}</Text>
      <Text style={styles.studentText}>Roll No: {item.rollNumber}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Students..."
          placeholderTextColor="#aaa"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.searchButton} onPress={()=>{fetchStudents()}}>
          <Icon name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        {['all', 'zero', 'due'].map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.button, selectedTab === tab && styles.selectedButton]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[styles.buttonText, selectedTab === tab && styles.selectedButtonText]}
            >
              {tab === 'all' ? 'All Students' : tab === 'zero' ? 'Zero Bill Due' : 'Some Bill Due'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#1e88e5" />
      ) : (
        <FlatList
          data={filteredStudents}
          renderItem={renderStudent}
          keyExtractor={(item, index) => index.toString()}
          style={styles.listContainer}
        />
      )}
    </View>
  );
};

export default HostelDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    padding: 5,
  },
  searchButton: {
    padding: 10,
    backgroundColor: '#444',
    borderRadius: 8,
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
  },
  selectedButton: {
    backgroundColor: '#1e88e5',
  },
  buttonText: {
    color: '#ccc',
    fontSize: 13,
  },
  selectedButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
  },
  studentCard: {
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  studentText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
  },
});
