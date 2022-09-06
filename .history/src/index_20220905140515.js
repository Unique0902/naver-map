import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import {
  NaverMap,
  RenderAfterNavermapsLoaded,
  Marker,
  withNavermaps,
} from 'react-naver-maps';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RenderAfterNavermapsLoaded
      ncpClientId={'il6odbtdif'}
      error={<p>Maps Load Error</p>}
      loading={<p>Maps Loading...</p>}
    >
      <App />
    </RenderAfterNavermapsLoaded>
  </React.StrictMode>
);
