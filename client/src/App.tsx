import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { Routes } from './infrastructure/routes/index.routes';
import { GlobalStyle } from './infrastructure/styles/global';
import { RootState } from './infrastructure/redux/store';

const App: React.FC = () => {
  const { theme } = useSelector((state: RootState) => state.theme);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes />
    </ThemeProvider>
  );
};

export default App;
