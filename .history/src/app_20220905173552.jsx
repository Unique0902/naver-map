import './app.css';
import React, { useRef } from 'react';
import {
  NaverMap,
  RenderAfterNavermapsLoaded,
  withNavermaps,
} from 'react-naver-maps';
import { useEffect } from 'react';
import DaumPostcode from 'react-daum-postcode';
import Daum from './components/daum/daum';
import { useState } from 'react';

function App() {
  const [showdaum, setShowdaum] = useState(false);
  const [geometricData, setGeometricData] = useState(null);
  const [marker, setMarker] = useState(null);
  const [circle, setCircle] = useState(null);
  const navermaps = window.naver.maps;
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [nowUserPosition, setNowUserPosition] = useState(null);

  const searchAddressToCoordinate = (address) => {
    navermaps.Service.geocode(
      {
        query: address,
      },
      function (status, response) {
        if (status === navermaps.Service.Status.ERROR) {
          if (!address) {
            return alert('Geocode Error, Please check address');
          }
          return alert('Geocode Error, address:' + address);
        }

        if (response.v2.meta.totalCount === 0) {
          return alert('No result.');
        }

        let item = response.v2.addresses[0];
        setGeometricData({
          lng: item.x,
          lat: item.y,
        });
      }
    );
  };
  const getNowUserPosition = () => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const pos = new navermaps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        setNowUserPosition(pos);
        // setGeometricData({
        //   lng: position.coords.latitude,
        //   lat: position.coords.longitude,
        // });
      },
      () => {},
      { enableHighAccuracy: true }
    );
  };
  useEffect(() => {
    setMap(mapRef.current.instance);
    getNowUserPosition();
  }, []);

  useEffect(() => {
    if (map != null && nowUserPosition != null) {
      map.setCenter(nowUserPosition); // 중심 좌표 이동
      if (marker == null) {
        setMarker(
          new navermaps.Marker({
            position: nowUserPosition,
            map: map,
          })
        );
      }
      if (circle == null) {
        setCircle(
          new navermaps.Circle({
            map: map,
            center: nowUserPosition,
            radius: 350,
            strokeColor: '#5347AA',
            strokeOpacity: 0.5,
            strokeWeight: 2,
            fillColor: '#E51D1A',
            fillOpacity: 0.3,
          })
        );
      }

      if (navermaps.Event.hasListener(map, 'bounds_changed')) {
        navermaps.Event.once(map, 'bounds_changed', () => {
          if (marker) {
            marker.setPosition(map.getCenter());
            circle.setCenter(map.getCenter());
          }
        });
      }
    }
  }, [map, nowUserPosition]);

  useEffect(() => {
    if (geometricData != null && map) {
      const jeju = new navermaps.LatLng(geometricData.lat, geometricData.lng);
      map.setCenter(jeju);
      map.setZoom(16);
    }
  }, [geometricData]);

  return (
    <>
      <NaverMap
        mapDivId={'maps-getting-started-uncontrolled'} // default: react-naver-map
        style={{
          width: '100%',
          height: '80vh',
        }}
        naverRef={mapRef}
        defaultCenter={{ lat: 37.3595704, lng: 127.105399 }}
        defaultZoom={15}
      ></NaverMap>
      {showdaum && (
        <Daum searchAddressToCoordinate={searchAddressToCoordinate} />
      )}
      <section>
        <button
          onClick={() => {
            setShowdaum(!showdaum);
          }}
        >
          기준
        </button>
      </section>
    </>
  );
}

export default App;
