import React, { forwardRef, useEffect, useState } from 'react';
import { CButton, CModalBody, CModalFooter, CModalHeader } from '@coreui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { timestampToDate, timestampToHour } from '../../../utils';
import { listHours } from '../../../config';
import { SUCCESS } from '../../../store/callApi/actions';
import { CModal } from '../../../components';

interface Props {
  show: boolean;
  callApi: any;
  appointmentId: string;
  begin: any;
  end: any;
  handleClose: any;
  reload: any;
}

const CustomInput = forwardRef(({ value, onClick, date, dateString, todayString, tomorrowString }: any, ref: any) => {
  const isLater = dateString !== todayString && dateString !== tomorrowString;
  return (
    <div
      className={`book-appointment-date ${isLater ? 'active' : ''}`}
      style={{ maxWidth: 140 }}
      onClick={onClick}
      ref={ref}
    >
      {!isLater ? 'Later' : moment(date).format('DD-MM-YYYY')}
    </div>
  );
});

const listOthers = ['23:15', '23:30', '23:45'];

const ModalEditAppointment: React.FC<Props> = (props) => {
  const { show, callApi, appointmentId, begin, end, handleClose, reload } = props;

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const todayString = today.toDateString();
  const tomorrowString = tomorrow.toDateString();

  const minHour = Math.ceil(new Date().getTime() / 900000) * 900 + 7200;

  const dateMinHourString = new Date(minHour * 1000).toDateString();

  const current = new Date(begin * 1000);
  const [date, setDate] = useState(current);
  const dateString = date.toDateString();

  const minDate = new Date();
  minDate.setDate(new Date().getDate() + 2);
  const maxDate = new Date();
  maxDate.setDate(new Date().getDate() + 21);

  const [timeBegin, setTimeBegin] = useState('00:00');
  const [timeEnd, setTimeEnd] = useState('00:00');

  useEffect(() => {
    setDate(new Date(minHour * 1000));
    setTimeBegin(dateMinHourString !== todayString ? '08:00' : timestampToHour(minHour));
    setTimeEnd(dateMinHourString !== todayString ? '09:00' : timestampToHour(minHour + 3600));
  }, [appointmentId]);

  const handleChangeTimeBegin = (e: any) => {
    const value = e.target.value;
    const index = listHours.findIndex((item: string) => item === value);
    setTimeEnd(listHours[index + 4]);
    if (index >= 93) setTimeEnd(listHours[96]);
    else setTimeEnd(listHours[index + 4]);

    setTimeBegin(value);
  };

  const handleChangeTimeEnd = (e: any) => {
    const value = e.target.value;
    setTimeEnd(value);
  };

  const minHourBegin = new Date(minHour * 1000);
  const minHourBeginIndex = listHours.findIndex(
    (item: string) => minHourBegin <= new Date(`${moment(date).format('MM/DD/YYYY')} ${item}`),
  );

  const minHourEnd = new Date(`${moment(date).format('MM/DD/YYYY')} ${timeBegin}`);
  minHourEnd.setMinutes(minHourEnd.getMinutes() + 14);
  const minHourEndIndex = listHours.findIndex(
    (item: string) => minHourEnd <= new Date(`${moment(date).format('MM/DD/YYYY')} ${item}`),
  );

  useEffect(() => {
    if (dateString !== todayString) {
      setTimeBegin('08:00');
      setTimeEnd('09:00');
    } else {
      if (minHourBegin > new Date(`${moment(date).format('MM/DD/YYYY')} ${timeBegin}`)) {
        const x = timestampToHour(minHour);
        setTimeBegin(x);
        if (listOthers.includes(x)) setTimeEnd('24:00');
        else setTimeEnd(timestampToHour(minHour + 3600));
      }
    }
  }, [date]);

  const next = () => {
    callApi(
      {
        method: 'put',
        api: '/api/v1/consulting/appointments/users',
        body: {
          appointment_id: appointmentId,
          update_status: 0,
          appointment_time_begin: new Date(`${moment(date).format('MM/DD/YYYY')} ${timeBegin}`).getTime() / 1000,
          appointment_time_end: new Date(`${moment(date).format('MM/DD/YYYY')} ${timeEnd}`).getTime() / 1000,
        },
        loading: true,
      },
      (response: any) => {
        const { status } = response;
        if (status === SUCCESS) {
          handleClose();
          reload();
        }
      },
    );
  };

  const [attention, setAttention] = useState({ show: false });

  const close = () => {
    handleClose();
    setAttention({ show: false });
  };

  const showAttention = () => {
    const dirty =
      dateString === dateMinHourString &&
      timeBegin === (dateMinHourString !== todayString ? '08:00' : timestampToHour(minHour)) &&
      timeEnd === (dateMinHourString !== todayString ? '09:00' : timestampToHour(minHour + 3600));

    if (dirty) {
      close();
      return;
    }
    setAttention({ ...attention, show: true });
  };

  return (
    <CModal size="lg" style={{ height: '60vh' }} centered show={show} onClose={handleClose} closeOnBackdrop={false}>
      <CModalHeader>
        Edit appointment
        <i className="fa fa-close cursor-pointer" onClick={showAttention} />
      </CModalHeader>
      <CModalBody className="px-0 py-3" style={{ overflowY: 'auto', overflowX: 'hidden' }}>
        <CModal size="sm" show={attention.show} centered closeOnBackdrop={false}>
          <CModalBody style={{ textAlign: 'center' }}>Are you sure you want to Cancel Edit Appointment?</CModalBody>
          <CModalFooter style={{ display: 'flex', justifyContent: 'space-around' }}>
            <button className="btn btn-danger" style={{ width: 160 }} color="danger" onClick={close}>
              Discard Changes
            </button>
            <button style={{ width: 160 }} className="btn btn-primary" onClick={() => setAttention({ show: false })}>
              Keep Editing
            </button>
          </CModalFooter>
        </CModal>

        <div className="mx-3" style={{ overflow: 'hidden' }}>
          <div className="mb-3 mx-3" style={{ fontSize: 16 }}>
            <div className="d-flex align-items-center mb-2">
              <i className="far fa-clock mr-1" />
              Booked time
              <span className="ml-5 mr-3">
                {timestampToHour(begin)} - {timestampToHour(end)}
              </span>
              <span>{timestampToDate(begin)}</span>
            </div>
            <div>Please select new consultation time!</div>
          </div>
          <div className="book-appointment-title mt-4">Date</div>
          <div className="d-flex justify-content-evenly px-5">
            {dateMinHourString === todayString && (
              <div
                className={`book-appointment-date ${dateString === todayString ? 'active' : ''}`}
                onClick={() => setDate(today)}
              >
                Today
              </div>
            )}
            <div
              className={`book-appointment-date ${dateString === tomorrowString ? 'active' : ''}`}
              onClick={() => setDate(tomorrow)}
            >
              Tomorrow
            </div>
            <div>
              <DatePicker
                minDate={minDate}
                maxDate={maxDate}
                onChange={(date: any) => setDate(date)}
                customInput={
                  <CustomInput
                    date={date}
                    dateString={dateString}
                    todayString={todayString}
                    tomorrowString={tomorrowString}
                  />
                }
              />
            </div>
          </div>
          <div className="book-appointment-title mt-4">Between</div>
          <div className="d-flex justify-content-evenly">
            <select value={timeBegin} className="form-control" style={{ width: 160 }} onChange={handleChangeTimeBegin}>
              {listHours.slice(minHourBeginIndex, -1).map((item: string, index: any) => (
                <option itemID={index} key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            and
            <select value={timeEnd} className="form-control" style={{ width: 160 }} onChange={handleChangeTimeEnd}>
              {listHours.slice(minHourEndIndex).map((item: string) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="d-flex justify-content-evenly my-5">
            <CButton style={{ width: 100 }} variant="outline" color="primary" onClick={showAttention}>
              Cancel
            </CButton>
            <CButton style={{ width: 100 }} color="primary" onClick={next}>
              Done
            </CButton>
          </div>
        </div>
      </CModalBody>
    </CModal>
  );
};

export default ModalEditAppointment;
