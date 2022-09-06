import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import '@fortawesome/fontawesome-free/js/all.js';
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
      ncpClientId={process.env.REACT_APP_NAVER_CLIENT_ID}
      error={<p>Maps Load Error</p>}
      loading={<p>Maps Loading...</p>}
      submodules={['geocoder']}
    >
      <App />
    </RenderAfterNavermapsLoaded>
  </React.StrictMode>
);
