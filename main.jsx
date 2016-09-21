import { render } from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import App from './js/components/App';
import { store } from './js/index';

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
});
