import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStock } from './StockContext';

const EditStockPage = () => {
  const { id } = useParams();
  const [updatedItem, setUpdatedItem] = useState({ id: '', itemName: '', quantity: 0, pricePerUnit: '' });
  const navigate = useNavigate();
  const { stockData, updateItem } = useStock();

  useEffect(() => {
    const itemToEdit = stockData.find(item => item.id === id); // Since your IDs are strings, no need to parseInt
    if (itemToEdit) {
      setUpdatedItem(itemToEdit);
    }
  }, [id, stockData]);

  const handleUpdateItem = async (e) => {
    e.preventDefault();
    if (updatedItem.itemName && updatedItem.quantity && updatedItem.pricePerUnit) {
      try {
        await updateItem(updatedItem); // Call the updateItem function
        navigate('/');
      } catch (error) {
        alert('Failed to update item. Please try again.');
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="container">
      <h2>Edit Stock Item</h2>
      <form onSubmit={handleUpdateItem}>
        <input
          type="text"
          placeholder="Item Name"
          value={updatedItem.itemName}
          onChange={(e) => setUpdatedItem({ ...updatedItem, itemName: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={updatedItem.quantity}
          onChange={(e) => setUpdatedItem({ ...updatedItem, quantity: parseInt(e.target.value) })}
          required
        />
        <input
          type="text"
          placeholder="Price Per Unit"
          value={updatedItem.pricePerUnit}
          onChange={(e) => setUpdatedItem({ ...updatedItem, pricePerUnit: e.target.value })}
          required
        />
        <button type="submit">Update Item</button>
      </form>
    </div>
  );
};

export default EditStockPage;
