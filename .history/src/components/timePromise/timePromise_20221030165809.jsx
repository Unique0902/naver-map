import React from 'react';
import styles from './timePromise.module.css';
import Picker from 'react-scrollable-picker';

const TimePromise = (props) => {
  const [valueGroups, setValueGroups] = setState({
    title: 'Mr.',
    firstName: 'Micheal',
    secondName: 'Jordan',
  });
  return (
    <section className={styles.timeSec}>
      <h2 className={styles.title}>약속시간</h2>
    </section>
  );
};

export default TimePromise;
