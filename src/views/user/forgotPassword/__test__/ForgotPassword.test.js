/*
    ForgotPassword.test.js
    Created by Nguyen Khanh on 18.03.21.
*/

import React from 'react';
import { configure, mount } from 'enzyme';
import ForgotPassword from '../ForgotPassword';
import { store, history } from '../../../../store';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import { Router } from 'react-router-dom';
import i18n from '../../../../i18nForTests';
import { I18nextProvider } from 'react-i18next';

configure({ adapter: new Adapter() });
const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>;

describe('Test sign in', function () {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Router history={history}>
        <ReduxProvider>
          <I18nextProvider i18n={i18n}>
            <ForgotPassword />
          </I18nextProvider>
        </ReduxProvider>
      </Router>,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Test has full fields', function () {
    // input field for email
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('button[type="submit"]').length).toBeGreaterThanOrEqual(1);

    // has button cancel, go to sign in
    const cancelButton = wrapper.find('a[href="/sign-in"]').first();
    expect(cancelButton.length).toBe(1);
    expect(cancelButton.props().children).toBe('Cancel');
  });

  it('Test submit button is disabled at default', function () {
    expect(wrapper.find('button[type="submit"]').props().disabled).toBe(true);
  });
});
