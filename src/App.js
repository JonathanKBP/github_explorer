import React from 'react';
// import { ThemeProvider } from 'styled-components';

import Routes from './routes';
// import GlobalStyle from './styles/global';
// import usePersistedState from './hooks/usePersistedState';
// import light from './styles/themes/light';
// import dark from './styles/themes/dark';

function App() {
  // const [theme, setTheme] = usePersistedState('theme', 'light');

  // useEffect(() => {
  //   setTheme(localStorage.getItem('theme'));
  // }, localStorage.getItem('theme'));

  return <Routes />;
}

export default App;
