import React, { forwardRef, useEffect, useState } from 'react';
import { CButton, CModal } from '@coreui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const CustomInput = forwardRef(({ value, onClick, date, dateString, todayString, tomorrowString }: any, ref: any) => {
  const isLater = dateString && dateString !== todayString && dateString !== tomorrowString;
  return (
    <div className={`book-appointment-date ${isLater ? 'active' : ''}`} onClick={onClick} ref={ref}>
      {!isLater ? 'Other' : moment(date).format('DD-MM-YYYY')}
    </div>
  );
});

interface Props {
  show: boolean;
  handleClose: any;
  getAppointments: any;
  date: any;
  setDate: any;
  selectedHours: any;
  setSelectedHours: any;
  setBetween: any;
}

const ModalFilterAppointment: React.FC<Props> = (props) => {
  const { show, handleClose, getAppointments, date, setDate, selectedHours, setSelectedHours, setBetween } = props;

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const todayString = today.toDateString();
  const tomorrowString = tomorrow.toDateString();

  const [newDate, setNewDate] = useState<any>(null);
  const [newSelectedHours, setNewSelectedHours] = useState<any>([]);

  useEffect(() => {
    if (!show) return;

    setNewDate(date);
    setNewSelectedHours(selectedHours);
  }, [show]);

  const dateString = newDate?.toDateString();

  const minDate = new Date();
  minDate.setDate(new Date().getDate() + 2);
  const maxDate = new Date();
  maxDate.setDate(new Date().getDate() + 7);

  const hours = ['07:00', '09:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00', '07:00'];
  let hourRangeButtons = [];
  for (let i = 0; i < 8; i++) hourRangeButtons.push(`${hours[i]} - ${hours[i + 1]}`);

  const handleChangeSelectedHour = (index: number) => {
    if (!newDate) return;

    setNewSelectedHours((newSelectedHours: any) => {
      if (newSelectedHours.includes(index)) return newSelectedHours.filter((item: any) => item !== index);
      return [...newSelectedHours, index];
    });
  };

  const close = () => {
    handleClose();
  };

  const apply = () => {
    const data = newSelectedHours.map((index: any) => {
      const begin = hours[index];
      const end = hours[index + 1];
      let beginTimestamp = new Date(`${moment(newDate).format('MM/DD/YYYY')} ${begin}`).getTime() / 1000;
      let endTimestamp;
      if (index !== 7) endTimestamp = new Date(`${moment(newDate).format('MM/DD/YYYY')} ${end}`).getTime() / 1000;
      else {
        const date2 = new Date(newDate);
        date2.setDate(date2.getDate() + 1);
        endTimestamp = new Date(`${moment(date2).format('MM/DD/YYYY')} ${end}`).getTime() / 1000;
      }
      return { begin: beginTimestamp, end: endTimestamp };
    });
    let newData = data;
    if (!newDate) newData = [{ begin: -1, end: -1 }];
    else if (newSelectedHours.length === 0) {
      const start = new Date(newDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date();
      end.setHours(23, 59, 59, 999);
      newData = [{ begin: start.getTime() / 1000, end: end.getTime() / 1000 }];
    }
    setBetween(newData);
    setDate(newDate);
    setSelectedHours(newSelectedHours);

    close();
    getAppointments(1, newData);
  };

  const reset = () => {
    const data = [{ begin: -1, end: -1 }];
    setBetween(data);
    setDate(null);
    setSelectedHours([]);
    close();
    getAppointments(1, data);
  };

  return (
    <CModal size="lg" style={{ height: '90vh' }} centered show={show} onClose={handleClose} closeOnBackdrop={false}>
      <div className="d-flex justify-content-center align-items-center" style={{ borderBottom: '1px solid #ddd' }}>
        <div style={{ fontSize: 18, margin: 16 }}>Filter by</div>
        <div className="btn-close-1" onClick={close}>
          <i className="fa fa-times" />
        </div>
      </div>
      <div className="px-3">
        <div className="book-appointment-title mt-4">Date</div>
        <div className="d-flex justify-content-evenly">
          <div
            className={`book-appointment-date ${dateString === todayString ? 'active' : ''}`}
            onClick={() => setNewDate(today)}
          >
            Today
          </div>
          <div
            className={`book-appointment-date ${dateString === tomorrowString ? 'active' : ''}`}
            onClick={() => setNewDate(tomorrow)}
          >
            Tomorrow
          </div>
          <div>
            <DatePicker
              // minDate={minDate}
              // maxDate={maxDate}
              onChange={(date: any) => setNewDate(date)}
              customInput={
                <CustomInput
                  date={newDate}
                  dateString={dateString}
                  todayString={todayString}
                  tomorrowString={tomorrowString}
                />
              }
            />
          </div>
        </div>
        <div className="book-appointment-title mt-4">Between</div>
        <div className="row px-3">
          {hourRangeButtons.map((item: string, index: number) => (
            <div key={index} className="col-md-3 col-sm-6">
              <div
                onClick={() => handleChangeSelectedHour(index)}
                className={`hour-range-button ${
                  newDate !== null ? (newSelectedHours.includes(index) ? 'active' : '') : 'disabled'
                }`}
              >
                {item}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-5">
          <CButton onClick={apply} style={{ width: 200, fontWeight: 'bold' }} variant="outline" color="info">
            APPLY
          </CButton>
          <div className="link mt-3" onClick={reset}>
            Reset to default
          </div>
        </div>
      </div>
    </CModal>
  );
};

export default ModalFilterAppointment;
