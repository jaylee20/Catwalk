import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from "styled-components";

import { lightTheme, darkTheme, GlobalStyles } from "./theme/theme";

import Overview from './components/Overview/Overview';
import Navbar from './components/Navbar/Navbar';
import RatingsAndReviews from './components/RatingsAndReviews/RatingsAndReviews';
import RelatedProducts from './components/RelatedProducts/RelatedProducts';
import QAwidget from './components/Q&A/QAwidget';
import Outfit from './components/Outfit/Outfit';
import Footer from './components/Footer';

import { SharedContext } from './contexts/SharedContext';

const StyledDivider = styled.div`
  display: flex;
  justify-content: center;
`

const StyledImg = styled.img`
  width: 25vw;
`

const ScrollButton = styled.a`
  transition: all .25s ease-in-out;
  position: fixed;
  bottom: 0;
  right: 0;
  display: inline-flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  margin: 0 3em 3em 0;
  border-radius: 50%;
  padding: .25em;
  width: 80px;
  height: 80px;
  background-color: pink;
  z-index: 100;

  &.show {
    visibility: visible;
    opacity: 1;
  }

  &.hide {
    visibility: hidden;
    opacity: 0;
  }

  svg {
    fill: #000;
    width: 24px;
    height: 12px;
  }

  &:hover {
    background-color: #E8E8E8;

    svg {
      fill: #000000;
    }
  }
`

const App = () => {
  const [theme, setTheme] = useState(() => 'dark');
  const [productId, setProductId] = useState(() => 48432);
  const [currentSelection, setCurrentSelection] = useState(() => {});
  const [currentOutfit, setCurrentOutfit] = useState(() => []);
  const [show, setShow] = useState(() => 'hide');

  function changeProdId(product_id) {
    setProductId(product_id);
  }

  function toggleTheme() {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }

  const isDarkTheme = theme === 'dark';

  const scrollFunc = () => {
    let y = window.scrollY;
    if (y > 0) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollFunc);
  }, []);

  return (
    <ThemeProvider theme={theme === 'light' ? darkTheme : lightTheme}>
      <>
        <GlobalStyles />
        <div className="App">
        <ScrollButton href="" className={show ? "show" : "hide"} onClick={(e) => scrollToTop(e)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="pink" viewBox="0 0 12 6"><path d="M12 6H0l6-6z"/></svg>
        </ScrollButton>
          <SharedContext.Provider value={{ productId, setProductId, currentOutfit, setCurrentOutfit, theme }}>
          {/* <Navbar theme={theme} toggleTheme={toggleTheme} searchFunc={changeProdId}/> */}
          <Overview product_id={productId}/>
          <br />
          <br />
          <br />
          <h2 style={{ textAlign: 'center' }}>you might also like...</h2>
          <StyledDivider>{isDarkTheme? <StyledImg src='https://i.imgur.com/ZC0BXZY.png' /> : <StyledImg src='https://i.imgur.com/EqtyDcb.png' />}</StyledDivider>
          <RelatedProducts />
          <br />
          <br />
          <br />
          <h2 style={{ textAlign: 'center' }}>your outfit</h2>
          <StyledDivider>{isDarkTheme? <StyledImg src='https://i.imgur.com/ZC0BXZY.png' /> : <StyledImg src='https://i.imgur.com/EqtyDcb.png' />}</StyledDivider>
          <Outfit />
          <br />
          <br />
          <br />
          <h2 style={{ textAlign: 'center' }}>have any questions?</h2>
          {/* <StyledDivider>{isDarkTheme? <StyledImg src='https://i.imgur.com/ZC0BXZY.png' /> : <StyledImg src='https://i.imgur.com/EqtyDcb.png' />}</StyledDivider>
          <br />
          <div className='QandA'>
            <QAwidget
                product_id={productId}
              />
          </div>
          <br />
          <br />
          <br />
          <h2 style={{ textAlign: 'center' }}>reviews</h2>
          <StyledDivider>{isDarkTheme? <StyledImg src='https://i.imgur.com/ZC0BXZY.png' /> : <StyledImg src='https://i.imgur.com/EqtyDcb.png' />}</StyledDivider>
          <RatingsAndReviews id={productId} />
          <br />
          <br />
          <br /> */}
          <Footer />
          </SharedContext.Provider>
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;