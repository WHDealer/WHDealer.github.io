import React from 'react';
import { configure, shallow } from 'enzyme';
import ESignature from '../ESignature';
import { store } from '../../../../store';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>;

const createWrapper = (data) => {
  const wrapper = shallow(
    <ReduxProvider>
      <ESignature data={data} />
    </ReduxProvider>,
  );

  return wrapper;
};

describe('Test e signature', function () {
  it('Test e signature has rendered successfully', function () {
    const wrapper = createWrapper({
      signature: '',
    });
    wrapper.unmount();
  });
});
