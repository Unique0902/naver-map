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
                noww.setSeconds(0);
                promiseService
                  .make(promisingLoc, noww.toString(), matchId)
                  .then((data) => {
                    if (data) {
                      console.log('약속생성됨');
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
