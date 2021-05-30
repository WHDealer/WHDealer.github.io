import React from 'react';
import { configure, mount } from 'enzyme';
import PersonalInformation from '../PersonalInformation';
import { store } from '../../../../store';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>;

const createWrapper = (data) => {
  const wrapper = mount(
    <ReduxProvider>
      <PersonalInformation data={data} />
    </ReduxProvider>,
  );

  return wrapper;
};

describe('Test personal information', function () {
  it('Test personal information has full fields', function () {
    const wrapper = createWrapper({
      first_name: 'Khanh',
      last_name: 'Nguyen',
      date_of_birth: '2021-03-12',
      gender: 'male',
    });
    // has 3 radios for gender
    expect(wrapper.find('input[type="radio"]').length).toBe(3);
    // has 2 text inputs for first, last name
    expect(wrapper.find('input[type="text"]').length).toBe(2);
    // 1 date inputs for date of birth
    expect(wrapper.find('input[type="date"]').length).toBe(1);
    // button male is checked
    expect(wrapper.find('input[type="radio"]').at(1).props().checked).toBe(true);
    wrapper.unmount();
  });

  it('Test personal information will disable button and none of radio is checked', function () {
    const wrapper = createWrapper({
      first_name: 'Khanh',
      last_name: 'Nguyen',
      date_of_birth: '2021-03-12',
      gender: '',
    });
    const radios = wrapper.find('input[type="radio"]');
    expect(radios.at(0).props().checked).toBe(false);
    expect(radios.at(1).props().checked).toBe(false);
    expect(radios.at(2).props().checked).toBe(false);
    // disable button submit when gender is null
    expect(wrapper.find('button[type="submit"]').at(0).props().disabled).toBe(true);
    wrapper.unmount();
  });

  it('Test personal information if gender is female', function () {
    const wrapper = createWrapper({
      first_name: 'Khanh',
      last_name: 'Nguyen',
      date_of_birth: '2021-03-12',
      gender: 'female',
    });
    const radios = wrapper.find('input[type="radio"]');
    expect(radios.at(0).props().checked).toBe(true);
    expect(radios.at(1).props().checked).toBe(false);
    expect(radios.at(2).props().checked).toBe(false);
    // enable button submit
    expect(wrapper.find('button[type="submit"]').at(0).props().disabled).toBe(false);
    wrapper.unmount();
  });
});
