import React, { useState } from 'react';
import { useRef } from 'react';
import StartLocPromise from '../startLocPromise/startLocPromise';
import PromiseCheck from '../promiseCheck/promiseCheck';
import TimePromise from '../timePromise/timePromise';
import styles from './promiseSec.module.css';
import ArriveLocPromise from '../arriveLocPromise/arriveLocPromise';

const PromiseSec = ({
  promisingTime,
  setPromisingTime,
  promisingStartLoc,
  setPromisingStartLoc,
  promisingArriveLoc,
  setPromisingArriveLoc,
  promiseService,
  promiseId,
  setPromiseId,
  matchId,
  roomId,
  chatService,
  nowSettingPos,
  setNowSettingPos,
}) => {
  const [promiseLev, setPromiseLev] = useState('startLoc');
  const startLocRef = useRef();
  const arriveLocRef = useRef();
  return (
    <section className={styles.promiseSec}>
      <section className={styles.titleSec}>
        <h2 className={styles.title}>약속 정하기</h2>
      </section>
      <section className={styles.contentSec}>
        {promiseLev === 'startLoc' && (
          <StartLocPromise
            promisingStartLoc={promisingStartLoc}
            setPromisingStartLoc={setPromisingStartLoc}
            startLocRef={startLocRef}
          />
        )}
        {promiseLev === 'arriveLoc' && (
          <ArriveLocPromise
            promisingArriveLoc={promisingArriveLoc}
            setPromisingArriveLoc={setPromisingArriveLoc}
            arriveLocRef={arriveLocRef}
          />
        )}
        {promiseLev === 'time' && (
          <TimePromise
            promisingTime={promisingTime}
            setPromisingTime={setPromisingTime}
          />
        )}
        {promiseLev === 'check' && (
          <PromiseCheck
            promisingStartLoc={promisingStartLoc}
            promisingArriveLoc={promisingArriveLoc}
            promisingTime={promisingTime}
          />
        )}
      </section>
      <section className={styles.btnSec}>
        {promiseLev === 'startLoc' && (
          <>
            <button
              className={styles.nextBtn}
              onClick={() => {
                const startLoc = startLocRef.current.value;
                if (startLoc) {
                  setPromisingStartLoc(startLoc);
                }
                setPromiseLev('arriveLoc');
              }}
            >
              다음
            </button>
          </>
        )}
        {promiseLev === 'arriveLoc' && (
          <>
            <button
              className={styles.beforeBtn}
              onClick={() => {
                setPromiseLev('startLoc');
              }}
            >
              이전
            </button>
            <button
              className={styles.promiseBtn}
              onClick={() => {
                const arriveLoc = arriveLocRef.current.value;
                if (arriveLoc) {
                  setPromisingArriveLoc(arriveLoc);
                }
                setPromiseLev('time');
              }}
            >
              다음
            </button>
          </>
        )}
        {promiseLev === 'time' && (
          <>
            <button
              className={styles.beforeBtn}
              onClick={() => {
                setPromiseLev('arriveLoc');
              }}
            >
              이전
            </button>
            <button
              className={styles.promiseBtn}
              onClick={() => {
                setPromiseLev('check');
              }}
            >
              다음
            </button>
          </>
        )}
        {promiseLev === 'check' && nowSettingPos === 'promising' && (
          <>
            <button
              className={styles.beforeBtn}
              onClick={() => {
                setPromiseLev('time');
              }}
            >
              이전
            </button>
            <button
              className={styles.promiseBtn}
              onClick={() => {
                const noww = new Date();
                let fhour;
                if (promisingTime.bigTime == '오전') {
                  if (promisingTime.hour == 12) {
                    fhour = 0;
                  } else {
                    fhour = promisingTime.hour;
                  }
                } else {
                  if (promisingTime.hour == 12) {
                    fhour = 12;
                  } else {
                    fhour = promisingTime.hour + 12;
                  }
                }
                if (noww.getHours() > fhour) {
                  noww.setDate(noww.getDate() + 1);
                } else if (noww.getHours() == fhour) {
                  if (noww.getMinutes() > promisingTime.minute) {
                    noww.setDate(noww.getDate() + 1);
                  }
                }
                noww.setHours(fhour);
                noww.setMinutes(promisingTime.minute);
                noww.setSeconds(0);
                promiseService
                  .make(
                    promisingStartLoc,
                    promisingArriveLoc,
                    noww.toString(),
                    matchId,
                    roomId.toString()
                  )
                  .then((data) => {
                    if (data) {
                      console.log('약속생성됨');
                      const promiseData = data.promiseData;
                      let nowTime = new Date();
                      const time = nowTime.toLocaleTimeString();
                      const date = nowTime.toLocaleDateString();
                      const promiseTime = new Date(promiseData.time);
                      console.log(promiseTime.getMonth());
                      const fhour = promiseTime.getHours();
                      const bigTime = fhour >= 12 ? '오후' : '오전';
                      const hour = fhour % 12 == 0 ? 12 : fhour % 12;
                      chatService.postChat({
                        text: `${
                          promiseTime.getMonth() + 1
                        }월 ${promiseTime.getDate()}일 ${bigTime} ${hour}:${promiseTime.getMinutes()} <${
                          promiseData.startLoc
                        }>에서 <${
                          promiseData.arriveLoc
                        }>로의 약속이 만들어졌어요.`,
                        userId: 'admin',
                        roomId,
                        date,
                        time,
                      });
                    }
                  });
              }}
            >
              약속결정
            </button>
          </>
        )}
        {promiseLev === 'check' && nowSettingPos === 'amendPromise' && (
          <>
            <button
              className={styles.beforeBtn}
              onClick={() => {
                setPromiseLev('time');
              }}
            >
              이전
            </button>
            <button
              className={styles.promiseBtn}
              onClick={() => {
                const noww = new Date();
                let fhour;
                if (promisingTime.bigTime == '오전') {
                  if (promisingTime.hour == 12) {
                    fhour = 0;
                  } else {
                    fhour = promisingTime.hour;
                  }
                } else {
                  if (promisingTime.hour == 12) {
                    fhour = 12;
                  } else {
                    fhour = promisingTime.hour + 12;
                  }
                }
                if (noww.getHours() > fhour) {
                  noww.setDate(noww.getDate() + 1);
                } else if (noww.getHours() == fhour) {
                  if (noww.getMinutes() > promisingTime.minute) {
                    noww.setDate(noww.getDate() + 1);
                  }
                }
                noww.setHours(fhour);
                noww.setMinutes(promisingTime.minute);
                noww.setSeconds(0);
                promiseService
                  .amend(
                    promisingStartLoc,
                    promisingArriveLoc,
                    noww.toString(),
                    promiseId
                  )
                  .then((data) => {
                    if (data) {
                      console.log('약속수정됨');
                      setNowSettingPos('promised');
                      const promiseData = data.promiseData;
                      let nowTime = new Date();
                      const time = nowTime.toLocaleTimeString();
                      const date = nowTime.toLocaleDateString();
                      const promiseTime = new Date(promiseData.time);
                      console.log(promiseTime.getMonth());
                      const fhour = promiseTime.getHours();
                      const bigTime = fhour >= 12 ? '오후' : '오전';
                      const hour = fhour % 12 == 0 ? 12 : fhour % 12;
                      chatService.postChat({
                        text: `${
                          promiseTime.getMonth() + 1
                        }월 ${promiseTime.getDate()}일 ${bigTime} ${hour}:${promiseTime.getMinutes()} <${
                          promiseData.startLoc
                        }>에서 <${
                          promiseData.arriveLoc
                        }>로의 약속으로 수정되었어요.`,
                        userId: 'admin',
                        roomId,
                        date,
                        time,
                      });
                    }
                  });
              }}
            >
              약속결정
            </button>
          </>
        )}
      </section>
    </section>
  );
};

export default PromiseSec;
