import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItem, updateItem } from '../api';

const UpdateInventoryItemPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        category: '',
        sku: '',
        quantity: '',
        minStockLevel: '',
        price: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        const loadItem = async () => {
            setFetching(true);
            setError('');
            try {
                const response = await getItem(id);
                const item = response.data.data.inventoryItem;
                setForm({
                    name: item.name,
                    category: item.category,
                    sku: item.sku,
                    quantity: item.quantity,
                    minStockLevel: item.minStockLevel,
                    price: item.price
                });
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load item');
            } finally {
                setFetching(false);
            }
        };
        loadItem();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await updateItem(id, {
                ...form,
                quantity: parseInt(form.quantity),
                minStockLevel: parseInt(form.minStockLevel),
                price: parseFloat(form.price)
            });
            navigate('/inventory');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update item');
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #dcdde1',
        marginBottom: '15px'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
        color: '#2f3640'
    };

    if (fetching) {
        return <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>Loading item details...</div>;
    }

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', background: '#f5f6fa', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ background: '#fff', padding: '2rem', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ color: '#273c75', margin: 0 }}>Update Item</h2>
                    <button onClick={() => navigate('/inventory')} style={{ background: 'transparent', border: '1px solid #7f8fa6', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', color: '#2f3640' }}>Cancel</button>
                </div>

                {error && <div style={{ background: '#ffeaa7', padding: '10px', borderRadius: '5px', marginBottom: '15px', color: '#d63031', textAlign: 'center' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div>
                            <label style={labelStyle}>Item Name</label>
                            <input type="text" name="name" value={form.name} onChange={handleChange} required style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>SKU</label>
                            <input type="text" name="sku" value={form.sku} onChange={handleChange} required style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Category</label>
                            <select name="category" value={form.category} onChange={handleChange} style={inputStyle}>
                                {['Electronics', 'Clothing', 'Food', 'Books', 'Furniture', 'Sports', 'Other'].map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle}>Price ($)</label>
                            <input type="number" step="0.01" name="price" value={form.price} onChange={handleChange} required style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Quantity</label>
                            <input type="number" name="quantity" value={form.quantity} onChange={handleChange} required style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Min Stock Level</label>
                            <input type="number" name="minStockLevel" value={form.minStockLevel} onChange={handleChange} required style={inputStyle} />
                        </div>
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', background: '#273c75', color: '#fff', border: 'none', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
                            {loading ? 'Update Item' : 'Update Item'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateInventoryItemPage;