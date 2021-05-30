/*
    Reply.test.js
    Created by Nguyen Khanh on 18.03.21.
*/

import React from 'react';
import { configure, mount } from 'enzyme';
import Reply from '../Reply';
import { store } from '../../../../store';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import { timestampToDatetime } from '../../../../utils';
import { defaultAvatar } from '../../../../extensions';

configure({ adapter: new Adapter() });
const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>;

describe('Test reply has full fields', function () {
  const replyData = {
    videoId: 'video1',
    commentId: 'comment1',
    reply: {
      user_id: 'user1',
      id: 'comment1',
      user_avatar: defaultAvatar,
      username: 'username',
      content: 'Hello my friend',
      is_liked: true,
      liked_amount: 20,
      created_date: 1614852984,
    },
    setComments: () => {},
    setReplies: () => {},
    setPopupDelete: () => {},
  };

  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <ReduxProvider>
        <Reply {...replyData} />
      </ReduxProvider>,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Reply has content', function () {
    // Expected: Show avatar of user, correct username and content
    expect(wrapper.find('div').length).toBe(7);
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.text().includes(replyData.reply.username)).toBe(true);
    expect(wrapper.text().includes(replyData.reply.content)).toBe(true);
  });

  it('Reply has correct created date', function () {
    // Expected: Show correct created date as expected
    expect(wrapper.text().includes(timestampToDatetime(replyData.reply.created_date))).toBe(true);
  });

  it('Reply when this reply is liked by user', function () {
    // When this reply is liked, show correct symbol, correct amount of like
    expect(wrapper.find(replyData.reply.is_liked ? '.fas' : '.far').length).toBe(1);
    expect(wrapper.text().includes(replyData.reply.liked_amount)).toBe(true);
  });
});
