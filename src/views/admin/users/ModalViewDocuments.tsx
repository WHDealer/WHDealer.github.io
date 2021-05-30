import React, { useEffect, useState } from 'react';
import { CModal, CModalHeader, CModalBody } from '@coreui/react';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import { useDispatch } from 'react-redux';
import { loadingSmall } from '../../../extensions';
import moment from 'moment';
import './ModalViewDocuments.css';
import ModalViewImage from './ModalViewImage';
import { Document, Page } from 'react-pdf';

interface Props {
  show: boolean;
  handleClose: () => void;
  id: string;
  userStatus: number;
  userEmail: string;
  getUsers: any;
  modalSendEmail: any;
  setModalSendEmail: any;
}

type File = {
  type: string;
  file_name: string;
  link: string;
  key: string;
};

type Documents = {
  signature: string;
  card_number: string;
  image_back: string;
  card_expires: number;
  image_front: string;
  card_location: string;
  gender: string;
  last_name: string;
  first_name: string;
  date_of_birth: string;
  files_professional: File[];
  files_consultation: File[];
  loading: boolean;
};

const defaultValue = {
  signature: '',
  card_number: '',
  image_back: '',
  card_expires: 0,
  image_front: '',
  card_location: '',
  gender: '',
  last_name: '',
  first_name: '',
  date_of_birth: '',
  files_professional: [],
  files_consultation: [],
  loading: false,
};

const renderImg = (url: string) => {
  const splitItems = url?.split?.('.');

  if (splitItems[splitItems.length - 1] === 'pdf')
    return (
      <Document file={url}>
        <Page pageNumber={1} height={240} />
      </Document>
    );

  return <img src={url} alt="document" style={{ objectFit: 'contain' }} />;
};

const ModalViewDocuments: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));

  const { show, handleClose, id, userStatus, modalSendEmail, getUsers, setModalSendEmail } = props;

  const [documents, setDocuments] = useState<Documents>(defaultValue);
  const [modalViewImage, setModalViewImage] = useState({ show: false, url: '', name: '' });

  useEffect(() => {
    if (!show || !id) return;
    setDocuments({ ...documents, loading: true });
    callApi({ method: 'get', api: `/api/v1/admin/users/nurse/${id}/documents-profile` }, ({ status, data }) => {
      if (status === SUCCESS) {
        setDocuments({ ...data, loading: false });
      } else {
        setDocuments(defaultValue);
      }
    });
  }, [id]);

  const approval = (isApproved: boolean) => {
    callApi(
      {
        method: 'put',
        api: `/api/v1/admin/users/nurse/${id}/documents-profile`,
        body: { approval: isApproved },
        loading: true,
      },
      ({ status }) => {
        if (status === SUCCESS) {
          handleClose();
          getUsers();
        }
      },
    );
  };

  let render = loadingSmall;
  if (!documents.loading) {
    render = (
      <div>
        <div className="modal-view-documents-title">Name: {documents.first_name + ' ' + documents.last_name}</div>
        <div className="row">
          <div className="col-4">
            <div className="modal-view-documents-title mt-3">I. Identification Information</div>
            <div className="modal-view-documents-children mb-3">
              <div className="mt-1">ID number: {documents.card_number}</div>
              <div className="mt-1">Expires on: {moment(documents.card_expires * 1000).format('DD-MM-YYYY')}</div>
              <div className="mt-1">Location: {documents.card_location}</div>
            </div>
            <div className="modal-view-documents-title mt-3">II. Certificate</div>
            <div className="modal-view-documents-children">
              {documents.files_professional?.map((item) => (
                <div
                  style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
                  className="link mt-1"
                  onClick={() =>
                    setModalViewImage({
                      show: true,
                      url: item.link,
                      name: item.file_name,
                    })
                  }
                >
                  &bull; {item.file_name}
                </div>
              ))}
              {documents.files_consultation?.map((item) => (
                <div
                  style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
                  className="link mt-1"
                  onClick={() =>
                    setModalViewImage({
                      show: true,
                      url: item.link,
                      name: item.file_name,
                    })
                  }
                >
                  &bull; {item.file_name}
                </div>
              ))}
            </div>
          </div>
          <div className="col-8">
            <div className="d-flex justify-content-evenly">
              <div
                className="cursor-pointer p-3"
                onClick={() => setModalViewImage({ show: true, url: documents.image_front, name: 'Front Card' })}
                style={{ width: '50%', height: 240, display: 'flex', justifyContent: 'center' }}
              >
                {renderImg(documents.image_front || 'https://i.imgur.com/hGefqAz.jpg')}
              </div>
              <div
                className="cursor-pointer p-3"
                onClick={() => setModalViewImage({ show: true, url: documents.image_back, name: 'Back Card' })}
                style={{ width: '50%', height: 240, display: 'flex', justifyContent: 'center' }}
              >
                {renderImg(documents.image_back || 'https://i.imgur.com/hGefqAz.jpg')}
              </div>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <div className="modal-view-documents-title mt-3">III. E-Signature</div>
          <div className="d-flex justify-content-center">
            <img
              className="cursor-pointer"
              onClick={() =>
                setModalViewImage({
                  show: true,
                  url: documents.signature,
                  name: 'E-Signature',
                })
              }
              src={documents.signature || 'https://i.imgur.com/hGefqAz.jpg'}
              style={{ width: 480, height: 250 }}
            />
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary mr-3" onClick={() => setModalSendEmail({ show: true })}>
            Send email
          </button>
          <button className="btn btn-primary mr-3" onClick={() => approval(false)} disabled={userStatus === 2}>
            Disapproved
          </button>
          <button className="btn btn-primary" onClick={() => approval(true)} disabled={userStatus === 3}>
            Approved
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={modalSendEmail.show ? 'hb-modal-hidden' : ''}>
      <CModal size="xl" centered show={show} onClosed={handleClose} onClose={handleClose} closeOnBackdrop={false}>
        <CModalHeader closeButton>Nurse Infomation</CModalHeader>
        <CModalBody>
          <ModalViewImage
            {...modalViewImage}
            handleClose={() => setModalViewImage({ ...modalViewImage, show: false })}
          />
          {render}
        </CModalBody>
      </CModal>
    </div>
  );
};

export default ModalViewDocuments;
