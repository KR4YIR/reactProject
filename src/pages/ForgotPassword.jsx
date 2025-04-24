import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../axios";
import "./forgotPassword.css"; // External CSS

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Invalid email");
            return;
        }

        try {
            const response = await API.post(`/Users/forgot-password?email=${email}`);
            if (response.status !== 200) {
                toast.error(response.data.message || "Something went wrong");
            } else {
                toast.success(response.data.message || "Password reset email sent");
                setEmail("");
            }
        } catch (error) {
            console.error("Error sending forgot password email:", error);
            toast.error(error.response?.data?.message || "An error occurred while sending the email.");
        }
    };

    return (
        <div className="reset-password-background">
            <div className="reset-password-container">
                <h1>Forgot Password</h1>
                <form onSubmit={handleForgotPassword}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn">Reset Password</button>
                </form>
                <div className="links">
                    <a href="/signIn">Back to Login</a>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={2000} theme="colored" />
        </div>
    );
};

export default ForgotPassword;
