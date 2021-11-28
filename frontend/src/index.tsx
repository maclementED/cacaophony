import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import Router, { ScrollToTop } from './Router';
import './firebase';
import './i18n';
import './assets/css/global.css';
import { AlertProvider } from './providers/AlertProvider';
import Loading from './pages/misc/Loading';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<Loading />}>
        <AlertProvider>
          <Router />
        </AlertProvider>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
