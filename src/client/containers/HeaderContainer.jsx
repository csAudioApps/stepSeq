import React from 'react';
import Share from '../components/Share';
import Users from '../components/Users';

const HeaderContainer = () => (
  <div className="HeaderContainer">
    {/* <div className="title">stepSeq</div> */}
    <Share />
    <Users />
  </div>
);

export default HeaderContainer;
