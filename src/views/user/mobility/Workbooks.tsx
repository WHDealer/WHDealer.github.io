import React, { useRef, useState } from 'react';
import { HBModal } from '../../../hbBaseClass';
import WorkbookItem from './WorkbookItem';

interface Props {
  data: { file_name: string; key: string; link: string }[];
}

const Workbooks: React.FC<Props> = (props) => {
  const { data } = props;
  const [showContent, setShowContent] = useState(false);
  const [modal, setModal] = useState({ show: false, name: '', link: '' });
  const divRef = useRef<any>(null);

  return (
    <div>
      <HBModal
        size="xl"
        style={{ height: '90vh' }}
        centered
        closeBtn
        show={modal.show}
        onClose={() => setModal({ show: false, name: '', link: '' })}
        closeOnBackdrop={false}
      >
        <div className="hb-modal-body">{modal.name}</div>
        <iframe
          key={modal.link}
          title={modal.name}
          width={'100%'}
          height={'95%'}
          src={modal.link}
          style={{ border: 'none' }}
        />
      </HBModal>
      {/* <div className="d-flex align-items-center mb-2">
        <div className="d-flex align-items-center cursor-pointer" onClick={() => setShowContent(!showContent)}>
          <div className="workbooks-and-instructions-text">Workbooks and Instructions</div>
          <i className={`fa fa-chevron-${showContent ? 'up' : 'down'} size-0 ml-3`} />
        </div>
      </div>
      <div
        ref={divRef}
        className="workbooks-wrapper"
        style={{ height: showContent ? divRef.current?.scrollHeight : 0 }}
      >
        {data.map((item: { file_name: string; key: string; link: string }) => (
          <div key={item.key} className="d-flex align-items-center">
            <div
              className="d-flex align-items-center cursor-pointer p-2 mb-1 workbook-wrapper"
              onClick={() => setModal({ show: true, name: item.file_name, link: item.link })}
            >
              <i className="fas fa-file-alt size-0 mr-3" />
              <div className="workbook-text">{item.file_name}</div>
            </div>
          </div>
        ))}
      </div> */}
      <div className="header">Arbeitsunterlagen und Anleitungen</div>
      {data.map((item: { file_name: string; key: string; link: string }) => (
        <WorkbookItem
          key={item.key}
          label={item.file_name}
          icon="file-text"
          callback={() => setModal({ show: true, name: item.file_name, link: item.link })}
        />
      ))}
    </div>
  );
};

export default Workbooks;
