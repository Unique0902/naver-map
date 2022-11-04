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
import opponentStartMarkerImg from './images/opponentStartMarker.png';
import opponentArriveMarkerImg from './images/opponentArriveMarker.png';
import nowPosImg from './images/nowPos.png';
import Chat from './components/chat/chat';
import Chats from './components/chats/chats';
import MatchingCircle from './components/matchingCircle/matchingCircle';
import PromiseSec from './components/timeSec/promiseSec';

function App({
  findMatchingService,
  chatService,
  chattingRoomService,
  matchService,
  promiseService,
  socketClient,
}) {
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
  const [matchDataNum, setMatchDataNum] = useState(null);
  const [opponentStartMarker, setOpponentStartMarker] = useState(null);
  const [opponentStartCircle, setOpponentStartCircle] = useState(null);
  const [opponentArriveMarker, setOpponentArriveMarker] = useState(null);
  const [opponentArriveCircle, setOpponentArriveCircle] = useState(null);
  const [matchId, setMatchId] = useState('');
  const [roomId, setRoomId] = useState('');
  const [userId, setUserId] = useState('');
  const [promiseId, setPromiseId] = useState('');
  const [matchMakeStopSync, setMatchMakeStopSync] = useState(null);
  const [promiseMakeStopSync, setPromiseMakeStopSync] = useState(null);
  const [promisingTime, setPromisingTime] = useState(null);
  const [promisingLoc, setPromisingLoc] = useState(null);
  const [chattingArr, setChattingArr] = useState([
    {
      id: 543,
      roomId: 3,
      text: '감사합니다. 저도 즐거웠어요',
      createdAt: '10:30 오전',
      isMe: false,
      userId: 'sfss',
      date: '2021년 2월 20일',
      time: '오후 3:30',
    },
    {
      id: 6324,
      roomId: 3,
      text: '님들~ 저도 덕분에 방송할때 너무 행복합니다.',
      createdAt: '10:30 오전',
      isMe: true,
      userId: 'sfss',
      date: '2021년 2월 20일',
      time: '오후 3:30',
    },
  ]);

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
    if (window.userId != undefined) {
      setUserId(window.userId);
    } else {
      setUserId('dsafsafdsaf');
    }
  }, [window.userId]);

  useEffect(() => {
    if (userId) {
      socketClient.joinUser(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (roomId) {
      socketClient.joinChattingRoom(roomId.toString());
    }
  }, [roomId]);

  useEffect(() => {
    if (roomId) {
    }
  }, [roomId]);
  useEffect(() => {
    if (roomId) {
      const stopSync = promiseService.onMakeSync((promise) => {
        setPromiseId(promise.id);
        stopSync.then((stop) => stop());
        let nowTime = new Date();
        const time = nowTime.toLocaleTimeString();
        const date = nowTime.toLocaleDateString();
        const promiseTime = new Date(promise.time);
        const fhour = promiseTime.getHours();
        const bigTime = fhour > 12 ? '오후' : '오전';
        const hour = fhour % 12 == 0 ? 12 : fhour % 12;
        chatService.postChat({
          text: `${promiseTime.getMonth()}월 ${promiseTime.getDate()}일 ${bigTime} ${hour}:${promiseTime.getMinutes()} <${
            promise.loc
          }>에서의 약속이 만들어졌어요.`,
          userId: 'admin',
          roomId,
          date,
          time,
        });
      });
      setPromiseMakeStopSync(stopSync);
    }
  }, [roomId]);

  useEffect(() => {
    if (promiseId) {
      setNowSettingPos('promised');
      map.setSize(
        map
          .getSize()
          .mul(1, 0)
          .add(0, window.innerHeight * 0.6)
      );
    }
  }, [promiseId]);

  const removeOpponentData = () => {
    setOpponentStartMarker((opponentStartMarker) => {
      opponentStartMarker.setVisible(false);
      return null;
    });
    setOpponentArriveMarker((opponentArriveMarker) => {
      opponentArriveMarker.setVisible(false);
      return null;
    });
    setOpponentStartCircle((opponentStartCircle) => {
      opponentStartCircle.setVisible(false);
      return null;
    });
    setOpponentArriveCircle((opponentArriveCircle) => {
      opponentArriveCircle.setVisible(false);
      return null;
    });
  };

  useEffect(() => {
    if (roomId) {
      const stopSync = matchService.onDeleteSync((match) => {
        window.alert('매치가 취소되었습니다.');
        socketClient.leaveChattingRoom(roomId);
        setRoomId(null);
        removeOpponentData();
        map.setSize(map.getSize().mul(1, 1.333));
        setNowSettingPos('end');
        setMatchId(null);
        setConnectOnce(true);
        promiseMakeStopSync.then((stop) => stop());
        setPromiseMakeStopSync(null);
        stopSync.then((stop) => stop());
      });
    }
  }, [matchService, roomId]);

  useEffect(() => {
    if (roomId) {
      chatService.getChats(roomId).then((data) => {
        if (data.chats) {
          console.log(data.chats);
          const chatsArr = data.chats;
          for (let i = 0; i < data.chats.length; i++) {
            if (chatsArr[i].userId == userId) {
              chatsArr[i].isMe = true;
            } else {
              chatsArr[i].isMe = false;
            }
          }
          setChattingArr([...chatsArr]);
        }
      });
      console.log(roomId);
      const stopSync = chatService.onSync((chat) => {
        onCreated(chat);
      });
      return () => stopSync();
    }
  }, [chatService, roomId]);

  const onCreated = (chat) => {
    if (chat.userId == userId) {
      chat.isMe = true;
    } else {
      chat.isMe = false;
    }
    chat.id = Date.now();
    setChattingArr((chattingArr) => [...chattingArr, chat]);
  };

  const makeOpponentData = (matchData) => {
    const startPos = new navermaps.LatLng(matchData.slat, matchData.slng);
    const arrivePos = new navermaps.LatLng(matchData.alat, matchData.alng);
    setOpponentStartMarker(
      new navermaps.Marker({
        position: startPos,
        map: map,
        icon: {
          content: `<img src= ${opponentStartMarkerImg} alt="" style="width:40px; height:60px; position:absolute; top:-60px; left: -20px;" />`,
        },
      })
    );
    setOpponentArriveMarker(
      new navermaps.Marker({
        position: arrivePos,
        map: map,
        icon: {
          content: `<img src= ${opponentArriveMarkerImg} alt="" style="width:40px; height:60px; position:absolute; top:-60px; left: -20px;" />`,
        },
      })
    );
    setOpponentStartCircle(
      new navermaps.Circle({
        map: map,
        center: startPos,
        radius: matchData.srad,
        strokeColor: '#FFD422',
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: '#FFD422',
        fillOpacity: 0.3,
      })
    );
    setOpponentArriveCircle(
      new navermaps.Circle({
        map: map,
        center: arrivePos,
        radius: matchData.arad,
        strokeColor: '#5AAAE7',
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: '#5AAAE7',
        fillOpacity: 0.3,
      })
    );
  };

  useEffect(() => {
    if (matchDataNum) {
      if (matchId) {
        matchService.take(matchId).then((data) => {
          if (matchDataNum == 1) {
            findMatchingService
              .take(data.data.matchData2Id)
              .then((matchData) => {
                makeOpponentData(matchData.data);
              });
          } else if (matchDataNum == 2) {
            findMatchingService
              .take(data.data.matchData1Id)
              .then((matchData) => {
                makeOpponentData(matchData.data);
              });
          }
        });
      }
    }
  }, [matchDataNum]);

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
          strokeColor: '#FF5023',
          strokeOpacity: 0.5,
          strokeWeight: 2,
          fillColor: '#FF5023',
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
          strokeColor: '#00E0D7',
          strokeOpacity: 0.5,
          strokeWeight: 2,
          fillColor: '#00E0D7',
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
          strokeColor: '#FF5023',
          strokeOpacity: 0.5,
          strokeWeight: 2,
          fillColor: '#FF5023',
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
          strokeColor: '#00E0D7',
          strokeOpacity: 0.5,
          strokeWeight: 2,
          fillColor: '#00E0D7',
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
    map.fitBounds([startPos, arrivePos], {
      top: 50,
      right: 50,
      bottom: 50,
      left: 50,
    });
  };
  const [connectOnce, setConnectOnce] = useState(true);
  useEffect(() => {
    if (matchId) {
      if (connectOnce) {
        setTimeout(() => {
          setNowSettingPos('connected');
          map.setSize(map.getSize().mul(1, 0.6));
          showResultDistance(
            startMarker.getPosition(),
            arriveMarker.getPosition()
          );
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
      {(nowSettingPos === 'start' ||
        nowSettingPos === 'arrive' ||
        nowSettingPos === 'amendStart' ||
        nowSettingPos === 'amendArrive') && (
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
      {(nowSettingPos === 'start' ||
        nowSettingPos === 'arrive' ||
        nowSettingPos === 'amendStart' ||
        nowSettingPos === 'amendArrive') && (
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
        {(nowSettingPos === 'start' ||
          nowSettingPos === 'arrive' ||
          nowSettingPos === 'amendStart' ||
          nowSettingPos === 'amendArrive') && (
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
      {nowSettingPos === 'matching' && <MatchingCircle matchId={matchId} />}
      {nowSettingPos === 'matching' && (
        <button
          className={styles.matchingCancelBtn}
          onClick={() => {
            setNowSettingPos('end');
            matchMakeStopSync.then((stop) => stop());
            setMatchMakeStopSync(null);
            map.setSize(map.getSize().mul(1, 0.8));
            findMatchingService.cancel(userId);
          }}
        >
          취소하기
        </button>
      )}
      {nowSettingPos === 'connected' && (
        <button
          className={styles.matchingCancelBtn}
          onClick={() => {
            if (window.confirm('매칭을 취소하시겠습니까?')) {
              matchService.end('cancel', matchId).then((data) => {
                if (!data) {
                  console.error('서버이상..');
                  return;
                }
                matchService.cancel(matchId, roomId);
                chattingRoomService.update(roomId, data.beforeMatchId);
                findMatchingService.cancelById(data.findMatchData1Id);
                findMatchingService.cancelById(data.findMatchData2Id);
              });
            }
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
                    userId,
                    startMarker.getPosition().lat(),
                    startMarker.getPosition().lng(),
                    arriveMarker.getPosition().lat(),
                    arriveMarker.getPosition().lng(),
                    startCircle.getRadius(),
                    arriveCircle.getRadius()
                  )
                  .then((data) => {
                    if (data.roomId) {
                      setRoomId(data.roomId);
                      setMatchDataNum(1);
                    }
                    if (data.matchId) {
                      setMatchId(data.matchId);
                    } else {
                      const stopSync = matchService.onMakeSync((match) => {
                        console.log(match);
                        setMatchId(match.id);
                        setMatchDataNum(2);
                        chattingRoomService
                          .findByMatchId(match.id)
                          .then((data) => {
                            if (data.room) {
                              setRoomId(data.room.id);
                            }
                          });
                        stopSync.then((stop) => stop());
                      });
                      setMatchMakeStopSync(stopSync);
                    }
                  });
              }}
            >
              매칭하기
            </button>
          </div>
        </section>
      )}{' '}
      {(nowSettingPos === 'start' ||
        nowSettingPos === 'arrive' ||
        nowSettingPos === 'amendStart' ||
        nowSettingPos === 'amendArrive') && (
        <section className={styles.lowSec}>
          <button
            className={styles.startBtn}
            onClick={() => {
              if (nowSettingPos === 'start' || nowSettingPos === 'amendStart') {
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
      {(nowSettingPos === 'connected' || nowSettingPos === 'promised') && (
        <Chats
          chattingArr={chattingArr}
          setChattingArr={setChattingArr}
          chatService={chatService}
          userId={userId}
          roomId={roomId}
        />
      )}
      {nowSettingPos === 'connected' && (
        <button
          className={styles.promiseStartBtn}
          onClick={() => {
            map.setSize(map.getSize().mul(1, 0.25));
            setNowSettingPos('promising');
          }}
        >
          시작하기
        </button>
      )}
      {nowSettingPos === 'promising' && (
        <PromiseSec
          promisingTime={promisingTime}
          setPromisingTime={setPromisingTime}
          promisingLoc={promisingLoc}
          setPromisingLoc={setPromisingLoc}
          promiseService={promiseService}
          promiseId={promiseId}
          setPromiseId={setPromiseId}
          matchId={matchId}
          roomId={roomId}
        />
      )}
      {nowSettingPos === 'promising' && (
        <button
          className={styles.cancelBtn}
          onClick={() => {
            map.setSize(map.getSize().mul(1, 4));
            setNowSettingPos('connected');
          }}
        >
          X
        </button>
      )}
      {/* <button
        onClick={() => {
          setUserId('kTS6spXzyTX8Ztdiglpchl8nD5i2');
        }}
      >
        sfsa
      </button> */}
    </>
  );
}

export default App;
