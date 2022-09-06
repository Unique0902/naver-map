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
  const navermaps = window.naver.maps;
  const mapRef = useRef(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        console.log('Latitude is :', position.coords.latitude);
        console.log('Longitude is :', position.coords.longitude);
        console.log(`More or less ${position.coords.accuracy} meters.`);
      },
      () => {},
      { enableHighAccuracy: true }
    );
  }, []);
  return (
    <>
      <NaverMap
        mapDivId={'maps-getting-started-uncontrolled'} // default: react-naver-map
        style={{
          width: '100%',
          height: '400px',
        }}
        naverRef={mapRef}
        defaultCenter={{ lat: 37.677571, lng: 126.796238 }}
        defaultZoom={15}
      >
        <Marker
          position={{ lat: 37.677571, lng: 126.796238 }}
          animation={Animation.BOUNCE}
          mousedown={() => {
            console.log('여기는 네이버 입니다.');
          }}
        />
        <button
          onClick={() => {
            const jeju = new navermaps.LatLng(33.3590628, 126.534361);
            mapRef.current.instance.setCenter(jeju); // 중심 좌표 이동
            mapRef.current.instance.setZoom(13);
          }}
        >
          saf
        </button>
      </NaverMap>
    </>
  );
}

export default App;
