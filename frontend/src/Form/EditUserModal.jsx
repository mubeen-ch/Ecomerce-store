import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthentication } from '../Components/Store/CartSlice'; 
import CloseIcon from '@mui/icons-material/Close';

const EditUserModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.cart); // Get authentication state from Redux
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user && isAuthenticated) {
      setFormData({ email: user.email, password: user.password });
    }
    
    setIsLoading(false); 
  }, [isAuthenticated]); // Add isAuthenticated to dependencies

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    localStorage.setItem('user', JSON.stringify({ email: formData.email, password: formData.password }));
    alert('User details updated successfully.');

    dispatch(setAuthentication(false)); // Assume you want to log out the user after updating details

    closeModal();
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-8 rounded shadow-md">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md">
        <div className='flex justify-end'>
          <CloseIcon onClick={closeModal} className="cursor-pointer" />
        </div>

        {isAuthenticated ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Edit User Details</h2>
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
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              >
                Save Changes
              </button>
            </form>
          </>
        ) : (
          <div className="text-center text-xl font-semibold text-red-500">
            Not logged in
          </div>
        )}
      </div>
    </div>
  );
};

export default EditUserModal;
