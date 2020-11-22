import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    min-height: 100%;
  }
  body {
    background: ${(props) => props.theme.colors.background}
    url(${(props) => props.theme.colors.backgroundImg}) no-repeat 85% top;
    -webkit-font-smoothing: antialiased !important;
  }

  body, input, button {
    color: ${(props) => props.theme.colors.text};
    font-size: 12px;
    font-family: 'Roboto', sans-serif;
  }

  input{
    background: ${(props) => props.theme.colors.primary};
  }

  button{
    cursor: pointer;
  }
`;
