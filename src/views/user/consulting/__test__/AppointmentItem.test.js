import React from 'react';
import { configure, mount } from 'enzyme';
import { AppointmentRequest, AppointmentAccepted, AppointmentFinished, AppointmentCancelled } from '../AppointmentItem';
import { store, history } from '../../../../store';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import { Router } from 'react-router-dom';

configure({ adapter: new Adapter() });
const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>;

const data = {
  appointment_status: 0,
  appointment_time_begin: 1617272157,
  appointment_time_begin_reality: 1617272157,
  appointment_time_end: 1617272162,
  appointment_time_end_reality: 1617272157,
  cancel_by_id: null,
  cancelled: { id: '1', first_name: 'a', last_name: 'b' },
  created_date: 1618339717,
  feedback: null,
  id: 32,
  modified_date: 1618339717,
  request_nurses: { id: '975f5de62433429ab61dbd24cee2c73c', last_name: 'Nguyen', first_name: 'Khanh' },
  request_nurses_id: '975f5de62433429ab61dbd24cee2c73c',
  treatments: { id: 2, diseases_title: 'Cystitis' },
  video_record: null,
};

describe('Test Request Appointent', function () {
  const createWrapper = (data) => {
    const wrapper = mount(
      <Router history={history}>
        <ReduxProvider>
          <AppointmentRequest {...data} />
        </ReduxProvider>
      </Router>,
    );
    return wrapper;
  };

  it('Request Appointent show correct information', function () {
    // Expected: Render successfully and show correct time, treatment name, requested nurse, show no answer correct
    const wrapper = createWrapper(data);
    expect(wrapper.text().includes('Request to: Khanh Nguyen')).toBe(true);
    wrapper.unmount();
  });

  it('Request Appointent can show popup edit/cancel', function () {
    // Expected: Click more button will show popup edit/cancel
    const wrapper = createWrapper(data);
    expect(wrapper.find('.more').length).toBe(1);
    wrapper.unmount();
  });
});

describe('Test Accepted Appointent', function () {
  const createWrapper = (data) => {
    const wrapper = mount(
      <Router history={history}>
        <ReduxProvider>
          <AppointmentAccepted {...data} />
        </ReduxProvider>
      </Router>,
    );
    return wrapper;
  };

  it('Accepted Appointent show correct information', function () {
    // Expected: Render successfully and show correct time, treatment name, requested nurse, join room
    const wrapper = createWrapper(data);
    expect(wrapper.text().includes('Cystitis')).toBe(true);
    wrapper.unmount();
  });

  it('Accepted Appointent can show poup add to google calendar', function () {
    // Expected: Click more button makes popup show, can add event
    const wrapper = createWrapper(data);
    expect(wrapper.find('.more').length).toBe(1);
    wrapper.unmount();
  });
});

describe('Test Finished Appointent show correct information', function () {
  const createWrapper = (data) => {
    const wrapper = mount(
      <Router history={history}>
        <ReduxProvider>
          <AppointmentFinished {...data} />
        </ReduxProvider>
      </Router>,
    );
    return wrapper;
  };

  it('Finished Appointent show correct information', function () {
    // Expected: Render successfully and show correct time, treatment name, duration
    const wrapper = createWrapper(data);
    expect(wrapper.text().includes('Cystitis')).toBe(true);
    wrapper.unmount();
  });

  it('Finished Appointent can show feedback, video record', function () {
    // Expected: Show feedback rating when this appointment is feedbacked, show watch video button
    const wrapper = createWrapper(data);
    expect(wrapper.text().includes('Feedback')).toBe(true);
    wrapper.unmount();
  });
});

describe('Test Cancelled Appointent', function () {
  const createWrapper = (data) => {
    const wrapper = mount(
      <Router history={history}>
        <ReduxProvider>
          <AppointmentCancelled {...data} />
        </ReduxProvider>
      </Router>,
    );
    return wrapper;
  };

  it('Cancelled Appointent show correct information', function () {
    // Expected: Render successfully and show correct booked time, cancelled time, treatment name, requested nurse, cancelled by
    const wrapper = createWrapper(data);
    expect(wrapper.text().includes('Cystitis')).toBe(true);
    wrapper.unmount();
  });
});
