import './app.css';
import React from 'react';
import { NaverMap, RenderAfterNavermapsLoaded } from 'react-naver-maps';

function App() {
  return (
    <>
      <RenderAfterNavermapsLoaded
        ncpClientId={process.env.REACT_APP_MAP_CLIENT_ID}
        // 네이버 클라우드에서 받은 client id를 적어야 한다.
        // 필자는 환경변수 이용
        error={<p>Maps Load Error</p>}
        loading={<p>Maps Loading...</p>}
      >
        <p>Navermaps Loaded!</p>
      </RenderAfterNavermapsLoaded>
    </>
  );
}

export default App;
