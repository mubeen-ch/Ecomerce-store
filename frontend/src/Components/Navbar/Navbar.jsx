import React, { useState, useRef, useEffect } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Avatar } from '@mui/material';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SearchIcon from '@mui/icons-material/Search';
import Sidebar from './Sidebar';
import EditUserModal from '../../Form/EditUserModal'; // Import the EditUserModal
import { useDispatch, useSelector } from 'react-redux';
import { openCart } from '../Store/CartSlice';
import Cart from '../BuyItems/Cart';
import user from "../../Assests/avatarimage.jpg";
import SearchModal from './SearchBar'; 
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false); // For the Search Modal
  const [isEditModalOpen, setEditModalOpen] = useState(false); // For the Edit User Modal
  const sidebarRef = useRef(null);
  const cartItemsCount = useSelector((state) => state.cart.items.length);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);
  const { isAuthenticated } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setSidebarVisible(false);
    }
  };

  const handleCartClick = () => {
    dispatch(openCart());
  };

  const handleSearchClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleEditClick = () => {
    setEditModalOpen(true); // Open the Edit User Modal when Manage Account is clicked
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false); // Close the Edit User Modal
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#1f2937' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleSidebar}
          >
            {isAuthenticated ? (
              <Avatar className='bg-orange-500' src={user} />
            ) : (
              <ManageAccountsIcon />
            )}
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            to="/"
          >
            D&G
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="search"
            onClick={handleSearchClick}
          >
            <SearchIcon />
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open cart"
            sx={{ mx: 2, position: 'relative' }}
            onClick={handleCartClick}
          >
            <LocalMallIcon />
            {cartItemsCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
                {cartItemsCount}
              </span>
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Sidebar 
        ref={sidebarRef} 
        isVisible={isSidebarVisible} 
        toggleSidebar={toggleSidebar} 
        handleManageAccountClick={handleEditClick} // Pass the function to Sidebar
      />
      {isCartOpen && <Cart />}
      {isEditModalOpen && <EditUserModal closeModal={handleCloseEditModal} />} {/* Render the Edit Modal when open */}
      <SearchModal open={isModalOpen} onClose={handleCloseModal} />
    </Box>
  );
}
