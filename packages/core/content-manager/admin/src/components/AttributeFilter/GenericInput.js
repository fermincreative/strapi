import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DateTime } from '@buffetjs/custom';
import { DatePicker, InputText, InputNumber, Select, TimePicker } from '@buffetjs/core';
import { DateWrapper } from './components';

function GenericInput({ type, onValueChange, value, ...rest }) {
  switch (type) {
    case 'boolean':
      return <Select onChange={e => onValueChange(e.target.value)} value={value} {...rest} />;

    case 'date':
    case 'timestamp':
    case 'timestampUpdate': {
      const momentValue = moment(value);

      return (
        <DateWrapper type={type}>
          <DatePicker
            onChange={e => onValueChange(e.target.value._d)}
            value={momentValue}
            {...rest}
          />
        </DateWrapper>
      );
    }

    case 'datetime': {
      const momentValue = moment(value);

      return (
        <DateWrapper type={type}>
          <DateTime onChange={e => onValueChange(e.target.value)} value={momentValue} {...rest} />
        </DateWrapper>
      );
    }
    case 'enumeration':
      return <Select onChange={e => onValueChange(e.target.value)} value={value} {...rest} />;

    case 'integer':
    case 'biginteger':
    case 'decimal':
    case 'float':
      return <InputNumber onChange={e => onValueChange(e.target.value)} value={value} {...rest} />;

    case 'time':
      return <TimePicker onChange={e => onValueChange(e.target.value)} value={value} {...rest} />;

    default:
      return <InputText onChange={e => onValueChange(e.target.value)} value={value} {...rest} />;
  }
}

GenericInput.defaultProps = {
  value: undefined,
};

GenericInput.propTypes = {
  onValueChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.any,
};

export default GenericInput;
