import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { timestampToDatetime, includes } from '../../../utils';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import config from '../../../config';
import { defaultAvatar } from '../../../extensions';
import CommentInput from './CommentInput';
import Reply from './Reply';
import ReplyInput from './ReplyInput';
import { HBButtonIcon } from '../../../hbBaseClass';
import InputLoading from './InputLoading';

interface Props {
  videoId: string;
  comment: {
    user_id: string;
    id: string;
    user_avatar: string;
    username: string;
    content: string;
    is_liked: boolean;
    liked_amount: number;
    replied_amount: number;
    created_date: number;
  };
  setComments: (callback: any) => void;
  setPopupDelete: (params: any) => void;
  handleOpenPopup: any;
}

const Comment: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const callApi = (payload: any, callback: any) => dispatch(callApiAction(payload, callback));

  const [loading, setLoading] = useState(false);
  const [showUpdateInput, setShowUpdateInput] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replies, setReplies] = useState<any>({
    data: [],
    loading: false,
    loaded: false,
    show: false,
  });
  const { videoId, comment, setComments, setPopupDelete, handleOpenPopup } = props;
  const auth = useSelector((state: { auth: { user_id: string } }) => state.auth);
  const page = useRef<number>(1);

  const likeComment = () => {
    const like = comment.is_liked;
    const commentId = comment.id;

    setComments((comments: any) => {
      const commentsData = [...comments.data];
      const index = commentsData.findIndex((item) => item.id === commentId);
      const commentData = commentsData[index];
      const like = commentData.is_liked;
      commentData.is_liked = !like;
      commentData.liked_amount += like ? -1 : 1;
      return {
        ...comments,
        data: commentsData,
      };
    });

    callApi(
      {
        method: !like ? 'post' : 'put',
        api: !like ? config.rest.likeComment(videoId, commentId) : config.rest.unlikeComment(videoId, commentId),
      },
      (response: any) => {
        const { status } = response;
        if (status === SUCCESS) {
        }
      },
    );
  };

  const getReplies = (page: number) => {
    callApi(
      {
        api: config.rest.getReplies(videoId, comment.id, page),
        method: 'get',
      },
      (response: any) => {
        const { status, data } = response;
        if (status === SUCCESS) {
          setReplies((replies: any) => {
            const repliesData = replies.data;
            return {
              ...replies,
              show: true,
              loading: false,
              loaded: true,
              data: [...repliesData, ...data.replies.filter((item: any) => !includes(repliesData, item))],
            };
          });
        } else {
          setReplies((replies: any) => {
            return {
              ...replies,
              loading: false,
            };
          });
        }
      },
    );
  };

  const deleteComment = () => {
    setLoading(true);
    const commentId = comment.id;
    callApi(
      {
        method: 'delete',
        api: config.rest.deleteComment(videoId, commentId),
      },
      (response: any) => {
        setLoading(false);
        const { status } = response;
        if (status === SUCCESS) {
          setComments((comments: any) => {
            const commentsData = comments.data.filter((comment: any) => comment.id !== commentId);
            return {
              ...comments,
              data: commentsData,
              total: comments.total - 1,
            };
          });
        }
      },
    );
  };

  const viewHideReplies = () => {
    if (!replies.show) {
      setReplies({ ...replies, loading: true, show: true });
      if (!replies.loaded) {
        getReplies(1);
      } else {
        setReplies({ ...replies, show: true });
      }
    } else
      setReplies({
        ...replies,
        show: false,
        // data: replies.data.map((item: any) => {
        //   return { ...item, is_new: false };
        // }),
      });
  };

  // const repliesDistinct = replies.data.filter((v: any, i: number, a) => a.findIndex((t: any) => t.id === v.id) === i);

  const viewReplies = () => {
    return replies.data
      .filter((item: any) => !item.is_new)
      .map((reply: any) => (
        <Reply
          key={reply.id}
          videoId={videoId}
          setPopupDelete={setPopupDelete}
          commentId={comment.id}
          reply={reply}
          setComments={setComments}
          setReplies={setReplies}
          handleOpenPopup={handleOpenPopup}
        />
      ));
  };

  const viewRepliesNew = () => {
    return replies.data
      .filter((item: any) => item.is_new)
      .map((reply: any) => (
        <Reply
          key={reply.id}
          videoId={videoId}
          setPopupDelete={setPopupDelete}
          commentId={comment.id}
          reply={reply}
          setComments={setComments}
          setReplies={setReplies}
          handleOpenPopup={handleOpenPopup}
        />
      ));
  };

  const loadMoreReplies = () => {
    setReplies({ ...replies, loading: true });
    page.current += 1;
    getReplies(page.current);
  };

  const showMoreReplies = () => {
    if (!replies.show) return;
    if (replies.data.filter((item: any) => !item.is_new).length >= comment.replied_amount) return <div />;
    return (
      <div className="show-more-replies--button" onClick={loadMoreReplies}>
        <div>
          <span className="show-more-replies--arrow">&#10551;</span>
        </div>
        <div className="show-more-replies--text">Show more replies</div>
      </div>
    );
  };

  return (
    <>
      {loading ? (
        <InputLoading />
      ) : showUpdateInput ? (
        <CommentInput
          videoId={videoId}
          commentId={comment.id}
          commentContent={comment.content}
          setComments={setComments}
          setShowUpdateInput={setShowUpdateInput}
        />
      ) : (
        <div className="hb-comment">
          {comment.user_id === auth.user_id && (
            <div
              className="more-ver"
              onClick={(e) =>
                handleOpenPopup(e, {
                  edit: () => setShowUpdateInput(true),
                  del: () => setPopupDelete({ show: true, deleteComment }),
                })
              }
            >
              <i className="hb-icon-more-ver" />
            </div>
          )}
          <div className="d-flex align-items-center">
            <img className="hb-avatar-img" alt="avatar" src={comment.user_avatar || defaultAvatar} />
            <div className="header">
              <div className="username">{comment.username}</div>
              <div className="time">{timestampToDatetime(comment.created_date, true)}</div>
            </div>
          </div>
          <div className="body">
            <div className="content">{comment.content}</div>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <HBButtonIcon
                  size={25}
                  icon={comment.is_liked ? 'heart-s' : 'heart-r'}
                  color="var(--violet-80)"
                  onClick={likeComment}
                />
                {comment.liked_amount > 0 && <span className="ml-2 like-comment-amount">{comment.liked_amount}</span>}
                {comment.replied_amount > 0 && (
                  <>
                    <HBButtonIcon
                      style={{ fontWeight: 'bold', marginLeft: 28 }}
                      size={23}
                      icon={replies.show ? 'comment-s' : 'comment-r'}
                      color="var(--violet-80)"
                      onClick={viewHideReplies}
                    />
                    <span className="ml-2 like-comment-amount">{comment.replied_amount}</span>
                  </>
                )}
              </div>
              <div className="btn-reply" onClick={() => setShowReplyInput(true)}>
                Antworten
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        {showReplyInput && (
          <ReplyInput
            videoId={videoId}
            commentId={comment.id}
            replyContent=""
            setReplies={setReplies}
            setShowReplyInput={setShowReplyInput}
          />
        )}
        {/* {comment.replied_amount > 0 && (
          <div onClick={viewHideReplies} className="button-link mt-2">
            <i className={`fas fa-angle-${replies.show ? 'up' : 'down'} mx-2 size-0 margin-auto-0`} />
            <div className="margin-auto-0">
              {replies.show ? 'Hide' : 'View'}
              {comment.replied_amount === 1 ? ' reply' : ` all ${comment.replied_amount} replies`}
            </div>
          </div>
        )} */}
        {viewRepliesNew()}
        {comment.replied_amount > 0 && replies.show && viewReplies()}
        {/* {replies.loading ? <InputLoading /> : showMoreReplies()} */}
        {replies.loading && <InputLoading />}
      </div>
    </>
  );
};

export default Comment;
