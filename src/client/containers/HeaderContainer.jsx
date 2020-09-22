import React from 'react';
import styled from 'styled-components';
import Share from '../components/Share';
import Users from '../components/Users';

const HeaderContainer = () => (
  <StyledDiv>
    <Share />
    <Users />
  </StyledDiv>
);

const StyledDiv = styled.div`
  height: 60px;
  width: 100%;
`;

export default HeaderContainer;
