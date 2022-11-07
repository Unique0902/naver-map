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
import FindMatchingService from './services/findMatching';
import ChatService from './services/chatService';
import Socket from './network/socket';
import ChattingRoomService from './services/chattingRoom';
import MatchService from './services/match';
import PromiseService from './services/promise';
import UserDataService from './services/userData';

// const baseURL = process.env.REACT_APP_BASE_URL;
const baseURL = 'http://localhost:8080';
const httpClient = new HttpClient(baseURL);
const findMatchingService = new FindMatchingService(httpClient);
const socketClient = new Socket(baseURL);
const promiseService = new PromiseService(httpClient, socketClient);
const chattingRoomService = new ChattingRoomService(httpClient);
const matchService = new MatchService(httpClient, socketClient);
const chatService = new ChatService(httpClient, socketClient);
const userDataService = new UserDataService(httpClient);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RenderAfterNavermapsLoaded
      ncpClientId={process.env.REACT_APP_NAVER_CLIENT_ID}
      error={<p>Maps Load Error</p>}
      loading={<p>Maps Loading...</p>}
      submodules={['geocoder']}
    >
      <App
        findMatchingService={findMatchingService}
        chatService={chatService}
        chattingRoomService={chattingRoomService}
        matchService={matchService}
        promiseService={promiseService}
        socketClient={socketClient}
        userDataService={userDataService}
      />
    </RenderAfterNavermapsLoaded>
  </React.StrictMode>
);
