import React, { useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Components/Message';
import Loader from '../Components/loader';
import { LinkContainer } from 'react-router-bootstrap';
import { listOrders } from '../actions/orderActions';

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push(`/login`);
    }
  }, [dispatch, history, userInfo]);

  const editOrderHandler = (id) => {
    if (window.confirm('Are you sure ?')) {
      // dispatch(deleteUser(id));
    }
  };

  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Date</th>
              <th>Name</th>
              <th>Total Price</th>
              <th>Paid On</th>

              <th>Email</th>
              <th>Tracking</th>
              <th> Edit</th>
              <th> Delete</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id} </td>
                <td>{order.createdAt.substring(0, 10)} </td>
                <td>{order.user.name} </td>
                <td>${order.total} </td>
                <td>
                  <td> {order.isPaid ? order.createdAt : <i className='fas fa-times' style={{ color: 'red' }} />} </td>
                </td>
                <td>
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </td>
                <td> {order.tracking ? order.trackingNum : <i className='fas fa-times' style={{ color: 'red' }} />} </td>
                <td>
                  <LinkContainer to={`/orders/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit' />
                    </Button>
                  </LinkContainer>
                </td>
                <td>
                  <Button variant='danger' className='btn-sm' onClick={() => editOrderHandler(order._id)}>
                    <i className='fas fa-trash' />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
