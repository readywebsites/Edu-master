import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as apiLogin } from '../services/api';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    const savedUserData = localStorage.getItem('user_data');
    if (accessToken && savedUserData) {
      setUser(JSON.parse(savedUserData));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await apiLogin(username, password);
      const userData = response.data;
      localStorage.setItem('access_token', userData.access);
      localStorage.setItem('refresh_token', userData.refresh);
      // Remove tokens from user object before storing to avoid redundancy/security risk in state
      const { access, refresh, ...userProfile } = userData;
      localStorage.setItem('user_data', JSON.stringify(userProfile));
      localStorage.setItem('user_id', userProfile.id);
      setUser(userProfile);

      // Determine default path based on role
      let defaultPath = "/";
      if (userProfile.user_type === 'student') defaultPath = "/dashboard/student";
      else if (userProfile.user_type === 'teacher') defaultPath = "/dashboard/teacher";
      else if (userProfile.user_type === 'admin') defaultPath = "/dashboard/admin";

      // If there's a specific 'from' location (e.g. redirected from a protected route), use that.
      // Otherwise use the role-based default path.
      const from = location.state?.from?.pathname || defaultPath;
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('user_id');
    setUser(null);
    navigate('/login'); // Redirect to login page after logout
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
