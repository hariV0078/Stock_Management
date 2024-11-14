import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStock } from './StockContext';

const AddStockPage = () => {
  const [newItem, setNewItem] = useState({ itemName: '', quantity: '', pricePerUnit: '' });
  const navigate = useNavigate();
  const { addItem } = useStock();

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (newItem.itemName && newItem.quantity && newItem.pricePerUnit) {
      try {
        await addItem(newItem);
        navigate('/');
      } catch (error) {
        alert('Failed to add item. Please try again.');
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="container">
      <h2>Add New Stock Item</h2>
      <form onSubmit={handleAddItem}>
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.itemName}
          onChange={(e) => setNewItem({ ...newItem, itemName: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Price Per Unit"
          value={newItem.pricePerUnit}
          onChange={(e) => setNewItem({ ...newItem, pricePerUnit: e.target.value })}
          required
        />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddStockPage;