import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

interface Props {
  render: (props: any) => any;
  location?: any;
  path: string;
  exact?: boolean;
}

const PrivateRouteAdmin: React.FC<Props> = (props) => {
  const groupName = useSelector((state: { auth: { group_name: string } }) => state.auth.group_name);
  const { render, location } = props;

  const myRender = () => {
    if (!groupName)
      return () => (
        <Redirect
          to={{
            pathname: '/admin/sign-in',
            state: { from: location },
          }}
        />
      );
    if (!groupName.includes('admin'))
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

export default PrivateRouteAdmin;
