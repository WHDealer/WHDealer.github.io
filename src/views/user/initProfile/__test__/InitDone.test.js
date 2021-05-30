import React from 'react';
import { configure, mount } from 'enzyme';
import InitDone from '../InitDone';
import { store } from '../../../../store';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>;

const createWrapper = () => {
  const wrapper = mount(
    <ReduxProvider>
      <InitDone />
    </ReduxProvider>,
  );

  return wrapper;
};

describe('Test init done', function () {
  it('Test init done has full fields', function () {
    const wrapper = createWrapper();
    // render true texts
    expect(
      wrapper
        .text()
        .includes('You have successfully updated your profile information. But your account has not been approved.'),
    ).toBe(true);
    expect(wrapper.text().includes('The admins team is reviewing your account and will get back to you shortly.')).toBe(
      true,
    );
    // has button OK
    expect(wrapper.find('button').length).toBeGreaterThanOrEqual(1);
    wrapper.unmount();
  });
});
