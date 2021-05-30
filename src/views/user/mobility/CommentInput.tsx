import React, { useEffect, useRef, useState } from 'react';
import config from '../../../config';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import { defaultAvatar } from '../../../extensions';
import { useDispatch, useSelector } from 'react-redux';
import { HBButtonIcon } from '../../../hbBaseClass';
import InputLoading from './InputLoading';

interface Props {
  videoId: string;
  commentId?: string;
  commentContent?: string;
  setComments: (params: any) => void;
  setShowUpdateInput?: (params: any) => void;
}

const CommentInput: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const callApi = (payload: any, callback: any) => dispatch(callApiAction(payload, callback));

  const [loading, setLoading] = useState(false);
  const { videoId, commentId, commentContent, setComments, setShowUpdateInput } = props;
  const [content, setContent] = useState(commentId ? commentContent : '');
  const auth = useSelector((state: any) => state.auth);
  const avatar = auth.avatar || defaultAvatar;

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    commentId && inputRef.current?.focus();
  }, []);

  const createComment = () => {
    if (!content?.trim()) return;
    setLoading(true);
    callApi(
      {
        method: 'post',
        api: config.rest.createComment(videoId),
        body: { comment: content },
      },
      (response: any) => {
        setLoading(false);
        const { data, status } = response;
        if (status === SUCCESS) {
          setContent('');
          setComments((comments: any) => {
            return {
              data: [
                {
                  id: data.id,
                  user_id: auth.user_id,
                  user_avatar: avatar,
                  username: auth.first_name + ' ' + auth.last_name,
                  content: content,
                  liked_amount: 0,
                  is_liked: false,
                  replied_amount: 0,
                  created_date: new Date().getTime() / 1000,
                },
                ...comments.data,
              ],
              total: comments.total + 1,
            };
          });
        }
      },
    );
  };

  const updateComment = () => {
    if (!content?.trim()) return;
    setLoading?.(true);
    callApi(
      {
        method: 'put',
        api: config.rest.updateComment(videoId, commentId || ''),
        body: { comment: content },
      },
      (response: any) => {
        setLoading?.(false);
        setShowUpdateInput?.(false);
        const { status } = response;
        if (status === SUCCESS) {
          setComments((comments: any) => {
            const commentsData = [...comments.data];
            const index = commentsData.findIndex((item) => item.id === commentId);
            const commentData = commentsData[index];
            commentData.content = content;
            return {
              ...comments,
              data: commentsData,
            };
          });
        }
      },
    );
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      if (commentId) updateComment();
      else createComment();
    }
  };

  if (loading) return <InputLoading />;

  return (
    <div className="hb-comment-input">
      <img className="hb-avatar-img" alt="avatar" src={avatar} />
      <div className="input-wrapper">
        <input
          ref={inputRef}
          placeholder="Ihr Kommentar ..."
          value={content}
          onChange={(e: any) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          maxLength={500}
        />
        {content && (
          <HBButtonIcon
            style={{ position: 'absolute', right: 24 }}
            circle={{ color: '#dddedf', size: 24 }}
            icon="cross"
            size={16}
            color="var(--violet-80)"
            onClick={() => (commentId ? setShowUpdateInput?.(false) : setContent(''))}
          />
        )}
      </div>
      <HBButtonIcon
        icon="send"
        size={24}
        color="var(--violet-80)"
        disabled={content?.trim() === ''}
        onClick={commentId ? updateComment : createComment}
      />
    </div>
  );
};

export default CommentInput;
