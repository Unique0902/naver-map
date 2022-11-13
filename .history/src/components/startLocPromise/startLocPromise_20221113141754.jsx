import React from 'react';
import styles from './startLocPromise.module.css';
import { useState } from 'react';
import { useEffect } from 'react';
const StartLocPromise = ({
  promisingStartLoc,
  setPromisingStartLoc,
  startlocRef,
}) => {
  useEffect(() => {
    if (promisingStartLoc) {
      startlocRef.current.value = promisingStartLoc;
    }
  }, []);
  return (
    <section className={styles.locSec}>
      <h2 className={styles.title}>약속 시작 위치</h2>
      <input
        type='text'
        ref={startlocRef}
        placeholder='예:OO초등학교 앞, OO편의점 앞 도로'
        className={styles.input}
      />
    </section>
  );
};

export default StartLocPromise;
