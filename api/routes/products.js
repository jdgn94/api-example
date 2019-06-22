const express = require('express');
const router = express.Router();

// get calls
router.get('/', (req, res, next) => {
  res.status(200).json({
    message: "Handling GET requests to /products"
  });
});

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId
  if (id === 'special'){
    res.status(200).json({
      message: "You discover de special ID",
      id: id
    });
  } else {
    res.status(200).json({
      message: "You passed an ID"
    });
  }
});

// post calls
router.post('/', (req, res, next) => {
  res.status(201).json({
    message: "Handling POST requests to /products"
  });
});

// patch calls
router.patch('/:productId', (req, res, next) => {
  res.status(200).json({
    message: "Updated product!"
  });
});

// delete calls
router.delete('/:productId', (req, res, next) => {
  res.status(200).json({
    message: "Delete product!"
  });
});

module.exports = router;