require('newrelic')
const path = require("path")
const express = require("express");
const compression = require('compression')
const app = express();
const port = 3000;
const config = require('./config/config.js');
const { getProducts, getProductInfo, getProductStyles, getRelatedProducts, deleteFromProducts } = require('./db/productController.js');
const axios = require('axios');
const API_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo';

app.use(express.static(path.join(__dirname, "/client/dist")));

app.use(express.json());
app.use(compression());

//Axios Requests, format right side URL within client-side request as req.url
const axiosConfig = {
  headers: {
    'content-type': 'application/json',
    'authorization': config.API_KEY
  }
};

// app.get('/*', test);
app.get('/*', (req, res) => {
	const { url } = req
	let splitURL = url.split('/')
	.filter(char => char !== '');
	const firstRoute = splitURL[0];
	switch (firstRoute) {
		case 'products':
			if (splitURL.length === 1) {
				getProducts((err, data) => {
					if (err) {
						res.status(404).send(err);
					} else {
						res.status(200).send(data);
					}
				})
			}
			const id = splitURL[1]
			if (splitURL[2] === 'styles') {
				getProductStyles(id, (err, data) => {
					if (err) {
						console.log(err);
						res.status(404).send(err);
					} else {
						res.status(200).send(data);
					}
				})
			} else if (splitURL[2] === 'related') {
				getRelatedProducts(id, (err, data) => {
					if (err) {
						console.log(err);
						res.status(404).send(err);
					} else {
						res.status(200).send(data);
					}
				})
			} else {
				getProductInfo(id, (err, data) => {
					if (err) {
						console.log(err);
						res.status(404).send(err);
					} else {
						res.status(200).send(data);
					}
				})
			}
			break;
		default:
			res.status(404).send('Error');
	}
});

app.post('/*', (req, res) => {

});

app.put('/*', (req, res) => {
  axios.put(`${API_URL}${req.url}`, {}, axiosConfig)
  .then((response) => {
    res.send(response.status);
  })
  .catch((error) => {
    res.send(`Error making PUT request: ${error}`);
  });
});

app.delete('/*', (req, res) => {
  const { url } = req
	const { id } = req.query;

	let splitURL = url.split('/')
	.filter(char => char !== '');
	const firstRoute = splitURL[0];
	switch (firstRoute) {
		case 'products':
			const deleteItem = ['productInfo', 'style', 'feature', 'photo', 'sku', 'related']
			const productInfo = splitURL[1]
			const productInfoIndex = deleteItem.indexOf(productInfo);
			deleteFromProducts(id, productInfoIndex, (err, data) => {
				if (err) {
					res.status(404).send(err);
				} else {
					res.status(200).send(data);
				}
			})
			break;
		default:
			res.status(404).send('Error');
	}
});

//Start Listen
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});


