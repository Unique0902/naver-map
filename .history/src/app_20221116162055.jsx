import React, { useRef, useEffect, useState } from 'react';
import styles from './app.module.css';
import { NaverMap } from 'react-naver-maps';
import Daum from './components/daum/daum';
import startMarkerImg from './images/startMarker.png';
import arriveMarkerImg from './images/arriveMarker.png';
import opponentStartMarkerImg from './images/opponentStartMarker.png';
import opponentArriveMarkerImg from './images/opponentArriveMarker.png';
import nowPosImg from './images/nowPos.png';
import Chats from './components/chats/chats';
import MatchingCircle from './components/matchingCircle/matchingCircle';
import PromiseSec from './components/timeSec/promiseSec';
import RadSelectBox from './components/radSelectBox/radSelectBox';
import LowSec from './components/lowSec/lowSec';
import LowBtns from './components/lowBtns/lowBtns';
import DestinationBox from './components/destinationBox/destinationBox';
import CompletedPage from './components/completedPage/completedPage';
import CanceledPage from './components/canceledPage/canceledPage';

function App({
  findMatchingService,
  chatService,
  chattingRoomService,
  matchService,
  promiseService,
  socketClient,
  userDataService,
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
  const [nowSettingPos, setNowSettingPos] = useState('loading');
  const [startAddress, setStartAddress] = useState('');
  const [startMarker, setStartMarker] = useState(null);
  const [startCircle, setStartCircle] = useState(null);
  const [arriveAddress, setArriveAddress] = useState('');
  const [arriveMarker, setArriveMarker] = useState(null);
  const [arriveCircle, setArriveCircle] = useState(null);
  const [matchDataNum, setMatchDataNum] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState('');
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
  const [promisingStartLoc, setPromisingStartLoc] = useState(null);
  const [promisingArriveLoc, setPromisingArriveLoc] = useState(null);
  const [userDataStatus, setUserDataStatus] = useState(null);
  const [opponentUserData, setOpponentUserData] = useState(null);
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
        alert('1');
      }
    );
  };
  const searchLocToAddress = (loc, onChange) => {
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
        if (onChange) {
          onChange(item);
        }
      }
    );
  };

  const getNowUserPosition = () => {
    setLoadingStatus(loadingStatus + '????????? ?????????!');
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setLoadingStatus(
          loadingStatus +
            '????????? ?????????!' +
            position.coords.latitude +
            position.coords.longitude
        );
        const pos = new navermaps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        setNowUserPosition(pos);
      },
      () => {
        alert('????????? ?????????????????????!');
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
    getNowLocation();
  }, [window.nowLocation]);

  const getNowLocation = () => {
    if (window.nowLocation != undefined) {
      alert('????????? ????????? ?????????');
      setLoadingStatus(loadingStatus + '???????????????' + window.nowLocation);
      const pos = new navermaps.LatLng(
        window.nowLocation.latitude,
        window.nowLocation.longitude
      );
      setNowUserPosition(pos);
    }
  };

  useEffect(() => {
    getUserId();
  }, [window.userId]);

  const getUserId = () => {
    setLoadingStatus(loadingStatus + '????????????????????????');
    if (window.userId != undefined) {
      setLoadingStatus(loadingStatus + '????????????????????????' + window.userId);
      setUserId(window.userId);
    } else {
      setLoadingStatus(loadingStatus + '?????????????????????');
    }
  };

  useEffect(() => {
    if (roomId) {
      chattingRoomService.getOpponentUserData(roomId, userId).then((data) => {
        if (data.opponentUserData) {
          setOpponentUserData(data.opponentUserData);
        }
      });
    }
  }, [roomId]);

  useEffect(() => {
    if (userId) {
      socketClient.joinUser(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (userId && nowUserPosition) {
      setLoadingStatus(loadingStatus + '????????? ????????????..');
      matchService.takeByUid(userId).then((data) => {
        setLoadingStatus(loadingStatus + '????????? ?????????..');
        disposeUserData(data);
      });
    }
  }, [userId, nowUserPosition]);

  const disposeUserData = (data) => {
    if (data.myMatchData) {
      setLoadingStatus(loadingStatus + '????????? ??????..');
      makeMyData(data.myMatchData);
      makeOpponentData(data.opponentMatchData);
      setRoomId(data.roomId);
      setConnectOnce(false);
      setMatchId(data.myMatchData.matchId);
      changeMapHeight(0.6);
      attentionMatchData(data.myMatchData);
      if (data.promiseData) {
        const promiseData = data.promiseData;
        setUserDataStatus('promiseData');
        setNowSettingPos('promised');
        setPromiseId(promiseData.id);
        const promiseTime = new Date(promiseData.time);
        const fhour = promiseTime.getHours();
        const bigTime = fhour >= 12 ? '??????' : '??????';
        let hour;
        if (fhour > 12) {
          hour = fhour - 12;
        } else if (fhour == 0) {
          hour = 12;
        } else {
          hour = fhour;
        }
        const minute = promiseTime.getMinutes();
        setPromisingTime({ bigTime, hour, minute });
        setPromisingStartLoc(promiseData.startLoc);
        setPromisingArriveLoc(promiseData.arriveLoc);
      } else {
        setUserDataStatus('matchData');
        setNowSettingPos('connected');
      }
    } else {
      setLoadingStatus(loadingStatus + '????????? ??????..');
      setNowSettingPos('start');
      changeMapHeight(0.8);
      setUserDataStatus('noData');
    }
  };

  const attentionMatchData = (matchData) => {
    const startPos = new navermaps.LatLng(matchData.slat, matchData.slng);
    const arrivePos = new navermaps.LatLng(matchData.alat, matchData.alng);
    showResultDistance(startPos, arrivePos);
  };

  const changeMapHeight = (per) => {
    map.setSize(
      map
        .getSize()
        .mul(1, 0)
        .add(0, window.innerHeight * per)
    );
  };

  useEffect(() => {
    if (roomId) {
      socketClient.joinChattingRoom(roomId.toString());
    }
  }, [roomId]);

  useEffect(() => {
    if (roomId && nowSettingPos == 'connected') {
      const stopSync = promiseService.onMakeSync((promise) => {
        setPromiseId(promise.id);
        stopSync.then((stop) => stop());
      });
      setPromiseMakeStopSync(stopSync);
    }
  }, [roomId, nowSettingPos]);

  useEffect(() => {
    if (nowSettingPos == 'promised') {
      changeMapHeight(0.6);
    }
  }, [nowSettingPos]);

  useEffect(() => {
    if (
      promiseId &&
      (nowSettingPos == 'connected' || nowSettingPos == 'promising')
    ) {
      setNowSettingPos('promised');
    }
  }, [promiseId, nowSettingPos]);

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
    if (promiseId) {
      const stopSync = promiseService.onDeleteSync((status) => {
        if (status == 'cancel') {
          disposeCancelPromise(stopSync);
        } else if (status == 'complete') {
          disposeCompletePromise(stopSync);
        }
      });
    }
  }, [promiseId, promiseService]);

  const disposeCancelPromise = (stopSync) => {
    window.alert('????????? ?????????????????????.');
    socketClient.leaveChattingRoom(roomId);
    // setRoomId(null);
    removeOpponentData();
    setNowSettingPos('canceled');
    setMatchId(null);
    setPromiseId(null);
    setConnectOnce(true);
    stopSync.then((stop) => stop());
  };

  const disposeCompletePromise = (stopSync) => {
    window.alert('????????? ?????????????????????.');
    socketClient.leaveChattingRoom(roomId);
    // setRoomId(null);
    removeOpponentData();
    setMatchId(null);
    setPromiseId(null);
    setConnectOnce(true);
    setNowSettingPos('complete');
    stopSync.then((stop) => stop());
  };

  useEffect(() => {
    if (nowSettingPos == 'complete' || nowSettingPos == 'canceled') {
      changeMapHeight(0);
    }
  }, [nowSettingPos]);

  useEffect(() => {
    if (roomId && nowSettingPos == 'connected') {
      const stopSync = matchService.onDeleteSync((match) => {
        cancelMatch(stopSync);
      });
    }
  }, [matchService, roomId, nowSettingPos]);

  const cancelMatch = (stopSync) => {
    window.alert('????????? ?????????????????????.');
    socketClient.leaveChattingRoom(roomId);
    setRoomId(null);
    setOpponentUserData(null);
    removeOpponentData();
    setNowSettingPos('end');
    setMatchId(null);
    setConnectOnce(true);
    changeMapHeight(0.8);
    promiseMakeStopSync && promiseMakeStopSync.then((stop) => stop());
    promiseMakeStopSync && setPromiseMakeStopSync(null);
    stopSync.then((stop) => stop());
  };

  useEffect(() => {
    if (roomId) {
      chatService.getChats(roomId).then((data) => {
        if (data.chats) {
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
    setOpponentStartMarker(returnMarker(startPos, map, opponentStartMarkerImg));
    setOpponentArriveMarker(
      returnMarker(arrivePos, map, opponentArriveMarkerImg)
    );
    setOpponentStartCircle(
      returnCircle(map, startPos, matchData.srad, '#FFD422', '#FFD422')
    );
    setOpponentArriveCircle(
      returnCircle(map, arrivePos, matchData.arad, '#5AAAE7', '#5AAAE7')
    );
  };

  const onMatchingStart = () => {
    setNowSettingPos('matching');
    changeMapHeight(1);
    const findmatch = findMatchingService
      .make(
        userId,
        startMarker.getPosition().lat(),
        startMarker.getPosition().lng(),
        arriveMarker.getPosition().lat(),
        arriveMarker.getPosition().lng(),
        startCircle.getRadius(),
        arriveCircle.getRadius(),
        startAddress,
        arriveAddress
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
            setMatchId(match.id);
            setMatchDataNum(2);
            chattingRoomService.findByMatchId(match.id).then((data) => {
              if (data.room) {
                setRoomId(data.room.id);
              }
            });
            stopSync.then((stop) => stop());
          });
          setMatchMakeStopSync(stopSync);
        }
      });
  };

  const makeMyData = (matchData) => {
    const startPos = new navermaps.LatLng(matchData.slat, matchData.slng);
    const arrivePos = new navermaps.LatLng(matchData.alat, matchData.alng);
    searchLocToAddress(startPos, setStartAddress);
    searchLocToAddress(arrivePos, setArriveAddress);
    setStartMarker(returnMarker(startPos, map, startMarkerImg));
    setArriveMarker(returnMarker(arrivePos, map, arriveMarkerImg));
    setStartCircle(
      returnCircle(map, startPos, matchData.srad, '#FFD422', '#FFD422')
    );
    setArriveCircle(
      returnCircle(map, arrivePos, matchData.arad, '#5AAAE7', '#5AAAE7')
    );
  };

  useEffect(() => {
    disposeOpponentData();
  }, [matchDataNum]);

  const disposeOpponentData = () => {
    if (matchDataNum) {
      if (matchId) {
        matchService.take(matchId).then((data) => {
          if (matchDataNum == 1) {
            findMatchingService
              .take(data.data.matchData2Id)
              .then((matchData) => {
                makeOpponentData(matchData.data);
                setMatchDataNum(null);
              });
          } else if (matchDataNum == 2) {
            findMatchingService
              .take(data.data.matchData1Id)
              .then((matchData) => {
                makeOpponentData(matchData.data);
                setMatchDataNum(null);
              });
          }
        });
      }
    }
  };

  const makeMarker = (isVisible) => {
    if (marker == null) {
      setMarker(
        new navermaps.Marker({
          position: nowUserPosition,
          map: map,
          icon: {
            content: `<img src= ${startMarkerImg} alt="" style="width:40px; height:60px; position:absolute; top:-60px; left: -20px;" />`,
          },
          visible: isVisible,
        })
      );
    }
  };

  const makeCircle = (isVisible) => {
    if (circle == null) {
      setCircle(
        new navermaps.Circle({
          map: map,
          center: nowUserPosition,
          radius: 50,
          strokeColor: '#5347AA',
          strokeOpacity: 0.5,
          strokeWeight: 2,
          fillColor: '#FBBA00',
          fillOpacity: 0.3,
          visible: isVisible,
        })
      );
    }
  };

  const makeMapEvent = () => {
    if (marker != null && circle != null) {
      removeMapEvent();
      navermaps.Event.addListener(map, 'bounds_changed', () => {
        marker.setPosition(map.getCenter());
        circle.setCenter(map.getCenter());
      });
      navermaps.Event.addListener(map, 'dragend', () => {
        searchLocToAddress(map.getCenter());
      });
      navermaps.Event.addListener(map, 'zoom_changed', () => {
        searchLocToAddress(map.getCenter());
      });
    }
  };

  const removeMapEvent = () => {
    navermaps.Event.clearListeners(map, 'bounds_changed');
    navermaps.Event.clearListeners(map, 'dragend');
    navermaps.Event.clearListeners(map, 'zoom_changed');
  };

  const makeBaiscLocStatus = (isVisible) => {
    makeMarker(isVisible);
    setArriveMarker(
      new navermaps.Marker({
        position: nowUserPosition,
        map: map,
        icon: {
          content: `<img src= ${arriveMarkerImg} alt="" style="width:40px; height:60px; position:absolute; top:-60px; left: -20px;" />`,
        },
        visible: false,
      })
    );
    makeCircle(isVisible);
    setArriveCircle(
      new navermaps.Circle({
        map: map,
        center: nowUserPosition,
        radius: 50,
        strokeColor: '#5347AA',
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: '#5347AA',
        fillOpacity: 0.3,
        visible: false,
      })
    );
    searchLocToAddress(map.getCenter());
    makeMapEvent();
    makeNowUserPosMarker();
  };

  useEffect(() => {
    if (map != null && nowUserPosition != null && userDataStatus == 'noData') {
      map.setCenter(nowUserPosition);
      makeBaiscLocStatus(true);
    }
  }, [map, nowUserPosition, userDataStatus]);

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

  const changeRadiusRefValue = (rad) => {
    radiusSelectRef.current.value = `${rad}m`;
  };

  const changeMarkerIcon = (selectedMarker, iconImg) => {
    selectedMarker.setIcon({
      content: `<img src= ${iconImg} alt="" style="width:40px; height:60px; position:absolute; top:-60px; left: -20px;" />`,
    });
  };

  const changeCircleColor = (selectedCircle, fillColor, strokeColor) => {
    selectedCircle.setStyles('fillColor', fillColor);
    selectedCircle.setStyles('strokeColor', strokeColor);
  };

  useEffect(() => {
    if (marker != null && circle != null) {
      if (nowSettingPos === 'start') {
        makeMapEvent();
      } else if (nowSettingPos === 'arrive') {
        makeMapEvent();
        changeCircleColor(startCircle, '#FFD422', '#FFD422');
      } else if (nowSettingPos === 'amendStart') {
        makeMapEvent();
        changeCircleColor(circle, '#FBBA00', '#5347AA');
        changeMarkerIcon(marker, startMarkerImg);
        changeRadiusRefValue(startCircle.getRadius());
      } else if (nowSettingPos === 'amendArrive') {
        makeMapEvent();
        changeCircleColor(circle, '#5347AA', '#5347AA');
        changeMarkerIcon(marker, arriveMarkerImg);
        changeRadiusRefValue(arriveCircle.getRadius());
      }
    } else if (nowSettingPos === 'end') {
      changeCircleColor(startCircle, '#FFD422', '#FFD422');
      changeCircleColor(arriveCircle, '#5AAAE7', '#5AAAE7');
      removeMapEvent();
    }
  }, [nowSettingPos, marker, circle]);

  useEffect(() => {
    if (nowSettingPos == 'end') {
      if (startMarker && arriveMarker && startCircle && arriveCircle) {
        setMarker(null);
        setCircle(null);
      }
    }
  }, [nowSettingPos, startMarker, arriveMarker, startCircle, arriveCircle]);

  useEffect(() => {
    if (nowSettingPos == 'end') {
      if (marker == null) {
        showResultDistance(
          startMarker.getPosition(),
          arriveMarker.getPosition()
        );
      }
    }
  }, [nowSettingPos, marker]);

  const showMarkerCircle = () => {
    marker.setVisible(true);
    circle.setVisible(true);
  };

  const hideMarkerCircle = () => {
    marker.setVisible(false);
    circle.setVisible(false);
  };

  const onCompletePromise = () => {
    promiseService.complete(promiseId, roomId);
  };

  const onCancelPromise = () => {
    if (window.confirm('????????? ?????????????????????????')) {
      promiseService.cancel(promiseId, roomId);
    }
  };

  const onAmendPromise = () => {
    setNowSettingPos('amendPromise');
    changeMapHeight(0.15);
  };

  const registerLocInform = (onAddress, settingPos) => {
    onAddress(searchedAddress);
    setNowSettingPos(settingPos);
  };

  const returnMarker = (markerPos, markerMap, markerImg) => {
    return new navermaps.Marker({
      position: markerPos,
      map: markerMap,
      icon: {
        content: `<img src= ${markerImg} alt="" style="width:40px; height:60px; position:absolute; top:-60px; left: -20px;" />`,
      },
    });
  };

  const returnCircle = (
    circleMap,
    circleCenter,
    circleRad,
    fillColor,
    strokeColor
  ) => {
    return new navermaps.Circle({
      map: circleMap,
      center: circleCenter,
      radius: circleRad,
      strokeColor,
      strokeOpacity: 0.5,
      strokeWeight: 2,
      fillColor,
      fillOpacity: 0.3,
    });
  };

  const selectPosition = () => {
    if (nowSettingPos === 'start') {
      registerLocInform(setStartAddress, 'arrive');
      setStartMarker(marker);
      setStartCircle(circle);
      arriveMarker.setPosition(map.getCenter());
      arriveMarker.setVisible(true);
      setMarker(arriveMarker);
      const rad = circle.getRadius();
      arriveCircle.setCenter(map.getCenter());
      arriveCircle.setRadius(rad);
      arriveCircle.setVisible(true);
      setCircle(arriveCircle);
    } //
    else if (nowSettingPos === 'arrive') {
      registerLocInform(setArriveAddress, 'end');
      setArriveMarker(marker);
      setArriveCircle(circle);
    } //
    else if (nowSettingPos === 'amendStart') {
      registerLocInform(setStartAddress, 'end');
    } else if (nowSettingPos === 'amendArrive') {
      registerLocInform(setArriveAddress, 'end');
    }
  };

  const onMatchingCancel = () => {
    setNowSettingPos('end');
    matchMakeStopSync.then((stop) => stop());
    setMatchMakeStopSync(null);
    changeMapHeight(0.8);
    findMatchingService.cancel(userId);
  };

  const onMatchCancel = () => {
    if (window.confirm('????????? ?????????????????????????')) {
      matchService.end('matchCancel', matchId, roomId);
    }
  };

  const selectBack = (destination) => {
    setNowSettingPos(destination);
    if (destination === 'start') {
      setStartAddress('');
      arriveMarker.setVisible(false);
      arriveCircle.setVisible(false);
      setMarker(startMarker);
      setCircle(startCircle);
    } else if (destination === 'amendStart') {
      map.setCenter(startMarker.getPosition());
      setSearchedAddress(startAddress);
      setStartAddress('');
      setMarker(startMarker);
      setCircle(startCircle);
    } else if (destination === 'amendArrive') {
      map.setCenter(arriveMarker.getPosition());
      setSearchedAddress(arriveAddress);
      setArriveAddress('');
      setMarker(arriveMarker);
      setCircle(arriveCircle);
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
      disposeConnectedMatch();
    }
  }, [matchId]);

  const disposeConnectedMatch = () => {
    if (connectOnce) {
      setTimeout(() => {
        setNowSettingPos('connected');
        changeMapHeight(0.6);
        showResultDistance(
          startMarker.getPosition(),
          arriveMarker.getPosition()
        );
      }, 2000);
      setConnectOnce(false);
    }
  };

  return (
    <>
      <NaverMap
        mapDivId={'maps-getting-started-uncontrolled'} // default: react-naver-map
        style={{
          width: '100%',
          height: '0',
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
        <RadSelectBox
          radiusSelectRef={radiusSelectRef}
          changeUserRadius={changeUserRadius}
        />
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
            ??????
          </button>
        )}

        {nowSettingPos === 'arrive' && (
          <button
            className={styles.backBtn}
            onClick={() => {
              selectBack('start');
            }}
          >
            ??????
          </button>
        )}
      </section>
      {nowSettingPos === 'end' && (
        <DestinationBox
          startAddress={startAddress}
          arriveAddress={arriveAddress}
        />
      )}
      {nowSettingPos === 'matching' && <MatchingCircle matchId={matchId} />}
      {nowSettingPos === 'matching' && !matchId && (
        <button
          className={styles.matchingCancelBtn}
          onClick={() => {
            onMatchingCancel();
          }}
        >
          ????????????
        </button>
      )}
      {nowSettingPos === 'connected' && (
        <button
          className={styles.matchingCancelBtn}
          onClick={() => {
            onMatchCancel();
          }}
        >
          ????????????
        </button>
      )}
      {nowSettingPos === 'end' && (
        <LowBtns selectBack={selectBack} onMatchingStart={onMatchingStart} />
      )}{' '}
      {(nowSettingPos === 'start' ||
        nowSettingPos === 'arrive' ||
        nowSettingPos === 'amendStart' ||
        nowSettingPos === 'amendArrive') && (
        <LowSec
          setShowdaum={setShowdaum}
          showdaum={showdaum}
          searchedAddress={searchedAddress}
          startAddress={startAddress}
          nowSettingPos={nowSettingPos}
          arriveAddress={arriveAddress}
        />
      )}
      {(nowSettingPos === 'connected' || nowSettingPos === 'promised') && (
        <Chats
          chattingArr={chattingArr}
          setChattingArr={setChattingArr}
          chatService={chatService}
          userId={userId}
          roomId={roomId}
          opponentUserData={opponentUserData}
        />
      )}
      {nowSettingPos === 'connected' && (
        <button
          className={styles.promiseStartBtn}
          onClick={() => {
            changeMapHeight(0.15);
            setNowSettingPos('promising');
          }}
        >
          ????????????
        </button>
      )}
      {(nowSettingPos === 'promising' || nowSettingPos === 'amendPromise') && (
        <PromiseSec
          promisingTime={promisingTime}
          setPromisingTime={setPromisingTime}
          promisingStartLoc={promisingStartLoc}
          setPromisingStartLoc={setPromisingStartLoc}
          promisingArriveLoc={promisingArriveLoc}
          setPromisingArriveLoc={setPromisingArriveLoc}
          promiseService={promiseService}
          promiseId={promiseId}
          setPromiseId={setPromiseId}
          matchId={matchId}
          roomId={roomId}
          chatService={chatService}
          nowSettingPos={nowSettingPos}
          setNowSettingPos={setNowSettingPos}
        />
      )}
      {nowSettingPos === 'promising' && (
        <button
          className={styles.cancelBtn}
          onClick={() => {
            changeMapHeight(0.6);
            setNowSettingPos('connected');
          }}
        >
          X
        </button>
      )}
      {nowSettingPos === 'amendPromise' && (
        <button
          className={styles.cancelBtn}
          onClick={() => {
            changeMapHeight(0.6);
            setNowSettingPos('promised');
          }}
        >
          X
        </button>
      )}
      {nowSettingPos === 'promised' && (
        <section className={styles.disposePromiseBtns}>
          <button
            className={styles.promiseCancelBtn}
            onClick={() => {
              onCancelPromise();
            }}
          >
            ????????????
          </button>
          <button
            className={styles.promiseAmendBtn}
            onClick={() => {
              onAmendPromise();
            }}
          >
            ????????????
          </button>
          <button
            className={styles.promiseCompeleteBtn}
            onClick={() => {
              onCompletePromise();
            }}
          >
            ????????????
          </button>
        </section>
      )}
      {nowSettingPos == 'complete' && (
        <CompletedPage
          opponentUserData={opponentUserData}
          userDataService={userDataService}
          roomId={roomId}
          userId={userId}
        />
      )}
      {nowSettingPos == 'canceled' && (
        <CanceledPage
          opponentUserData={opponentUserData}
          userDataService={userDataService}
          roomId={roomId}
          setNowSettingPos={setNowSettingPos}
          setRoomId={setRoomId}
          changeMapHeight={changeMapHeight}
          userId={userId}
        />
      )}
      {nowSettingPos == 'loading' && <div className={styles.loading}></div>}
      {nowSettingPos == 'loading' && (
        <div className={styles.safa}>{loadingStatus}</div>
      )}
      <button
        onClick={() => {
          setUserId('dsafsafdsaf');
        }}
      >
        ????????? uid??????!
      </button>
    </>
  );
}

export default App;
