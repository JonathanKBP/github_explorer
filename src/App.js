import React from 'react';
import { ThemeProvider } from 'styled-components';

import Routes from './routes';
import GlobalStyle from './styles/global';
import usePersistedState from './hooks/usePersistedState';
import light from './styles/themes/light';
import dark from './styles/themes/dark';

function App() {
  const [theme] = usePersistedState('theme', 'light');

  // const toggleTheme = () => {
  //   setTheme(theme === 'light' ? dark : light);
  // };

  return (
    <ThemeProvider theme={theme === 'light' ? dark : light}>
      <GlobalStyle />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
