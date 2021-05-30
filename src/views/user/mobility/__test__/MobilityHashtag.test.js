import { configure, mount } from 'enzyme';
import { store } from '../../../../store';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import MobilityHashtag from '../Hashtag';

configure({ adapter: new Adapter() });
const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>;

window.scrollTo = jest.fn();

describe('Test mobility saved has full fields', function () {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <ReduxProvider>
        <MobilityHashtag
          location={{ search: { email: 'khanh.nguyen@boot.ai', code: '041255', type: 'user', match: 'abc' } }}
        />
      </ReduxProvider>,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Hashtag shows full items', function () {
    // Expected: Show full tags: div, h3, p
    expect(wrapper.find('div').length).toBe(5);
    expect(wrapper.find('h3').length).toBe(1);
    expect(wrapper.find('p').length).toBe(1);
  });
});
