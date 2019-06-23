const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, require: true },
  price: { type: Number, require: true },
  productImage: { type: String, require: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date , default: Date.now }
});

module.exports = mongoose.model('Products', productSchema);