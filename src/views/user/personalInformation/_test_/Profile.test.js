import React from 'react';
import { configure, mount } from 'enzyme';
import { store } from '../../../../store';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import UpdatePersonalInformation from '../UpdatePersonalInformation';

configure({ adapter: new Adapter() });
const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>;

describe('Test profile has full fields', function () {
  const data = {
    show: true,
    toggle: true,
    formValue: [],
    setData: (params) => {},
    initialValues: {
      gender: 'male',
      first_name: 'Quy',
      last_name: 'Chu',
      phone_number: '0987654432',
      birth_date: '28-02-1997',
      email: 'mnhquy2802@gmail.com',
      bio: 'OK OK OK ',
    },
    handleClose: true,
  };

  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <ReduxProvider>
        <UpdatePersonalInformation {...data} />
      </ReduxProvider>,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Test profile has content', function () {
    expect(wrapper.find('div').length).toBe(26);
  });
  it('Test gender', function () {
    expect(wrapper.text().includes(data.initialValues.gender)).toBe(true);
  });
  it('Test email', function () {
    expect(wrapper.text().includes(data.initialValues.email === 'mnhquy2802@gmail.com')).toBe(false);
  });
  it('Test bio', function () {
    expect(wrapper.text().includes(data.initialValues.bio === 'Noooo')).toBe(false);
  });
});
