import React from 'react';
import styles from './timePromise.module.css';
import Picker from 'react-scrollable-picker';
import { useState } from 'react';
import TimePicker from '../timePicker/timePicker';
const TimePromise = ({ promisingTime, setPromisingTime }) => {
  return (
    <section className={styles.timeSec}>
      <h2 className={styles.title}>약속시간</h2>
      <TimePicker
        promisingTime={promisingTime}
        setPromisingTime={setPromisingTime}
      />
    </section>
  );
};

export default TimePromise;
