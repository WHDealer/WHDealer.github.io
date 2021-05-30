import React, { useEffect, useRef, useState } from 'react';
import config from '../../../config';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import { defaultAvatar } from '../../../extensions';
import { useDispatch, useSelector } from 'react-redux';
import { HBButtonIcon } from '../../../hbBaseClass';
import InputLoading from './InputLoading';

interface Props {
  videoId: string;
  small?: boolean;
  commentId: string;
  replyId?: string;
  replyContent?: string;
  setReplies: (params: any) => void;
  setShowReplyInput: (params: any) => void;
}

const ReplyInput: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const callApi = (payload: any, callback: any) => dispatch(callApiAction(payload, callback));

  const [loading, setLoading] = useState(false);
  const { videoId, small, commentId, replyId, replyContent, setReplies, setShowReplyInput } = props;
  const [content, setContent] = useState(replyContent || '');
  const auth = useSelector((state: any) => state.auth);
  const avatar = auth.avatar || defaultAvatar;

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => inputRef.current?.focus(), []);

  const createReply = () => {
    const trimmedContent = content?.trim();
    if (!trimmedContent || trimmedContent === replyContent) return;
    setLoading(true);
    callApi(
      {
        method: 'post',
        api: config.rest.createReply(videoId, commentId),
        body: { comment: content },
      },
      (response: any) => {
        setShowReplyInput(false);
        const { data, status } = response;
        if (status === SUCCESS) {
          setReplies((replies: any) => {
            return {
              ...replies,
              data: [
                {
                  id: data.id,
                  user_id: auth.user_id,
                  user_avatar: avatar,
                  username: auth.first_name + ' ' + auth.last_name,
                  content: content,
                  liked_amount: 0,
                  is_liked: false,
                  created_date: new Date().getTime() / 1000,
                  is_new: true,
                },
                ...replies.data,
              ],
            };
          });
        }
      },
    );
  };

  const updateReply = () => {
    if (!content?.trim()) return;
    setLoading?.(true);
    callApi(
      {
        method: 'put',
        api: config.rest.updateReply(videoId, commentId, replyId || ''),
        body: { comment: content },
      },
      (response: any) => {
        setLoading?.(false);
        setShowReplyInput(false);
        const { status } = response;
        if (status === SUCCESS) {
          setReplies((replies: any) => {
            const repliesData = [...replies.data];
            const index = repliesData.findIndex((item) => item.id === replyId);
            const replyData = repliesData[index];
            replyData.content = content;
            return {
              ...replies,
              data: repliesData,
            };
          });
        }
      },
    );
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      if (replyId) updateReply();
      else createReply();
    }
  };

  if (loading) return <InputLoading />;

  return (
    <div className="hb-comment-input hb-ml-40">
      <img className="hb-avatar-img" alt="avatar" src={avatar} />
      <div className="input-wrapper">
        <input
          ref={inputRef}
          placeholder="Ihre Antwort ..."
          value={content}
          onChange={(e: any) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          maxLength={500}
        />
        <HBButtonIcon
          style={{ position: 'absolute', right: 24 }}
          circle={{ color: '#dddedf', size: 24 }}
          icon="cross"
          size={16}
          color="var(--violet-80)"
          onClick={() => setShowReplyInput?.(false)}
        />
      </div>
      <HBButtonIcon
        icon="send"
        size={24}
        color="var(--violet-80)"
        disabled={content?.trim() === ''}
        onClick={replyId ? updateReply : createReply}
      />
    </div>
  );
};

export default ReplyInput;
