import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/main.scss';
import Root from 'Root';
import registerServiceWorker from './registerServiceWorker';
import store from 'store';
import { AppContainer } from 'react-hot-loader';

const render = (Component) => ReactDOM.render(
  (
    <AppContainer>
      <Component store={store}/>
    </AppContainer>
  ),
  document.getElementById('root')
);

render(Root);

if(module.hot) {
  module.hot.accept('./Root', () => render(Root));
}

registerServiceWorker();
