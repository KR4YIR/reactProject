import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "../axios";
import { ToastContainer,toast } from "react-toastify";
import "./resetPassword.css";
const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const token = searchParams.get("token");
        const userId = searchParams.get("userId");
        console.log("Token:", token);
        console.log("User ID:", userId);
        if (!token || !userId) {
            setError("Invalid or missing token/user ID.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await API.post(`/Users/reset-password?UserId=${userId}&token=${encodeURIComponent(token)}&newPassword=${newPassword}`);

            if (response.status === 200) {
                setSuccess(response.data.message);
                //toast onclose to navigate to signIn page
                toast.success(response.data.message, {
                    onClose: () => {
                        navigate("/signIn");
                    },
                });
            }
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred.");

            toast.error(err.response?.data?.message);
        }
    };

    return (
        <>
            <div className="reset-password-background">
                <div className="reset-password-container">
                    <h2>Reset Your Password</h2>
                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>New Password:</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Confirm Password:</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Reset Password</button>
                    </form>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
            
        </>
    );
};

export default ResetPassword;
