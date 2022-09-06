import './app.css';
import React, { useRef } from 'react';
import {
  NaverMap,
  RenderAfterNavermapsLoaded,
  Marker,
  withNavermaps,
} from 'react-naver-maps';
import { useEffect } from 'react';

function App() {
  let navermaps;
  const mapRef = useRef(null);
  useEffect(() => {
    navermaps = window.naver.maps;
    console.log(navermaps);
  }, []);
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
          onClick={(e) => {
            console.log(e);
          }}
        >
          <Marker
            position={{ lat: 37.3595704, lng: 127.105399 }}
            animation={Animation.BOUNCE}
            mousedown={() => {
              console.log('여기는 네이버 입니다.');
            }}
          />
        </NaverMap>
      </RenderAfterNavermapsLoaded>
    </>
  );
}

export default App;
