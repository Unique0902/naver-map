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
import HttpClient from './network/http.js';
import MatchingService from './services/matching';

// const baseURL = process.env.REACT_APP_BASE_URL;
const baseURL = 'http://localhost:8080';
const httpClient = new HttpClient(baseURL);
const matchingService = new MatchingService(httpClient);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RenderAfterNavermapsLoaded
      ncpClientId={process.env.REACT_APP_NAVER_CLIENT_ID}
      error={<p>Maps Load Error</p>}
      loading={<p>Maps Loading...</p>}
      submodules={['geocoder']}
    >
      <App matchingService={matchingService} />
    </RenderAfterNavermapsLoaded>
  </React.StrictMode>
);
