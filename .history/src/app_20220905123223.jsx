import './app.css';
import React from 'react';
import { NaverMap, RenderAfterNavermapsLoaded, Marker } from 'react-naver-maps';

const {
  RenderAfterNavermapsLoaded,
  NaverMap,
  Marker,
} = require('react-naver-maps');

function App() {
  return (
    <>
      <RenderAfterNavermapsLoaded
        ncpClientId={'il6odbtdif'}
        error={<p>Maps Load Error</p>}
        loading={<p>Maps Loading...</p>}
      >
        <NaverMap
          mapDivId={'maps-getting-started-uncontrolled'} // default: react-naver-map
          style={{
            width: '100%',
            height: '400px',
          }}
          defaultCenter={{ lat: 37.3595704, lng: 127.105399 }}
          defaultZoom={100}
        />
        <Marker
          position={new navermaps.LatLng(37.3595704, 127.105399)}
          animation={navermaps.Animation.BOUNCE}
          onClick={() => {
            alert('여기는 네이버 입니다.');
          }}
        />
      </RenderAfterNavermapsLoaded>
    </>
  );
}

export default App;
