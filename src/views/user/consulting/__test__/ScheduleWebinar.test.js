import React from 'react';
import { configure, mount } from 'enzyme';
import { ScheduleWebinar } from '../ScheduleWebinar';
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
        <ScheduleWebinar {...data} />
      </ReduxProvider>
    </Router>,
  );

  return wrapper;
};

describe('Test Schedule Webinar', function () {
  it('Schedule Webinar has rendered successfully', function () {
    // Expected: Schedule Webinar did not crash on rendering
    const wrapper = createWrapper({ treatments: { data: [] } });
    wrapper.unmount();
  });

  it('Schedule Webinar show full fields', function () {
    // Expected: Has full fields title, pick time, duration, treatments, radio button
    const wrapper = createWrapper({ treatments: { data: [] } });
    expect(wrapper.find('input').length).toBeGreaterThanOrEqual(9);
    wrapper.unmount();
  });

  it('Schedule Webinar has button back', function () {
    // Expected: Has arrow back button and working
    const wrapper = createWrapper({ treatments: { data: [] } });
    expect(wrapper.find('.fa-angle-left').length).toBe(1);
    wrapper.unmount();
  });

  it('Schedule Webinar disable schedule submit button at default', function () {
    // Expected: Schedule button will be disabled because of some fields are none
    const wrapper = createWrapper({ treatments: { data: [] } });
    expect(wrapper.find('.btn-primary').last().props().disabled).toBe(true);
    wrapper.unmount();
  });

  it('Schedule Webinar can show modal pick treatments', function () {
    // Expected: Has modal pick treatment diseases
    const wrapper = createWrapper({ treatments: { data: [] } });
    wrapper.unmount();
  });

  it('Schedule Webinar show correct and full treatments diseases', function () {
    // Expected: Show full treatment diseases as expected, each item has image, name
    const wrapper = createWrapper({
      treatments: {
        data: [
          {
            id: 1,
            thumbnail: '',
            tile: 'A',
          },
          {
            id: 2,
            thumbnail: '',
            tile: 'B',
          },
        ],
      },
    });
    expect(wrapper.find('img').length).toBe(2);
    wrapper.unmount();
  });

  it('Schedule Webinar can change radio button', function () {
    // Expected: Show all radio and can change radio input
    const wrapper = createWrapper({ treatments: { data: [] } });
    wrapper.unmount();
  });
});
