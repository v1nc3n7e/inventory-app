import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItem, deleteItem } from '../api';

const DeleteInventoryItemPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        const loadItem = async () => {
            setFetching(true);
            setError('');
            try {
                const response = await getItem(id);
                setItem(response.data.data.inventoryItem);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load item');
            } finally {
                setFetching(false);
            }
        };
        loadItem();
    }, [id]);

    const handleDelete = async () => {
        setLoading(true);
        setError('');
        try {
            await deleteItem(id);
            navigate('/inventory');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete item');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <p>Loading item...</p>;
    if (error && !item) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>Delete Inventory Item</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {item && (
                <>
                    <p>Are you sure you want to delete <strong>{item.name}</strong> (Quantity: {item.quantity})?</p>
                    <button onClick={handleDelete} disabled={loading} style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', cursor: 'pointer' }}>
                        {loading ? 'Deleting...' : 'Confirm Delete'}
                    </button>
                    <button onClick={() => navigate('/inventory')} style={{ marginLeft: '10px', padding: '10px 20px', cursor: 'pointer' }}>
                        Cancel
                    </button>
                </>
            )}
        </div>
    );
};

export default DeleteInventoryItemPage;