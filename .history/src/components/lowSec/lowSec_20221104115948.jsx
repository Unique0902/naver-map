import React from 'react';
import styles from './lowSec.module.css';

const LowSec = ({
  setShowdaum,
  showdaum,
  searchedAddress,
  startAddress,
  nowSettingPos,
}) => {
  return (
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
          if (nowSettingPos === 'arrive' || nowSettingPos === 'amendArrive') {
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
  );
};

export default LowSec;
