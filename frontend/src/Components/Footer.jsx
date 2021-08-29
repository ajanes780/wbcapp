import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            Copywright &copy; The Wild Boys Campouts
            <br />
            <a href='https://www.ignitewebdesign.ca' rel='noreferrer' target='_blank'>
              Forged by Ignite Web Development & Design
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
