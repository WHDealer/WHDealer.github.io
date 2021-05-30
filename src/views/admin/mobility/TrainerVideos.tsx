import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import VideosWrapper from './VideosWrapper';

const TrainerVideos: React.FC<RouteComponentProps> = (props) => {
  const params: any = props.match.params;
  const trainerId = params.id;
  return <VideosWrapper trainerId={trainerId} />;
};

export default TrainerVideos;
