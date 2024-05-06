import { ThemeProvider } from 'styled-components';
import React from 'react';

const theme = {
  color: {
    lightWhite: "var(--color-lightWhite)",
    lightBlack: 'var(--color-lightBlack)',
    lightGreen: 'var(--color-lightGreen)',
    lightBrown: 'var(--color-lightBrown)',
    orange: 'var(--color-orange)',
  },
};

export const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;