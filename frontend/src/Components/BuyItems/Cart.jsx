import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeCart, clearCart } from '../Store/CartSlice'; 
import Card from '../Card/Card';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeCart());
  };

  const handlePlaceOrder = () => {
   alert("your order is placed.");
    dispatch(clearCart());
   
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      
      return total += price ;
    }, 0).toFixed(2);
  };
  

  if (!isCartOpen) return null;

  return (
    <div className="fixed top-0 right-0 w-full md:w-1/3 h-full bg-white shadow-lg p-4 z-50">
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>
      <h2 className="text-xl font-bold mb-4">Cart</h2>
      {cartItems.length > 0 ? (
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-bold mb-2">Total Bill: ${calculateTotal()}</h3>
          <button
            onClick={handlePlaceOrder}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Place Order
          </button>
        </div>
      ) : (
        <p className="text-center">Your cart is empty</p>
      )}
      <div className="overflow-y-auto h-full mt-4">
        {cartItems.length > 0 ? (
          cartItems.map((item) => <Card key={item.id} item={item}/>)
        ) : (
          <p className="text-center">Nothing have been Seleted.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
