// SearchModal.js
import React, { useState, useEffect } from 'react';
import { Box, MenuItem, Modal, InputBase, styled, alpha } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    borderBottom: `2px solid black`, // Add the bottom border here
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '100ch',
      },
    },
  },
}));


export default function SearchModal({ open, onClose }) {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm) {
      const fetchItems = async () => {
        try {
          const response = await axios.get('https://fakestoreapi.com/products');
          setSearchResults(
            response.data.filter((item) =>
              item.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
          );
        } catch (error) {
          console.error('Error fetching items:', error);
        }
      };
      fetchItems();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleViewDetails = (itemId) => {
    navigate(`/item/${itemId}`);
    onClose(); 
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -10%)',
          bgcolor: 'background.paper',
          color: 'black',
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
          overflowY: 'auto',
          width: '900px',
          maxHeight: '80vh',
          zIndex: 1,
          borderRadius:'5px',
          p: 5,
        }}
      >
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            onChange={handleSearchChange}
          />
        </Search>
        <Box mt={2}>
          {searchResults.length > 0 ? (
            searchResults.map((item) => (
              <MenuItem
              className='px-8'
                key={item.id}
                onClick={() => handleViewDetails(item.id)}
                sx={{ display: 'flex', alignItems: 'center' } }
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: 40, height: 40, marginRight: 8 }}
                />
                {item.title}
              </MenuItem>
            ))
          ) : (
            <MenuItem>No items found</MenuItem>
          )}
        </Box>
      </Box>
    </Modal>
  );
}
