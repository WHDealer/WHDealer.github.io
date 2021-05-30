import React from 'react';
import HBModal from './HBModal';
import HBButtonFull from '../hbButton/HBButtonFull';
import HBInput from '../hbInput/HBInput';

interface Props {
  show: boolean;
  handleClose: () => void;
  title: string;
  content: any;
  up?: string;
  down?: string;
  upCallback?: () => void;
  downCallback?: () => void;
  dark?: boolean;
  input?: {
    onChange?: any;
    value?: any;
    name?: any;
    type?: any;
    placeholder?: any;
    autoComplete?: any;
  } | null;
  label?: string | null;
  payment?: boolean;
}

const HBModalConfirm: React.FC<Props> = (props) => {
  const { show, handleClose, title, content, up, down, upCallback, downCallback, dark, input, label, payment } = props;

  return (
    <HBModal dark={dark} show={show} onClose={handleClose} closeOnBackdrop={false} centered closeBtn>
      <div className={payment ? 'hb-payment-modal-confirm-wrapper' : 'hb-modal-confirm-wrapper'}>
        <div className={payment ? 'hb-modal-payment-title' : 'hb-modal-title'}>{title}</div>
        <div className={payment ? 'hb-modal-payment-body' : 'hb-modal-body'}>{content}</div>
        {input && (
          <div>
            <div className="hb-modal-confirm-label">{label}</div>
            <HBInput
              onChange={input?.onChange}
              value={input.value}
              type={input.type}
              placeholder={input.placeholder}
              autoComplete={input.autoComplete}
              name={input.name}
              petrol
            />
          </div>
        )}
        {up && (
          <div style={{ height: 52, width: '100%', marginBottom: 8 }}>
            <HBButtonFull onClick={upCallback}>{up}</HBButtonFull>
          </div>
        )}
        {down && (
          <div style={{ height: 52, width: '100%' }}>
            <HBButtonFull onClick={downCallback} outline>
              {down}
            </HBButtonFull>
          </div>
        )}
      </div>
    </HBModal>
  );
};

export default HBModalConfirm;
