const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middelware/check-auth');

const ProductsController = require('../controllers/products');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname)
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({
  storage: storage, 
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

// get calls
// all products
router.get('/', ProductsController.products_get_all);

// product details
router.get('/:productId', ProductsController.product_get);

// post calls
// create product
router.post('/', checkAuth, upload.single('productImage'), ProductsController.product_create);

// patch calls
// edit product
router.patch('/:productId', checkAuth, ProductsController.product_edit);

// delete calls
router.delete('/:productId', checkAuth, ProductsController.product_delete);

module.exports = router;