import React from 'react';
import { configure, mount } from 'enzyme';
import { store, history } from '../../../../store';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import FriendMainPage from '../AddFriendMainPage';
import { Router } from 'react-router-dom';

configure({ adapter: new Adapter() });
const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>;

window.scrollTo = jest.fn();

describe('Test friend list saved has full fields', function () {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Router history={history}>
        <ReduxProvider>
          <FriendMainPage />
        </ReduxProvider>
      </Router>,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Test friend list main page  than 1 tags div,p,h3', function () {
    expect(wrapper.find('div').length).toBe(19);
    expect(wrapper.find('h4').length).toBe(1);
    expect(wrapper.find('ul').length).toBe(1);
    expect(wrapper.find('li').length).toBe(3);
  });

  it('Test friend list main have list friend', function () {
    expect(wrapper.find('.add-friend-main-page').length).toBe(1);
  });
  it('Test show friend item', function () {
    expect(wrapper.find('.add-friend-main-page-body').length).toBe(1);
  });
  it('Test click friend request and search friend', function () {
    expect(wrapper.find('a').length).toBe(2);
  });
});
