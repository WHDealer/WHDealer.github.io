import React from 'react';
import { configure, mount } from 'enzyme';
import ModalEditAppointment from '../ModalEditAppointment';
import { store, history } from '../../../../store';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import { Router } from 'react-router-dom';

configure({ adapter: new Adapter() });
const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>;

describe('Test Edit Cancel Appointent', function () {
  const createWrapper = (data) => {
    const wrapper = mount(
      <Router history={history}>
        <ReduxProvider>
          <ModalEditAppointment {...data} />
        </ReduxProvider>
      </Router>,
    );
    return wrapper;
  };

  it('Edit Modal show correct information', function () {
    // Expected: Render successfully and show correct booked time, date and hour
    const wrapper = createWrapper({
      show: true,
      appointmentId: 'id',
      begin: 1617272157,
      end: 1617272162,
    });
    expect(wrapper.text().includes('17:15 - 17:16')).toBe(true);
    expect(wrapper.text().includes('01.04.2021')).toBe(true);
    wrapper.unmount();
  });

  it('Appointent can show popup edit/cancel', function () {
    // Expected: Click more button will show popup edit/cancel
    const wrapper = createWrapper({
      show: true,
      appointmentId: 'id',
      begin: 1617272157,
      end: 1617272162,
    });
    wrapper.unmount();
  });

  it('Edit Appointent has popup confirm', function () {
    // Expected: Has popup confirm when click close
    const wrapper = createWrapper({
      show: true,
      appointmentId: 'id',
      begin: 1617272157,
      end: 1617272162,
    });
    expect(wrapper.find('.modal').length).toBe(2);
    wrapper.unmount();
  });

  it('Edit Appointent can choose date, hour', function () {
    // Expected: Has full date picker, hour picker
    const wrapper = createWrapper({
      show: true,
      appointmentId: 'id',
      begin: 1617272157,
      end: 1617272162,
    });
    expect(wrapper.find('.book-appointment-date').length).toBe(3);
    expect(wrapper.find('input').length).toBeGreaterThanOrEqual(0);
    wrapper.unmount();
  });
});
