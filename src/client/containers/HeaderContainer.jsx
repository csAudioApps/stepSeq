import React from 'react';
import styled from 'styled-components';
import Share from '../components/Share';
import Users from '../components/Users';

const HeaderContainer = ({ localUserId, username }) => (
  <StyledDiv>
    <Share />
    <Users
      localUserId={localUserId}
      username={username}
    />
  </StyledDiv>
);

const StyledDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  color: white;
  background-color: #282828;
  height: 50px;
  width: 100%;
`;

export default HeaderContainer;
