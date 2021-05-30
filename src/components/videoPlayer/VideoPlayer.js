import { useEffect, useRef } from 'react';
import classnames from 'classnames';
import videojs from 'video.js';
import './VideojsContribQualityLevels';
import './VideojsHlsQualitySelector';
import './VideojsSeekButtons';
import 'video.js/dist/video-js.css';
import './VideojsSeekButtons.css';
import './VideoPlayer.scss';
import { useHistory } from 'react-router-dom';

videojs.addLanguage('de', {
  Play: 'Spielen',
  Pause: 'Pause',
  Fullscreen: 'Vollbild',
  'Non-Fullscreen': 'Vollbild beenden ',
  Mute: 'Stummschalten',
  Unmute: 'Unmute',
  'Play Video': 'Video abspielen',
});

const VideoPlayer = (props) => {
  const { className, setPlayer, autoplay, controls, poster, sources, setRelatedVideos, startTime, showQuality } = props;

  const history = useHistory();
  const videoRef = useRef(null);

  useEffect(() => {
    const observeVideoProgress = setInterval(() => {
      const video = (videoRef && videoRef.current) || null;

      if (video && !video.paused) {
        const { duration, currentTime } = video;

        props.videoProgress({
          duration,
          currentTime,
        });
      }
    }, 500);

    return () => {
      clearInterval(observeVideoProgress);
    };
  }, []);

  useEffect(() => {
    const quality = showQuality ? { qualityLevels: {}, hlsQualitySelector: {} } : {};

    const player = videojs(
      videoRef.current,
      {
        autoplay: autoplay,
        controls: controls,
        // playbackRates: playbackRates,
        poster: poster,
        sources: sources,
        plugins: {
          ...quality,
          seekButtons: {
            forward: 15,
            back: 15,
          },
        },
        controlBar: {
          volumePanel: { inline: false },
          liveDisplay: true,
          pictureInPictureToggle: false,
          children: [
            'playToggle',
            'volumePanel',
            'currentTimeDisplay',
            'timeDivider',
            'durationDisplay',
            // 'remainingTimeDisplay',
            'progressControl',
            'fullscreenToggle',
          ],
        },
      },
      function onPlayerReady() {
        player.on('ended', () => {
          let nextVideo;
          setRelatedVideos((value) => {
            nextVideo = value.data?.[0]?.id;
            return value;
          });
          if (nextVideo) history.push(`/mobility/watch?video=${nextVideo}`);
        });
        startTime && player.currentTime(startTime);
        if (setRelatedVideos) {
          const button = videojs.getComponent('Button');
          const nextButton = videojs.extend(button, {
            constructor: function () {
              button.apply(this, arguments);
              this.controlText('Nächstes Video');
              // this.addClass('vjs-icon-next-item');
              this.addClass('vjs-next-video');
            },
            handleClick: function () {
              let nextVideo;
              setRelatedVideos((value) => {
                nextVideo = value?.data?.[0]?.id;
                return value;
              });
              if (nextVideo) history.push(`/mobility/watch?video=${nextVideo}`);
            },
          });
          videojs.registerComponent('nextButton', nextButton);
          player.controlBar.addChild('nextButton', {}, 5);
        }

        const logo = player.controlBar.addChild('Component', {}, 6);
        logo.addClass('logo');
      },
    );

    setPlayer && setPlayer(player);

    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, []);

  return (
    <div className={`video-wrapper ${className}`}>
      <div data-vjs-player>
        <video ref={videoRef} className={classnames('video-js', 'vjs-fill')} data-setup='{"language":"de"}' />
      </div>
    </div>
  );
};

VideoPlayer.defaultProps = {
  className: '',
  autoplay: true,
  controls: true,
  playbackRates: [0.5, 0.75, 1, 1.5, 2],
  poster: '',
  sources: [],
  videoProgress: () => null,
  nextVideo: '',
  startTime: 0,
};

export default VideoPlayer;
