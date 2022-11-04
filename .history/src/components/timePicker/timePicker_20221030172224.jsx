import React, { Component } from 'react';
import Picker from 'react-scrollable-picker';

class TimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueGroups: {
        bigTime: '오전',
        firstName: 'Micheal',
        secondName: 'Jordan',
      },
      optionGroups: {
        bigTime: [
          { value: '오전', label: '오전' },
          { value: '오후', label: '오후' },
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
      },
    };
  }

  // Update the value in response to user picking event
  handleChange = (name, value) => {
    this.setState(({ valueGroups }) => ({
      valueGroups: {
        ...valueGroups,
        [name]: value,
      },
    }));
  };

  render() {
    const { optionGroups, valueGroups } = this.state;

    return (
      <Picker
        optionGroups={optionGroups}
        valueGroups={valueGroups}
        onChange={this.handleChange}
      />
    );
  }
}
export default TimePicker;
