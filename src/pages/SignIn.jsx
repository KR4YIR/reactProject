import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './session.css'
const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5017/api/Users/SignIn', {
                email,
                password
            });
            const token = response.data.accessToken;
            dispatch(loginSuccess({ token }));
            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
            alert('Giriş başarısız');
        }
    };
    const handleSignUp = () =>{
        navigate('/SignUp')
    }

    return (
        <div className='background'>
            <div className='form-container'>
                <div className='form'>
                    <h1>Login</h1>
                    <label>Email</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                    <label>Password</label>
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
                    <button onClick={handleLogin}>Giriş Yap</button>
                    <p>Do no have an account?
                     <a onClick={handleSignUp}>SignUp</a>
                    </p>
                </div>
            </div>
            
            
        </div>
    );
};

export default SignIn;
