import React from 'react';
import { configure, mount } from 'enzyme';
import TreatmentOverview from '../TreatmentOverview';
import { store } from '../../../../store';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>;

const createWrapper = (data) => {
  const wrapper = mount(
    <ReduxProvider>
      <TreatmentOverview {...data} />
    </ReduxProvider>,
  );

  return wrapper;
};

describe('Test Treatment Overview', function () {
  it('Treatment Overview has rendered successfully', function () {
    // Expected: Treatment Overview did not crash on rendering
    const wrapper = createWrapper({
      book: { nurse: 'sadbsaw124', appointment_time_begin: 1617354900, appointment_time_end: 1617358500 },
      info: { phone: '+84366918587' },
    });
    wrapper.unmount();
  });

  it('Treatment Overview shows correct information from previous steps', function () {
    // Expected: Treatment Overview has 4 inputs show true info, read only
    const wrapper = createWrapper({
      book: { nurse: 'sadbsaw124', appointment_time_begin: 1617354900, appointment_time_end: 1617358500 },
      info: { phone: '+84366918587' },
    });
    const inputs = wrapper.find('input');
    expect(inputs.length).toBe(4);
    expect(inputs.at(1).props().value).toBe('Friday 02.04.2021');
    expect(inputs.at(2).props().value).toBe('16:15 - 17:15');
    expect(inputs.at(3).props().value).toBe('+84366918587');
    wrapper.unmount();
  });

  it('Treatment Overview can back step', function () {
    // Expected: Click change button will go to previous steps
    const wrapper = createWrapper({
      book: { nurse: 'sadbsaw124', appointment_time_begin: 1617354900, appointment_time_end: 1617358500 },
      info: { phone: '+84366918587' },
    });
    expect(wrapper.find('.fa-pencil').length).toBe(3);
    wrapper.unmount();
  });
});
