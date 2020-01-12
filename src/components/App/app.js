import React from 'react';
import { Provider } from '/react-redux';
import { store } from '/state';
import { Counter1, Counter2, ButtonsArea } from '/components';

const App = () => (
  <Provider store={store}>
    <Counter1 />
    <Counter2 />
    <ButtonsArea />
  </Provider>
);

export default App;
