import React from 'react';
import { configure, mount } from 'enzyme';
import Notifications from '../Notifications';
import { store, history } from '../../../store';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>;

const createWrapper = () => {
  const wrapper = mount(
    <Router history={history}>
      <ReduxProvider>
        <Notifications />
      </ReduxProvider>
    </Router>,
  );

  return wrapper;
};

describe('Test Notifications', function () {
  it('Notifications has rendered successfully', function () {
    // Expected: Notifications did not crash on rendering
    const wrapper = createWrapper();
    wrapper.unmount();
  });

  it('Notifications has bell button', function () {
    // Expected: Notifications has bell button and can click
    const wrapper = createWrapper();
    expect(wrapper.find('.fa-bell').length).toBe(1);
    wrapper.unmount();
  });

  it('Clicking bell button show dropdown and change color bell', function () {
    // Expected: Clicking at bell, the notification will appear, and otherwise
    const wrapper = createWrapper();

    // click at bell
    wrapper.find('.cursor-pointer').first().simulate('click');
    // dropdown will be shown
    expect(wrapper.find('.noti-drop-down').first().props().className.includes('active')).toBe(true);
    // color of bell will be changed
    expect(wrapper.find('.fa-bell').first().props().className.includes('active')).toBe(true);
    wrapper.unmount();
  });
});
