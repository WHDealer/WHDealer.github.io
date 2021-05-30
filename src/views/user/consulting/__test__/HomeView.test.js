import { configure, mount } from 'enzyme';
import { store } from '../../../../store';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import HomeView from '../ConsultingMainPage';
import UpcomingMainPage from '../UpcomingMainPage';
import WebinarMainPage from '../WebinarMainPage';
import WebinarItem from '../WebinarItemHomeView';

configure({ adapter: new Adapter() });
const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>;

window.scrollTo = jest.fn();

describe('Test home view  has full fields', function () {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <ReduxProvider>
        <HomeView />
      </ReduxProvider>,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Test home view  than 1 tags div,p,h3', function () {
    expect(wrapper.find('div').length).toBe(1);
  });
});
describe('Test upcoming  has full fields', function () {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <ReduxProvider>
        <UpcomingMainPage />
      </ReduxProvider>,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Test upcoming has render', function () {
    expect(wrapper.find('div').length).toBe(3);
  });
});

describe('Test upcoming  has full fields', function () {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <ReduxProvider>
        <WebinarMainPage />
      </ReduxProvider>,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Test notify upcoming page ', function () {
    expect(wrapper.find('div').length).toBe(4);
  });
});

describe('Test Webinar Live  has full fields', function () {
  let wrapper;

  const data = {
    id: '1',
    created_date: '28/02/1997',
    title: 'Quy',
    description: 'Oi oi oi',
    start_date: '28/02/1997',
    host_name: 'Quy',
    amount_viewers: 1234,
    diseases: [{ id: 1, name: 'Quy' }],
  };

  beforeEach(() => {
    wrapper = mount(
      <ReduxProvider>
        <WebinarItem {...data} />
      </ReduxProvider>,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Test Webinar Live page has rendered', function () {
    expect(wrapper.find('div').length).toBe(12);
  });
  it('Test show all Webinar Live', function () {
    expect(wrapper.find('p').length).toBe(2);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('i').length).toBe(2);
  });
});
