const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: "This is all orders"
  });
});

router.post('/', (req, res, next) => {
  res.status(201).json({
    message: "The order created"
  });
});

router.get('/:orderId', (req, res, next) => {
  res.status(200).json({
    message: "The order details",
    id : req.params.orderId
  });
});

router.delete('/:orderId', (req, res, next) => {
  res.status(200).json({
    message: "The order deleted"
  });
});

module.exports = router