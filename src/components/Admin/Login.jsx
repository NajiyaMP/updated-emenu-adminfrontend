






import axios from 'axios';
import { useState } from 'react';
import { Navigate } from 'react-router-dom'; // Assuming you're using React Router

const Login = () => {
    const  backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/admin/login`, {
        username: username,
        password: password,
      });
      if (response.status === 200) {
        setLoggedIn(true); // Set loggedIn to true upon successful login
      }
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  // If logged in, navigate to /home
  if (loggedIn) {
    return <Navigate to="/home" replace />;
  }

  return (

    <div className="login-container">
      <div className="login-card">
        <h3>Admin Login</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="login-input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="login-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-button">Login</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
    // <form onSubmit={handleSubmit}>
    //   <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
    //   <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
    //   <button type="submit">Login</button>
    //   {error && <p>{error}</p>}
    // </form>
  );
};

export default Login;
