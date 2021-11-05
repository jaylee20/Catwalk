// require('newrelic');

const path = require('path');
const express = require('express');
const compression = require('compression');

const app = express();
const port = 3000;

const {
  getProducts, getProductInfo, getProductStyles, getRelatedProducts, deleteFromProducts,
} = require('./productModel');

app.use(express.static(path.join(__dirname, '/client/dist')));

app.use(express.json());
app.use(compression());

app.get('/*', (req, res) => {
  const { url } = req;
  const splitURL = url.split('/')
    .filter((char) => char !== '');
  const firstRoute = splitURL[0];
  const id = splitURL[1];
  const hasParams = !splitURL[1] ? false : splitURL[1].split('')[0] === '?';

  switch (firstRoute) {
    case 'products':
      if (splitURL.length === 1 || hasParams) {
        let params = {
          page: 1,
          count: 5,
        };

        if (hasParams) {
          const results = splitURL[1].split('&');
          const page = results[0].includes('count') ? 1 : results[0].split('=')[1];
          const count = results[0].includes('count') ? results[0].split('=')[1] : !results[1] ? 5 : results[1].split('=')[1];
          params = {
            page,
            count,
          };
        }

        getProducts(params, (err, data) => {
          if (err) {
            res.status(404).send(err);
          } else {
            res.status(200).send(data);
          }
        });
      }
      if (splitURL[2] === 'styles') {
        getProductStyles(id, (err, data) => {
          if (err) {
            res.status(404).send(err);
          } else {
            res.status(200).send(data);
          }
        });
      } else if (splitURL[2] === 'related') {
        getRelatedProducts(id, (err, data) => {
          if (err) {
            res.status(404).send(err);
          } else {
            res.status(200).send(data);
          }
        });
      } else {
        getProductInfo(id, (err, data) => {
          if (err) {
            res.status(404).send(err);
          } else {
            res.status(200).send(data);
          }
        });
      }
      break;
    default:
      res.status(404).send('Error');
  }
});

app.delete('/*', (req, res) => {
  const { url } = req;
  const { id } = req.query;
  const deleteItem = ['productInfo', 'style', 'feature', 'photo', 'sku', 'related'];

  const splitURL = url.split('/')
    .filter((char) => char !== '');

  const firstRoute = splitURL[0];
  const productInfo = splitURL[1];
  const productInfoIndex = deleteItem.indexOf(productInfo);

  switch (firstRoute) {
    case 'products':
      deleteFromProducts(id, productInfoIndex, (err, data) => {
        if (err) {
          res.status(404).send(err);
        } else {
          res.status(200).send(data);
        }
      });
      break;
    default:
      res.status(404).send('Error');
  }
});

// Start Listen
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
