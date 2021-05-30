import React from 'react';
import { configure, mount } from 'enzyme';
import CardPassport from '../CardPassport';
import { store } from '../../../../store';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>;

const createWrapper = (data) => {
  const wrapper = mount(
    <ReduxProvider>
      <CardPassport data={data} />
    </ReduxProvider>,
  );

  return wrapper;
};

describe('Test card passport', function () {
  it('Test card passport has full fields', function () {
    const wrapper = createWrapper({
      card_number: 'ABDASD',
      card_location: 'Ha Noi',
      card_expires: 214124214,
      image_front:
        'https://hb-uploader-bucket.s3.eu-central-1.amazonaws.com/profile/975f5de62433429ab61dbd24cee2c73c/image_back-avatar.png',
      image_back:
        'https://hb-uploader-bucket.s3.eu-central-1.amazonaws.com/profile/975f5de62433429ab61dbd24cee2c73c/image_back-avatar.png',
    });
    // has 2 text inputs for card number, location
    expect(wrapper.find('input[type="text"]').length).toBe(2);
    // 1 date inputs for card expires
    expect(wrapper.find('input[type="date"]').length).toBe(1);
    // 2 file inputs
    expect(wrapper.find('input[type="file"]').length).toBe(2);
    // 2 image
    expect(wrapper.find('img').length).toBeGreaterThanOrEqual(2);
    // has 2 button back and next
    expect(wrapper.find('button').length).toBeGreaterThanOrEqual(2);
    wrapper.unmount();
  });

  it('Test card passport will disable continue button if not full information', function () {
    const wrapper = createWrapper({
      card_number: '',
      card_location: '',
      card_expires: '',
      image_front: '',
      image_back: '',
    });
    expect(wrapper.find('button[type="submit"]').at(0).props().disabled).toBe(true);
    wrapper.unmount();
  });
});
