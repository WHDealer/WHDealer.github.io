import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { DatePicker } from '../../../components';
import { timestampToHour } from '../../../utils';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import config from '../../../config';
import ScheduleWebinarTreatments from './ScheduleWebinarTreatments';
import { CModal, CModalBody, CModalFooter } from '@coreui/react';

const listHours = Array.from({ length: 24 }, (_, id) => ('0' + id).substr(-2));
const listMinutes = Array.from({ length: 60 }, (_, id) => ('0' + id).substr(-2));
const listHourRanges = Array.from(
  { length: 24 * 2 },
  (_, id) => ('0' + Math.floor(id / 2)).substr(-2) + ':' + ('0' + Math.floor(id % 2) * 30).substr(-2),
);

interface Props {
  callApi: any;
  treatments: any;
}

const ScheduleWebinar: React.FC<Props> = (props) => {
  const { callApi, treatments } = props;

  const history = useHistory();

  const [modal, setModal] = useState(false);

  const minHour = Math.ceil(new Date().getTime() / 1800000) * 1800;

  const [when, setWhen] = useState(new Date(minHour * 1000));
  const [start, setStart] = useState(timestampToHour(minHour));

  const minHourBegin = new Date(minHour * 1000);
  const minHourBeginIndex = listHourRanges.findIndex(
    (item: string) => minHourBegin <= new Date(`${moment(when).format('MM/DD/YYYY')} ${item}`),
  );

  const today = new Date();
  const [selectedTreatments, setSelectedTreatments] = useState([]);
  const [title, setTitle] = useState('');
  const [hour, setHour] = useState('01');
  const [min, setMin] = useState('00');
  const [description, setDescription] = useState('');
  const [raisedHands, setRaisedHands] = useState(false);
  const [video, setVideo] = useState(false);
  const [whoJoin, setWhoJoin] = useState(0);

  useEffect(() => {
    if (minHourBegin > new Date(`${moment(when).format('MM/DD/YYYY')} ${start}`)) {
      setStart(timestampToHour(minHour));
    }
    if (today.toDateString() !== when.toDateString()) setStart('00:00');
  }, [when]);

  const isValid = () => {
    return title.trim() !== '';
  };

  const onSubmit = () => {
    callApi(
      {
        method: 'post',
        api: config.rest.nurseCreateMeeting(),
        body: {
          title,
          start_date: new Date(`${moment(when).format('MM/DD/YYYY')} ${start}`).getTime() / 1000,
          duration: Number(hour) * 3600 + Number(min) * 60,
          diseases: selectedTreatments.map((index: number) => {
            return { id: treatments.data[index].id };
          }),
          description,
          raised_hand: raisedHands,
          video_enable: video,
          permission_view: whoJoin,
        },
        loading: true,
      },
      (response: any) => {
        const { status } = response;
        if (status === SUCCESS) {
          history.push('/consulting');
        }
      },
    );
  };

  const [attention, setAttention] = useState({ show: false });

  const dirty =
    title === '' &&
    hour === '01' &&
    min === '00' &&
    when.toDateString() === minHourBegin.toDateString() &&
    start === timestampToHour(minHour) &&
    description === '' &&
    selectedTreatments.length === 0 &&
    raisedHands === false &&
    video === false &&
    whoJoin === 0;

  const showAttention = () => {
    if (dirty) {
      history.push('/consulting');
      return;
    }
    setAttention({ ...attention, show: true });
  };

  return (
    <div className="d-flex justify-content-center">
      <CModal size="sm" show={attention.show} centered closeOnBackdrop={false}>
        <CModalBody style={{ textAlign: 'center' }}>Are you sure you want to discard this new webinar?</CModalBody>
        <CModalFooter style={{ display: 'flex', justifyContent: 'space-around' }}>
          <button
            className="btn btn-danger"
            style={{ width: 160 }}
            color="danger"
            onClick={() => history.push('/consulting')}
          >
            Discard Changes
          </button>
          <button
            style={{ width: 160 }}
            className="btn btn-primary"
            onClick={() => setAttention({ ...attention, show: false })}
          >
            Keep Editing
          </button>
        </CModalFooter>
      </CModal>

      <div style={{ width: '50%' }}>
        <ScheduleWebinarTreatments
          show={modal}
          handleClose={() => setModal(false)}
          treatments={treatments}
          selectedTreatments={selectedTreatments}
          setSelectedTreatments={setSelectedTreatments}
        />
        <h3 className="mt-4" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          Schedule a Webinar
          <i
            className="fa fa-angle-left mr-2 cursor-pointer size-2"
            style={{ position: 'absolute', left: -24 }}
            onClick={showAttention}
          />
        </h3>
        <input
          maxLength={100}
          value={title}
          onChange={(e: any) => setTitle(e.target.value)}
          className="form-control my-3"
          placeholder="Title"
        />
        <div className="d-flex align-items-center mb-3">
          <div className="font-weight-bold" style={{ width: 100 }}>
            When
          </div>
          <div>
            <DatePicker format="DD.MM.YYYY" date={when} setDate={setWhen} minDate={today} fullWidth />
          </div>
        </div>
        <div className="d-flex align-items-center mb-3">
          <div className="font-weight-bold" style={{ width: 100 }}>
            Start
          </div>
          <div>
            <select className="form-control" value={start} onChange={(e: any) => setStart(e.target.value)}>
              {listHourRanges.slice(minHourBeginIndex).map((item: string, index: any) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="d-flex align-items-center mb-3">
          <div className="font-weight-bold" style={{ width: 100 }}>
            Duration
          </div>
          <div className="mr-3">
            <select className="form-control" value={hour} onChange={(e: any) => setHour(e.target.value)}>
              {listHours.map((item: string) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
          hr
          <div className="ml-4 mr-3">
            <select className="form-control" value={min} onChange={(e: any) => setMin(e.target.value)}>
              {listMinutes.map((item: string) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
          min
        </div>
        <div className="my-4 py-3" style={{ borderTop: '2px solid #ccc', borderBottom: '2px solid #ccc' }}>
          <div className="d-flex align-items-center my-2">
            <div className="d-flex align-items-center cursor-pointer" onClick={() => setModal(true)}>
              <div className="size-0 mr-3">Treatments</div>
              <i className="fa fa-angle-right size-0" />
            </div>
          </div>
          <div className="px-4">
            {selectedTreatments.map((index: number) => {
              const treatment: { id: string; tile: string; thumbnail: string } = treatments.data[index];
              return (
                <div className="d-flex justify-content-between pt-2 px-4 pb-1">
                  <div>
                    <img
                      className="mr-3"
                      alt="treatment-thumbnail"
                      style={{ width: 60, height: 40, borderRadius: 5 }}
                      src={treatment.thumbnail}
                    />
                    {treatment.tile}
                  </div>
                  <i
                    className="fa fa-times cursor-pointer"
                    style={{ color: 'gray' }}
                    onClick={() => setSelectedTreatments(selectedTreatments.filter((item: any) => item !== index))}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="my-4">
          <textarea
            maxLength={500}
            className="form-control"
            rows={5}
            placeholder="Description"
            value={description}
            onChange={(e: any) => setDescription(e.target.value)}
          />
        </div>
        <div className="pt-4 pb-3" style={{ borderTop: '2px solid #ccc' }}>
          <div className="font-weight-bold mb-3">Paticipant Settings</div>
          <div className="ml-4">
            <div className="d-flex mb-3">
              <div style={{ width: 120 }}>Raised hands</div>
              On{' '}
              <input
                name="raisedHands"
                type="radio"
                className="form-control"
                onChange={() => setRaisedHands(true)}
                checked={raisedHands === true}
              />
              Off{' '}
              <input
                name="raisedHands"
                type="radio"
                className="form-control"
                onChange={() => setRaisedHands(false)}
                checked={raisedHands === false}
              />
            </div>
            <div className="d-flex mb-3">
              <div style={{ width: 120 }}>Video</div>
              On{' '}
              <input
                name="video"
                type="radio"
                className="form-control"
                onChange={() => setVideo(true)}
                checked={video === true}
              />
              Off{' '}
              <input
                name="video"
                type="radio"
                className="form-control"
                onChange={() => setVideo(false)}
                checked={video === false}
              />
            </div>
          </div>
        </div>
        <div className="mb-2">
          <div className="font-weight-bold mb-3">Who can join the webinar?</div>
          <div className="d-flex ml-4">
            All{' '}
            <input
              name="whoJoin"
              type="radio"
              className="form-control"
              onChange={() => setWhoJoin(0)}
              checked={whoJoin === 0}
            />
            Nurses{' '}
            <input
              name="whoJoin"
              type="radio"
              className="form-control"
              onChange={() => setWhoJoin(1)}
              checked={whoJoin === 1}
            />
            Basic members{' '}
            <input
              name="whoJoin"
              type="radio"
              className="form-control"
              onChange={() => setWhoJoin(2)}
              checked={whoJoin === 2}
            />
          </div>
        </div>
        <div className="d-flex justify-content-evenly my-5">
          <button className="btn btn-primary" style={{ width: 150 }} disabled={!isValid()} onClick={onSubmit}>
            Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

const ScheduleWebinarWrapper: React.FC<RouteComponentProps> = (props) => {
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));
  const [treatments, setTreatments] = useState<any>({ data: [], loading: true });

  useEffect(() => {
    callApi(
      {
        method: 'get',
        api: config.rest.getAllTreatments(),
        loading: true,
      },
      (response) => {
        const { data, status } = response;
        if (status === SUCCESS) {
          setTreatments({
            data: data.group_treatments.reduce((acc: any, item: any) => [...acc, ...item.list_diseases], []),
            loading: false,
          });
        }
      },
    );
  }, []);

  if (treatments.loading) return <div />;

  return <ScheduleWebinar callApi={callApi} treatments={treatments} />;
};

export { ScheduleWebinar };
export default ScheduleWebinarWrapper;
