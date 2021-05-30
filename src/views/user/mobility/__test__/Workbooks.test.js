import React from 'react';
import { configure, mount } from 'enzyme';
import Workbooks from '../Workbooks';
import { store } from '../../../../store';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>;

describe('Test workbooks', function () {
  const data = [
    {
      key: '1234',
      file_name: 'Workbook 14444ds5353252353',
      link: 'http://www.africau.edu/images/default/sample.pdf',
    },
    {
      key: '2456',
      file_name: 'Workbook 2',
      link: 'https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf',
    },
    {
      key: '3253',
      file_name: 'Workbook 3',
      link: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    },
  ];

  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <ReduxProvider>
        <Workbooks data={data} />
      </ReduxProvider>,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Test has full workbooks', function () {
    // Expected: Show all workbooks as expected
    expect(wrapper.find('.workbooks-and-instructions-text').length).toBe(1);
    expect(wrapper.find('.workbook-text').length).toBe(data.length);
    expect(wrapper.text().includes(data[0].file_name)).toBe(true);
    expect(wrapper.text().includes(data[1].file_name)).toBe(true);
    expect(wrapper.text().includes(data[2].file_name)).toBe(true);
  });

  it('Test show/hide all workbooks', function () {
    // Expected: Clicking each workbook will make modal is shown, change arrow symbol
    expect(wrapper.find('.workbooks-wrapper').length).toBe(1);

    // test button before click is down
    expect(wrapper.find('.fa-chevron-down').length).toBe(1);

    // after click is up, modal is show
    wrapper.find('.cursor-pointer').first().simulate('click');
    expect(wrapper.find('.fa-chevron-up').length).toBe(1);
  });
});
