import React from 'react';
import { configure, mount } from 'enzyme';
import BookSuccessfully from '../BookSuccessfully';
import { store } from '../../../../store';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>;

const createWrapper = () => {
  const wrapper = mount(
    <ReduxProvider>
      <BookSuccessfully />
    </ReduxProvider>,
  );

  return wrapper;
};

describe('Test Book successfully', function () {
  it('Book successfully has rendered successfully', function () {
    // Expected: Book successfully did not crash on rendering
    const wrapper = createWrapper();
    wrapper.unmount();
  });

  it('Book successfully shows correct information', function () {
    // Expected: Book successfully has correct text, has button ok will go to home page
    const wrapper = createWrapper();
    expect(wrapper.text().includes('You have successfully booked an appointment!')).toBe(true);
    expect(
      wrapper
        .text()
        .includes('Thank you for your request. Please check your email or Request menu to follow the request!'),
    ).toBe(true);
    wrapper.unmount();
  });
});
