import React, { forwardRef, useEffect, useState } from 'react';
import { CButton } from '@coreui/react';
import Search from '../../../components/search/Search';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import config, { topicsScrollSetting } from '../../../config';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { timestampToHour } from '../../../utils';
import { listHours } from '../../../config';
import Feedbacks from './Feedbacks';
import { defaultAvatar } from '../../../extensions';

const NurseItem = (props: {
  id?: string;
  first_name?: string;
  last_name?: string;
  thumbnail?: number;
  rating?: number;
  setBook: any;
  active: boolean;
  setModalFeedbacks?: any;
}) => {
  const { id, first_name, last_name, thumbnail, rating, setBook, active, setModalFeedbacks } = props;

  const name = id ? first_name + ' ' + last_name : 'HerzBegleiter';
  let ellipsisName = '';
  if (name.length > 15) ellipsisName = name.slice(0, 12) + '...';

  const handleClickFeedbacks = (e: any) => {
    e.stopPropagation();
    setModalFeedbacks({ show: true, nurseId: id, nurseName: name, nurseThumbnail: thumbnail, nurseRating: rating });
  };

  let render = (
    <div className="book-appointment-nurse">
      <div
        className="book-appointment-nurse-avatar"
        style={{
          backgroundImage: `url(https://d1aettbyeyfilo.cloudfront.net/herzbegleiter/16281202_1610961997217tom-circle.webp)`,
        }}
      />
      <div className="d-flex justify-content-center align-items-center" style={{ height: 70 }}>
        HerzBegleiter choose for you
      </div>
    </div>
  );
  if (id)
    render = (
      <div className="book-appointment-nurse">
        <div
          className="book-appointment-nurse-avatar"
          style={{ backgroundImage: `url("${thumbnail || defaultAvatar}")` }}
        />
        <div style={rating === 0 ? { height: 70, display: 'flex', alignItems: 'center' } : {}}>
          <div>{ellipsisName || name}</div>
          {rating !== 0 && (
            <div>
              <div style={{ marginTop: 2 }}>
                <i className="fa fa-star mr-1" style={{ color: 'orange' }} />
                {rating?.toFixed(1)} / 5.0
              </div>
              <div style={{ marginTop: 2 }} className="link" onClick={handleClickFeedbacks}>
                View feedbacks
              </div>
            </div>
          )}
        </div>
      </div>
    );
  return (
    <div style={{ padding: '4px 3px' }} title={name}>
      <div
        className={`book-appointment-nurse-wrapper ${active ? 'active' : ''}`}
        style={{
          margin: `${id ? '0' : '1px'} 0.4rem 0 0.4rem`,
        }}
        onClick={() =>
          setBook((book: any) => {
            return { ...book, nurse: id };
          })
        }
      >
        {render}
      </div>
    </div>
  );
};

interface Props {
  nurses: any;
  getNurses: any;
  book: any;
  setBook: any;
  back: any;
  next: any;
}

const listOthers = ['23:15', '23:30', '23:45'];

const BookAppointment: React.FC<Props> = (props) => {
  const [init, setInit] = useState(false);

  const { nurses, getNurses, book, setBook, back } = props;

  const CustomInput = forwardRef(({ value, onClick }: any, ref: any) => {
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

  const [searchName, setSearchName] = useState('');
  const [modalFeedbacks, setModalFeedbacks] = useState({
    show: false,
    nurseId: '',
    nurseName: '',
    nurseThumbnail: '',
    nurseRating: 0.0,
  });

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const todayString = today.toDateString();
  const tomorrowString = tomorrow.toDateString();

  const minHour = Math.ceil(new Date().getTime() / 900000) * 900 + 7200;
  const minHour2 = minHour + 3600;

  const begin = book.appointment_time_begin || minHour;
  const end = book.appointment_time_end || minHour2;

  const dateMinHourString = new Date(minHour * 1000).toDateString();

  const [date, setDate] = useState(new Date(begin * 1000));
  const dateString = date.toDateString();

  const minDate = new Date();
  minDate.setDate(new Date().getDate() + 2);
  const maxDate = new Date();
  maxDate.setDate(new Date().getDate() + 21);

  const [timeBegin, setTimeBegin] = useState(dateMinHourString !== todayString ? '08:00' : timestampToHour(begin));
  const [timeEnd, setTimeEnd] = useState(dateMinHourString !== todayString ? '09:00' : timestampToHour(end));

  const handleChangeTimeBegin = (e: any) => {
    const value = e.target.value;
    const index = listHours.findIndex((item: string) => item === value);
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
    if (!init) {
      setInit(true);
      return;
    }

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
    setBook((book: any) => {
      return {
        ...book,
        appointment_time_begin: new Date(`${moment(date).format('MM/DD/YYYY')} ${timeBegin}`).getTime() / 1000,
        appointment_time_end: new Date(`${moment(date).format('MM/DD/YYYY')} ${timeEnd}`).getTime() / 1000,
      };
    });
    props.next();
  };

  return (
    <div className="mx-3" style={{ overflow: 'hidden' }}>
      <Feedbacks
        {...modalFeedbacks}
        handleClose={() =>
          setModalFeedbacks({ show: false, nurseId: '', nurseName: '', nurseThumbnail: '', nurseRating: 0 })
        }
      />
      <div className="book-appointment-title">Choose nurse</div>
      <div className="px-5">
        <Search
          searchName={searchName}
          setSearchName={setSearchName}
          inputStyle={{ borderRadius: 10 }}
          searchEmpty={true}
          callbackSearch={getNurses}
          validate={config.validate.valueTypingExpressionsName}
        />
      </div>
      <div className="d-flex mt-4">
        <div>
          <NurseItem active={!book.nurse} setBook={setBook} />
        </div>
        <div style={{ width: '83%' }}>
          <ScrollMenu
            {...topicsScrollSetting}
            data={nurses.data.map((item: any) => (
              <NurseItem
                key={item.id}
                {...item}
                active={book.nurse === item.id}
                setBook={setBook}
                setModalFeedbacks={setModalFeedbacks}
              />
            ))}
          />
        </div>
      </div>
      <div className="book-appointment-title mt-4">Date</div>
      <div className="d-flex justify-content-evenly">
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
            customInput={<CustomInput />}
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
        <CButton style={{ width: 100 }} variant="outline" color="primary" onClick={back}>
          Back
        </CButton>
        <CButton style={{ width: 100 }} variant="outline" color="primary" onClick={next}>
          Continue
        </CButton>
      </div>
    </div>
  );
};

export default BookAppointment;
