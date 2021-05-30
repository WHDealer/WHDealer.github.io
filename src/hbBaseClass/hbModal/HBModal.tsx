import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Transition } from 'react-transition-group';
import './HBModal.scss';

const getTransitionClass = (s: string) => {
  return s === 'entering' ? 'd-block' : s === 'entered' ? 'show d-block' : s === 'exiting' ? 'd-block' : '';
};

interface Props {
  innerRef?: any;
  show: boolean;
  onClose: any;
  centered?: boolean;
  size?: '' | 'sm' | 'lg' | 'xl';
  backdrop?: boolean;
  closeOnBackdrop?: boolean;
  closeBtn?: boolean;
  style?: any;
  dark?: boolean;
}

const HBModal: React.FC<Props> = (props) => {
  const { innerRef, show, centered, size, backdrop, closeOnBackdrop, onClose, closeBtn, style, dark } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [modalTrigger, setModalTrigger] = useState(false);
  const modalClick = (e: any) => e.target.dataset.modal && closeOnBackdrop && close();

  useEffect(() => {
    setIsOpen(show);

    if (show) {
      // document.body.style.overflow = 'hidden';
      document.getElementsByTagName('html')[0].style.overflowY = 'hidden';
    } else {
      // document.body.style.overflow = 'unset';
      document.getElementsByTagName('html')[0].style.overflowY = 'overlay';
    }
  }, [show]);

  const close = () => {
    onClose && onClose();
    setIsOpen(false);
  };

  const onEntered = () => {
    // setModalTrigger(document.querySelector(':focus'));
    // nodeRef.current.focus();
    // onOpened && onOpened();
  };

  const onExited = () => {
    // modalTrigger && modalTrigger.focus();
    // onClosed && onClosed();
  };

  const dialogClasses = classNames('modal-dialog', {
    'modal-dialog-scrollable': true,
    'modal-dialog-centered': centered,
    [`modal-${size}`]: size,
  });

  const backdropClasses = classNames({
    'modal-backdrop': true,
    fade: true,
    show: isOpen || true,
  });

  const nodeRef = useRef(null);
  return (
    <div onClick={modalClick}>
      <Transition in={Boolean(isOpen)} onEntered={onEntered} onExited={onExited} timeout={150} nodeRef={nodeRef}>
        {(status) => {
          let transitionClass = getTransitionClass(status);
          const classes = classNames('modal overflow-auto fade', transitionClass);
          return (
            <div tabIndex={-1} role="dialog" className={classes} data-modal={true} ref={nodeRef}>
              <div className={dialogClasses} role="document">
                <div className="hb-modal-content" ref={innerRef} style={style}>
                  {closeBtn && <i className="hb-icon-cross hb-modal-close" onClick={onClose} />}
                  {props.children}
                </div>
              </div>
            </div>
          );
        }}
      </Transition>
      {backdrop && isOpen && <div className={`${backdropClasses}${dark ? ' hb-modal-backdrop-dark' : ''}`}></div>}
    </div>
  );
};

HBModal.defaultProps = {
  backdrop: true,
  closeOnBackdrop: true,
};

export default HBModal;
