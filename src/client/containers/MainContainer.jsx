import React from 'react';
import VisualContainer from './VisualContainer';
import HeaderContainer from './HeaderContainer';
import Footer from '../components/Footer';

const MainContainer = () => {
  return (
    <div className="MainContainer">
      <HeaderContainer />
      <VisualContainer />
      <Footer />
    </div>
  )
}

export default MainContainer;