import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart} from '../Store/CartSlice';
import { useNavigate } from 'react-router-dom';
import AuthModal from '../../Form/Form';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

const Card = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { items, isAuthenticated } = useSelector((state) => state.cart);
  const [showAuthModal, setShowAuthModal] = useState(false);


 

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    dispatch(addToCart(item));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(item));
  };

  const isInCart = items.some((cartItem) => cartItem.id === item.id);
  const handleViewDetails = () => {
    if (!item || !item.id) {
      console.error('Item not found or invalid.');
      return;
    }
    navigate(`/item/${item.id}`);
  };
  

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden m-5 ">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-48 object-fit"
      />
      <div className="p-4">
      <div className="h-[250px]">
        <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
        <p className="text-lg font-bold mb-2">${item.price.toFixed(2)}</p>
        <p className="text-gray-500 mb-2">Category: {item.category}</p>
        <div className="flex items-center">
          <span className="text-yellow-500">⭐ {item.rating.rate}</span>
          <span className="text-gray-500 ml-2">({item.rating.count} reviews)</span>
        </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
            className={`px-4 py-2 rounded ${isInCart ? 'bg-red-500' : 'bg-blue-500'} text-white`}
          >
            {isInCart ? <RemoveShoppingCartIcon/> : <AddShoppingCartIcon/>}
          </button>
          <button
            onClick={handleViewDetails}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            <VisibilityIcon/>
          </button>
        </div>
      </div>
      {showAuthModal && <AuthModal closeModal={() => setShowAuthModal(false)} />}
    </div>
  );
};

export default Card;
