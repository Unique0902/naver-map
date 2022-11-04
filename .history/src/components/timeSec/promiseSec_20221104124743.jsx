import React, { useState } from 'react';
import { useRef } from 'react';
import LocPromise from '../locPromise/locPromise';
import PromiseCheck from '../promiseCheck/promiseCheck';
import TimePromise from '../timePromise/timePromise';
import styles from './promiseSec.module.css';

const PromiseSec = ({
  promisingTime,
  setPromisingTime,
  promisingLoc,
  setPromisingLoc,
  promiseService,
  promiseId,
  setPromiseId,
  matchId,
  roomId,
  chatService,
}) => {
  const [promiseLev, setPromiseLev] = useState('loc');
  const locRef = useRef();
  return (
    <section className={styles.promiseSec}>
      <section className={styles.titleSec}>
        <h2 className={styles.title}>약속 정하기</h2>
      </section>
      <section className={styles.contentSec}>
        {promiseLev === 'loc' && (
          <LocPromise
            promisingLoc={promisingLoc}
            setPromisingLoc={setPromisingLoc}
            locRef={locRef}
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
            promisingLoc={promisingLoc}
            promisingTime={promisingTime}
          />
        )}
      </section>
      <section className={styles.btnSec}>
        {promiseLev === 'loc' && (
          <>
            <button
              className={styles.nextBtn}
              onClick={() => {
                const loc = locRef.current.value;
                if (loc) {
                  setPromisingLoc(loc);
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
                setPromiseLev('loc');
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
        {promiseLev === 'check' && (
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
                if (promisingTime.bigTime == '오전') {
                  if (promisingTime.hour == 12) {
                  } else {
                  }
                } else {
                  if (promisingTime.hour == 12) {
                  } else {
                  }
                }
                const fhour =
                  promisingTime.bigTime == '오전'
                    ? promisingTime.hour
                    : promisingTime.hour + 12;
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
                    promisingLoc,
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
                          promiseData.loc
                        }>에서의 약속이 만들어졌어요.`,
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
