const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  sku: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
