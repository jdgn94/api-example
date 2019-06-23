const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/products');

// get calls
router.get('/', (req, res, next) => {
  Product.find().exec()
  .then(docs => {
    if (docs.length > 0) {
      res.status(200).json({
        count: docs.length,
        products: docs.map(doc => {
          return {
            _id: doc._id,
            name: doc.name,
            price: doc.price,
            request: {
              type: 'GET',
              url: 'http://localhost:3000/products/' + doc._id
            }
          }
        })
      });
    } else {
      res.status(404),json({ message: "No exist products" });
    }
  })
  .catch(err => {
    res.status(500).json({ error: err });
  });
});

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id).exec()
  .then(doc => {
    console.log(doc);
    if (doc) {
      res.status(200).json({
        _id: doc.id,
        name: doc.name,
        price: doc.price,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
        request: {
          type: 'GET',
          url: 'http://localhost:3000/products'
        }
      });
    } else {
      res.status(404).json({ message: "No valid ID" });
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ error: err });
  });
});

// post calls
router.post('/', (req, res, next) => {
  const product = new Product({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  product.save()
  .then(result => {
    console.log(result);
    res.status(201).json({
      _id: result._id,
      name: result.name,
      price: result.price,
      request: {
        type: 'GET',
        url: 'http://localhost:3000/products/' + result._id
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
  });
});


// patch calls
router.patch('/:productId', (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.update({ _id: id }, { $set: updateOps }).exec()
  .then(result => {
    console.log(result);
    res.status(200).json({
      message: "Product update",
      request: {
        type: 'GET',
        url: 'http://localhost:3000/products/' + id
      }
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ error: err });
  });
});

// delete calls
router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id }).exec()
  .then(result => {
    console.log(result);
    res.status(200).json({
      message: 'Product deleted',
      request: {
        type: 'POST',
        url: 'http://localhost:3000/products',
        body: { name: 'String', price: 'Number' }
      }
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ error: err });
  });
});

module.exports = router;