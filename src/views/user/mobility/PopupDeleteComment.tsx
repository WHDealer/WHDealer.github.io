import React from 'react';
import { HBModalConfirm } from '../../../hbBaseClass';

interface Props {
  popupDelete: {
    deleteComment?: () => void;
    show: boolean;
    isReply?: boolean;
  };
  setPopupDelete: (params: any) => void;
}

const PopupDeleteComment: React.FC<Props> = (props) => {
  const { popupDelete, setPopupDelete } = props;

  const { deleteComment, show, isReply } = popupDelete;

  const handleClose = () => {
    setPopupDelete({ ...popupDelete, show: false });
  };

  const confirm = () => {
    deleteComment?.();
    handleClose();
  };

  return (
    <HBModalConfirm
      show={show}
      handleClose={handleClose}
      title={isReply ? 'Antwort löschen' : 'Kommentar löschen'}
      content={
        isReply
          ? 'Sind Sie sicher, dass Sie Ihren Antwort unwiederruflich löschen wollen?'
          : 'Sind Sie sicher, dass Sie Ihren Kommentar unwiederruflich löschen wollen?'
      }
      up="Jetzt löschen"
      down="Abbrechen"
      upCallback={confirm}
      downCallback={handleClose}
    />
  );
};

export default PopupDeleteComment;
