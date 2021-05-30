/*
    ReplyInput.test.js
    Created by Nguyen Khanh on 18.03.21.
*/

import React from 'react';
import { configure, mount } from 'enzyme';
import ReplyInput from '../ReplyInput';
import { store } from '../../../../store';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>;

describe('Test reply input if has content', function () {
  const replyInputData = {
    videoId: 'video1',
    commentId: 'cmt1',
    replyId: 'reply1',
    replyContent: 'abc',
    setReplies: () => {},
    setShowUpdateInput: () => {},
  };

  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <ReduxProvider>
        <ReplyInput {...replyInputData} />
      </ReduxProvider>,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Reply Input has avatar, input', function () {
    // Expected: Show correct avatar of user, has input text
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.find('input').length).toBe(1);
  });

  it('Reply has 2 buttons', function () {
    // Expected: Has 2 buttons for Cancel and Reply
    expect(wrapper.find('button').at(0).text() === 'Cancel').toBe(true);
    expect(wrapper.find('button').at(1).text() === 'Reply').toBe(true);
  });
});

describe('Test reply input if dont have content', function () {
  const replyInputData = {
    videoId: 'video1',
    commentId: 'cmt1',
    replyId: 'reply1',
    replyContent: '',
    setReplies: () => {},
    setShowUpdateInput: () => {},
  };

  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <ReduxProvider>
        <ReplyInput {...replyInputData} />
      </ReduxProvider>,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Reply Input disable button when there is no text inside', function () {
    // Expected: Reply button will be disabled when there is no text inside
    expect(wrapper.find('button').at(0).text() === 'Reply').toBe(true);
    expect(wrapper.find('button').at(0).props().className.includes('disabled')).toBe(true);
  });
});
