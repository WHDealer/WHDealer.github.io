import React from 'react';
import { configure, mount } from 'enzyme';
import BookAppointment from '../BookAppointment';
import { store, history } from '../../../../store';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>;

const createWrapper = (data) => {
  const wrapper = mount(
    <Router history={history}>
      <ReduxProvider>
        <BookAppointment {...data} />
      </ReduxProvider>
    </Router>,
  );

  return wrapper;
};

describe('Test Book Appointment', function () {
  it('Book Appointment has rendered successfully', function () {
    // Expected: Book Appointment did not crash on rendering
    const wrapper = createWrapper({
      nurses: { data: [] },
      book: { nurse: null, appointment_time_begin: null, appointment_time_end: null },
    });
    wrapper.unmount();
  });

  it('Book Appointment can search', function () {
    // Expected: Has search box and search box is working
    const wrapper = createWrapper({
      nurses: { data: [] },
      book: { nurse: null, appointment_time_begin: null, appointment_time_end: null },
    });
    expect(wrapper.find('input[type="text"]').first().props().placeholder).toBe('Search');
    wrapper.unmount();
  });

  it('Book Appointment has list nurses', function () {
    // Expected: Has list nurses and list can drag, all nurse has full fields
    const wrapper = createWrapper({
      nurses: {
        data: [
          {
            id: '975f5de62433429ab61dbd24cee2c73c',
            thumbnail: null,
            last_name: 'Nguyen',
            first_name: 'Khanh',
            rating: 3.0,
          },
        ],
      },
      book: { nurse: null, appointment_time_begin: null, appointment_time_end: null },
    });
    // has item auto choose
    expect(wrapper.text().includes('HerzBegleiter choose for you')).toBe(true);
    // has 2 item nurses: 1 auto and 1 nurse Khanh Nguyen
    expect(wrapper.find('.book-appointment-nurse').length).toBe(2);
    wrapper.unmount();
  });

  it('Book Appointment can choose time', function () {
    // Expected: Has 3 buttons for today, tomorrow, later, can choose other dates, has dropdown for pick time begin, end
    const wrapper = createWrapper({
      nurses: { data: [] },
      book: { nurse: null, appointment_time_begin: null, appointment_time_end: null },
    });
    // 3 buttons for choose date
    expect(wrapper.find('.book-appointment-date').length).toBe(3);
    // 2 dropdown for choose time
    expect(wrapper.find('select').length).toBe(2);
    wrapper.unmount();
  });
});
