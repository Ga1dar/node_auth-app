'use strict'

import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('accessToken');
  const isAuthed = Boolean(token);

  if (!isAuthed) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
