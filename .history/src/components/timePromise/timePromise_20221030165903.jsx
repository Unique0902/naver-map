import React from 'react';
import styles from './timePromise.module.css';
import Picker from 'react-scrollable-picker';

const TimePromise = (props) => {
  const [valueGroups, setValueGroups] = setState({
    title: 'Mr.',
    firstName: 'Micheal',
    secondName: 'Jordan',
  });
  const [optionGroups, setOptionGroups] = setState({
    title: [
      { value: 'mr', label: 'Mr.' },
      { value: 'ms', label: 'Ms.' },
      { value: 'dr', label: 'Dr.' },
    ],
    firstName: [
      { value: 'John', label: 'John' },
      { value: 'Micheal', label: 'Micheal' },
      { value: 'Elizabeth', label: 'Elizabeth' },
    ],
    secondName: [
      { value: 'Lennon', label: 'Lennon' },
      { value: 'Jackson', label: 'Jackson' },
      { value: 'Jordan', label: 'Jordan' },
      { value: 'Legend', label: 'Legend' },
      { value: 'Taylor', label: 'Taylor' },
    ],
  });
  return (
    <section className={styles.timeSec}>
      <h2 className={styles.title}>약속시간</h2>
    </section>
  );
};

export default TimePromise;
