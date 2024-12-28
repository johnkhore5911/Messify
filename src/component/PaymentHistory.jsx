import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { usePaymentHistory } from '../context/PaymentHistoryContext';

const PaymentHistory = () => {
  const { paymentHistory } = usePaymentHistory(); 

  useEffect(() => {
    console.log(paymentHistory); 
  }, [paymentHistory]);
  
  const reversedHistory = [...paymentHistory].reverse();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Payment History</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {reversedHistory.length > 0 ? (
          reversedHistory.map((payment, index) => (
            <View
              key={index}
              style={[
                styles.paymentCard,
                payment.status === 'Paid' ? styles.paidCard : styles.unpaidCard,
              ]}
            >
              <Text style={styles.paymentText}>Payment Status: {payment.status}</Text>
              <Text style={styles.paymentText}>Amount: ₹{payment.amountPaid}</Text>
              <Text style={styles.paymentText}>Date: {new Date(payment.paymentDate).toLocaleString()}</Text>
              
            </View>
          ))
        ) : (
          <Text style={styles.noHistoryText}>No payment history available.</Text>
        )}
      </ScrollView>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginVertical: 20,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  paymentCard: {
    backgroundColor: '#1f1f1f',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  paidCard: {
    backgroundColor: '#00796B', 
  },
  unpaidCard: {
    backgroundColor: '#B71C1C', 
  },
  paymentText: {
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 5,
  },
  noHistoryText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default PaymentHistory;
