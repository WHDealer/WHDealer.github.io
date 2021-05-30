import React, { Suspense } from 'react';
import { loading } from '../../../extensions';
import { Redirect, Route, Switch, RouteComponentProps, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Layout.scss';
import ContainterEllipse from './ContainerEllipse';

const HeaderLogo = React.lazy(() => import('./HeaderLogo'));
const Header = React.lazy(() => import('./Header'));
const Footer = React.lazy(() => import('./Footer'));

// Newsfeed
const NewsfeedIntro = React.lazy(() => import('../newsfeed/NewsfeedIntro'));
const SelectCategory = React.lazy(() => import('../newsfeed/SelectCategory'));
const SelectCategorySearch = React.lazy(() => import('../newsfeed/SelectCategorySearch'));
const ViewArticles = React.lazy(() => import('../newsfeed/ViewArticles'));
const Favorite = React.lazy(() => import('../newsfeed/Favorite'));

// Mobility
const MobilityIntro = React.lazy(() => import('../mobility/MobilityIntro'));
const MobilitySearch = React.lazy(() => import('../mobility/MobilitySearch'));
const MobilityView = React.lazy(() => import('../mobility/MobilityView'));
const MobilityDetail = React.lazy(() => import('../mobility/MobilityDetail'));
const MobilitySaved = React.lazy(() => import('../mobility/MobilitySaved'));
const Hashtag = React.lazy(() => import('../mobility/Hashtag'));
const PostureType = React.lazy(() => import('../mobility/PostureType'));
const AllTrainers = React.lazy(() => import('../mobility/AllTrainers'));
const TrainerDetail = React.lazy(() => import('../mobility/TrainerDetail'));

// Profile
const Profile = React.lazy(() => import('../personalInformation/Profile'));
const ChangePassword = React.lazy(() => import('../personalInformation/ChangePassword'));
const UpdateBio = React.lazy(() => import('../personalInformation/UpdatePersonalInformation'));
const NurseDocuments = React.lazy(() => import('../personalInformation/Documents'));
const NurseFeedbacks = React.lazy(() => import('../personalInformation/Feedbacks'));

// Consulting
const Consulting = React.lazy(() => import('../consulting/ConsultingMainPage'));
const TreatmentMainPage = React.lazy(() => import('../consulting/TreatmentMainPage'));
const TreatmentSurvey = React.lazy(() => import('../consulting/TreatmentSurvey'));
const AddFriendMainPage = React.lazy(() => import('../consulting/AddFriendMainPage'));
const SearchFriend = React.lazy(() => import('../consulting/SearchFriend'));
const FriendRequest = React.lazy(() => import('../consulting/FriendRequest'));
const InformationFriend = React.lazy(() => import('../consulting/InformationFriendPage'));
const ViewAppointments = React.lazy(() => import('../consulting/ViewAppointments'));
const ScheduleWebinar = React.lazy(() => import('../consulting/ScheduleWebinar'));
const WebinarMainPage = React.lazy(() => import('../consulting/WebinarMainPage'));
const UpcomingMainPage = React.lazy(() => import('../consulting/UpcomingMainPage'));
const UpcomingDetail = React.lazy(() => import('../consulting/UpComingDetail'));

const Activity = React.lazy(() => import('../../pages/streaming/Streaming'));

// Payment
const Payment = React.lazy(() => import('../payment/PaymentMainPage'));
const PaymentInformation = React.lazy(() => import('../payment/Information'));
const TypePayment = React.lazy(() => import('../payment/TypePayment'));
const PaymentDetail = React.lazy(() => import('../payment/PaymentDetail'));
const PaymentSuccess = React.lazy(() => import('../payment/PaymentSuccess'));

const hasBackgroundScreens = ['/newsfeed/intro', '/newsfeed/select-category', '/mobility/posture', '/mobility/intro'];
const notHasHeaderScreens = ['/newsfeed/intro'];
const notHasFooterScreens = ['/newsfeed/intro', '/newsfeed/select-category', '/mobility/posture', '/mobility/intro'];
const notHasEllipseScreens = [
  '/newsfeed/intro',
  '/newsfeed/select-category',
  '/mobility/posture',
  '/mobility/hashtag',
  '/mobility/watch',
  '/mobility/intro',
  '/change-password',
  '/document-nurse',
  '/update-bio',
  '/nurse-documents',
  '/nurse-feedbacks',
  '/mobility/payment/information',
  '/mobility/type-payment',
  '/mobility/payment-detail',
];

const Div = (props: any) => {
  return <div>{props.children}</div>;
};

const Layout: React.FC<RouteComponentProps> = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const groupName = useSelector((state: any) => state.auth.group_name);

  const Wrapper = notHasEllipseScreens.findIndex((item) => pathname.includes(item)) !== -1 ? Div : ContainterEllipse;

  const color = pathname.includes('mobility') ? 'violet' : 'petrol';
  const hasHeader = !notHasHeaderScreens.includes(pathname);
  const hasFooter = !notHasFooterScreens.includes(pathname);

  return (
    <div className={color}>
      <div
        className={hasBackgroundScreens.includes(pathname) ? 'hb-background' : ''}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: window.screen.height < 960 && hasFooter ? '960px' : '100vh',
        }}
      >
        <div>
          {hasHeader ? <Header pathname={pathname} /> : <HeaderLogo />}
          <Wrapper>
            <Suspense fallback={loading}>
              <Switch>
                <Route path="/newsfeed/intro" exact render={(props) => <NewsfeedIntro {...props} />} />
                <Route path="/newsfeed" exact render={(props) => <ViewArticles {...props} />} />
                <Route path="/newsfeed/select-category" exact render={(props) => <SelectCategory {...props} />} />
                <Route
                  path="/newsfeed/select-category/search"
                  exact
                  render={(props) => <SelectCategorySearch {...props} />}
                />
                <Route path="/newsfeed/favorite" exact render={(props) => <Favorite {...props} />} />
                <Route path="/mobility/intro" exact render={(props) => <MobilityIntro {...props} />} />
                <Route path="/mobility/posture" exact render={(props) => <PostureType {...props} />} />
                <Route path="/mobility/search" exact render={(props) => <MobilitySearch {...props} />} />
                <Route path="/mobility" exact render={(props) => <MobilityView {...props} />} />
                <Route path="/mobility/watch" exact render={(props) => <MobilityDetail {...props} />} />
                <Route path="/mobility/saved" exact render={(props) => <MobilitySaved {...props} />} />
                <Route path="/mobility/hashtag/:keyword" exact render={(props) => <Hashtag {...props} />} />
                <Route path="/mobility/all-trainers" exact render={(props) => <AllTrainers {...props} />} />
                <Route path="/mobility/trainer-detail/:id" exact render={(props) => <TrainerDetail {...props} />} />
                <Route path="/mobility/payment" exact render={(props) => <Payment {...props} />} />
                <Route path="/activity" exact render={(props) => <Activity {...props} />} />
                <Route path="/consulting" exact render={(props) => <Consulting {...props} />} />
                <Route path="/consulting/treatments" exact render={(props) => <TreatmentMainPage {...props} />} />
                <Route path="/consulting/treatments/:id" exact render={(props) => <TreatmentSurvey {...props} />} />
                <Route exact path="/consulting/add-friend" render={(props) => <AddFriendMainPage {...props} />} />
                <Route exact path="/consulting/search-friend" render={(props) => <SearchFriend {...props} />} />
                <Route exact path="/consulting/friend-request" render={(props) => <FriendRequest {...props} />} />
                <Route exact path="/consulting/schedule-webinar" render={(props) => <ScheduleWebinar {...props} />} />
                <Route
                  exact
                  path="/consulting/information/:userName"
                  render={(props) => <InformationFriend {...props} />}
                />
                <Route exact path="/consulting/webinar" render={(props) => <WebinarMainPage {...props} />} />
                <Route exact path="/consulting/upcomming" render={(props) => <UpcomingMainPage {...props} />} />
                <Route exact path="/consulting/view-appointments" render={(props) => <ViewAppointments {...props} />} />
                <Route exact path="/consulting/upcoming-detail/:id" render={(props) => <UpcomingDetail {...props} />} />
                <Route exact path="/nurse-documents" render={(props) => <NurseDocuments {...props} />} />
                <Route exact path="/nurse-feedbacks" render={(props) => <NurseFeedbacks {...props} />} />
                <Route path="/profile" exact render={(props) => <Profile {...props} />} />
                <Route path="/change-password" exact render={(props) => <ChangePassword {...props} />} />
                <Route path="/update-bio" exact render={(props) => <UpdateBio {...props} />} />
                <Route
                  path="/mobility/payment/information"
                  exact
                  render={(props) => <PaymentInformation {...props} />}
                />
                <Route path="/mobility/type-payment" exact render={(props) => <TypePayment {...props} />} />
                <Route path="/mobility/payment-detail/:id" exact render={(props) => <PaymentDetail {...props} />} />
                <Route path="/mobility/payment-success" exact render={(props) => <PaymentSuccess {...props} />} />
                <Redirect from="/" to={groupName === 'nurse' ? '/consulting' : '/newsfeed'} />
              </Switch>
            </Suspense>
          </Wrapper>
        </div>
        {hasFooter && <Footer />}
      </div>
    </div>
  );
};

export default Layout;
