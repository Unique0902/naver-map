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
    // var seoul = new navermaps.LatLngBounds(
    //   new navermaps.LatLng(37.42829747263545, 126.76620435615891),
    //   new navermaps.LatLng(37.7010174173061, 127.18379493229875)
    // );

    // mapRef.current.instance.fitBounds(seoul); // 좌표 경계 이동

    // mapRef.current.instance.panBy(new navermaps.Point(10, 10)); // 오른쪽 아래로 10 픽셀 이동
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const jeju = new navermaps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        mapRef.current.instance.setCenter(jeju); // 중심 좌표 이동
        mapRef.current.instance.setZoom(14);
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
      </NaverMap>
    </>
  );
}

export default App;
