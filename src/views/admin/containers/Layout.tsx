import React, { Suspense } from 'react';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { loading } from '../../../extensions';
import PrivateRouteSuperAdmin from '../../../privateRoutes/PrivateRouteSuperAdmin';
import Header from './Header';
import './Layout.scss';

const Newsfeed = React.lazy(() => import('../newsfeed/Newsfeed'));
const NewsfeedDetail = React.lazy(() => import('../newsfeed/NewsfeedDetail'));
const MobilityVideos = React.lazy(() => import('../mobility/Videos'));
const MobilityVideoDetail = React.lazy(() => import('../mobility/VideoDetail'));
const MobilityCategories = React.lazy(() => import('../mobility/Categories'));
const MobilityCategoryDetail = React.lazy(() => import('../mobility/CategoryDetail'));
const MobilityTrainers = React.lazy(() => import('../mobility/Trainers'));
const MobilityTrainerVideos = React.lazy(() => import('../mobility/TrainerVideos'));
const Communication = React.lazy(() => import('../communication/Communication'));
const Consulting = React.lazy(() => import('../consulting/Consulting'));
const Users = React.lazy(() => import('../users/Users'));
const SettingMessages = React.lazy(() => import('../settings/SettingMessages'));
const Profile = React.lazy(() => import('../profile/Profile'));

const Layout: React.FC<RouteComponentProps> = (props) => {
  return (
    <div className="hb-admin c-app c-default-layout">
      <div className="c-wrapper">
        <Header location={props.location} />

        <div className="c-body">
          <Suspense fallback={loading}>
            <Switch>
              <Route path="/admin/newsfeed" exact render={(props) => <Newsfeed {...props} />} />
              <Route path="/admin/newsfeed/:id" exact render={(props) => <NewsfeedDetail {...props} />} />
              <Route path="/admin/mobility/videos" exact render={(props) => <MobilityVideos {...props} />} />
              <Route path="/admin/mobility/videos/:id" exact render={(props) => <MobilityVideoDetail {...props} />} />
              <Route path="/admin/mobility/categories" exact render={(props) => <MobilityCategories {...props} />} />
              <Route
                path="/admin/mobility/categories/:id"
                exact
                render={(props) => <MobilityCategoryDetail {...props} />}
              />
              <Route path="/admin/mobility/trainers" exact render={(props) => <MobilityTrainers {...props} />} />
              <Route
                path="/admin/mobility/trainers/:id"
                exact
                render={(props) => <MobilityTrainerVideos {...props} />}
              />
              <Route path="/admin/communication" exact render={(props) => <Communication {...props} />} />
              <Route path="/admin/consulting" exact render={(props) => <Consulting {...props} />} />
              <Route path="/admin/users" exact render={(props) => <Users {...props} />} />
              <Route path="/admin/profile" exact render={(props) => <Profile {...props} />} />
              <PrivateRouteSuperAdmin path="/admin/settings" exact render={(props) => <SettingMessages {...props} />} />
              <Redirect from="/" to="/admin/users" />
            </Switch>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Layout;
