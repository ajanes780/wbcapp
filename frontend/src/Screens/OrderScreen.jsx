import React, { useEffect, useState } from 'react';
import { Row, Col, ListGroup, Image, Card, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../Components/Message';
import Loader from '../Components/CheckoutSteps';
import { getOrderDetails, payOrder, addTrackingToOrder } from '../actions/orderActions';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { ORDER_PAY_RESET, ORDER_TRACKING_RESET } from '../constants/orderConstants';

const OrderScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const orderId = match.params.id;
  const [sdkReady, setSdkReady] = useState(false);

  const [tracking, setTracking] = useState('');
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay, loading: loadingPay } = orderPay;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const orderTracking = useSelector((state) => state.orderTracking);
  const { success: successTracking } = orderTracking;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
    const addPayPalScript = async () => {
      const { data } = await axios.get('/api/config/paypal');

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || order._id !== orderId || successPay || successTracking) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_TRACKING_RESET });

      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [order, orderId, dispatch, successPay, successTracking, history, userInfo]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
    // stuff
  };

  const addTrackingHandler = (orderId, tracking, e) => {
    e.preventDefault();
    dispatch(addTrackingToOrder(orderId, tracking));
    setTracking('');
  };
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'> {error}</Message>
  ) : (
    <>
      <h4>Order Number: {order._id}</h4>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2> Shipping</h2>
              <h5>Name:</h5>
              <p>{order.user.name}</p>
              <h5>Email:</h5>
              <p>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <h5>Address:&nbsp; </h5>
                <p>
                  {order.shippingAddress.address},<br />
                  {order.shippingAddress.city}, <br />
                  {order.shippingAddress.postalCode},<br /> {order.shippingAddress.country}
                </p>
              </p>
              {order.tracking ? <Message variant='success'> Canada Post Tracking #{order.trackingNum}</Message> : <Message variant='danger'>Not shipped yet</Message>}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:&nbsp;</strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? <Message variant='success'>Paid on {order.paidAt.substring(0, 10)}</Message> : <Message variant='danger'>Not paid</Message>}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message> Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, i) => (
                    <ListGroup.Item key={i}>
                      <Row>
                        <Col md={2}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col md={3}>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={3}>
                          {item.qty} x ${item.price}
                        </Col>
                        <Col md={3}> Sub Total: ${item.price * item.qty}</Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col> ${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col> ${order.shipping}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col> ${order.tax}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col> ${order.total}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? <Loader /> : <PayPalButton amount={order.total} onSuccess={successPaymentHandler} />}
                </ListGroup.Item>
              )}

              {userInfo && userInfo.isAdmin && order.isPaid && (
                <>
                  <Form.Group className='p-3' controlId='tracking'>
                    <Form.Control className='p-3' required type='text' placeholder='Add tracking number' value={tracking} onChange={(e) => setTracking(e.target.value)}></Form.Control>
                    <Button onClick={(e) => addTrackingHandler(orderId, tracking, e)} className='btn col-12 my-3 rounded ' type='button' variant='primary'>
                      Add Tracking
                    </Button>
                  </Form.Group>
                </>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
