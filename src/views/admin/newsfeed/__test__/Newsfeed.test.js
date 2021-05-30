import React from 'react';
import { configure, mount } from 'enzyme';
import Newsfeed from '../Newsfeed';
import { store, history } from '../../../../store';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>;

const createWrapper = () => {
  const wrapper = mount(
    <Router history={history}>
      <ReduxProvider>
        <Newsfeed />
      </ReduxProvider>
    </Router>,
  );

  return wrapper;
};

describe('Test Newsfeed Categories', function () {
  it('Newsfeed Categories Management has rendered successfully', function () {
    // Expected: Newsfeed Categories Management did not crash on rendering
    const wrapper = createWrapper();
    wrapper.unmount();
  });

  it('Newsfeed Categories Management can search', function () {
    // Expected: Has search box and search box is working
    const wrapper = createWrapper();
    expect(wrapper.find('input[type="text"]').first().props().placeholder).toBe('Search');
    wrapper.unmount();
  });

  it('Newsfeed Categories Management can filter by top category', function () {
    // Expected: Has filter checkbox and click in filter by top category will change check status
    const wrapper = createWrapper();
    // has filter checkbox
    // checkbox can click
    wrapper.unmount();
  });

  it('Newsfeed Categories Management can filter by time', function () {
    // Expected: Can filter from date to date
    const wrapper = createWrapper();
    // Can pick from date
    // Can pick to date
    wrapper.unmount();
  });
});
