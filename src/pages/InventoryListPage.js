import React, { useEffect, useState } from 'react';
import { fetchInventory } from '../api';

const InventoryListPage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadInventory = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await fetchInventory();
                setItems(response.data.data.inventoryItems);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch inventory');
            } finally {
                setLoading(false);
            }
        };
        loadInventory();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ color: '#273c75', margin: 0 }}>Inventory List</h2>
                <a href="/add-inventory" style={{ background: '#273c75', color: 'white', padding: '10px 15px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold' }}>+ Add New Item</a>
            </div>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item._id}>
                            <td>{item._id}</td>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td><a href={`/update/${item._id}`}>Edit</a> | <a href={`/delete/${item._id}`}>Delete</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {items.length === 0 && <p>No items in inventory</p>}
        </div>
    );
};

export default InventoryListPage;