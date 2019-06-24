const express = require('express');
const router = express.Router();

const checkAuth = require('../middelware/check-auth');
const OrdersController = require('../controllers/orders');

// get calls
// all orders
router.get('/', checkAuth, OrdersController.orders_get_all);

// order details
router.get('/:orderId', checkAuth, OrdersController.order_get);

// post call
// order create
router.post('/', checkAuth, OrdersController.orders_create);

// delete call
// order delete
router.delete('/:orderId', checkAuth, OrdersController.orders_delete);

module.exports = router;