// const Redis = require('redis');
const { Client, Pool } = require('pg');
const { POSTGRES_USER, POSTGRES_PASSWORD } = require('../config/config.js');
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
	deleteRelatedProductID,
  characteristic_review
} = require('./SQLQuery.js');

// const redisClient = Redis.createClient();
// const TTL = 3600;

const pool = new Pool({
  user: POSTGRES_USER,
  host: 'ec2-18-119-133-12.us-east-2.compute.amazonaws.com',
  database: 'products',
  password: POSTGRES_PASSWORD,
  port: 5432,
});


pool.connect();

const deleteQueries = [deleteProduct, deleteStyle, deleteFeature, deletePhoto, deleteSku, deleteRelatedProductID];

module.exports = {
  getProducts: (callback) => {
    pool.query(topFiveProducts, (err, data) => {
      if (err) {
        callback(err)
      } else {
        callback(null, data.rows)
      }
    })
  },
  getProductInfo: (productID, callback) => {
    // redisClient.get(`productID_${productID}`, (error, product) => {
    //   if (error) {
    //     callback(error);
    //   } else if (product !== null) {
    //     callback(null, JSON.parse(product));
    //   } else {
        pool.query(productDetail, [productID], (err, data) => {
          if (err) {
            callback(err)
          } else {
            redisClient.setex(`productID_${productID}`, TTL, JSON.stringify(data.rows[0]))
            callback(null, data.rows[0])
          }
      //   })
      // }
    })
  },
  getProductStyles: (productID, callback) => {
    // redisClient.get(`product_style_${productID}`, (error, product) => {
    //   if (error) {
    //     callback(error);
    //   } else if (product !== null) {
    //     callback(null, JSON.parse(product));
    //   } else {
        pool.query(productStyle, [productID], (err, data) => {
          if (err) {
            callback(err)
          } else {
            // If undefined
            // if (!data.rows[0]) {
            //   redisClient.setex(`product_style_${productID}`, TTL, JSON.stringify(null))
            //   callback(null, data.rows[0])
            // } else {
            //   redisClient.setex(`product_style_${productID}`, TTL, JSON.stringify(data.rows[0]))
              callback(null, data.rows[0])
            }
        //   }
        // })
      //}
    })
  },
  getRelatedProducts: (productID, callback) => {
    // redisClient.get(`related_product_${productID}`, (error, related) => {
    //   if (error) {
    //     callback(error);
    //   } else if (related !== null) {
    //     callback(null, JSON.parse(related));
    //   } else {
        pool.query(relatedProducts, [productID], (err, data) => {
          if (err) {
            callback(err)
          } else {
            // If undefined
            // if (!data.rows[0].related) {
            //   redisClient.setex(`related_product_${productID}`, TTL, JSON.stringify(null))
            //   callback(null, data.rows[0].related)
            // } else {
            //   redisClient.setex(`related_product_${productID}`, TTL, JSON.stringify(data.rows[0].related))
              callback(null, data.rows[0].related)
            // }
          }
      //   })
      // }
    })
  },
  deleteFromProducts: (id, requestIndex, callback) => {
    const query = deleteQueries[requestIndex];
    pool.query(query, [id], (err, data) => {
      if (err) {
        callback(err)
      } else {
        callback(null, 'Successful Delete')
      }
    })
  },
}
