import React from 'react';
import { configure, mount } from 'enzyme';
import Certificate from '../Certificate';
import { store } from '../../../../store';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>;

const createWrapper = (data) => {
  const wrapper = mount(
    <ReduxProvider>
      <Certificate data={data} />
    </ReduxProvider>,
  );

  return wrapper;
};

describe('Test certificate', function () {
  it('Test certificate has full fields', function () {
    const wrapper = createWrapper({
      files_professional: [],
      files_consultation: [],
    });
    // has 2 buttons for back, continue
    expect(wrapper.find('button').length).toBe(2);
    // 2 file inputs for upload file
    expect(wrapper.find('input[type="file"]').length).toBe(2);
    wrapper.unmount();
  });

  it('Test certificate will disable button if there is no files', function () {
    const wrapper = createWrapper({
      files_professional: [],
      files_consultation: [],
    });
    // disable button submit
    expect(wrapper.find('button').at(1).props().disabled).toBe(true);
    wrapper.unmount();
  });

  it('Test certificate renders full files selected, each file has remove button', function () {
    const wrapper = createWrapper({
      files_professional: [
        { name: 'image.png', link: 'abc' },
        { name: 'file.pdf', link: 'abc' },
      ],
      files_consultation: [
        { name: 'image.png', link: 'abc' },
        { name: 'file.pdf', link: 'abc' },
        { name: 'file2.pdf', link: 'abc' },
      ],
    });

    // show true file name
    expect(wrapper.text().includes('file.pdf')).toBe(true);
    // 5 buttons delete
    expect(wrapper.find('.fa-trash').length).toBe(5);
    // enable button submit
    expect(wrapper.find('button').at(1).props().disabled).toBe(false);
    wrapper.unmount();
  });
});
