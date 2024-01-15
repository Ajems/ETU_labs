import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import {store} from "./data/store";
import {Router} from "./router";
import App from "./App";

const link = document.createElement('link')
link.rel = 'stylesheet'
link.type = 'text/css'
link.href = 'index.css'
document.head.appendChild(link)

ReactDOM.render(
    <Provider store={store}>
        <Router/>
        <App />
    </Provider>,
    document.getElementById('root'));
