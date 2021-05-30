import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { timestampToDatetime } from '../../../utils';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import config from '../../../config';
import { defaultAvatar } from '../../../extensions';
import ReplyInput from './ReplyInput';
import { HBButtonIcon } from '../../../hbBaseClass';
import InputLoading from './InputLoading';

interface Props {
  videoId: string;
  commentId: string;
  reply: {
    user_id: string;
    id: string;
    user_avatar: string;
    username: string;
    content: string;
    is_liked: boolean;
    liked_amount: number;
    created_date: number;
    is_new?: boolean;
  };
  setComments: (callback: any) => void;
  setReplies: (callback: any) => void;
  setPopupDelete: (params: any) => void;
  handleOpenPopup: any;
}

const Reply: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const callApi = (payload: any, callback: any) => dispatch(callApiAction(payload, callback));

  const [loading, setLoading] = useState(false);
  const [showUpdateInput, setShowUpdateInput] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const { videoId, commentId, reply, setComments, setReplies, setPopupDelete, handleOpenPopup } = props;
  const auth = useSelector((state: { auth: { user_id: string } }) => state.auth);

  const likeReply = () => {
    const like = reply.is_liked;
    const replyId = reply.id;

    setReplies((replies: any) => {
      const repliesData = [...replies.data];
      const index = repliesData.findIndex((item) => item.id === replyId);
      const replyData = repliesData[index];
      const like = replyData.is_liked;
      replyData.is_liked = !like;
      replyData.liked_amount += like ? -1 : 1;
      return {
        ...replies,
        data: repliesData,
      };
    });

    callApi(
      {
        method: !like ? 'post' : 'put',
        api: !like
          ? config.rest.likeReply(videoId, commentId, replyId)
          : config.rest.unlikeReply(videoId, commentId, replyId),
      },
      (response: any) => {
        const { status } = response;
        if (status === SUCCESS) {
        }
      },
    );
  };

  const deleteReply = () => {
    setLoading(true);
    const replyId = reply.id;
    callApi(
      {
        method: 'delete',
        api: config.rest.deleteReply(videoId, commentId, replyId),
      },
      (response: any) => {
        setLoading(false);
        const { status } = response;
        if (status === SUCCESS) {
          setReplies((replies: any) => {
            const repliesData = replies.data.filter((reply: any) => reply.id !== replyId);
            return {
              ...replies,
              data: repliesData,
            };
          });
          if (!reply.is_new)
            setComments((comments: any) => {
              const newComments: any = { ...comments };
              const commentsData = newComments.data;
              const index = commentsData.findIndex((item: any) => item.id === commentId);
              commentsData[index].replied_amount -= 1;
              return newComments;
            });
        }
      },
    );
  };

  if (loading) return <InputLoading />;

  if (showUpdateInput)
    return (
      <ReplyInput
        videoId={videoId}
        commentId={commentId}
        replyId={reply.id}
        replyContent={reply.content}
        setReplies={setReplies}
        setShowReplyInput={setShowUpdateInput}
      />
    );

  return (
    // <div key={reply.id} className="video-comments--comment">
    //   <div className="video-comments--comment__avatar">
    //     <img
    //       alt="IMG"
    //       src={reply.user_avatar || defaultAvatar}
    //       className="video-comments--comment__avatar-img"
    //       width="30px"
    //       height="30px"
    //     />
    //   </div>
    //   <div style={{ width: '100%' }}>
    //     <div>
    //       {reply.username}
    //       <span style={{ fontSize: 13, color: '#888', marginLeft: 8 }}>{timestampToDatetime(reply.created_date)}</span>
    //     </div>
    //     <div>{reply.content}</div>
    //     <div>
    //       <div>
    //         <i className={`${!reply.is_liked ? 'far' : 'fas'} fa-thumbs-up cursor-pointer`} onClick={likeReply}></i>
    //         {reply.liked_amount ? <span className="ml-2 mr-1">{reply.liked_amount}</span> : null}
    //         {/* <span className="ml-3 cursor-pointer reply-button" onClick={() => setShowReplyInput(true)}>
    //           REPLY
    //         </span> */}
    //         {reply.user_id === auth.user_id && (
    //           <>
    //             <i className="fas fa-edit cursor-pointer mx-4" onClick={() => setShowUpdateInput(true)} />
    //             <i
    //               className="fas fa-trash-alt cursor-pointer"
    //               onClick={() => setPopupDelete({ show: true, isReply: true, deleteComment: deleteReply })}
    //             />
    //           </>
    //         )}
    //         {showReplyInput && (
    //           <ReplyInput
    //             videoId={videoId}
    //             small
    //             commentId={commentId}
    //             replyContent={`@${reply.username} `}
    //             setReplies={setReplies}
    //             setShowReplyInput={setShowReplyInput}
    //           />
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div
      className="hb-comment hb-ml-40"
      style={{ borderRadius: '0 16px 16px 0', borderLeft: '4px solid var(--violet-20)' }}
    >
      {reply.user_id === auth.user_id && (
        <div
          className="more-ver"
          onClick={(e) =>
            handleOpenPopup(e, {
              edit: () => setShowUpdateInput(true),
              del: () => setPopupDelete({ show: true, isReply: true, deleteComment: deleteReply }),
            })
          }
        >
          <i className="hb-icon-more-ver" />
        </div>
      )}

      <div className="d-flex align-items-center">
        <img className="hb-avatar-img" alt="avatar" src={reply.user_avatar || defaultAvatar} />
        <div className="header">
          <div className="username">{reply.username}</div>
          <div className="time">{timestampToDatetime(reply.created_date, true)}</div>
        </div>
      </div>
      <div className="body">
        <div className="content">{reply.content}</div>
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <HBButtonIcon
              size={25}
              icon={reply.is_liked ? 'heart-s' : 'heart-r'}
              color="var(--violet-80)"
              onClick={likeReply}
            />
            {reply.liked_amount > 0 && <span className="ml-2 like-comment-amount">{reply.liked_amount}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reply;
