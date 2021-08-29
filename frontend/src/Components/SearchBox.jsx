import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
const SearchBox = ({ history }) => {
  const [keyword, setKeyWord] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };
  return (
    <Form onSubmit={submitHandler}>
      <Row>
        <Col sm={12} md={8}>
          <Form.Control inline type='text' name='q' onChange={(e) => setKeyWord(e.target.value)} placeholder='Search products...' />
        </Col>
        <Col sm={12} md={4}>
          <Button style={{ width: '100%' }} type='submit' variant='outline-success' className='p-2'>
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchBox;
