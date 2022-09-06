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
  const [geometricData, setGeometricData] = useState(null);
  const [marker, setMarker] = useState(null);
  const [circle, setCircle] = useState(null);
  const navermaps = window.naver.maps;
  const mapRef = useRef(null);

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

  useEffect(() => {
    const map = mapRef.current.instance;
    console.log('hi');
    setMarker(
      new navermaps.Marker({
        position: new navermaps.LatLng(37.3595704, 127.105399),
        map: map,
      })
    );
    setCircle(
      new navermaps.Circle({
        map: map,
        center: new navermaps.LatLng(37.3595704, 127.105399),
        radius: 350,
        strokeColor: '#5347AA',
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: '#E51D1A',
        fillOpacity: 0.3,
      })
    );

    navermaps.Event.addListener(map, 'bounds_changed', () => {
      if (marker) {
        marker.setPosition(map.getCenter());
        circle.setCenter(map.getCenter());
      }
    });
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const jeju = new navermaps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        setGeometricData({
          lng: position.coords.latitude,
          lat: position.coords.longitude,
        });
        if (marker) {
          marker.setPosition(jeju);
        }
        map.setCenter(jeju); // 중심 좌표 이동
        map.setZoom(14);
      },
      () => {},
      { enableHighAccuracy: true }
    );
  }, []);
  useEffect(() => {
    const map = mapRef.current.instance;

    if (geometricData != null) {
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
        defaultCenter={{ lat: 37.677571, lng: 126.796238 }}
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
