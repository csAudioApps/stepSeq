import React from 'react';
import VisualContainer from './VisualContainer';
import HeaderContainer from './HeaderContainer';

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