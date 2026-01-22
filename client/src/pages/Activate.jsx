'use strict';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiRequest } from '../api';

export default function Activate() {
  const { token } = useParams();
  const [status, setStatus] = useState('loading'); // loading | ok | error
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        await apiRequest(`/auth/activate/${token}`, { method: 'GET' });
        setStatus('ok');
      } catch (e) {
        setError(e.message || 'Activation failed');
        setStatus('error');
      }
    })();
  }, [token]);

  if (status === 'loading') return <div>Activating...</div>;

  if (status === 'error') {
    return (
      <div>
        <h1>Activation error</h1>
        <p style={{ color: 'crimson' }}>{error}</p>
        <Link to="/login">Go to login</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Account activated</h1>
      <p>You can login now.</p>
      <Link to="/login">Go to login</Link>
    </div>
  );
}
