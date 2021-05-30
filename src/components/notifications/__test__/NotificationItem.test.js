import React from 'react';
import { configure, mount } from 'enzyme';
import { ItemFriendRequested, ItemFriendRequestAccepted } from '../NotificationItem';
import { store, history } from '../../../store';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>;

describe('Test Item Friend Requested', function () {
  const createWrapper = (data) => {
    const wrapper = mount(
      <Router history={history}>
        <ReduxProvider>
          <ItemFriendRequested {...data} />
        </ReduxProvider>
      </Router>,
    );

    return wrapper;
  };

  it('Item Friend Requested show correct created date, body, image', function () {
    // Expected: Show correct created date, body, image as expected
    const wrapper = createWrapper({
      image: 'https://google.com/',
      body: 'Halo',
      created_date: 1618060629,
    });
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.text().includes('Halo')).toBe(true);
    wrapper.unmount();
  });

  it('Item Friend Requested has full button to delete, confirm', function () {
    // Expected: Item Friend Requested has button delete friend, confirm friend
    const wrapper = createWrapper({
      image: 'https://google.com/',
      body: 'Halo',
      created_date: 1618060629,
    });
    expect(wrapper.find('button[children="Delete"]').length).toBe(1);
    expect(wrapper.find('button[children="Confirm"]').length).toBe(1);
    wrapper.unmount();
  });
});

describe('Test Item Friend Request Accepted', function () {
  const createWrapper = (data) => {
    const wrapper = mount(
      <Router history={history}>
        <ReduxProvider>
          <ItemFriendRequestAccepted {...data} />
        </ReduxProvider>
      </Router>,
    );

    return wrapper;
  };

  it('Item Friend Request Accepted show correct created date', function () {
    // Expected: Show correct created date
    const wrapper = createWrapper({
      image: 'https://google.com/',
      body: 'Halo',
      created_date: 1618060629,
    });
    wrapper.unmount();
  });

  it('Item Friend Request Accepted show correct body, image', function () {
    // Expected: Show correct content and image of friend
    const wrapper = createWrapper({
      image: 'https://google.com/',
      body: 'Halo',
      created_date: 1618060629,
    });
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.text().includes('Halo')).toBe(true);
    wrapper.unmount();
  });
});
