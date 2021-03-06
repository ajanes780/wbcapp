import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../Components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Loader from '../Components/loader';
import Message from '../Components/Message';
import Paginate from '../Components/Paginate';
import ProductCarousel from '../Components/ProductCarousel';

import Meta from '../Components/Meta';
import { Link } from 'react-router-dom';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />

{keyword && <Link to="/store" className="btn btn-light" > Go Back</Link>}
      <h1> Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product key={product._id} product={product} />
              </Col>
            ))}
          </Row>
          <Row className='my-5'>
            <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;


// {!keyword ? (
//   <ProductCarousel />
// ) : (
//   <Link to='/store' className='btn btn-light'>
//     Go back
//   </Link>
// )}