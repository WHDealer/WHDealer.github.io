import React, { useEffect, useState } from 'react';
import { StarRatingStatic, StarRatingFloating } from '../../../components';
import moment from 'moment';
import './Feedbacks.css';
import { useDispatch, useSelector } from 'react-redux';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import config from '../../../config';
import { defaultAvatar, loadingSmall } from '../../../extensions';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { HBButtonSmall } from '../../../hbBaseClass';

const ratingTypes = [0, 5, 4, 3, 2, 1];

type FeedbackType = {
  user_id: string;
  avatar: string;
  first_name: string;
  last_name: string;
  feedback: number;
  customer_comments: string;
  modified_date: number;
};

const Feedbacks: React.FC<RouteComponentProps> = (props: any) => {
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));
  const history = useHistory();
  const auth = useSelector((state: any) => state.auth);

  const [feedbacks, setFeedbacks] = useState<{
    data: {
      rating: number;
      number_feedback: number;
      user_comments: FeedbackType[];
    }[];
    loading: boolean;
    full: boolean;
    page: number;
    rating: number;
  }>({
    data: [],
    loading: true,
    full: true,
    page: 1,
    rating: 0,
  });

  const [currentRating, setCurrentRating] = useState(0);

  useEffect(() => {
    callApi({ method: 'get', api: config.rest.getDetailFeedbacks(auth.user_id, 1) }, ({ status, data }: any) => {
      if (status === SUCCESS) {
        setFeedbacks((feedbacks: any) => {
          data = [
            {
              rating: 0,
              number_feedback: 3,
              user_comments: [
                {
                  user_id: '0',
                  avatar: '',
                  first_name: 'Nguyen',
                  last_name: 'Khanh',
                  feedback: 4,
                  customer_comments: 'sadsad',
                  modified_date: 1621236992,
                },
                {
                  user_id: '1',
                  avatar: '',
                  first_name: 'Nguyen',
                  last_name: 'Khanh',
                  feedback: 5,
                  customer_comments: 'sadsad',
                  modified_date: 1621236992,
                },
                {
                  user_id: '2',
                  avatar: '',
                  first_name: 'Nguyen',
                  last_name: 'Khanh',
                  feedback: 5,
                  customer_comments: 'sadsad',
                  modified_date: 1621236992,
                },
              ],
            },
            { rating: 1, number_feedback: 0, user_comments: [] },
            { rating: 2, number_feedback: 0, user_comments: [] },
            { rating: 3, number_feedback: 0, user_comments: [] },
            {
              rating: 4,
              number_feedback: 1,
              user_comments: [
                {
                  user_id: '',
                  avatar: '',
                  first_name: 'Nguyen',
                  last_name: 'Khanh',
                  feedback: 4,
                  customer_comments: 'sadsad',
                  modified_date: 1621236992,
                },
              ],
            },
            {
              rating: 5,
              number_feedback: 2,
              user_comments: [
                {
                  user_id: '1',
                  avatar: '',
                  first_name: 'Nguyen',
                  last_name: 'Khanh',
                  feedback: 5,
                  customer_comments: 'sadsad',
                  modified_date: 1621236992,
                },
                {
                  user_id: '2',
                  avatar: '',
                  first_name: 'Nguyen',
                  last_name: 'Khanh',
                  feedback: 5,
                  customer_comments: 'sadsad',
                  modified_date: 1621236992,
                },
              ],
            },
          ];
          const totalRatings = data.slice(1).reduce(
            (a: any, b: any) => {
              return { s: a.s + b.rating * b.number_feedback, c: a.c + b.number_feedback };
            },
            { s: 0, c: 0 },
          );
          console.log(totalRatings);
          const rating = totalRatings.s / (totalRatings.c || 1);
          return { data, loading: false, full: true, page: 1, rating };
        });
      }
    });
  }, []);

  const renderRatingSelect = (ratingType: number) => {
    let renderStars;
    if (ratingType === 0) renderStars = <span>All</span>;
    else renderStars = Array.from({ length: ratingType }).map((_, index) => <i key={index} className="fa fa-star" />);
    return (
      <div key={ratingType} onClick={() => setCurrentRating(ratingType)} className="col-md-2">
        <div
          className={`rating-select ${ratingType === currentRating ? 'active' : ''}`}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
        >
          <div>{renderStars}</div>
          <div>({feedbacks.data[ratingType].number_feedback})</div>
        </div>
      </div>
    );
  };

  const renderFeedback = (feedbackItem: FeedbackType) => {
    const { user_id, avatar, first_name, last_name, feedback, customer_comments, modified_date } = feedbackItem;
    return (
      <div key={user_id} className="feedback-wrapper">
        <div className="mx-3">
          <img alt="user-avatar" src={avatar || defaultAvatar} className="user-avatar" />
        </div>
        <div>
          <div className="feedback-username">{first_name + ' ' + last_name}</div>
          <StarRatingStatic size="sm" rating={feedback} />
          <div className="feedback-content">{customer_comments}</div>
          <div className="feedback-created-date">{moment(modified_date * 1000).format('DD.MM.YYYY hh:mm')}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="hb-wrapper">
      <div className="hb-mx-20" style={{ paddingBottom: 50 }}>
        <div className="hb-my-28">
          <HBButtonSmall color="nightblue" onClick={() => history.goBack()}>
            <i className="hb-icon-arrow-left hb-icon-md" /> Zurück
          </HBButtonSmall>
        </div>
        <div className="hb-title">Rückmeldungen</div>

        {feedbacks.loading ? (
          <div className="mt-5">{loadingSmall}</div>
        ) : (
          <>
            <div className="pb-5 nurse-wrapper">
              <div className="text-center">
                <span className="rating-wrapper">
                  <span className="rating">{Number(feedbacks.rating)?.toFixed(1)}</span>
                  <span className="max-rating">/5.0</span>
                </span>
                <StarRatingFloating size="lg" rating={feedbacks.rating} />
              </div>
            </div>
            <div>
              <div className="row px-5 py-3">{ratingTypes.map((item) => renderRatingSelect(item))}</div>
              <div>{feedbacks.data[currentRating].user_comments.map((item) => renderFeedback(item))}</div>
              {feedbacks.data[currentRating].user_comments.length === 0 && (
                <div className="mt-5" style={{ textAlign: 'center', fontSize: 20 }}>
                  There is no feedback yet
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Feedbacks;
