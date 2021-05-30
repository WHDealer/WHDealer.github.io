import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';
import moment from 'moment';

interface Props {
  fullWidth?: boolean;
  minDate?: any;
  maxDate?: any;
  date?: any;
  setDate?: any;
  yearDropdownItemNumber?: number;
  format?: string;
  placeholder?: string;
}

const DatePickerNew: React.FC<Props> = (props) => {
  const { fullWidth, minDate, maxDate, date, setDate, yearDropdownItemNumber, format, placeholder } = props;
  const params = {
    minDate,
    maxDate,
    yearDropdownItemNumber,
  };

  const handleClear = (e: any) => {
    e.stopPropagation();
    setDate(null);
  };

  const ExampleCustomInput = forwardRef(({ value, onClick }: any, ref: any) => (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={onClick}>
      <input
        style={fullWidth ? { width: '100%', margin: 0 } : {}}
        value={date ? moment(date).format(format || 'DD/MM/YYYY') : ''}
        placeholder={placeholder || 'dd/mm/yyyy'}
        className="form-control my-date-picker"
        readOnly
      />
      {fullWidth ? (
        <i className="far fa-calendar" style={{ position: 'absolute', right: 16, fontSize: 16 }} />
      ) : (
        <i
          className="fas fa-times-circle"
          style={{ position: 'absolute', right: 16, fontSize: 14, color: '#aaa' }}
          onClick={handleClear}
        />
      )}
    </div>
  ));

  return (
    <DatePicker
      showYearDropdown
      showMonthDropdown
      scrollableYearDropdown
      selected={date}
      {...params}
      onChange={(date: any) => setDate?.(date)}
      customInput={<ExampleCustomInput />}
    />
  );
};

export default DatePickerNew;
