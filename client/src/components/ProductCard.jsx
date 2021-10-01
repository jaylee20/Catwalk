import React, { useState, useEffect, useContext } from 'react';
import { SharedContext } from '../contexts/SharedContext';
import styled from 'styled-components';
import axios from 'axios';
import Star from './RelatedProducts/Star';
import { MdClose } from 'react-icons/md';
import Modal from './Modal';
import ComparisonTable from './RelatedProducts/ComparisonTable';
import RatingStar from './RatingsAndReviews/Ratings/RatingStar';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  transition: 0.3s;
`

const StyledProductCard = styled.div`
  text-align: center;
  position: relative;
  transition: 0.3s;
`

const StyledCardContainer = styled.div`
  text-align: center;
  max-width: 13vw;
  min-width: 13vw;
  vertical-align: middle;
  padding: 10px;
  margin-left: auto;
  margin-right: auto;
  padding: 4%;
  // border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  opacity: 0.8;
  transition: 0.3s;
  border: 3px solid rgba(255,192,203,0);

  &:hover {
    border: 3px solid rgba(255,192,203,1);
    opacity: 1;
  }

`

const StyledThumbnail = styled.div`
  height: 12vw;
  width: 12vw;
  overflow: hidden;
  display: inline-block;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  position: relative;
  transition: 0.3s;
`

const StyledButton = styled.button`
  position: absolute;
  right: 5px;
  top: 5px;
  width: 1.5vw;
  height: 1.5vw;
  z-index: 1;
`

const RemoveButton = styled(MdClose)`
  position: absolute;
  right: 5px;
  top: 5px;
  width: 1.5vw;
  height: 1.5vw;
  z-index: 1;
  cursor: pointer;
  transition: 0.3s;
  color: red;

  &:hover {
    color: pink;
  }
`;

const ProductCard = ({ product_id, mode }) => {
  const isOutfit = mode === 'Outfit';
  const isAddButton = product_id === 'addToOutfit';

  const { productId, setProductId, setCurrentOutfit } = useContext(SharedContext);

  const [previewImage, setPreviewImage] = useState(() => '');
  const [name, setName] = useState(() => '');
  const [category, setCategory] = useState(() => '');
  const [price, setPrice] = useState(() => '');
  const [salePrice, setSalePrice] = useState(() => null);
  const [isLoaded, setIsLoaded] = useState(() => false);
  const [isModalOpen, setIsModalOpen] = useState(() => false);
  const [meta, setMeta] = useState(() => null);
  const [reviews, setReviews] = useState(() => null);

  const getMeta = (product_id) => {
    return axios.get(`/reviews/meta/?product_id=${product_id}`);
  };

  const getStyles = (product_id) => {
    return axios.get(`/products/${product_id}/styles`);
  }

  const getProductInfo = (product_id) => {
    return axios.get(`/products/${product_id}`);
  }

  const getReviews = (product_id) => {
    return axios.get(`/reviews/?product_id=${product_id}`);
  }

  const handleAdd = () => {
    setCurrentOutfit((prevOutfit) => {
      if (!prevOutfit.includes(productId)) {
        let newOutfit = prevOutfit.slice();
        newOutfit.unshift(productId);
        return newOutfit;
      } else {
        return prevOutfit;
      }
    })
  }

  const handleRemoval = (e) => {
    e.stopPropagation();
    setCurrentOutfit((prevOutfit) => {
      let newOutfit = prevOutfit.slice();
      let removalIndex = newOutfit.indexOf(product_id);
      newOutfit.splice(removalIndex, 1);
      return newOutfit;
    })
  }

  const toggleModal = (e) => {
    e.stopPropagation();
    setIsModalOpen(prevState => !prevState);
  }

  useEffect(() => {
    if (!isAddButton) {
      Promise.all([
        getProductInfo(product_id),
        getStyles(product_id),
        getMeta(product_id),
        getReviews(product_id)
      ])
      .then(([info, styles, meta, reviewsData]) => {
        setCategory(info.data.category);
        setName(info.data.name);
        if (styles.data.results[0].photos[0].thumbnail_url) {
          setPreviewImage(styles.data.results[0].photos[0].thumbnail_url);
        } else {
          setPreviewImage('https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg');
        }
        setPrice(styles.data.results[0].original_price);
        setSalePrice(styles.data.results[0].sale_price);
        setMeta(meta.data);
        setReviews(reviewsData.data.results.length);
        setIsLoaded(true);
      })
      .catch((err) => console.error(err));
    }
  }, [product_id]);

  const Price = () => (
    <span>${price}</span>
  );

  const SalePrice = () => (
    <>
      <span style={{color: 'red'}}><strong>${salePrice}</strong></span> <s><Price/></s>
    </>
  );

  return (
    <>
      {isModalOpen && (
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <ComparisonTable productId={productId} name={name} category={category} price={price} salePrice={salePrice} />
      </Modal>
      )}
      {isAddButton ?  <StyledProductCard>
        <StyledCardContainer className="card" onClick={handleAdd} style={{ cursor: 'pointer' }}>
          <StyledThumbnail>
            <span style={{ fontSize: '15vh' }}>+</span>
          </StyledThumbnail>
            <span>add to outfit</span>
            <br />
            <br />
            <br />
            <br />
        </StyledCardContainer>
      </StyledProductCard> :
      isLoaded ? <StyledProductCard>
        <StyledCardContainer className="card" onClick={() => {
          setProductId(product_id);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>
          <StyledThumbnail style={{ backgroundImage: `url(${previewImage})` }}>
            {isOutfit ? <RemoveButton aria-label='Close modal' onClick={handleRemoval} /> : <div onClick={toggleModal} style={{ cursor: 'pointer' }}>
              <Star/>
            </div>}
          </StyledThumbnail>
          <br />
          <strong>{name}</strong>
          <br />
          <RatingStar mode='ProductCard' ratings={meta.ratings} /> <span>({reviews})</span>
          <br />
          {category}
          <br />
          {salePrice ? <SalePrice /> : <Price />}
        </StyledCardContainer>
      </StyledProductCard> : <div></div>}
    </>)
}

export default ProductCard;