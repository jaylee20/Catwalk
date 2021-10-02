const { Client } = require('pg');
const { POSTGRES_USER, POSTGRES_PASSWORD } = require('./server/config.js');
const { topFiveProducts, productStyle, productDetail, relatedProducts } = require('./SQLQuery.js');

const client = new Client({
  user: POSTGRES_USER,
  host: '127.0.0.1',
  database: 'products',
  password: POSTGRES_PASSWORD,
  port: 5432,
});

client.connect();

module.exports = {
  products: (callback) => {
    client.query(topFiveProducts, (err, data) => {
      if (err) {
        callback(err)
      } else {
        callback(null, data.rows)
      }
    })
  },
  productInfo: (productID, callback) => {
    client.query(productDetail, [productID], (err, data) => {
      if (err) {
        callback(err)
      } else {
        callback(null, data.rows[0])
      }
    })
  },
  productStyles: (productID, callback) => {
    client.query(productStyle, [productID], (err, data) => {
      if (err) {
        callback(err)
      } else {
        callback(null, data.rows[0])
      }
    })
  },
  relatedProduct: (productID, callback) => {
    client.query(relatedProducts, [productID], (err, data) => {
      if (err) {
        callback(err)
      } else {
        callback(null, data.rows[0].related)
      }
    })
  }
}
