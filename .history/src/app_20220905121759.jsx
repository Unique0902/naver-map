import './app.css';
import React from 'react';
import { NaverMap, RenderAfterNavermapsLoaded } from 'react-naver-maps';

function App() {
  return (
    <>
      <RenderAfterNavermapsLoaded
        ncpClientId={process.env.REACT_APP_MAP_CLIENT_ID}
      >
        <p>Navermaps Loaded!</p>
      </RenderAfterNavermapsLoaded>
    </>
  );
}

export default App;
