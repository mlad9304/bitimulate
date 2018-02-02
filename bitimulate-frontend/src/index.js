import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/main.scss';
import Root from 'Root';
import registerServiceWorker from './registerServiceWorker';
import store from 'store';

ReactDOM.render(<Root store={store}/>, document.getElementById('root'));
registerServiceWorker();
