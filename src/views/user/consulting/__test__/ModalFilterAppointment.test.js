import React from 'react';
import { configure, mount } from 'enzyme';
import ModalFilterAppointment from '../ModalFilterAppointment';
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
        <ModalFilterAppointment {...data} />
      </ReduxProvider>
    </Router>,
  );

  return wrapper;
};

describe('Test Filter Appointments', function () {
  it('Filter Appointments has rendered successfully', function () {
    // Expected: Filter Appointment did not crash on rendering, and only showing when clicking Filter
    const wrapper = createWrapper({
      show: true,
    });
    // find modal show is true
    expect(wrapper.find('.modal').length).toBe(1);
    wrapper.unmount();
  });

  it('Filter Appointments can choose date', function () {
    // Expected: Has 3 buttons for today, tomorrow, later, can choose other dates, has dropdown for pick time begin, end
    const wrapper = createWrapper({
      show: true,
    });
    //-- 3 buttons for choose date
    expect(wrapper.find('.book-appointment-date').length).toBe(3);
    //-- click tomorrow make tomorrow active
    wrapper.find('.book-appointment-date').at(1).simulate('click');
    expect(wrapper.find('.book-appointment-date').at(1).props().className.includes('active')).toBe(true);
    wrapper.unmount();
  });

  it('Filter Appointments can select multiple hours', function () {
    // Expected: Has 3 buttons for today, tomorrow, later, can choose other dates, has dropdown for pick time begin, end
    const wrapper = createWrapper({
      show: true,
    });
    // 8 buttons for choose hours
    let hourRangeButtons = wrapper.find('.hour-range-button');
    expect(hourRangeButtons.length).toBe(8);
    // click 2 buttons hour will make active 2 buttons
    hourRangeButtons.at(0).simulate('click');
    hourRangeButtons.at(1).simulate('click');
    hourRangeButtons = wrapper.find('.hour-range-button');
    expect(hourRangeButtons.at(0).props().className.includes('active')).toBe(true);
    expect(hourRangeButtons.at(1).props().className.includes('active')).toBe(true);
    wrapper.unmount();
  });

  it('Filter Appointments can apply filter', function () {
    // Expected: Has button apply and button is working
    const wrapper = createWrapper({
      show: true,
    });
    expect(wrapper.find('button').length).toBeGreaterThanOrEqual(1);
    wrapper.unmount();
  });

  it('Filter Appointments can reset to default', function () {
    // Expected: Click Reset will select date today, unselect all hours
    const wrapper = createWrapper({
      show: true,
    });
    // find reset button and click
    wrapper.find('.link').first().simulate('click');
    // after click, all item hour ranges is none active
    const hourRangeButtons = wrapper.find('.hour-range-button');
    expect(hourRangeButtons.at(0).props().className.includes('active')).toBe(false);
    expect(hourRangeButtons.at(1).props().className.includes('active')).toBe(false);
    wrapper.unmount();
  });
});
