// bootstrap
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';

// alertyfy js
import '../node_modules/alertifyjs/build/alertify.min'
import '../node_modules/alertifyjs/build/css/alertify.min.css'
import '../node_modules/alertifyjs/build/css/themes/default.min.css'

// our styles
import './index.scss';

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from './app';
import './i18n'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Suspense fallback={
            <div className='loader-pageWrap active'>
                <div className="loader active" id="loader-2">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>}>
            <App />
        </Suspense>
    </React.StrictMode>
);
reportWebVitals();