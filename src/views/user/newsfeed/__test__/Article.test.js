/*
    Article.test.js
    Created by Nguyen Khanh on 19.03.21.
*/

import React from 'react';
import { configure, mount } from 'enzyme';
import Article from '../Article';
import { store } from '../../../../store';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>;

describe('Test Article Item', function () {
  const createWrapper = (status) => {
    const data = {
      index: 1,
      id: 'article1',
      image: 'https://quantri.longbien.edu.vn/UploadFolderNew/SGDLongBien/Image/Test/test.jpg',
      created_date: 1616123050,
      title: 'Pflegekraeften droht Abschiebung | Häusliche Pflege',
      summary:
        'Pflegekräfte werden händeringend gesucht. Während die deutsche Regierung in Mexiko und den Philippinen Pflegepersonal anwirbt, droht Fachkräften hierzulande die Abschiebung. Häusliche Pflege berichtet jetzt über zwei Fälle, stellvertretend für zahllose weitere Schicksale. Dies ist nicht nur menschlich verheerend, sondern verstärkt den dramatischen Fachkräftemangel',
      source: 'https://www.haeusliche-pflege.net/artikel/2021/3_2021/pflegekraeften-droht-abschiebung',
      setArticles: (articles) => {},
      status: status,
      reload: () => {},
    };

    const wrapper = mount(
      <ReduxProvider>
        <Article {...data} />
      </ReduxProvider>,
    );

    return wrapper;
  };

  it('Article Item has rendered successfully', function () {
    // Expected: Article Item did not crash on rendering
    const wrapper = createWrapper(false);
    wrapper.unmount();
  });

  it('Article Item has full fields', function () {
    // Expected: Article Item has full image, save button, correct text
    const wrapper = createWrapper(false);
    expect(wrapper.find('div').length).toBe(7);
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.text().includes('Pflegekraeften')).toBe(true);
    expect(wrapper.text().includes('Pflegekräfte')).toBe(true);
    expect(wrapper.find('.fa-bookmark').props().className.includes('far fa-bookmark')).toBe(true);
    wrapper.unmount();
  });

  it('Article Item when this article in favorite', function () {
    // Expected: Article Item show correct save button
    const wrapper = createWrapper(true);
    expect(wrapper.find('.fa-bookmark').props().className.includes('fas fa-bookmark')).toBe(true);
    wrapper.unmount();
  });

  it('Article Item link is working', function () {
    // Expected: Article Item when clicking link will open new tab
    const wrapper = createWrapper(false);
    const link = wrapper
      .find('a[href="https://www.haeusliche-pflege.net/artikel/2021/3_2021/pflegekraeften-droht-abschiebung"]')
      .last();

    // test link is shorten
    expect(link.props().children === 'haeusliche-pflege.net').toBe(true);

    // test link can click
    link.simulate('click');

    wrapper.unmount();
  });
});
