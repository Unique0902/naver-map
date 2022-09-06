import './app.css';
import React from 'react';
import { NaverMap, RenderAfterNavermapsLoaded } from 'react-naver-maps';

function App() {
  return (
    <>
      <RenderAfterNavermapsLoaded
        ncpClientId={'il6odbtdif'}
        error={<p>Maps Load Error</p>}
        loading={<p>Maps Loading...</p>}
      >
        <p>Navermaps Loaded!</p>
      </RenderAfterNavermapsLoaded>
    </>
  );
}

export default App;
