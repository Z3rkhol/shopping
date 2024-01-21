import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from './components/Theme.js';
import App from './App';
import './i18n/i18n';

ReactDOM.render(
    <ThemeProvider>
        <App />
    </ThemeProvider>,
    document.getElementById('root')
);
