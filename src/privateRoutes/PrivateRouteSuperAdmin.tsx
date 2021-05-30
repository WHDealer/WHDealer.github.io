import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

interface Props {
  render: (props: any) => any;
  location?: any;
  path: string;
  exact?: boolean;
}

const PrivateRouteSuperAdmin: React.FC<Props> = (props) => {
  const groupName = useSelector((state: { auth: { group_name: string } }) => state.auth.group_name);
  const { render, location } = props;

  const myRender = () => {
    if (!groupName || !groupName.includes('superadmin'))
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

export default PrivateRouteSuperAdmin;
