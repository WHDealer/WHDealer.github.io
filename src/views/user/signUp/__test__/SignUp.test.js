/*
    SignUp.test.js
    Created by Nguyen Khanh on 18.03.21.
*/

import React from 'react';
import { configure, mount } from 'enzyme';
import SignUp from '../SignUp';
import { store, history } from '../../../../store';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import { Router } from 'react-router-dom';
import i18n from '../../../../i18nForTests';
import { I18nextProvider } from 'react-i18next';

configure({ adapter: new Adapter() });
const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>;

describe('Test sign up', function () {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Router history={history}>
        <ReduxProvider>
          <I18nextProvider i18n={i18n}>
            <SignUp />
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
    expect(wrapper.find('input').length).toBe(4);
    expect(wrapper.find('button[type="submit"]').length).toBeGreaterThanOrEqual(1);

    // has link to sign-in
    expect(wrapper.find('a[href="/sign-in"]').length).toBeGreaterThanOrEqual(1);
  });

  it('Test submit button is disabled at default', function () {
    expect(wrapper.find('button[type="submit"]').props().disabled).toBe(true);
  });

  it('Test change screen nurse/user', function () {
    const toggleButton = wrapper.find('.link').first();
    expect(toggleButton.text()).toBe('Become a nurse');

    toggleButton.simulate('click');
    expect(toggleButton.text()).toBe('Become a user');
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
