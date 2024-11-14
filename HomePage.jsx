import React from 'react';

const HomePage = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Stock Management System</h1>
      <p>Manage your stocks and inventory efficiently.</p>
      <button onClick={() => alert("Navigating to stock management...")}>
        Go to Stock Management
      </button>
    </div>
  );
};

export default HomePage;
