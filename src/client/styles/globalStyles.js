import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font: inherit;
}

*:focus {
  outline: 0;
}

body {
  font-family: century-gothic, sans-serif;
  font-weight: 200;
  font-style: normal;
  letter-spacing: 0.15em;
  color: #cfcfcf;
  background-color: #242424;
  height: 100%;
  background-image: url(${(props) => props.img});
  background-blend-mode: overlay;
  background-size: cover;
  background-attachment: fixed;
  height: 110vh;
  overflow-x:hidden;
  overflow-y:hidden;
}

button {
  display: inline-block;
  border: none;
  cursor: pointer;
  text-decoration: none;
  font-family: century-gothic, sans-serif;
  font-weight: 200;
  font-style: normal;
  font-size: inherit;
  color: #cfcfcf;
}

table {
  border-collapse: collapse;
}

ul {
  list-style: none;
}

`;

export default GlobalStyle;
