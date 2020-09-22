import React from 'react';
import styled from 'styled-components';

const Users = ({ localUserId, username }) => {
  console.log('username:', username, 'localUserId:', localUserId);

  return (
    <>
      <StyledUserTitle>user</StyledUserTitle>
      {' '}
      <StyledUserListDisplay>
        {username}
        <UserColorSwatch />
      </StyledUserListDisplay>
    </>
  );
};

const StyledUserTitle = styled.span`
  color: #ababab;
  margin: auto 10px auto 0px;
  font: inherit;
  font-weight: 200;
`;

const UserColorSwatch = styled.span`
  background-color: #5dfdcb;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  display: inline-block;
  margin: auto 10px;
`;

const StyledUserListDisplay = styled.div`
  color: #eaeaea;
  margin: auto 10px auto 0px;
  font: inherit;
  font-weight: 200;
`;

export default Users;
