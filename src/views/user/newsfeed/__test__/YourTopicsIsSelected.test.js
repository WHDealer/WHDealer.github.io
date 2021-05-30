/*
    ContentNewsfeed.test.js
    Created by Nguyen Khanh on 19.03.21.
*/

import React from 'react';
import { configure, mount } from 'enzyme';
import YourTopicsIsSelected from '../YourTopicsIsSelected';
import { store } from '../../../../store';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>;

describe('Test My Category', function () {
  const createWrapper = (data) => {
    const wrapper = mount(
      <ReduxProvider>
        <YourTopicsIsSelected {...data} />
      </ReduxProvider>,
    );
    return wrapper;
  };

  it('Category Item in my categories has rendered successfully', function () {
    // Expected: Category items in my categories did not crash on rendering
    const wrapper = createWrapper({ yourTopics: [] });
    wrapper.unmount();
  });

  it('Category Item in my categories has full items', function () {
    // Expected: Category items in my categories has full items as input, shows correct text
    const data = {
      yourTopics: [
        { id: '1', name: 'covid19' },
        { id: '2', name: 'health' },
        { id: '3', name: 'virus' },
        { id: '4', name: 'corona' },
      ],
    };
    const wrapper = createWrapper(data);
    const items = wrapper.find('.your-topics__isselected--wrapper');

    // four items in data will be shown
    expect(items.length).toBe(4);

    // and has true content
    expect(items.at(0).text()).toBe('covid19');
    expect(items.at(1).text()).toBe('health');
    expect(items.at(2).text()).toBe('virus');
    expect(items.at(3).text()).toBe('corona');

    wrapper.unmount();
  });
});
