import React from 'react';
import { useSelector } from 'react-redux';
import { StarRatingStatic } from '../../../components';
import { timestampToDate, timestampToHour, secondsToDuration } from '../../../utils';

export const AppointmentWrapper: React.FC = (props) => {
  return (
    <div className="col-xl-4 col-lg-6 col-md-6 p-2">
      <div className="appointment-item card p-3 mx-1 my-2">
        {props.children}
        <button className="btn btn-primary mt-3">See more detail</button>
      </div>
    </div>
  );
};

interface AppointmentRequestProps {
  id: string;
  handleOpenPopup: (e: any, data: any) => void;
  appointment_time_begin: number;
  appointment_time_end: number;
  treatments: { id: string; diseases_title: string };
  request_nurses_id: string | null;
  request_nurses: { id: string; first_name: string; last_name: string };
}

export const AppointmentRequest: React.FC<AppointmentRequestProps> = (props) => {
  const {
    id,
    handleOpenPopup,
    appointment_time_begin,
    appointment_time_end,
    treatments,
    request_nurses_id,
    request_nurses,
  } = props;
  const no_answers = appointment_time_begin < new Date().getTime() / 1000;
  let hourEnd = timestampToHour(appointment_time_end);
  if (hourEnd === '00:00') hourEnd = '24:00';

  return (
    <div>
      <div className="d-flex align-items-center">
        <div
          className="more"
          onClick={(e) =>
            handleOpenPopup(e, { appointmentId: id, begin: appointment_time_begin, end: appointment_time_end, type: 0 })
          }
        >
          <i className="fas fa-ellipsis-v" />
        </div>
        <div>
          <i className="far fa-clock mr-1" />
          {timestampToHour(appointment_time_begin)} - {hourEnd}
          <span className="ml-3">{timestampToDate(appointment_time_begin)}</span>
        </div>
        <div className="ml-4" style={{ color: 'red' }}>
          {no_answers && 'No answers!'}
        </div>
      </div>
      <div className="d-flex justify-content-between pr-5">
        <div className="size-0 mt-3 font-weight-bold">{treatments.diseases_title}</div>
      </div>
      <div className="mt-3">
        Request to:{' '}
        {request_nurses_id ? request_nurses.first_name + ' ' + request_nurses.last_name : 'All available nurses'}
      </div>
    </div>
  );
};

interface AppointmentAcceptedProps {
  id: string;
  handleOpenPopup: (e: any, data: any) => void;
  time_when_nurse_confirms_to_start: number;
  time_when_nurse_confirms_to_stop: number;
  treatments: { id: string; diseases_title: string };
  request_nurses: { id: string; first_name: string; last_name: string };
  user_consulting_id: string | null;
  user_consulting: { id: string; first_name: string; last_name: string };
}

export const AppointmentAccepted: React.FC<AppointmentAcceptedProps> = (props) => {
  const {
    id,
    handleOpenPopup,
    time_when_nurse_confirms_to_start,
    time_when_nurse_confirms_to_stop,
    treatments,
    request_nurses,
    user_consulting_id,
    user_consulting,
  } = props;
  const current = new Date().getTime() / 1000;
  const join = time_when_nurse_confirms_to_start < current && time_when_nurse_confirms_to_stop > current;

  const hourBegin = timestampToHour(time_when_nurse_confirms_to_start);
  let hourEnd = timestampToHour(time_when_nurse_confirms_to_stop);
  if (hourEnd === '00:00') hourEnd = '24:00';

  const hourRange = hourBegin + ' - ' + hourEnd;

  return (
    <div>
      <div className="d-flex align-items-center">
        <div
          className="more"
          onClick={(e) =>
            handleOpenPopup(e, {
              appointmentId: id,
              title: hourRange,
              time_when_nurse_confirms_to_start,
              time_when_nurse_confirms_to_stop,
              treatmentTitle: treatments.diseases_title,
              type: 1,
            })
          }
        >
          <i className="fas fa-ellipsis-v" />
        </div>
        <div>
          <i className="far fa-clock mr-1" />
          {hourRange}
          <span className="ml-3">{timestampToDate(time_when_nurse_confirms_to_start)}</span>
        </div>
        <div className="ml-4">
          <button style={{ visibility: join ? 'visible' : 'hidden' }} className="btn btn-success px-3 py-0">
            Join
          </button>
        </div>
      </div>
      <div className="size-0 mt-3 font-weight-bold">{treatments.diseases_title}</div>
      <div className="mt-3">
        Accepted by: {user_consulting ? user_consulting.first_name + ' ' + user_consulting.last_name : ''}
      </div>
    </div>
  );
};

interface AppointmentFinishedProps {
  time_when_nurse_confirms_to_start: number;
  time_when_nurse_confirms_to_stop: number;
  video_record_duration: string;
  treatments: { id: string; diseases_title: string };
  request_nurses: { id: string; first_name: string; last_name: string };
  video_record: string | null;
  feedback: number | null;
  appointment_time_begin_reality: number;
  appointment_time_end_reality: number;
}

export const AppointmentFinished: React.FC<AppointmentFinishedProps> = (props) => {
  const {
    time_when_nurse_confirms_to_start,
    time_when_nurse_confirms_to_stop,
    video_record_duration,
    treatments,
    request_nurses,
    video_record,
    feedback,
    appointment_time_begin_reality,
    appointment_time_end_reality,
  } = props;
  let end = timestampToHour(time_when_nurse_confirms_to_stop);
  if (end === '00:00') end = '24:00';

  return (
    <div>
      <div className="d-flex align-items-center">
        <div>
          <i className="far fa-clock mr-1" />
          {timestampToHour(time_when_nurse_confirms_to_start)} - {end}
          <span className="ml-3">{timestampToDate(time_when_nurse_confirms_to_start)}</span>
        </div>
        <div className="ml-2">({secondsToDuration(appointment_time_end_reality - appointment_time_begin_reality)})</div>
      </div>
      <div className="size-0 mt-3 font-weight-bold">{treatments.diseases_title}</div>
      <div className="mt-2">
        {request_nurses?.id ? request_nurses.first_name + ' ' + request_nurses.last_name : 'All available nurses'}
      </div>
      <hr />
      {video_record ? (
        <div className="d-flex justify-content-between align-items-center">
          <span>
            Recorded by {request_nurses.first_name + ' ' + request_nurses.last_name}
            <span className="ml-2">({video_record_duration})</span>
          </span>
          <button className="btn btn-success py-1">View record</button>
        </div>
      ) : (
        'Not recorded'
      )}
      <hr />
      {feedback !== null ? (
        <div className="d-flex justify-content-between align-items-center px-3">
          <div className="link">View feedback</div>
          <StarRatingStatic rating={feedback} size="sm" />
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          <div className="link">Feedback</div>
        </div>
      )}
    </div>
  );
};

interface AppointmentCancelledProps {
  appointment_time_begin: number;
  appointment_time_end: number;
  cancel_by_id: string | null;
  cancelled: { id: string; first_name: string; last_name: string };
  treatments: { id: string; diseases_title: string };
  request_nurses: { id: string; first_name: string; last_name: string };
  modified_date: number;
}

export const AppointmentCancelled: React.FC<AppointmentCancelledProps> = (props) => {
  const {
    appointment_time_begin,
    appointment_time_end,
    cancelled,
    treatments,
    request_nurses,
    modified_date,
    cancel_by_id,
  } = props;

  const userId = useSelector((state: any) => state.auth.user_id);
  let hourEnd = timestampToHour(appointment_time_end);
  if (hourEnd === '00:00') hourEnd = '24:00';

  return (
    <div>
      <div className="row">
        <div className="col-md-5">
          <i className="far fa-clock mr-1" />
          Booked time
        </div>
        <div className="col-md-4" style={{ flex: 1, paddingRight: 10, textAlign: 'right' }}>
          {timestampToHour(appointment_time_begin)} - {hourEnd}
        </div>
        <span className="col-md-3">{timestampToDate(appointment_time_begin)}</span>
      </div>
      <div className="row mt-1">
        <div className="col-md-5">
          <i className="far fa-clock mr-1" />
          Cancelled time
        </div>
        <div className="col-md-4" style={{ flex: 1, paddingRight: 10, textAlign: 'right' }}>
          {timestampToHour(modified_date)}
        </div>
        <div className="col-md-3">{timestampToDate(modified_date)}</div>
      </div>
      <div className="size-0 mt-3 font-weight-bold">{treatments.diseases_title}</div>
      <div className="mt-3">
        Request to:{' '}
        {request_nurses?.id ? request_nurses.first_name + ' ' + request_nurses.last_name : 'All available nurses'}
      </div>
      <hr />
      <div>
        Cancelled{' '}
        {cancel_by_id
          ? `by ${userId === cancel_by_id ? 'You' : cancelled.first_name + ' ' + cancelled.last_name}`
          : "automatically by HB's system"}
      </div>
    </div>
  );
};
