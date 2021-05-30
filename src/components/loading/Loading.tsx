import React from 'react';
import { useSelector } from 'react-redux';
import { loading } from '../../extensions';

const Loading: React.FC = () => {
  const isLoading = useSelector((state: { loading: boolean }) => state.loading);

  return <div className={isLoading ? 'loading--fade-in' : 'loading--fade-out'}>{loading}</div>;
};

export default Loading;
