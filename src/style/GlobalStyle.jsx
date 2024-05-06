import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
html {
  --color-lightWhite: #F2F2F3;
  --color-lightBlack: #0D0D0D;
  --color-lightGreen: #847146;
  --color-lightBrown: #73553C;
  --color-orange: BF754B;

}

.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
}`;

export default GlobalStyle;
