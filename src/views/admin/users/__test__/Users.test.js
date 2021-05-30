import React from 'react';
import { configure, mount } from 'enzyme';
import { store, history } from '../../../../store';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import { Router } from 'react-router-dom';
import i18n from '../../../../i18nForTests';
import { I18nextProvider } from 'react-i18next';
import axios from 'axios';
import config from '../../../../config';

import Users from '../Users';
import ModalUpdateUser from '../ModalUpdateUser';
import PopupResetPassword from '../PopupResetPassword';

axios.defaults.baseURL = config.api.baseURL;

configure({ adapter: new Adapter() });
const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>;

describe('Test User Management', function () {
  const createWrapper = (data) => {
    const wrapper = mount(
      <Router history={history}>
        <ReduxProvider>
          <I18nextProvider i18n={i18n}>
            <Users {...data} />
          </I18nextProvider>
        </ReduxProvider>
      </Router>,
    );

    return wrapper;
  };

  it('User Management has rendered successfully', function () {
    // Expected: Book Appointment did not crash on rendering
    const wrapper = createWrapper({});
    wrapper.unmount();
  });

  it('User Management shows correct header', function () {
    // Expected: Show correct text Admin management/Nurse management/Basic member management
    const wrapper = createWrapper({});
    expect(wrapper.text().includes('Admin management')).toBe(true);
    wrapper.unmount();
  });

  it('User Management has search input', function () {
    // Expected: Book Appointment has search input and it is working
    const wrapper = createWrapper({});
    expect(wrapper.find('input[placeholder="search"]').length).toBe(1);
    wrapper.unmount();
  });

  it('User Management can select status', function () {
    // Expected: Book Appointment has status select and it is working
    const wrapper = createWrapper({});
    // 3: 1 for select status main form, 1 for create form, 1 for update form
    expect(wrapper.find('select').length).toBe(3);
    wrapper.unmount();
  });

  it('User Management shows table users', function () {
    // Expected: Has table all users with full fields
    const wrapper = createWrapper({});
    expect(wrapper.find('table').length).toBe(1);
    wrapper.unmount();
  });
});

describe('Test Create/Update User', function () {
  const createWrapper = (data) => {
    const wrapper = mount(
      <Router history={history}>
        <ReduxProvider>
          <I18nextProvider i18n={i18n}>
            <ModalUpdateUser {...data} />
          </I18nextProvider>
        </ReduxProvider>
      </Router>,
    );

    return wrapper;
  };

  it('Modal Update User has full fields', function () {
    // Expected: Has input for first name, last name, email, select status, submit button
    const wrapper = createWrapper({
      initialValues: { first_name: 'Khanh', last_name: 'Nguyen', email: 'khanh.nguyen@boot.ai', status: 'Approval' },
    });
    expect(wrapper.find('input').length).toBe(3);
    expect(wrapper.find('select').length).toBe(1);
    expect(wrapper.find('button[type="submit"]').length).toBe(1);
    wrapper.unmount();
  });

  it('Modal Update User show correct data as expected', function () {
    // Expected: First name, last name, email same as data from user selected
    const wrapper = createWrapper({
      initialValues: { first_name: 'Khanh', last_name: 'Nguyen', email: 'khanh.nguyen@boot.ai', status: 'Approval' },
    });
    expect(wrapper.find('input').at(0).props().value).toBe('Khanh');
    expect(wrapper.find('input').at(1).props().value).toBe('Nguyen');
    expect(wrapper.find('input').at(2).props().value).toBe('khanh.nguyen@boot.ai');
    wrapper.unmount();
  });
});

describe('Test Reset Password', function () {
  const createWrapper = (data) => {
    const wrapper = mount(
      <Router history={history}>
        <ReduxProvider>
          <I18nextProvider i18n={i18n}>
            <PopupResetPassword {...data} />
          </I18nextProvider>
        </ReduxProvider>
      </Router>,
    );

    return wrapper;
  };

  it('Popup reset password shows correct information', function () {
    // Expected: Show correct text, user email, has button yes no
    const wrapper = createWrapper({ email: 'khanh.nguyen@boot.ai' });
    expect(wrapper.text().includes('khanh.nguyen@boot.ai')).toBe(true);
    wrapper.unmount();
  });
});
