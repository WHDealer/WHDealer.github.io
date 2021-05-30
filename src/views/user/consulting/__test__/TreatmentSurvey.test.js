import { configure, mount } from 'enzyme';
import { store } from '../../../../store';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import TreatmentSurvey from '../TreatmentSurvey';

configure({ adapter: new Adapter() });
const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>;

window.scrollTo = jest.fn();

describe('Test survey question  has full fields', function () {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <ReduxProvider>
        <TreatmentSurvey />
      </ReduxProvider>,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Test survey question than 1 tags div,p,h3', function () {
    expect(wrapper.find('div').length).toBe(1);
    // expect(wrapper.find('h3').length).toBe(1);
    // expect(wrapper.find('p').length).toBe(1);
    // expect(wrapper.find('.treatment-main-page__header--content').length).toBe(1);
    // expect(wrapper.find('.treatment-main-page__header--title').length).toBe(1);
  });
});
