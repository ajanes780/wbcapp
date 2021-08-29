import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Loader from './loader';
import Message from './Message';
import { listTopProducts } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productsTopRated = useSelector((state) => state.productsTopRated);
  const { loading, error, products } = productsTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      {products.map((item) => (
        <Carousel.Item className='py-5' key={item._id}>
          <Link to={`/product/${item._id}`}>
            <Image className='d-block m-auto my-3' src={item.image} alt={item.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {item.name} (${item.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
