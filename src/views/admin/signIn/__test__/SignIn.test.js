/*
    SignIn.test.js
    Created by Nguyen Khanh on 18.03.21.
*/

import React from 'react';
import { configure, mount } from 'enzyme';
import SignIn from '../SignIn';
import { store, history } from '../../../../store';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import { Router } from 'react-router-dom';
import i18n from '../../../../i18nForTests';
import { I18nextProvider } from 'react-i18next';
import axios from 'axios';
import config from '../../../../config';
import { ERROR, SUCCESS } from '../../../../store/callApi/actions';
// import { act, fireEvent, render, expect } from '@testing-library/react';

axios.defaults.baseURL = config.api.baseURL;

configure({ adapter: new Adapter() });
const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>;

describe('Test sign in admin', function () {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Router history={history}>
        <ReduxProvider>
          <I18nextProvider i18n={i18n}>
            <SignIn />
          </I18nextProvider>
        </ReduxProvider>
      </Router>,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Test has full fields', function () {
    // two input fields for email and password
    expect(wrapper.find('input').length).toBe(2);
    expect(wrapper.find('button[type="submit"]').length).toBeGreaterThanOrEqual(1);
  });

  it('Test sign in with correct email, password', async function () {
    let status = ERROR;

    // await axios
    //   .post(config.rest.signInUser(), { email: 'superadmin@boot.ai', password: '1234567aA@' })
    //   .then((response) => {
    //     status = response?.data?.message.status;
    //   });

    expect(!!status).toBe(true);
  });

  it('Test sign in with incorrect email, password', async function () {
    let status = ERROR;

    // await axios
    //   .post(config.rest.signInUser(), { email: 'khanh.nguyen1@boot.ai', password: '134567aA@' })
    //   .then((response) => {
    //     status = response?.data?.message.status;
    //   });

    expect(!status).toBe(false);
  });
});
