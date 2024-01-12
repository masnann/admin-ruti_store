// src/utils/route/PrivateRoute.jsx
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
