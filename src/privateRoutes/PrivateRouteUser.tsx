import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

interface Props {
  render: (props: any) => any;
  location?: any;
  path: string;
  exact?: boolean;
}

const PrivateRouteUser: React.FC<Props> = (props) => {
  const auth = useSelector((state: { auth: { group_name: string; status_name?: string } }) => state.auth);
  const groupName = auth.group_name;
  const pending = auth.status_name;
  const { render, location } = props;

  const myRender = () => {
    if (!groupName)
      return () => (
        <Redirect
          to={{
            pathname: '/sign-in',
            state: { from: location },
          }}
        />
      );
    if (pending?.toLowerCase?.().includes('pending'))
      return () => (
        <Redirect
          to={{
            pathname: '/init-profile',
            state: { from: location },
          }}
        />
      );

    if (groupName.includes('admin'))
      return () => (
        <Redirect
          to={{
            pathname: '/404',
            state: { from: location },
          }}
        />
      );
    return render;
  };

  return <Route {...props} render={myRender()} />;
};

export default PrivateRouteUser;
