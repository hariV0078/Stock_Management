import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { StockProvider, useStock } from './StockContext';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import AddStockPage from './AddStockPage';
import EditStockPage from './EditStockPage';

function App() {
  return (
    <StockProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/add-stock" element={<ProtectedRoute><AddStockPage /></ProtectedRoute>} />
          <Route path="/edit-stock/:id" element={<ProtectedRoute><EditStockPage /></ProtectedRoute>} />
        </Routes>
      </Router>
    </StockProvider>
  );
}

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useStock();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default App;