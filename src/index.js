import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { ThemeSwitcherProvider } from './context/Theme';

ReactDOM.render(
  <ThemeSwitcherProvider>
    <App />
  </ThemeSwitcherProvider>,
  document.getElementById('root')
);
