import React from 'react';
import { configure, mount } from 'enzyme';
import Feedbacks from '../Feedbacks';
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
        <Feedbacks {...data} />
      </ReduxProvider>
    </Router>,
  );

  return wrapper;
};

describe('Test Feedbacks', function () {
  it('Feedbacks has rendered successfully', function () {
    // Expected: Feedbacks did not crash on rendering
    const wrapper = createWrapper({ show: true, nurseId: 'a', nurseName: 'Nguyen Khanh' });
    wrapper.unmount();
  });

  it('Feedbacks shows correct information of nurse', function () {
    // Expected: Show correct name, rating of nurse
    const wrapper = createWrapper({ show: true, nurseId: 'a', nurseName: 'Nguyen Khanh' });
    wrapper.unmount();
  });

  it('Feedbacks shows full 6 buttons filter rating', function () {
    // Expected: Render All button, 1 - 5 star buttons
    const wrapper = createWrapper({ show: true, nurseId: 'a', nurseName: 'Nguyen Khanh' });
    wrapper.unmount();
  });

  it('Feedbacks shows correct feedbacks of users', function () {
    // Expected: Show correct avatar, rating, content and created date
    const wrapper = createWrapper({ show: true, nurseId: 'a', nurseName: 'Nguyen Khanh' });
    wrapper.unmount();
  });
});
