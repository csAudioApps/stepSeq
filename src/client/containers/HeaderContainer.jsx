import React from 'react';
import Share from '../components/Share';
import Users from '../components/Users';

const HeaderContainer = () => {
  return (
    <div className="HeaderContainer">
      <Share />
      <Users />
    </div>
  )
}

export default HeaderContainer;