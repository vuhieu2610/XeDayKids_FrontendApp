import { createGlobalStyle } from 'styled-components';
import {
  StyledContent,
  StyledFooter,
  BreadcrumbBox,
} from './containers/App/selections';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }


  /* Extra small devices (portrait phones, less than 576px) */
  /* No media query since this is the default in Bootstrap */

  /* Small devices (landscape phones, 576px and up) */
  @media (min-width: 576px) {  }

  /* Medium devices (tablets, 768px and up) */
  @media (min-width: 768px) { 
    header .content,
    header .panel > div,
    ${StyledContent} > div:not(${BreadcrumbBox}),
    ${BreadcrumbBox} > div,
    ${StyledFooter}{
      max-width: 1282px !important;
      width: 100%;
      padding-left: 56px !important;
      padding-right: 56px !important;
      margin: 0 auto !important;
    }
  }

  /* Large devices (desktops, 992px and up) */
  @media (min-width: 992px) {  }

  /* Extra large devices (large desktops, 1200px and up) */
  @media (min-width: 1200px) {  }
`;

export default GlobalStyle;
