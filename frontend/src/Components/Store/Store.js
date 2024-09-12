import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './ItemSlice';
import cartReducer from './CartSlice';
import authReducer from "./AuthSlice"

const store = configureStore({
  reducer: {
    items: itemsReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});

export default store;
