import React, { useState, useEffect, useContext } from "react";
import { SharedContext } from "../../contexts/SharedContext";
import ImageGallery from "./ImageGallery.jsx";
import ProductInfo from "./ProductInfo.jsx";
import Selectors from "./Selectors.jsx";
import styled from "styled-components";
import axios from "axios";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-template-rows: 80vh;
  grid-template-areas: "ImageGallery ProductTile";
  height: 80vh;
  gap: 4%;
  margin: 10px;

  .card {
    padding: 4%;
    border-radius: 10px;
  }
`;

const LoadingScreen =styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
`

export default function Overview(props) {
  let { productId } = useContext(SharedContext);

  const [styles, setStyles] = useState(null);
  const [currStyle, setCurrStyle] = useState(null);

  const defaultStyle = (s) => {
    console.log('\n \n  In the overview, this is product style', s, '\n \n ');
    let styleIndex = 0;
    for (var i = 0; i < s.length; i++) {
      if (s[i]["default?"]) {
        styleIndex = i;
        break;
      }
    }
    return styleIndex;
  };

  useEffect(() => {
    if (productId === undefined) {
      productId = 48432;
    }
    axios
      .get(`/products/${productId}/styles`)
      .then((r) => {
        setStyles(r.data.results);
        setCurrStyle(defaultStyle(r.data.results));
      })
      .catch((err) => console.log("get info error, "));
  }, [productId]);

  return (
    <Wrapper className='Overview'>
      {currStyle !== null ?
      (<>
        <ImageGallery id='ImageGallery'
        photos={styles[currStyle].photos.map(x => x.url || 'https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg')}
        />
        <div className='ProductCard card'>
          <ProductInfo />
          <Selectors
          thumbnails={styles.map(x => x.photos[0].thumbnail_url || 'https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg')}
          setCurrStyle={setCurrStyle}
          style={styles[currStyle]}
          currStyle={currStyle}
          />
        </div>
      </>) :
      (<LoadingScreen><img src='https://i.imgur.com/7sMnF66.gif' /></LoadingScreen>)
      }
    </Wrapper>
  );
}
