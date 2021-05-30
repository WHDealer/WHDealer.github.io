import React from 'react';
import { configure, mount } from 'enzyme';
import MyTrainer from '../Trainer';
import { store } from '../../../../store';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>;
window.scrollTo = jest.fn();
describe('Test my trainers has full fields', function () {
  const data = {
    id: '1',
    avatar: '1',
    first_name: 'Anh',
    last_name: 'Vu',
    amount_videos: 0,
    followed: false,
    fullWidth: true,
    mobility: true,
  };

  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <ReduxProvider>
        <MyTrainer {...data} />
      </ReduxProvider>,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('My trainers has correct content', function () {
    // Expected: My Trainers have tag div
    expect(wrapper.find('div').length).toBe(7);
  });
  it('My Trainer has followed', function () {
    expect(wrapper.text().includes(data.followed)).toBe(false);
  });
  it('My Trainer has fullname', function () {
    expect(wrapper.text().includes(data.first_name)).toBe(true);
    expect(wrapper.text().includes(data.last_name)).toBe(true);
  });
  it('My Trainer has amount video', function () {
    expect(wrapper.text().includes(data.amount_videos)).toBe(true);
  });
});
