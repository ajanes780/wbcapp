import express from 'express';
import { addOrderItems, getMyOrders, getOrderById, updateOrderToPaid, getOrders, updateOrderTracking } from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
//  make sure this route is always at bottom or the :id variable will get used on everything
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/tracking').put(protect, admin, updateOrderTracking);
router.route('/:id').get(protect, getOrderById);

export default router;
