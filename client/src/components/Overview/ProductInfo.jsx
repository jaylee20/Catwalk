import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react';
import { SharedContext } from '../../contexts/SharedContext';

function ProductInfo({}) {

  let { productId } = useContext(SharedContext);

  const [info, setInfo] = useState(null);

  useEffect(() => {
    if (productId === undefined) {
      productId = 48432
    }
    axios.get( `/products/${productId}`)
    .then(results => {
      console.log('\n \n In the product info', results.data, '\n \n');
      setInfo(results.data);
    });
  }, [productId]);

  return (
    info !== null ?
    (<div>
      <p><a href='#RatingsAndReviews'>read all reviews</a></p>
        <p>CATEGORY {'>'} <em>{info.category}</em></p>
        <h1>{info.name}</h1>
        <p>{info.description}</p>
    </div>) :
    (<div></div>)
  );
}

export default ProductInfo;