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
                setItems(response.data);
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
            <h2>Inventory List</h2>
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
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td><a href={`/update/${item.id}`}>Edit</a> | <a href={`/delete/${item.id}`}>Delete</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {items.length === 0 && <p>No items in inventory</p>}
        </div>
    );
};

export default InventoryListPage;