import React from 'react';
import { render } from 'react-dom';
import App from './components/app';
import config from '@bradenhc/client-config';
import { CookiesProvider } from 'react-cookie';

config.files(['/assets/config/default.json']);

const rootEl = document.getElementById('app');

render(
    <CookiesProvider>
        <App />
    </CookiesProvider>,
    rootEl
);

if (module.hot) {
    module.hot.accept();
}
