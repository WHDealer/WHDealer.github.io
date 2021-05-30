import React from 'react';
import { configure, mount } from 'enzyme';
import NewsfeedDetail from '../NewsfeedDetail';
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
        <NewsfeedDetail />
      </ReduxProvider>
    </Router>,
  );

  return wrapper;
};

describe('Test Newsfeed Category Detail', function () {
  it('Newsfeed Category Detail has rendered successfully', function () {
    // Expected: Newsfeed Category Detail did not crash on rendering
    const wrapper = createWrapper();
    wrapper.unmount();
  });

  it('Newsfeed Category Detail can search', function () {
    // Expected: Has search box and can type in search box
    const wrapper = createWrapper();
    expect(wrapper.find('input[type="text"]').first().props().placeholder).toBe('Search');
    wrapper.unmount();
  });

  it('Newsfeed Category Detail can show modal create article with full fields', function () {
    // Expected: Has modal create article, click create new article will show this modal
    const wrapper = createWrapper();
    // has modal create article
    // default modal state is hidden
    wrapper.unmount();
  });

  it('Newsfeed Category Detail can filter by time', function () {
    // Expected: Can select from date and to date
    const wrapper = createWrapper();
    // Has filter from date
    // Has filter to date
    wrapper.unmount();
  });
});
