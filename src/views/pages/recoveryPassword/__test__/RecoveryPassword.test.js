/*
    RecoveryPassword.test.js
    Created by Nguyen Khanh on 18.03.21.
*/

import React from 'react';
import { configure, mount } from 'enzyme';
import RecoveryPassword from '../RecoveryPassword';
import { store, history } from '../../../../store';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import { Router } from 'react-router-dom';
import i18n from '../../../../i18nForTests';
import { I18nextProvider } from 'react-i18next';

configure({ adapter: new Adapter() });
const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>;

describe('Test recovery password if lacking of params', function () {
  it('Test dont show anything', function () {
    let wrapper = mount(
      <Router history={history}>
        <ReduxProvider>
          <I18nextProvider i18n={i18n}>
            <RecoveryPassword />
          </I18nextProvider>
        </ReduxProvider>
      </Router>,
    );
    expect(wrapper.text()).toBe('');
    wrapper.unmount();
  });
});

describe('Test recovery password if full of params', function () {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Router history={history}>
        <ReduxProvider>
          <I18nextProvider i18n={i18n}>
            <RecoveryPassword location={{ search: { email: 'khanh.nguyen@boot.ai', code: '041255', type: 'nurse' } }} />
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
    expect(wrapper.find('input').length).toBe(2);
    expect(wrapper.find('button[type="submit"]').length).toBeGreaterThanOrEqual(1);
  });

  it('Test submit button is disabled at default', function () {
    expect(wrapper.find('button[type="submit"]').props().disabled).toBe(true);
  });

  it('Test show/hide password', function () {
    const toggleButton = wrapper.find('.input-group-text').first();
    expect(wrapper.find('input[name="password"]').props().type).toBe('password');

    // after click button => show/hide password
    toggleButton.simulate('click');
    expect(wrapper.find('input[name="password"]').props().type).toBe('text');

    toggleButton.simulate('click');
    expect(wrapper.find('input[name="password"]').props().type).toBe('password');
  });
});
