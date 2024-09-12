import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setItems } from '../Store/ItemSlice';
import Card from '../Card/Card';
import { Container } from '@mui/material';

const Home = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);
  const [error, setError] = useState(''); // State to track the error

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        dispatch(setItems(data));
      } catch (error) {
        setError('Error fetching data. Please try again later.');
      }
    };

    fetchItems();
  }, [dispatch]);

  return (
    <Container>
      {error ? (
        <div className="text-red-500 text-center text-xl my-4">
          {error}
        </div>
      ) : (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default Home;
