import React from 'react';
import { render } from 'react-dom';
import App from './components/app';
import config from '@bradenhc/client-config';
import { CookiesProvider } from 'react-cookie';
import { Provider } from "react-redux";
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from "redux";

import reducers from "./components/reducers";

config.files(['/assets/config/default.json']);

const loggerMiddleware = createLogger();

const rootEl = document.getElementById('app');
const store = createStore(reducers, applyMiddleware(thunk, loggerMiddleware));

render(
    <CookiesProvider>
        <Provider store={store}>
            <App />
        </Provider>
    </CookiesProvider>,
    rootEl
);

if (module.hot) {
    module.hot.accept();
}
