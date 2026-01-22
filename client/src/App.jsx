import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import './App.css'
import Register from './pages/Registe';
import  Home  from './pages/Home';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { useEffect, useState } from 'react';
import { apiRequest } from './api';

export default function App() {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
  const [isAuthed, setIsAuthed] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
  const refresh = async () => {
    try {
      const data = await apiRequest('/auth/refresh', { method: 'POST', body: {} });
      localStorage.setItem('accessToken', data.accessToken);
      setAccessToken(data.accessToken);
    } catch {
      localStorage.removeItem('accessToken');
      setAccessToken('');
    }
  };

  refresh();
}, []);

  const logout = async () => {
    try {
      await apiRequest('/auth/logout', { method: 'POST', body: {}, token: accessToken });
    // eslint-disable-next-line no-empty
    } catch {}
    localStorage.removeItem('accessToken');
    setAccessToken('');
    navigate('/login', { replace: true });
  };

  return (
    <div className='main'>
      <header className='header'>
        <Link to="/" className='header__link'>
          Auth App
        </Link>
        <nav className='header__navigate'>
          {!isAuthed && <Link to="/login">Login</Link>}
          {!isAuthed && <Link to="/register">Register</Link>}
          {isAuthed && <button onClick={logout}>Logout</button>}
        </nav>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthed={isAuthed}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
  path="/login"
  element={
    <Login
      onLoggedIn={(token) => {
        localStorage.setItem('accessToken', token);
        setAccessToken(token);
        setIsAuthed(true);
      }}
    />
  }
/>
        <Route
          path="/register"
          element={isAuthed ? <Navigate to="/" replace /> : <Register />}
        />
        <Route path="*" element={<div>404</div>} />
      </Routes>

    </div>
  )
}


