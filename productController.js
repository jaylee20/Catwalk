const { Client } = require('pg');
const { POSTGRES_USER, POSTGRES_PASSWORD } = require('./server/config.js');
const {
  topFiveProducts,
  productStyle,
  productDetail,
  relatedProducts,
  deleteProduct,
	deleteStyle,
	deleteFeature,
	deletePhoto,
	deleteSku,
	deleteRelatedProductID
} = require('./SQLQuery.js');

const client = new Client({
  user: POSTGRES_USER,
  host: '127.0.0.1',
  database: 'products',
  password: POSTGRES_PASSWORD,
  port: 5432,
});

client.connect();

const deleteQueries = [deleteProduct, deleteStyle, deleteFeature, deletePhoto, deleteSku, deleteRelatedProductID];

module.exports = {
  getProducts: (callback) => {
    client.query(topFiveProducts, (err, data) => {
      if (err) {
        callback(err)
      } else {
        callback(null, data.rows)
      }
    })
  },
  getProductInfo: (productID, callback) => {
    client.query(productDetail, [productID], (err, data) => {
      if (err) {
        callback(err)
      } else {
        callback(null, data.rows[0])
      }
    })
  },
  getProductStyles: (productID, callback) => {
    client.query(productStyle, [productID], (err, data) => {
      if (err) {
        callback(err)
      } else {
        callback(null, data.rows[0])
      }
    })
  },
  getRelatedProducts: (productID, callback) => {
    client.query(relatedProducts, [productID], (err, data) => {
      if (err) {
        callback(err)
      } else {
        callback(null, data.rows[0].related)
      }
    })
  },
  deleteFromProducts: (id, requestIndex, callback) => {
    const query = deleteQueries[requestIndex];
    client.query(query, [id], (err, data) => {
      if (err) {
        callback(err)
      } else {
        callback(null, 'Successful Delete')
      }
    })
  },

}
