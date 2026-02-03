import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await login({ email, password });
            localStorage.setItem('token', response.data.data.token);
            navigate('/inventory');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f5f6fa' }}>
            <div style={{ background: '#fff', padding: '2rem 2.5rem', borderRadius: '10px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', minWidth: 350 }}>
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#273c75' }}>Sign In</h2>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: 4 }}>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #dcdde1' }} />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: 4 }}>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #dcdde1' }} />
                    </div>
                    <button type="submit" disabled={loading} style={{ width: '100%', padding: 10, background: '#273c75', color: '#fff', border: 'none', borderRadius: 4, fontWeight: 'bold', marginBottom: 10 }}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <div style={{ textAlign: 'center', marginTop: 10 }}>
                    <span>Don't have an account? </span>
                    <Link to="/register" style={{ color: '#0097e6', textDecoration: 'none', fontWeight: 'bold' }}>Register</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;