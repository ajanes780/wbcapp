import Order from '../models/orderModel.js';
import asyncHandler from 'express-async-handler';
import nodeMailer from '../nodeMailer/config.js';

//  @desc Create new order
//  @route POST /api/orders
//  @access  private

const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, tax, shipping, total } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error(' No order items');
  } else {
    const order = new Order({ user: req.user._id, orderItems, shippingAddress, paymentMethod, itemsPrice, tax, shipping, total });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

//  @desc get order by id
//  @route Get /api/orders/:id
//  @access  private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order Not found');
  }
});

//  @desc update order to paid
//  @route Get /api/orders/:id/pay
//  @access  private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  console.log(`order`, order);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      updateTime: req.body.update_time,
      email: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    nodeMailer(order);
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order Not found');
  }
});

//  @desc update order tracking number
//  @route Get /api/orders/:id/tracking
//  @access  private/admin
const updateOrderTracking = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.tracking = true;
    order.trackingNum = req.body.tracking;

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order Not updated');
  }
});

//  @desc get logged in user orders
//  @route Get /api/orders/myorders
//  @access  private
const getMyOrders = asyncHandler(async (req, res) => {
  const order = await Order.find({ user: req.user._id });

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('No orders found');
  }
});

//  @desc Get all orders
//  @route Get /api/orders/
//  @access  private/amin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name email');

  if (orders.length) {
    res.json(orders);
  } else {
    res.status(404);
    throw new Error('No orders found');
  }
});

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrderTracking };
