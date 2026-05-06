import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (storedToken && storedUser) {
        try {
          // Verify token by making a request to a protected endpoint
          const response = await axios.get('http://localhost:5000/api/auth/verify', {
            headers: { 'Authorization': `Bearer ${storedToken}` }
          });
          
          if (response.data.valid) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
          } else {
            // Token invalid, clear storage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('isProUser');
            setUser(null);
            setToken(null);
          }
        } catch (error) {
          console.error('Token verification failed:', error);
          // On error, clear storage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('isAdmin');
          localStorage.removeItem('userEmail');
          localStorage.removeItem('isProUser');
          setUser(null);
          setToken(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      const { token, user } = response.data;
      
      // Store in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isAdmin', user.isAdmin ? 'true' : 'false');
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('isProUser', user.pro ? 'true' : 'false');
      
      // Update state
      setUser(user);
      setToken(token);
      
      return { success: true, user };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: error.response?.data?.error || 'Login failed' };
    }
  };

  const register = async (fullName, email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        fullName,
        email,
        password
      });

      const { token, user } = response.data;
      
      // Store in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isAdmin', user.isAdmin ? 'true' : 'false');
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('isProUser', user.pro ? 'true' : 'false');
      
      // Update state
      setUser(user);
      setToken(token);
      
      return { success: true, user };
    } catch (error) {
      console.error('Registration failed:', error);
      return { success: false, error: error.response?.data?.error || 'Registration failed' };
    }
  };

  const logout = () => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isProUser');
    
    // Clear state
    setUser(null);
    setToken(null);
  };

  const updateUserProStatus = (isPro) => {
    setUser((prevUser) => {
      if (!prevUser) return prevUser;
      const updatedUser = { ...prevUser, pro: isPro };
      localStorage.setItem('isProUser', isPro ? 'true' : 'false');
      return updatedUser;
    });
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateUserProStatus,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
