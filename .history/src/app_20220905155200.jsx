import './app.css';
import React, { useRef } from 'react';
import {
  NaverMap,
  RenderAfterNavermapsLoaded,
  Marker,
  withNavermaps,
} from 'react-naver-maps';
import { useEffect } from 'react';
import DaumPostcode from 'react-daum-postcode';
import Daum from './components/daum/daum';
import { useState } from 'react';

function App() {
  const [showdaum, setShowdaum] = useState(false);
  const navermaps = window.naver.maps;
  const mapRef = useRef(null);
  useEffect(() => {
    const map = mapRef.current.instance;

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
        map.setCenter(jeju); // 중심 좌표 이동
        map.setZoom(14);
        console.log(`More or less ${position.coords.accuracy} meters.`);
        var circle = new navermaps.Circle({
          map: map,
          center: jeju,
          radius: 1000,
          strokeColor: '#5347AA',
          strokeOpacity: 0.5,
          strokeWeight: 2,
          fillColor: '#E51D1A',
          fillOpacity: 0.3,
        });
      },
      () => {},
      { enableHighAccuracy: true }
    );
  }, []);
  // const marker = new navermaps.Marker({
  //   position: new navermaps.LatLng(37.3595704, 127.105399),
  //   map: map,
  // });
  // navermaps.Event.addListener(map, 'click', function (e) {
  //   const marker = new navermaps.Marker({
  //     position: new navermaps.LatLng(37.3595704, 127.105399),
  //     map: map,
  //   });
  //   console.log(e);
  //   marker.setPosition(e.latlng);
  //   console.log(marker);
  // });

  return (
    <>
      <NaverMap
        mapDivId={'maps-getting-started-uncontrolled'} // default: react-naver-map
        style={{
          width: '100%',
          height: '80vh',
        }}
        naverRef={mapRef}
        defaultCenter={{ lat: 37.677571, lng: 126.796238 }}
        defaultZoom={15}
      >
        <Marker
          position={{ lat: 37.677571, lng: 126.796238 }}
          mousedown={() => {
            console.log('여기는 네이버 입니다.');
          }}
        />
      </NaverMap>
      {showdaum && <Daum />}
      <section>
        <button
          onClick={() => {
            return <Daum />;
          }}
        >
          기준
        </button>
      </section>
    </>
  );
}

export default App;
