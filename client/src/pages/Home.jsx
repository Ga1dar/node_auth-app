'use strict'

import { useEffect, useState } from "react";
import { apiRequest } from "../api";

export default function Home() {
  const [me, setMe] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const data = await apiRequest('/profile', { token });
        setMe(data);
      } catch (e) {
        setError(e.message);
      }
    })();
  }, []);

  if (error) return <div style={{ color: 'crimson' }}>{error}</div>;
  if (!me) return <div>Loading...</div>;

  return (
    <div>
      <h1>Profile</h1>
      <p><b>Name:</b> {me.userName}</p>
      <p><b>Email:</b> {me.email}</p>
    </div>
  );
}
