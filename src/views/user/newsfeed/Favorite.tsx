import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ViewArticlesWrapper from './ViewArticlesWrapper';

const Favorite: React.FC<RouteComponentProps> = (props) => {
  return <ViewArticlesWrapper isFavorite={true} />;
};

export default Favorite;
