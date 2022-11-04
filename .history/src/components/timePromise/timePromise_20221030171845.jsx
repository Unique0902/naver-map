import React from 'react';
import styles from './timePromise.module.css';
import Picker from 'react-scrollable-picker';
import { useState } from 'react';
const TimePromise = (props) => {
  return (
    <section className={styles.timeSec}>
      <h2 className={styles.title}>약속시간</h2>
    </section>
  );
};

export default TimePromise;
