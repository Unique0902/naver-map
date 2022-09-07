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
    if (window.naver) {
      navermaps = window.naver.maps;
    }
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log('Latitude is :', position.coords.latitude);
      console.log('Longitude is :', position.coords.longitude);
    });
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
          naverRef={mapRef}
          defaultCenter={{ lat: 37.6705788, lng: 126.7927116 }}
          defaultZoom={20}
        >
          <Marker
            position={{ lat: 37.6705788, lng: 126.7927116 }}
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