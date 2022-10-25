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
import startMarkerImg from './images/startMarker.png';
import arriveMarkerImg from './images/arriveMarker.png';
import nowPosImg from './images/nowPos.png';
import sendBtnImg from './images/sendBtn.png';

function App({ findMatchingService }) {
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
  const [matchId, setMatchId] = useState('');
  const [intv, setIntv] = useState('');
  const [chattingArr, setChattingArr] = useState([]);

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
      () => {
        alert('주소를 찾을수없습니다!');
      },
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
            content: `<img src= ${nowPosImg} alt="" style="width:20px; height:20px; position:absolute; top:-10px; left: -10px;" />`,
          },
        })
      );
    }
  };
  const moveToNowLoc = () => {
    map.setCenter(nowUserPosition);
    searchLocToAddress(map.getCenter());
  };
  useEffect(() => {
    setMap(mapRef.current.instance);
    getNowUserPosition();
  }, []);

  useEffect(() => {
    if (window.nowLocation != undefined) {
      const pos = new navermaps.LatLng(
        window.nowLocation.latitude,
        window.nowLocation.longitude
      );
      setNowUserPosition(pos);
    }
  }, [window.nowLocation]);

  useEffect(() => {
    if (map != null && nowUserPosition != null) {
      map.setCenter(nowUserPosition); // 중심 좌표 이동
      const HOME_PATH = window.HOME_PATH || '.';
      if (marker == null) {
        setMarker(
          new navermaps.Marker({
            position: nowUserPosition,
            map: map,
            icon: {
              content: `<img src= ${startMarkerImg} alt="" style="width:40px; height:60px; position:absolute; top:-60px; left: -20px;" />`,
            },
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
        navermaps.Event.addListener(map, 'dragend', () => {
          searchLocToAddress(map.getCenter());
        });
        navermaps.Event.addListener(map, 'zoom_changed', () => {
          searchLocToAddress(map.getCenter());
        });
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
      case '50m':
        circle.setRadius(50);
        return;
      case '100m':
        circle.setRadius(100);
        return;
      case '200m':
        circle.setRadius(200);
        return;
      case '500m':
        circle.setRadius(500);
        return;
    }
  };
  const selectPosition = () => {
    if (nowSettingPos === 'start') {
      setStartAddress(searchedAddress);
      marker.setIcon({
        content: `<img src= ${arriveMarkerImg} alt="" style="width:40px; height:60px; position:absolute; top:-60px; left: -20px;" />`,
      });
      setStartMarker(
        new navermaps.Marker({
          position: marker.getPosition(),
          map: map,
          icon: {
            content: `<img src= ${startMarkerImg} alt="" style="width:40px; height:60px; position:absolute; top:-60px; left: -20px;" />`,
          },
        })
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
        new navermaps.Marker({
          position: marker.getPosition(),
          map: map,
          icon: {
            content: `<img src= ${arriveMarkerImg} alt="" style="width:40px; height:60px; position:absolute; top:-60px; left: -20px;" />`,
          },
        })
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
      setNowSettingPos('end');
      marker.setVisible(false);
      circle.setVisible(false);
      showResultDistance(startMarker.getPosition(), marker.getPosition());
    } else if (nowSettingPos === 'amendStart') {
      setStartAddress(searchedAddress);
      setStartMarker(
        new navermaps.Marker({
          position: marker.getPosition(),
          map: map,
          icon: {
            content: `<img src= ${startMarkerImg} alt="" style="width:40px; height:60px; position:absolute; top:-60px; left: -20px;" />`,
          },
        })
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
      setNowSettingPos('end');
      marker.setVisible(false);
      circle.setVisible(false);
      showResultDistance(marker.getPosition(), arriveMarker.getPosition());
    } else if (nowSettingPos === 'amendArrive') {
      setArriveAddress(searchedAddress);
      setArriveMarker(
        new navermaps.Marker({
          position: marker.getPosition(),
          map: map,
          icon: {
            content: `<img src= ${arriveMarkerImg} alt="" style="width:40px; height:60px; position:absolute; top:-60px; left: -20px;" />`,
          },
        })
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
      setNowSettingPos('end');
      marker.setVisible(false);
      circle.setVisible(false);
      showResultDistance(startMarker.getPosition(), marker.getPosition());
    }
  };

  const selectBack = (amend) => {
    if (nowSettingPos === 'arrive') {
      setNowSettingPos('start');
      setStartAddress('');
      marker.setIcon({
        content: `<img src= ${startMarkerImg} alt="" style="width:40px; height:60px; position:absolute; top:-60px; left: -20px;" />`,
      });
      startMarker.setVisible(false);
      startCircle.setVisible(false);
      setStartMarker(null);
      setStartCircle(null);
    } else if (amend === 'amendStart') {
      map.setCenter(startMarker.getPosition());
      setSearchedAddress(startAddress);
      setStartAddress('');
      console.log('hi');
      marker.setVisible(true);
      circle.setVisible(true);
      marker.setIcon({
        content: `<img src= ${startMarkerImg} alt="" style="width:40px; height:60px; position:absolute; top:-60px; left: -20px;" />`,
      });
      startMarker.setVisible(false);
      startCircle.setVisible(false);
      setStartMarker(null);
      setStartCircle(null);
    } else if (amend === 'amendArrive') {
      map.setCenter(arriveMarker.getPosition());
      setSearchedAddress(arriveAddress);
      setArriveAddress('');
      marker.setVisible(true);
      circle.setVisible(true);
      marker.setIcon({
        content: `<img src= ${arriveMarkerImg} alt="" style="width:40px; height:60px; position:absolute; top:-60px; left: -20px;" />`,
      });
      arriveMarker.setVisible(false);
      arriveCircle.setVisible(false);
      setArriveMarker(null);
      setArriveCircle(null);
    }
  };
  const showResultDistance = (startPos, arrivePos) => {
    // const projection = map.getProjection();
    // const meter = projection.getDistance(startPos, arrivePos);
    // const middleLat = (startPos.lat() + arrivePos.lat()) / 2;
    // const middleLng = (startPos.lng() + arrivePos.lng()) / 2;
    // const middlePos = new navermaps.LatLng(middleLat, middleLng);
    map.fitBounds([startPos, arrivePos], {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    });
    // map.setCenter(middlePos);
    // console.log(meter);
  };
  const [connectOnce, setConnectOnce] = useState(true);
  useEffect(() => {
    if (matchId) {
      if (connectOnce) {
        setTimeout(() => {
          setNowSettingPos('connected');
          map.setSize(map.getSize().mul(1, 0.6));
        }, 2000);
        setConnectOnce(false);
      }
    }
  }, [matchId]);
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
        defaultZoom={17}
        minZoom={10}
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
      {nowSettingPos !== 'end' &&
        nowSettingPos !== 'matching' &&
        nowSettingPos !== 'connected' && (
          <button
            className={styles.nowLoc}
            onClick={() => {
              moveToNowLoc();
            }}
          >
            <i className='fa-solid fa-location-crosshairs'></i>
          </button>
        )}
      {nowSettingPos === 'end' && (
        <button
          className={styles.nowDestination}
          onClick={() => {
            showResultDistance(
              startMarker.getPosition(),
              arriveMarker.getPosition()
            );
          }}
        >
          <i className='fa-solid fa-location-crosshairs'></i>
        </button>
      )}
      {nowSettingPos !== 'end' &&
        nowSettingPos !== 'matching' &&
        nowSettingPos !== 'connected' && (
          <section className={styles.radiusSec}>
            <p className={styles.radiusTitle}>영역 반지름</p>
            <select
              className={styles.radiusSelect}
              ref={radiusSelectRef}
              onChange={() => {
                changeUserRadius();
              }}
            >
              <option value='50m'>50m</option>
              <option value='100m'>100m</option>
              <option value='200m'>200m</option>
              <option value='500m'>500m</option>
            </select>
          </section>
        )}
      <section className={styles.selBtns}>
        {nowSettingPos !== 'end' &&
          nowSettingPos !== 'matching' &&
          nowSettingPos !== 'connected' && (
            <button
              className={styles.selectBtn}
              onClick={() => {
                selectPosition();
              }}
            >
              선택
            </button>
          )}

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
      {nowSettingPos === 'end' && (
        <div className={styles.destinationResult}>
          <p className={styles.startText}>{startAddress}</p>
          <p className={styles.middleText}>{'>'}</p>
          <p className={styles.arriveText}>{arriveAddress}</p>
        </div>
      )}
      {nowSettingPos === 'matching' && (
        <section className={styles.matchingSec}>
          {matchId ? (
            <div className={styles.loadingBorder}></div>
          ) : (
            <div className={styles.loadingSpinner}></div>
          )}
          <div className={styles.matchingStatus}>
            <p className={styles.matchingStatusText}>
              {matchId ? '매칭완료' : '매칭중'}
            </p>
          </div>
        </section>
      )}
      {nowSettingPos === 'matching' && (
        <button
          className={styles.matchingCancelBtn}
          onClick={() => {
            setNowSettingPos('end');
            map.setSize(map.getSize().mul(1, 0.8));
            clearInterval(intv);
            findMatchingService.cancel('dsafsafdsaf');
          }}
        >
          취소하기
        </button>
      )}
      {nowSettingPos === 'end' && (
        <section className={styles.lowSec}>
          <div className={styles.lowSecBtns}>
            <div className={styles.lowTopBtns}>
              <button
                className={`${styles.lowTopBtn} ${styles.lowBtn}`}
                onClick={() => {
                  setNowSettingPos('amendStart');
                  selectBack('amendStart');
                }}
              >
                출발
              </button>
              <button
                className={`${styles.lowTopBtn} ${styles.lowBtn}`}
                onClick={() => {
                  setNowSettingPos('amendArrive');
                  selectBack('amendArrive');
                }}
              >
                도착
              </button>
            </div>
            <button
              className={`${styles.lowMatchingBtn} ${styles.lowBtn}`}
              onClick={() => {
                setNowSettingPos('matching');
                map.setSize(map.getSize().mul(1, 1.25));
                const findmatch = findMatchingService
                  .make(
                    'dsafsafdsaf',
                    startMarker.getPosition().lat(),
                    startMarker.getPosition().lng(),
                    arriveMarker.getPosition().lat(),
                    arriveMarker.getPosition().lng(),
                    startCircle.getRadius(),
                    arriveCircle.getRadius()
                  )
                  .then((data) => {
                    if (data.matchId) {
                      setMatchId(data.matchId);
                    } else {
                      const interval = setInterval(() => {
                        if (matchId) {
                          console.log('매칭됨');
                          clearInterval(interval);
                          return;
                        } else {
                          console.log('매칭중..');
                          findMatchingService
                            .check(data.newFindMatchId)
                            .then((data) => {
                              if (data.matchId) {
                                setMatchId(data.matchId);
                                clearInterval(interval);
                              }
                            });
                        }
                      }, 2000);
                      setIntv(interval);
                    }
                  });
              }}
            >
              매칭하기
            </button>
          </div>
        </section>
      )}{' '}
      {nowSettingPos !== 'end' &&
        nowSettingPos !== 'matching' &&
        nowSettingPos !== 'connected' && (
          <section className={styles.lowSec}>
            <button
              className={styles.startBtn}
              onClick={() => {
                if (
                  nowSettingPos === 'start' ||
                  nowSettingPos === 'amendStart'
                ) {
                  setShowdaum(!showdaum);
                }
              }}
            >
              <p>
                출발:{' '}
                {nowSettingPos === 'start' || nowSettingPos === 'amendStart'
                  ? searchedAddress || ' '
                  : startAddress || ' '}
              </p>
            </button>
            <button
              className={styles.arriveBtn}
              onClick={() => {
                if (
                  nowSettingPos === 'arrive' ||
                  nowSettingPos === 'amendArrive'
                ) {
                  setShowdaum(!showdaum);
                }
              }}
            >
              <p>
                도착:{' '}
                {nowSettingPos === 'arrive' || nowSettingPos === 'amendArrive'
                  ? searchedAddress || ' '
                  : arriveAddress || ' '}
              </p>
            </button>
          </section>
        )}
      {nowSettingPos === 'connected' && (
        <section className={styles.chattingSec}>
          {chattingArr ? <div>hi</div> : <div>채팅이 없습니다.</div>}
          <section className={styles.chatsSec}></section>
          <div className={styles.msgForm}>
            <input
              type='text'
              className={styles.chatInform}
              placeholder={'메세지를 남겨보세요!'}
            />
            <button className={styles.chatBtn}>
              <img src={sendBtnImg} alt='' className={styles.sendBtn} />
            </button>
          </div>
        </section>
      )}
    </>
  );
}

export default App;
