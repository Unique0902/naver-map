import React, { useRef } from 'react';
import styles from './app.module.css';
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
  const [searchedLoc, setSearchedLoc] = useState(null);
  const [searchedAddress, setSearchedAddress] = useState('');
  const [marker, setMarker] = useState(null);
  const [circle, setCircle] = useState(null);
  const navermaps = window.naver.maps;
  const mapRef = useRef(null);
  const radiusSelectRef = useRef(null);
  const [map, setMap] = useState(null);
  const [nowUserPosition, setNowUserPosition] = useState(null);
  const [nowUserPosMarker, setNowUserPosMarker] = useState(null);
  const [nowSettingPos, setNowSettingPos] = useState('start');
  const [startAddress, setStartAddress] = useState('');
  const [startMarker, setStartMarker] = useState(null);
  const [startCircle, setStartCircle] = useState(null);
  const [arriveAddress, setArriveAddress] = useState('');
  const [arriveMarker, setArriveMarker] = useState(null);
  const [arriveCircle, setArriveCircle] = useState(null);

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
        const pos = new navermaps.LatLng(item.y, item.x);
        setSearchedLoc(pos);
      }
    );
  };
  const searchLocToAddress = (loc) => {
    navermaps.Service.reverseGeocode(
      {
        location: loc,
      },
      function (status, response) {
        if (status === navermaps.Service.Status.ERROR) {
          if (!loc) {
            return alert('Address Error, Please check geocode');
          }
          return alert('Address Error, geocode:' + loc);
        }

        if (response.result.total === 0) {
          return alert('No result.');
        }
        let item = response.result.items[0].address;
        setSearchedAddress(item);
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
      },
      () => {},
      { enableHighAccuracy: true }
    );
  };
  const makeNowUserPosMarker = () => {
    if (nowUserPosition != null && nowUserPosMarker == null) {
      setNowUserPosMarker(
        new navermaps.Marker({
          position: nowUserPosition,
          map: map,
          animation: 1,
          icon: {
            url: 'img/nowPos.png',
            size: new navermaps.Size(50, 52),
          },
        })
      );
    }
  };
  const moveToNowLoc = () => {
    map.setCenter(nowUserPosition);
  };
  useEffect(() => {
    setMap(mapRef.current.instance);
    getNowUserPosition();
  }, []);

  useEffect(() => {
    if (map != null && nowUserPosition != null) {
      map.setCenter(nowUserPosition); // 중심 좌표 이동
      if (marker == null) {
        const HOME_PATH = window.HOME_PATH || '.';
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
            radius: 20,
            strokeColor: '#5347AA',
            strokeOpacity: 0.5,
            strokeWeight: 2,
            fillColor: '#FBBA00',
            fillOpacity: 0.3,
          })
        );
      }
      searchLocToAddress(map.getCenter());
      if (marker != null && circle != null) {
        if (navermaps.Event.hasListener(map, 'bounds_changed')) {
          navermaps.Event.addListener(map, 'bounds_changed', () => {
            marker.setPosition(map.getCenter());
            circle.setCenter(map.getCenter());
          });
        }
        if (navermaps.Event.hasListener(map, 'dragend')) {
          navermaps.Event.addListener(map, 'dragend', () => {
            searchLocToAddress(map.getCenter());
          });
        }
      }
      makeNowUserPosMarker();
    }
  }, [map, nowUserPosition, marker, circle]);

  useEffect(() => {
    if (searchedLoc != null) {
      map.setCenter(searchedLoc);
    }
  }, [searchedLoc]);
  const changeUserRadius = () => {
    switch (radiusSelectRef.current.value) {
      case '20m':
        circle.setRadius(20);
        return;
      case '50m':
        circle.setRadius(50);
        return;
      case '100m':
        circle.setRadius(100);
        return;
      case '500m':
        circle.setRadius(500);
        return;
    }
  };
  const selectPosition = () => {
    if (nowSettingPos === 'start') {
      setStartAddress(searchedAddress);
      setStartMarker(
        new navermaps.Marker({ position: marker.getPosition(), map: map })
      );
      setStartCircle(
        new navermaps.Circle({
          map: map,
          center: circle.getCenter(),
          radius: circle.getRadius(),
          strokeColor: '#5347AA',
          strokeOpacity: 0.5,
          strokeWeight: 2,
          fillColor: '#E51D1A',
          fillOpacity: 0.3,
        })
      );
      setNowSettingPos('arrive');
    } else if (nowSettingPos === 'arrive') {
      setArriveAddress(searchedAddress);
      setArriveMarker(
        new navermaps.Marker({ position: marker.getPosition(), map: map })
      );
      setArriveCircle(
        new navermaps.Circle({
          map: map,
          center: circle.getCenter(),
          radius: circle.getRadius(),
          strokeColor: '#5347AA',
          strokeOpacity: 0.5,
          strokeWeight: 2,
          fillColor: '#E51D1A',
          fillOpacity: 0.3,
        })
      );
    }
  };

  const selectBack = () => {
    setNowSettingPos('start');
    setStartAddress('');
    startMarker.setVisible(false);
    startCircle.setVisible(false);
    setStartMarker(null);
    setStartCircle(null);
  };
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
        minZoom={16}
        maxZoom={20}
      ></NaverMap>
      {showdaum && (
        <div className={styles.daum}>
          <div className={styles.daumCancelSec}>
            <button
              className={styles.daumCancelBtn}
              onClick={() => {
                setShowdaum(false);
              }}
            >
              X
            </button>
          </div>
          <Daum
            searchAddressToCoordinate={searchAddressToCoordinate}
            setShowdaum={setShowdaum}
          />
        </div>
      )}
      <button
        className={styles.nowLoc}
        onClick={() => {
          moveToNowLoc();
        }}
      >
        <i className='fa-solid fa-location-crosshairs'></i>
      </button>
      <section className={styles.radiusSec}>
        <p className={styles.radiusTitle}>영역 반지름</p>
        <select
          className={styles.radiusSelect}
          ref={radiusSelectRef}
          onChange={() => {
            changeUserRadius();
          }}
        >
          <option value='20m'>20m</option>
          <option value='50m'>50m</option>
          <option value='100m'>100m</option>
          <option value='500m'>500m</option>
        </select>
      </section>
      <section className={styles.selBtns}>
        <button
          className={styles.selectBtn}
          onClick={() => {
            selectPosition();
          }}
        >
          선택
        </button>
        {nowSettingPos === 'arrive' && (
          <button
            className={styles.backBtn}
            onClick={() => {
              selectBack();
            }}
          >
            뒤로
          </button>
        )}
      </section>

      <section className={styles.lowSec}>
        <button
          className={styles.startBtn}
          onClick={() => {
            setShowdaum(!showdaum);
          }}
        >
          <p>
            출발:{' '}
            {nowSettingPos === 'start'
              ? searchedAddress || ' '
              : startAddress || ' '}
          </p>
        </button>
        <button
          className={styles.arriveBtn}
          onClick={() => {
            setShowdaum(!showdaum);
          }}
        >
          <p>도착: {nowSettingPos === 'arrive' ? searchedAddress : ' '}</p>
        </button>
      </section>
    </>
  );
}

export default App;
