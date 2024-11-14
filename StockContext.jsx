import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const StockContext = createContext();

export const useStock = () => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error('useStock must be used within a StockProvider');
  }
  return context;
};

export const StockProvider = ({ children }) => {
  const [stockData, setStockData] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchStockData();
    }
  }, [isAuthenticated]);

  const fetchStockData = async () => {
    try {
      const response = await axios.get('/api/stock');
      setStockData(response.data);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/login', { email, password });
      if (response.data.success) {
        setIsAuthenticated(true);
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setStockData([]);
  };

  const addItem = async (newItem) => {
    try {
      const response = await axios.post('/api/stock', newItem);
      setStockData([...stockData, response.data]);
    } catch (error) {
      console.error('Error adding item:', error);
      throw error;
    }
  };

  const updateItem = async (updatedItem) => {
    try {
      await axios.put(`/api/stock/${updatedItem.id}`, updatedItem);
      setStockData(stockData.map(item => 
        item.id === updatedItem.id ? updatedItem : item
      ));
    } catch (error) {
      console.error('Error updating item:', error);
      throw error;
    }
  };

  return (
    <StockContext.Provider value={{ 
      stockData, 
      isAuthenticated, 
      setIsAuthenticated, 
      login, 
      logout, 
      addItem, 
      updateItem 
    }}>
      {children}
    </StockContext.Provider>
  );
};