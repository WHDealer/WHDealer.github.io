import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ViewArticlesWrapper from './ViewArticlesWrapper';

const ViewArticles: React.FC<RouteComponentProps> = (props) => {
  return <ViewArticlesWrapper isFavorite={false} />;
};

export default ViewArticles;
