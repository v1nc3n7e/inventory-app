import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createItem } from '../api';

const AddInventoryItemPage = () => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await createItem({ name, quantity: parseInt(quantity) });
            navigate('/inventory');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add item');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Add Inventory Item</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Item Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Quantity:</label>
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                </div>
                <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Item'}</button>
            </form>
        </div>
    );
};

export default AddInventoryItemPage;