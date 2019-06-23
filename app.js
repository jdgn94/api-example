const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// routes
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

//database config
mongoose.connect('mongodb://127.0.0.1:27017/products_ejm', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false
})
.then(db => console.log('DB connected'))
.catch(err => console.log(err));

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // el * de permiso a que cualquier origen tenga acceso, se puede usar una url
  req.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Autorization'
  ); // tipos de headers acptados en el 2do parametro, se puede usar un * para usar todos los existentes
  if (res.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    return res.status(200).json({});
  }
  next();
})

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;