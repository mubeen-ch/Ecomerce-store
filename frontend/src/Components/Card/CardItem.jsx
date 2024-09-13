import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../Store/CartSlice';
import AuthModal from '../../Form/Form';

const ItemDetails = () => {
  const { id } = useParams(); 
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch(); 
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

  const isInCart = item ? items.some((cartItem) => cartItem.id === item.id) : false;

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) throw new Error('Item not found');
        const data = await response.json();
        setItem(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!item) return <p>Item not found</p>;

  return (
    <div className="my-5 py-5 max-w-lg mx-auto bg-white rounded shadow-md">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-64 object-fit rounded"
      />
      <h2 className="text-2xl font-bold mt-4">{item.title}</h2>
      <p className="text-lg font-bold mt-2">${item.price.toFixed(2)}</p>
      <p className="mt-2">{item.description}</p>
      <p className="mt-2 text-gray-500">Category: {item.category}</p>
      <p className="mt-2 text-yellow-500">Rating: ⭐ {item.rating.rate} ({item.rating.count} reviews)</p>
      <div>
        <button
          onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
          className={`px-4 py-2 rounded ${isInCart ? 'bg-red-500' : 'bg-blue-500'} text-white`}
        >
          {isInCart ? <RemoveShoppingCartIcon /> : <AddShoppingCartIcon />}
        </button>
      </div>
      {showAuthModal && <AuthModal closeModal={() => setShowAuthModal(false)} />}
    </div>
  );
};

export default ItemDetails;
