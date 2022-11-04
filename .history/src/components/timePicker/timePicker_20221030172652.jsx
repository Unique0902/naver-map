import React, { Component } from 'react';
import Picker from 'react-scrollable-picker';

class TimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueGroups: {
        bigTime: '오전',
        hour: '1',
        minute: '10',
      },
      optionGroups: {
        bigTime: [
          { value: '오전', label: '오전' },
          { value: '오후', label: '오후' },
        ],
        hour: [
          { value: '1', label: '1' },
          { value: '2', label: '2' },
          { value: '3', label: '3' },
          { value: '4', label: '4' },
          { value: '5', label: '5' },
          { value: '6', label: '6' },
          { value: '7', label: '7' },
          { value: '8', label: '8' },
          { value: '9', label: '9' },
          { value: '10', label: '10' },
          { value: '11', label: '11' },
          { value: '12', label: '12' },
        ],
        minute: [
          { value: '5', label: '5' },
          { value: '10', label: '10' },
          { value: '15', label: '15' },
          { value: '20', label: '20' },
          { value: '25', label: '25' },
          { value: '30', label: '30' },
          { value: '35', label: '35' },
          { value: '40', label: '40' },
          { value: '45', label: '45' },
          { value: '50', label: '50' },
          { value: '55', label: '55' },
          { value: '0', label: '0' },
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
