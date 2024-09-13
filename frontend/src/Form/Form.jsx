// AuthModal.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../Components/Store/CartSlice'; 
import CloseIcon from '@mui/icons-material/Close';

const AuthModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=(.*[A-Z]){3,})(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?`~]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
      if (!validatePassword(formData.password)) {
        alert("Password must be at least 8 characters long, contain at least 3 uppercase letters, and have 1 special character.");
        return;
      }
      localStorage.setItem('user', JSON.stringify({ email: formData.email, password: formData.password }));
      localStorage.setItem('isAuthenticated', 'true'); // Set authentication status
      dispatch(login());
      closeModal();
    }  else {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.email === formData.email && user.password === formData.password) {
        localStorage.setItem('isAuthenticated', 'true'); // Set authentication status
        dispatch(login());
        closeModal();
      } else {
        alert("Invalid credentials.");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md">
        <div className='flex justify-end'>
          <CloseIcon onClick={closeModal} />
        </div>
        <h2 className="text-2xl font-bold mb-4">{isSignup ? 'Sign Up' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          {isSignup && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>
        <button
          onClick={() => setIsSignup(!isSignup)}
          className="text-blue-500 mt-4 block mx-auto"
        >
          {isSignup ? 'Already have an account? Login' : 'Need an account? Sign Up'}
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
