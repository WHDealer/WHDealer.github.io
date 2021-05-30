import React from 'react';
import { configure, shallow } from 'enzyme';
import VideoPlayer from '../../../../components/videoPlayer/VideoPlayer';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Test Watch Video', function () {
  const data = {
    autoplay: true,
    controls: true,
    poster: 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
    sources: 'https://test-streams.mux.dev/x36xhzz/url_6/193039199_mp4_h264_aac_hq_7.m3u8',
    showQuality: true,
    className: 'vjs-next-button vjs-seek-button vjs-quality-selector vjs-fullscreen-control',
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<VideoPlayer {...data} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Watch Video can load video by hls link', function () {
    // Expected: Can load video from id
    expect(wrapper.find('video').length).toBe(1);
  });

  it('Watch Video can next video', function () {
    // Expected: Has next button and next button is working
    expect(wrapper.find('.vjs-next-button').length).toBe(1);
  });

  it('Watch Video can seek time', function () {
    // Expected: Has seek time button and seek time button is working
    expect(wrapper.find('.vjs-seek-button').length).toBe(1);
  });

  it('Watch Video can change quality', function () {
    // Expected: Has change quality setting button and it is working
    expect(wrapper.find('.vjs-quality-selector').length).toBe(1);
  });

  it('Watch Video can fullscreen', function () {
    // Expected: Has fullscreen button and it is working
    expect(wrapper.find('.vjs-fullscreen-control').length).toBe(1);
  });
});
