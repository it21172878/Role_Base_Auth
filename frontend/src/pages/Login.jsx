import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { post } from '../services/ApiEndpoint';
import { toast } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    try {
      const request = await post('/api/auth/login', { email, password });
      const response = request.data;
      if (request.status == 200) {
        toast.success(response.message);
      }
      //    else {
      //     toast.error(response.message);
      //   }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="user-box">
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            name=""
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="user-box">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name=""
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn">
          Login
        </button>
        <p className="register-link">
          Not registered?
          <Link className="link" to={'/register'}>
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
