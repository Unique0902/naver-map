import './app.css';
import React from 'react';
import { NaverMap, RenderAfterNavermapsLoaded, Marker } from 'react-naver-maps';

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
          defaultZoom={10}
        >
          <Marker
            position={{ lat: 37.3595704, lng: 127.105399 }}
            animation={Animation.BOUNCE}
            onClick={() => {
              alert('여기는 네이버 입니다.');
            }}
          />
        </NaverMap>
      </RenderAfterNavermapsLoaded>
    </>
  );
}

export default App;
