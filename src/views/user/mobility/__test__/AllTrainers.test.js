import React from 'react';
import { configure, mount } from 'enzyme';
import AllTrainers from '../Trainer';
import { store } from '../../../../store';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>;
window.scrollTo = jest.fn();
// jest.mock('react-router-dom', () => ({
//   useLocation: jest.fn().mockReturnValue({
//     pathname: '/all-trainers',
//     search: '',
//     hash: '',
//     state: null,
//     key: '5nvxpbdafa',
//   }),
// }));

describe('Test all trainers has full fields', function () {
  const data = {
    id: '1',
    avatar: '1',
    first_name: '1',
    last_name: '1',
    amount_videos: 234,
    followed: false,
    fullWidth: true,
    mobility: true,
  };

  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <ReduxProvider>
        <AllTrainers {...data} />
      </ReduxProvider>,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('AllTrainers has correct content', function () {
    // Expected: All Trainers have tag div
    expect(wrapper.find('div').length).toBe(7);
  });
});
