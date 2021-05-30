import React from 'react';
import ReactPlayer from 'react-player';
import { RouteComponentProps } from 'react-router-dom';
import { Container } from '../../../theme/styles';

const VideoDetail: React.FC<RouteComponentProps> = () => {
  return (
    <Container>
      <ReactPlayer url="https://www.youtube.com/watch?v=ysz5S6PUM-U" />
    </Container>
  );
};

export default VideoDetail;
