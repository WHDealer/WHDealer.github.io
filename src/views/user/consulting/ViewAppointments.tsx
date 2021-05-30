import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { CButton } from '@coreui/react';
import config from '../../../config';
import {
  AppointmentWrapper,
  AppointmentRequest,
  AppointmentAccepted,
  AppointmentFinished,
  AppointmentCancelled,
} from './AppointmentItem';
import { useDispatch } from 'react-redux';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import { MenuPopup, ConfirmPopupInput } from '../../../components';
import ModalFilterAppointment from './ModalFilterAppointment';
import ModalEditAppointment from './ModalEditAppointment';
import { Waypoint } from 'react-waypoint';
import { HBButtonSmall } from '../../../hbBaseClass';

const types = ['Request', 'Accepted', 'Finished', 'Cancelled'];
const mappingRenderItem: any = {
  Request: AppointmentRequest,
  Accepted: AppointmentAccepted,
  Finished: AppointmentFinished,
  Cancelled: AppointmentCancelled,
};
const mappingTypeNumber: any = {
  Request: 0,
  Accepted: 1,
  Finished: 2,
  Cancelled: 3,
};

const ConsultingMainPage: React.FC<RouteComponentProps> = (props) => {
  const history = useHistory();
  const query = new URLSearchParams(props.location?.search);
  let type = query.get('type') || '';

  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));
  const [appointments, setAppointments] = useState<any>({ type: type, data: [], loading: true, full: false, page: 0 });
  const [menuPopup, setMenuPopup] = useState({
    show: false,
    top: 0,
    left: 0,
    appointmentId: '',
    title: '',
    begin: 0,
    end: 0,
    type: 0,
    treatmentTitle: '',
    appointment_time_begin: 0,
    appointment_time_end: 0,
    width: 0,
  });
  const [popupEditAppointment, setPopupEditAppointment] = useState({
    show: false,
    appointmentId: '',
    begin: 0,
    end: 0,
  });
  const [popupCancelAppointment, setPopupCancelAppointment] = useState<any>({ show: false });
  const [modalFilter, setModalFilter] = useState({ show: false });
  const [between, setBetween] = useState([{ begin: -1, end: -1 }]);
  const [date, setDate] = useState(null);
  const [selectedHours, setSelectedHours] = useState<any>([]);

  const getAppointments = (page: number, between: any) => {
    setAppointments({ ...appointments, loading: true });
    callApi(
      {
        api: config.rest.getAppointments(),
        method: 'post',
        body: { appointment_status: mappingTypeNumber[type], between: between, page, page_size: 12 },
        loading: page === 1,
      },
      (response: any) => {
        const { status, data } = response;
        if (status === SUCCESS) {
          setAppointments((appointments: any) => {
            return {
              type: type,
              data: page !== 1 ? [...appointments.data, ...data.consulting_appointments] : data.consulting_appointments,
              loading: false,
              full: data.consulting_appointments.length < 12,
              page: page,
            };
          });
        } else {
          setAppointments((appointments: any) => {
            return { ...appointments, loading: false };
          });
        }
      },
    );
  };

  useEffect(() => {
    if (!types.includes(type)) {
      type = types[0];
      history.push(`?type=${type}`);
    } else {
      setAppointments({ ...appointments, loading: true });
      getAppointments(1, between);
    }
  }, [type]);

  const handleOpenPopup = (e: any, data: any) => {
    const bound = e.target.getBoundingClientRect();
    let offsetLeft = 120;
    let width = 190;
    if (type === 'Accepted') {
      offsetLeft = 190;
      width = 260;
    }
    setMenuPopup({
      show: true,
      top: bound.top + window.scrollY,
      left: bound.left - offsetLeft + window.scrollX,
      width: width,
      ...data,
    });
  };

  const handleClosePopup = () => {
    setMenuPopup((menuPopup: any) => {
      return { ...menuPopup, show: false };
    });
  };

  const handleCancelAppointment = (reason?: string) => {
    callApi(
      {
        method: 'delete',
        api: '/api/v1/consulting/appointments/users',
        body: {
          appointment_id: popupCancelAppointment.appointmentId,
          update_status: 3,
          reason_refusal: reason || '',
        },
        loading: true,
      },
      (response) => {
        const { status } = response;
        if (status === SUCCESS) {
          getAppointments(1, [{ begin: -1, end: -1 }]);
          setPopupCancelAppointment({ show: false });
        }
      },
    );
  };

  const renderItems = () => {
    let RenderItem = mappingRenderItem[appointments.type];
    return appointments.data.map((item: any, index: number) => (
      <AppointmentWrapper key={index}>
        <RenderItem handleOpenPopup={handleOpenPopup} {...item} />
      </AppointmentWrapper>
    ));
  };

  let menuPopupItems: any = [];

  switch (type) {
    case 'Request':
      menuPopupItems = [
        {
          id: 'edit',
          label: 'Edit Request',
          icon: 'fas fa-pen',
          handle: () =>
            setPopupEditAppointment({
              show: true,
              appointmentId: menuPopup.appointmentId,
              begin: menuPopup.begin,
              end: menuPopup.end,
            }),
        },
        {
          id: 'cancel',
          label: 'Cancel Request',
          icon: 'fas fa-trash',
          handle: () => setPopupCancelAppointment({ ...menuPopup, show: true }),
        },
      ];
      break;
    case 'Accepted':
      menuPopupItems = [
        {
          id: 'create-event',
          label: 'Import to Google Calendar',
          icon: 'far fa-calendar-alt',
          handle: () => {
            const summary = menuPopup.treatmentTitle;
            const start = new Date(menuPopup.appointment_time_begin * 1000).toISOString();
            const end = new Date(menuPopup.appointment_time_end * 1000).toISOString();
            window.open(`/google-calendar?summary=${summary}&start=${start}&end=${end}`);
          },
        },
        {
          id: 'cancel',
          label: 'Cancel Appointment',
          icon: 'fas fa-times',
          handle: () => setPopupCancelAppointment({ ...menuPopup, show: true }),
        },
      ];
      break;

    default:
      break;
  }

  const handleLoadmore = () => {
    if (appointments.loading || appointments.full) return;

    getAppointments(appointments.page + 1, between);
  };

  return (
    <div className="p-3">
      <ModalFilterAppointment
        date={date}
        setDate={setDate}
        selectedHours={selectedHours}
        setSelectedHours={setSelectedHours}
        setBetween={setBetween}
        getAppointments={getAppointments}
        {...modalFilter}
        handleClose={() => setModalFilter({ show: false })}
      />
      <ModalEditAppointment
        {...popupEditAppointment}
        handleClose={() => setPopupEditAppointment({ show: false, begin: 0, end: 0, appointmentId: '' })}
        callApi={callApi}
        reload={() => getAppointments(1, [{ begin: -1, end: -1 }])}
      />
      <MenuPopup {...menuPopup} handleClose={handleClosePopup} items={menuPopupItems} />

      <ConfirmPopupInput
        isVisible={popupCancelAppointment.show}
        title="Cancel Appointment"
        content={`Please enter the reason why you want to cancel this ${
          menuPopup.type === 0 ? 'request' : 'appointment'
        }?`}
        leftButtonText="Close"
        rightButtonText={`Cancel ${menuPopup.type === 0 ? 'Request' : 'Appointment'}`}
        placeholder="Enter the reason ..."
        callback={handleCancelAppointment}
        handleClose={() => setPopupCancelAppointment({ show: false })}
      />

      <div className="d-flex align-items-center justify-content-between p-3">
        <div className="d-flex align-items-center">
          {types.map((item: any) => (
            <HBButtonSmall
              style={{ marginRight: 10 }}
              key={item}
              color={type === item ? 'violet' : 'petrol'}
              onClick={() => history.push(`?type=${item}`)}
            >
              {item}
            </HBButtonSmall>
          ))}
        </div>
        <div className="d-flex align-items-center">
          <i className="fas fa-filter btn-icon" onClick={() => setModalFilter({ show: true })} />
          <i className="fas fa-plus-circle btn-icon" onClick={() => history.push('/consulting/treatments')} />
          <CButton className="ml-3" color="primary" onClick={() => history.push('/consulting/add-friend')}>
            Add Friend
          </CButton>
        </div>
      </div>

      {!appointments.loading && appointments.data.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center" style={{ fontSize: 20, height: '50vh' }}>
          No {type === 'Request' ? 'request!' : 'appointment!'}
        </div>
      ) : (
        <div>
          <div className="row px-3">{renderItems()}</div>
          <Waypoint onEnter={handleLoadmore} />
        </div>
      )}
    </div>
  );
};

export default ConsultingMainPage;
