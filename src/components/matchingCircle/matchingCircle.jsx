import React from 'react';
import styles from './matchingCircle.module.css';

const MatchingCircle = ({ matchId }) => {
  return (
    <section className={styles.matchingSec}>
      {matchId ? (
        <div className={styles.loadingBorder}></div>
      ) : (
        <div className={styles.loadingSpinner}></div>
      )}
      <div className={styles.matchingStatus}>
        <p className={styles.matchingStatusText}>
          {matchId ? '매칭완료' : '매칭중'}
        </p>
      </div>
    </section>
  );
};

export default MatchingCircle;
