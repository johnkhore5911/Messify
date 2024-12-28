
import React, { createContext, useState, useContext, useEffect } from 'react';

const PaymentHistoryContext = createContext();

export const usePaymentHistory = () => useContext(PaymentHistoryContext);

export const PaymentHistoryProvider = ({ children }) => {
  const [paymentHistory, setPaymentHistory] = useState([]);

  return (
    <PaymentHistoryContext.Provider value={{ paymentHistory, setPaymentHistory }}>
      {children}
    </PaymentHistoryContext.Provider>
  );
};
