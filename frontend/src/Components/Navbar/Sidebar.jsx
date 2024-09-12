import React, { forwardRef, useState } from 'react';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Store/CartSlice';
import AuthModal from '../../Form/Form';
// import EditUserModal from '../../Form/EditUserModal'; // Assuming you have a login modal for the user

const Sidebar = forwardRef(({ isVisible, toggleSidebar, handleManageAccountClick }, ref) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.cart); 
  // const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleLoginClick = () => {
    setShowAuthModal(true);
  };


  return (
    <>
      <div
        ref={ref}
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white transform transition-transform ${
          isVisible ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='flex items-center justify-between p-2'>
          <h1 className='text-2xl font-bold'>
            D&G
          </h1>
          <ManageAccountsIcon className="text-2xl" />
        </div>
        <nav className="mt-10 mx-3">
          <ul>
            {isAuthenticated ? (
              <>
                <li className="mb-6">
                  <button
                    className="text-lg font-semibold hover:text-gray-300 w-full text-left"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
                <li className="mb-6">
                  <button
                    className="text-lg font-semibold hover:text-gray-300 w-full text-left"
                    onClick={handleManageAccountClick}
                  >
                    Manage Account
                  </button>
                </li>
              </>
            ) : (
              <li className="mb-6">
                <button
                  className="text-lg font-semibold hover:text-gray-300 w-full text-left"
                  onClick={handleLoginClick} // Open login modal if not authenticated
                >
                  Login
                </button>
              </li>
            )}
            <li className="mb-6">
              <a href="/" className="text-lg font-semibold hover:text-gray-300">
                Profile
              </a>
            </li>
            <li className="mb-6">
              <a href="/" className="text-lg font-semibold hover:text-gray-300">
                Privacy
              </a>
            </li>
            <li className="mb-6">
              <a href="/" className="text-lg font-semibold hover:text-gray-300">
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </div>
     
      {showAuthModal && <AuthModal closeModal={() => setShowAuthModal(false)} />}
    
    </>
  );
});

export default Sidebar;
