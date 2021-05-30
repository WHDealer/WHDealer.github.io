/*
    ViewArticles.test.js
    Created by Nguyen Khanh on 23.03.21.
*/

import React from 'react';
import { configure, mount } from 'enzyme';
import ViewArticles from '../ViewArticles';
import { store, history } from '../../../../store';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import { Router } from 'react-router-dom';

configure({ adapter: new Adapter() });
const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>;

describe('Test View Articles', function () {
  const createWrapper = () => {
    const wrapper = mount(
      <Router history={history}>
        <ReduxProvider>
          <ViewArticles />
        </ReduxProvider>
      </Router>,
    );

    // return wrapper.find(ViewArticles).first();
    return wrapper;
  };

  it('View Articles has rendered successfully', function () {
    // Expected: View Articles did not crash on rendering
    const wrapper = createWrapper();
    wrapper.unmount();
  });


  it('View Articles has full fields', function () {
    // Expected: View Articles shows full items
    const wrapper = createWrapper();
    expect(wrapper.find('div').length).toBe(1);
    wrapper.unmount();
  });
});
