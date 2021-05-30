import React from 'react';
import { configure, mount } from 'enzyme';
import Comment from '../Comment';
import { store } from '../../../../store';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import { timestampToDatetime } from '../../../../utils';
import { defaultAvatar } from '../../../../extensions';

configure({ adapter: new Adapter() });
const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>;

describe('Test comment has full fields', function () {
  const commentData = {
    videoId: 'video1',
    comment: {
      user_id: 'user1',
      id: 'comment1',
      user_avatar: defaultAvatar,
      username: 'username',
      content: 'Hello my friend',
      is_liked: true,
      liked_amount: 20,
      replied_amount: 30,
      created_date: 1614852984,
    },
    setComments: () => {},
    setPopupDelete: () => {},
  };

  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <ReduxProvider>
        <Comment {...commentData} />
      </ReduxProvider>,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Comment has correct content', function () {
    // Expected: Comment has avatar, correct username and content
    expect(wrapper.find('div').length).toBe(9);
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.text().includes(commentData.comment.username)).toBe(true);
    expect(wrapper.text().includes(commentData.comment.content)).toBe(true);
  });

  it('Comment has correct created date', function () {
    // Expected: Comment show correct created date as expected
    expect(wrapper.text().includes(timestampToDatetime(commentData.comment.created_date))).toBe(true);
  });

  it('Comment when this comment is liked', function () {
    // Expected: Show correct symbol liked when this comment is liked by user
    expect(wrapper.find(commentData.comment.is_liked ? '.fas' : '.far').length).toBe(
      1 + (commentData.comment.replied_amount > 0 ? 1 : 0),
    );
  });

  it('Comment has button View all replies', function () {
    // Expected: When comment has greater than or equal to 2 replies, show View all replies
    expect(wrapper.text().includes(`View all ${commentData.comment.replied_amount} replies`)).toBe(true);
  });
});
