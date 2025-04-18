import React, { useState } from 'react';
import API from '../axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert('New password and confirm password do not match!');
            return;
        }
        // Send the request to the server
        try {
            const response = await API.post('/Users/change-password', {
                currentPassword, // Updated key to match raw body
                newPassword,
            });
    
            if (response.status === 200) {
                toast.success('Password changed successfully!');
                // Clear form inputs
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                toast.error('Unexpected response from the server. Please try again.');
                console.warn('Unexpected status code:', response.status);
            }
        } catch (error) {
            console.error('Error during password change:', error);
            const errorMessage = error.response.data.message;
            toast.error(errorMessage);
        }
    
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="currentPassword">Old Password</label>
                    <input
                        type="password"
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="newPassword">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="confirmPassword">Confirm New Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <button type="submit" style={{ padding: '10px 20px' }}>
                    Change Password
                </button>
                <a href="/Profile" style={{ marginLeft: '10px', textDecoration: 'none', color: 'black',fontSize: '10px'}}>Back to Profile</a>
                <a href="/ForgotPassword" style={{ marginLeft: '10px', textDecoration: 'none', color: 'black',fontSize: '10px'}}>Forgot Password?</a>
                
            </form>
            <ToastContainer autoClose={1000} position="top-right" theme="colored" onClose={()=>navigate('/')} />
        </div>
    );
};

export default ChangePassword;