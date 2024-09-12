import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  isCartOpen: false,
  isAuthenticated: false, 
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (!state.isAuthenticated) {
        return;
      }
      const item = action.payload;
      const itemExists = state.items.find(item => item.id === action.payload.id);
      
  if (itemExists) {
    itemExists.quantity += item.quantity;
  }else{
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
    openCart: (state) => {
      state.isCartOpen = true;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.items = []; 
    },
    clearCart: (state) => {
      state.items = [];
    },
    setAuthentication: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    
  },
});

export const { addToCart, removeFromCart, openCart, closeCart, clearCart , login, logout ,setAuthentication } = cartSlice.actions;
export default cartSlice.reducer;
