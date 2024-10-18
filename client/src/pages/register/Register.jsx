import { Link } from 'react-router-dom'
import './register.scss'
import { useState } from 'react'
import axios from 'axios';

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, inputs);
    } catch (error) {
      setError(error.response.data);
    }
  }

  console.log(error);

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>SocialNetwork</h1>
          <p>
            Welcome to our social network, where you can connect, share, and engage with friends and communities. Join us and be part of a vibrant digital space!
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>

        <div className="right">
          <h1>Register</h1>
          <form>
            <input type="text" placeholder="Username" name="username" onChange={handleChange} />
            <input type="email" placeholder="Email" name="email" onChange={handleChange} />
            <input type="password" placeholder="Password" name="password" onChange={handleChange} />
            <input type="text" placeholder="Name" name="name" onChange={handleChange} />
            {error && error}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>inputs
    </div>
  )
}

export default Register