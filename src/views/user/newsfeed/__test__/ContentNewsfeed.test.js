/*
    ContentNewsfeed.test.js
    Created by Nguyen Khanh on 19.03.21.
*/

import React from 'react';
import { configure, mount } from 'enzyme';
import ContentNewsfeed from '../ContentNewsfeed';
import { store } from '../../../../store';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>;

describe('Test Select Category Topics', function () {
  const createWrapper = (data) => {
    const wrapper = mount(
      <ReduxProvider>
        <ContentNewsfeed {...data} />
      </ReduxProvider>,
    );
    return wrapper;
  };

  it('Select Category Topics has rendered successfully', function () {
    // Expected: Select Category all Topics did not crash on rendering
    const wrapper = createWrapper({
      yourTopics: [],
      data: [],
    });
    wrapper.unmount();
  });

  it('Select Category Topics is unselected and selected', function () {
    // Expected: Select Category Topics show correct symbol when item is selected and unselected
    const data = {
      yourTopics: [
        { id: '1', name: '1' },
        { id: '2', name: '2' },
      ],
      data: [
        { id: '1', name: '1' },
        { id: '3', name: '3' },
        { id: '4', name: '4' },
      ],
    };
    const wrapper = createWrapper(data);
    const items = wrapper.find('.category-newsfeed');

    // three items in data will be shown
    expect(items.length).toBe(3);

    // the first item is in yourtopics so this is selected
    expect(items.at(0).props().className.includes('isSelected')).toBe(true);

    // and the rest is unselected
    expect(items.at(1).props().className.includes('isSelected')).toBe(false);
    expect(items.at(2).props().className.includes('isSelected')).toBe(false);

    wrapper.unmount();
  });
});
