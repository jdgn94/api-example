const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/orders');
const Product = require('../models/products');

// get calls
router.get('/', (req, res, next) => {
  Order.find()
  .select('quantity _id')
  .populate('productId', 'name -_id')
  .exec()
  .then(docs => {
    if (docs) {
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
          return {
            _id: doc._id,
            product: doc.productId,
            quantity: doc.quantity,
            request: {
              type: 'GET',
              url: 'http://localhost:3000/orders/' + doc._id
            }
          }
        })
      });
    } else {
      res.status(404).json({ message: "No founds" });
    }
  })
  .catch(err => {
    res.status(500).json({ error: err });
  });
});

router.get('/:orderId', (req, res, next) => {
  const id = req.params.orderId;
  Order.findById(id)
  .populate('productId', '-_id')
  .exec()
  .then(doc => {
    if (doc) {
      res.status(200).json({
        _id: doc._id,
        product: doc.productId,
        quantity: doc.quantity,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
        request: {
          type: 'GET',
          url: 'http://localhost:3000/orders'
        }
      });
    } else {
      res.status(400).json({ message: "No found" });
    }
  })
  .catch(err => {
    res.status(500).json({ error: err });
  });
});

// post call
router.post('/', (req, res, next) => {
  Product.findById(req.body.productId)
  .then(product => {
    if (!product) return res.status(404).json({ message: "Product no found" });
    
    const order = new Order({
      _id: new mongoose.Types.ObjectId(),    
      productId: req.body.productId,
      quantity: req.body.quantity
    });
    return order.save();
  })
  .then(result => {
    res.status(201).json({
      _id: result._id,
      productId: result.productId,
      quantity: result.quantity,
      request: {
        type: 'GET',
        url: 'http://localhost:3000/orders/' + result._id
      }
    });
  })
  .catch(err => {
    res.status(500).json({ error: err });
  });
});

// delete call
router.delete('/:orderId', (req, res, next) => {
  const id = req.params.orderId;
  Order.remove({ _id: id })
  .exec()
  .then(order => {
    if (!order) return res.status(200).json({ message: "No order" });
    
    res.status(200).json({
      message: "order delete",
      request: {
        type: "POST",
        url: "http://localhost:3000/orders",
        body: { productId: "ID", quantity: "Number" }
      }
    });
  })
  .catch(err => {
    res.status(500).json({ error: err });
  })
});

module.exports = router;