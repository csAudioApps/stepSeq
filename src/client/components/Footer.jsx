import React from 'react';
import styled from 'styled-components';

const Footer = React.memo(() => (
  <StyledFooter>
    {/* <p>footer</p> */}
  </StyledFooter>
));

export default Footer;

const StyledFooter = styled.div`
  width: 100%;
  text-align: center;
`;
