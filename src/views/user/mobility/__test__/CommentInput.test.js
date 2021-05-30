import React from 'react';
import { configure, mount } from 'enzyme';
import CommentInput from '../CommentInput';
import { store } from '../../../../store';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>;

describe('Test comment input if has content', function () {
  const commentInputData = {
    videoId: 'video1',
    commentId: 'comment1',
    commentContent: 'abc',
    setComments: () => {},
    setShowUpdateInput: () => {},
  };

  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <ReduxProvider>
        <CommentInput {...commentInputData} />
      </ReduxProvider>,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Comment Input has avatar, input', function () {
    // Expected: Show avatar of user, show input text
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.find('input').length).toBe(1);
  });

  it('Comment Input has 2 buttons', function () {
    // Expected: Show 2 buttons for Cancel and Comment
    expect(wrapper.find('button').at(0).text() === 'Cancel').toBe(true);
    expect(wrapper.find('button').at(1).text() === 'Comment').toBe(true);
  });
});

describe('Test comment input if dont have content', function () {
  const commentInputData = {
    videoId: 'video1',
    commentId: 'comment1',
    commentContent: '',
    setComments: () => {},
    setShowUpdateInput: () => {},
  };

  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <ReduxProvider>
        <CommentInput {...commentInputData} />
      </ReduxProvider>,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Comment Input disable button when there is no text inside', function () {
    // Expected: Comment button will be disabled when none of content
    expect(wrapper.find('button').at(0).text() === 'Comment').toBe(true);
    expect(wrapper.find('button').at(0).props().className.includes('disabled')).toBe(true);
  });
});
