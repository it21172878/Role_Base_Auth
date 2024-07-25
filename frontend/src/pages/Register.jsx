import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { post } from '../services/ApiEndpoint';

const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = await post('/api/auth/register', {
        name,
        email,
        password,
      });
      const response = request.data;
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="user-box">
          <label htmlFor="Username">Username</label>
          <input
            type="text"
            name=""
            id="Username"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="user-box">
          <label htmlFor="email">Email</label>
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
          Register
        </button>
        <p className="register-link">
          Already have an account?
          <Link className="link" to={'/login'}>
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
