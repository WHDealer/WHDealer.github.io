import React from 'react';
import { configure, mount } from 'enzyme';
import EnterInformation from '../EnterInformation';
import { store } from '../../../../store';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>;

const createWrapper = (data) => {
  const wrapper = mount(
    <ReduxProvider>
      <EnterInformation {...data} />
    </ReduxProvider>,
  );

  return wrapper;
};

describe('Test Enter Information', function () {
  it('Enter Information has rendered successfully', function () {
    // Expected: Enter Information did not crash on rendering
    const wrapper = createWrapper({
      info: {
        gender: '',
        first_name: '',
        last_name: '',
        date_of_birth: '',
        phone: '',
        street: '',
        no: '',
        post_code: '',
        place: '',
      },
      toMe: false,
    });
    wrapper.unmount();
  });

  it('Enter Information has full fields', function () {
    // Expected: Enter Information has radio, input, date
    const wrapper = createWrapper({
      info: {
        gender: '',
        first_name: '',
        last_name: '',
        date_of_birth: '',
        phone: '',
        street: '',
        no: '',
        post_code: '',
        place: '',
      },
      toMe: false,
    });
    expect(wrapper.find('input[type="radio"]').length).toBe(3);
    expect(wrapper.find('input[type="text"]').length).toBe(7);
    expect(wrapper.find('input[type="date"]').length).toBe(1);
    wrapper.unmount();
  });

  it('Enter Information disables continue button on default', function () {
    // Expected: Disable submit button when there are some fields empty
    const wrapper = createWrapper({
      info: {
        gender: '',
        first_name: '',
        last_name: '',
        date_of_birth: '',
        phone: '',
        street: '',
        no: '',
        post_code: '',
        place: '',
      },
      toMe: false,
    });
    expect(wrapper.find('button[type="submit"]').first().props().children).toBe('Continue');
    wrapper.unmount();
  });

  it('Enter Information when this treatment is to me', function () {
    // Expected: First name, Last name will be filled, read only
    const wrapper = createWrapper({
      info: {
        gender: '',
        first_name: '',
        last_name: '',
        date_of_birth: '',
        phone: '',
        street: '',
        no: '',
        post_code: '',
        place: '',
      },
      toMe: true,
    });
    expect(wrapper.find('input[type="text"]').at(0).props().disabled).toBe(true);
    expect(wrapper.find('input[type="text"]').at(1).props().disabled).toBe(true);
    wrapper.unmount();
  });
});
