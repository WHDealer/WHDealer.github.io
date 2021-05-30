/*
    VerifyEmail.test.js
    Created by Nguyen Khanh on 18.03.21.
*/

import React from 'react';
import { configure, mount } from 'enzyme';
import VerifyEmail from '../VerifyEmail';
import { store, history } from '../../../../store';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import { Router } from 'react-router-dom';
import i18n from '../../../../i18nForTests';
import { I18nextProvider } from 'react-i18next';

configure({ adapter: new Adapter() });
const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>;

describe('Test verify email if lacking of params', function () {
  it('Test dont show anything', function () {
    let wrapper = mount(
      <Router history={history}>
        <ReduxProvider>
          <I18nextProvider i18n={i18n}>
            <VerifyEmail />
          </I18nextProvider>
        </ReduxProvider>
      </Router>,
    );
    expect(wrapper.text()).toBe('');
    wrapper.unmount();
  });
});

describe('Test verify email if full of params', function () {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Router history={history}>
        <ReduxProvider>
          <I18nextProvider i18n={i18n}>
            <VerifyEmail location={{ search: { email: 'khanh.nguyen@boot.ai', code: '041255', type: 'nurse' } }} />
          </I18nextProvider>
        </ReduxProvider>
      </Router>,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Test has full fields', function () {
    expect(wrapper.find('div').length).toBeGreaterThanOrEqual(1);
  });
});
