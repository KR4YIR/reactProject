import React, { useState } from 'react';
import API from '../axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './changePassword.css'; 

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

        try {
            const response = await API.post('/Users/change-password', {
                currentPassword,
                newPassword,
            });

            if (response.status === 200) {
                toast.success('Password changed successfully!');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                toast.error('Unexpected response from the server. Please try again.');
                console.warn('Unexpected status code:', response.status);
            }
        } catch (error) {
            console.error('Error during password change:', error);
            const errorMessage = error.response?.data?.message || 'Error changing password.';
            toast.error(errorMessage);
        }
    };

    return (
        <div className="reset-password-background">
            <div className="reset-password-container">
                <h2>Change Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="currentPassword">Old Password</label>
                        <input
                            type="password"
                            id="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPassword">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm New Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn">
                        Change Password
                    </button>
                    <div className="links">
                        <a href="/Profile">Back to Profile</a>
                        <a href="/ForgotPassword">Forgot Password?</a>
                    </div>
                </form>
                <ToastContainer
                    autoClose={1000}
                    position="top-right"
                    theme="colored"
                    onClose={() => navigate('/')}
                />
            </div>
        </div>
    );
};

export default ChangePassword;
