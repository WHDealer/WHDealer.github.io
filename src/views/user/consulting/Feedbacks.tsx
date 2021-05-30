import React, { useEffect, useState } from 'react';
import { CModal, CModalBody, CModalHeader } from '@coreui/react';
import { StarRatingStatic, StarRatingFloating } from '../../../components';
import moment from 'moment';
import './Feedbacks.css';
import { useDispatch } from 'react-redux';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import config from '../../../config';
import { defaultAvatar, loadingSmall } from '../../../extensions';

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

interface Props {
  show: boolean;
  nurseId: string;
  nurseName: string;
  nurseThumbnail: string;
  nurseRating: number;
  handleClose: any;
}

const Feedbacks: React.FC<Props> = (props) => {
  const { show, nurseId, nurseName, nurseThumbnail, nurseRating, handleClose } = props;
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));

  const [feedbacks, setFeedbacks] = useState<{
    data: {
      rating: number;
      number_feedback: number;
      user_comments: FeedbackType[];
    }[];
    loading: boolean;
    full: boolean;
    page: number;
  }>({
    data: [],
    loading: true,
    full: true,
    page: 1,
  });

  const [currentRating, setCurrentRating] = useState(0);

  useEffect(() => {
    if (!show) return;
    setCurrentRating(0);

    setFeedbacks({ ...feedbacks, loading: true });
    callApi({ method: 'get', api: config.rest.getDetailFeedbacks(nurseId, 1) }, ({ status, data }: any) => {
      if (status === SUCCESS) {
        setFeedbacks((feedbacks: any) => {
          return { data, loading: false, full: true, page: 1 };
        });
      }
    });
  }, [nurseId]);

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
    <CModal size="xl" style={{ height: '90vh' }} centered show={show} onClose={handleClose} closeOnBackdrop={false}>
      <CModalHeader closeButton>Feedbacks</CModalHeader>
      <CModalBody className="px-0 py-3" style={{ overflowY: 'auto', overflowX: 'hidden' }}>
        <div className="p-5 nurse-wrapper">
          <div className="text-center">
            <img
              alt="nurse-avatar"
              src={nurseThumbnail || defaultAvatar}
              className="nurse-avatar"
            />
            <div className="nurse-name">{nurseName}</div>
          </div>
          <div className="text-center">
            <span className="rating-wrapper">
              <span className="rating">{Number(nurseRating)?.toFixed(1)}</span>
              <span className="max-rating">/5.0</span>
            </span>
            <StarRatingFloating size="lg" rating={nurseRating} />
          </div>
        </div>
        {feedbacks.loading ? (
          <div className="mt-5">{loadingSmall}</div>
        ) : (
          <div>
            <div className="row px-5 py-3">{ratingTypes.map((item) => renderRatingSelect(item))}</div>
            <div>{feedbacks.data[currentRating].user_comments.map((item) => renderFeedback(item))}</div>
            {feedbacks.data[currentRating].user_comments.length === 0 && (
              <div className="mt-5" style={{ textAlign: 'center', fontSize: 20 }}>
                There is no feedback yet
              </div>
            )}
          </div>
        )}
      </CModalBody>
    </CModal>
  );
};

export default Feedbacks;
