const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/products');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to Database');
});

const ProductSchema = new mongoose.Schema({
  id: Number
  name: {
    type: String,
    trim: true
  },
  slogan: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    trim: true
  },
  default_price: {
    type: Number,
    min: 0,
  },
  features: [
    {
      feature: {
        type: String,
        trim: true
      },
      value: {
        type: String,
        trim: true
      }
    }
  ],
  styles:[Number],
  related_product: [Number]
});

const StyleSchema = new mongoose.Schema({
  product_id: Number,
  results: [
    style_id: Number,
    name: {
      type: String,
      trim: true
    },
    original_price: {
      type: Number,
      min: 0,
    },
    sale_price: {
      type: Number,
      min: 0,
    },
    default: BOOLEAN,
    photos: [
      {
        thumbnail_url: String,
        url: String,
      }
    ],
    sku_id:[Number],
  ]
});

const SkuSchema = new mongoose.Schema({
  sku_id: {
    type: Number,
  }
  quantity: {
    type: Number,
    min: 0,
  },
  size: {
    type: String,
    trim: true
  },
});

const Products = mongoose.model('products', ProductSchema);
const Styles = mongoose.model('products', StyleSchema);
const Skus = mongoose.model('products', SkuSchema);

module.exports = Products;
module.exports = ProductStyles;
module.exports = RelatedProducts;
