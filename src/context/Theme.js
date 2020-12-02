import React from 'react';

import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';

import dark from '../styles/themes/dark';
import light from '../styles/themes/light';

import usePersistedState from '../hooks/usePersistedState';

const ThemeSwitcherContext = React.createContext({});

const ThemeSwitcherProvider = ({ children }) => {
  const [theme, setTheme] = usePersistedState('theme', light);

  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light);
  };
  return (
    <ThemeSwitcherContext.Provider value={{ toggleTheme, theme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeSwitcherContext.Provider>
  );
};

ThemeSwitcherProvider.propTypes = {
  children: PropTypes.string.isRequired,
};

export { ThemeSwitcherContext, ThemeSwitcherProvider };
