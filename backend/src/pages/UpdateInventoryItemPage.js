import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItem, updateItem } from '../api';

const UpdateInventoryItemPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        const loadItem = async () => {
            setFetching(true);
            setError('');
            try {
                const response = await getItem(id);
                setName(response.data.name);
                setQuantity(response.data.quantity);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load item');
            } finally {
                setFetching(false);
            }
        };
        loadItem();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await updateItem(id, { name, quantity: parseInt(quantity) });
            navigate('/inventory');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update item');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <p>Loading item...</p>;

    return (
        <div>
            <h2>Update Inventory Item</h2>
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
                <button type="submit" disabled={loading}>{loading ? 'Updating...' : 'Update Item'}</button>
            </form>
        </div>
    );
};

export default UpdateInventoryItemPage;