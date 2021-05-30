import React from 'react';
import { configure, mount } from 'enzyme';
import { store } from '../../../../store';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import MobilitySaved from '../MobilitySaved';

configure({ adapter: new Adapter() });
const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>;

window.scrollTo = jest.fn();

describe('Test mobility saved has full fields', function () {
  const data = {
    location: 'asdasd',
  };

  let wrapper;

  window.scrollTo = jest.fn();

  beforeEach(() => {
    wrapper = mount(
      <ReduxProvider>
        <MobilitySaved {...data} />
      </ReduxProvider>,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Mobility Saved shows full fields', function () {
    // Expected: Show full div as expected
    expect(wrapper.find('div').length).toBe(8);
    expect(wrapper.find('.videos-saved--list-video').length).toBe(1);
  });
});
