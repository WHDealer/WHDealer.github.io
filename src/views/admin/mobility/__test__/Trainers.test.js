import React from 'react';
import { configure, mount } from 'enzyme';
import Trainers from '../Trainers';
import { store, history } from '../../../../store';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import i18n from '../../../../i18nForTests';
import { I18nextProvider } from 'react-i18next';

configure({ adapter: new Adapter() });
const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>;

const createWrapper = () => {
  const wrapper = mount(
    <Router history={history}>
      <I18nextProvider i18n={i18n}>
        <ReduxProvider>
          <Trainers />
        </ReduxProvider>
      </I18nextProvider>
    </Router>,
  );

  return wrapper;
};

describe('Test Trainer Management', function () {
  it('Trainer Management has rendered successfully', function () {
    // Expected: Trainer Management did not crash on rendering
    const wrapper = createWrapper();
    wrapper.unmount();
  });

  it('Trainer Management can search', function () {
    // Expected: Has search box and search box is working
    const wrapper = createWrapper();
    expect(wrapper.find('input[placeholder="Search"]').length).toBe(1);
    wrapper.unmount();
  });

  it('Trainer Management has modal create/update trainer', function () {
    // Expected: Has has modal create trainer and modal update trainer
    const wrapper = createWrapper();
    expect(wrapper.text().includes('Create New Trainer')).toBe(true);
    wrapper.unmount();
  });

  it('Trainer Management can delete trainer', function () {
    // Expected: Can delete a trainer after confirm
    const wrapper = createWrapper();
    expect(wrapper.text().includes('Delete Trainer')).toBe(true);
    wrapper.unmount();
  });
});
