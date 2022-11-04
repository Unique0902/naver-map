import React from 'react';
import styles from './destinationBox.module.css';

const DestinationBox = ({ startAddress, arriveAddress }) => {
  return (
    <div className={styles.destinationResult}>
      <p className={styles.startText}>{startAddress}</p>
      <p className={styles.middleText}>{'>'}</p>
      <p className={styles.arriveText}>{arriveAddress}</p>
    </div>
  );
};

export default DestinationBox;
