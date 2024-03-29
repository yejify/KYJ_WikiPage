import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
${reset}
.a11y-hidden {
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
}

*,*::before, *::after{
    box-sizing: border-box;
    font-family: 'inter';
}

html, body, div, span, h1, h2, h3, h4, h5, h6, p, strong,
a, dl, dt, dd, ol, ul, li, form, label, table, input, button, textarea {
    font-family: 'inter'; 
    margin: 0;
    padding: 0;
}

button {
    cursor: pointer;
    color: inherit;
    border:none;
    background-color: transparent;
}

a{

    text-decoration: none;
    color: inherit;
    cursor: pointer;
}

input,textarea{
    -ms-user-select: auto;
    -webkit-appearance: none;
    -moz-appearance: none;
    user-select: auto;
}

input,textarea{
    appearance: none;
    box-shadow: none;
    border: none;
    border-radius: 0;
    padding: 0;
    box-sizing: border-box;
    &:focus {
    outline: none;
    }
}

ol, ul, li{
    list-style: none;
}
`;

export default GlobalStyle;
