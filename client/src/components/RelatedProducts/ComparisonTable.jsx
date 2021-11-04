import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const StyledTable = styled.table`
  table-layout: fixed;
`

const StyledTd = styled.td`
  text-align: center;
  width: 33.33%;
`

const ComparisonTable = ({ productId, name, category, price, salePrice }) => {

  const [relatedName, setRelatedName] = useState(() => '');
  const [relatedCategory, setRelatedCategory] = useState(() => '');
  const [relatedPrice, setRelatedPrice] = useState(() => '');
  const [relatedSalePrice, setRelatedSalePrice] = useState(() => null);
  const [isLoaded, setIsLoaded] = useState(() => false);

  const getStyles = (productId) => {
    return axios.get(`/products/${productId}/styles`);
  }

  const getProductInfo = (productId) => {
    return axios.get(`/products/${productId}`);
  }

  useEffect(() => {
    Promise.all([
      getProductInfo(productId),
      getStyles(productId)
    ])
    .then(([info, styles]) => {
      setRelatedCategory(info.data.category, '\n \n');
      setRelatedName(info.data.name);
      setRelatedPrice(styles.data.results[0].original_price);
      setRelatedSalePrice(styles.data.results[0].sale_price);
      setIsLoaded(true);
    })
    .catch((err) => console.error(err));
  }, []);

  return (
    <>
    {isLoaded ? <>
      <h3>COMPARING</h3>
      <StyledTable>
        <tbody>
          <tr>
            <th>{relatedName}</th>
            <th>Characteristic</th>
            <th>{name}</th>
          </tr>
          <tr>
            <StyledTd>{relatedCategory}</StyledTd>
            <StyledTd>Category</StyledTd>
            <StyledTd>{category}</StyledTd>
          </tr>
          <tr>
            <StyledTd>{relatedSalePrice ? relatedSalePrice : relatedPrice}</StyledTd>
            <StyledTd>Price</StyledTd>
            <StyledTd>{salePrice ? salePrice : price}</StyledTd>
          </tr>
          <tr>
            <StyledTd>{relatedSalePrice ? '✓' : '❌'}</StyledTd>
            <StyledTd>On Sale</StyledTd>
            <StyledTd>{salePrice ? '✓' : '❌'}</StyledTd>
          </tr>
        </tbody>
      </StyledTable>
      </> : <img src='https://i.imgur.com/7sMnF66.gif' />}
    </>
  );
};

export default ComparisonTable;