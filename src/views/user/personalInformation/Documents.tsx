import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { useHistory } from 'react-router-dom';
import config from '../../../config';
import { defaultAvatar } from '../../../extensions';
import { HBModalViewDocument } from '../../../hbBaseClass';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import DocumentItemWrapper from './DocumentItemWrapper';
import { Document, Page } from 'react-pdf';
import moment from 'moment';

const Documents: React.FC<RouteComponentProps> = (props) => {
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));
  const [information, setInformation] = useState<any>({ data: {}, loading: true });
  const [modalViewDocument, setModalViewDocument] = useState({ show: false, name: '', url: '' });

  const getInformationNurse = () => {
    callApi(
      {
        method: 'get',
        api: config.rest.getInformationNurse(),
        loading: true,
      },
      (response) => {
        const { data, status } = response;
        if (status === SUCCESS) {
          setInformation({
            data: data,
            loading: false,
          });
        }
      },
    );
  };

  useEffect(() => {
    getInformationNurse();
    // eslint-disable-next-line
  }, []);

  if (information.loading) return <div />;

  const renderImg = (url: string) => {
    const splitItems = url?.split?.('.');

    if (splitItems[splitItems.length - 1] === 'pdf')
      return (
        <Document file={url}>
          <Page pageNumber={1} height={360} />
        </Document>
      );

    return <img src={url || defaultAvatar} alt="passport" />;
  };

  return (
    <div className="hb-wrapper">
      <HBModalViewDocument
        {...modalViewDocument}
        handleClose={() => setModalViewDocument({ ...modalViewDocument, show: false })}
      />
      <div className="hb-mx-20" style={{ paddingBottom: 50 }}>
        {/* <div className="hb-my-28">
          <HBButtonSmall color="nightblue" onClick={() => history.goBack()}>
            <i className="hb-icon-arrow-left hb-icon-md" /> Zurück
          </HBButtonSmall>
        </div> */}
        <div className="hb-title" style={{ marginTop: 28 }}>
          Dokumente
        </div>
        <DocumentItemWrapper title="Informationen zur Identintät">
          <div className="child-title">Reisepassnummer</div>
          <div className="child-content">{information.data.card_number}</div>
          <div className="child-title">Ausstellungsort</div>
          <div className="child-content">{information.data.card_location}</div>
          <div className="child-title">Gültig bis</div>
          <div className="child-content">{moment(information.data.card_expires * 1000).format('DD.MM.YYYY')}</div>
          <div className="row">
            <div className="col-md-6">
              <div className="child-title">Vorderseite Pass</div>
              <div
                className="child-document"
                onClick={() =>
                  setModalViewDocument({
                    show: true,
                    name: 'Vorderseite Pass',
                    url: information.data.image_front,
                  })
                }
              >
                {renderImg(information.data.image_front)}
              </div>
            </div>
            <div className="col-md-6">
              <div className="child-title">Rückseite Pass</div>
              <div
                className="child-document"
                onClick={() =>
                  setModalViewDocument({
                    show: true,
                    name: 'Rückseite Pass',
                    url: information.data.image_back,
                  })
                }
              >
                {renderImg(information.data.image_back)}
              </div>
            </div>
          </div>
        </DocumentItemWrapper>
        <DocumentItemWrapper title="Berufsbescheinigung &amp; Zertifikate">
          <div>
            <div className="child-title">Pflegezertifikat</div>
            <div className="row">
              {information.data.files_professional.map((item: any, index: number) => {
                const splitItems = item?.file_name?.split('.');
                return (
                  <div className="col-md-6">
                    <div
                      key={index}
                      className="child-document"
                      onClick={() =>
                        setModalViewDocument({
                          show: true,
                          name: 'Pflegezertifikat',
                          url: item.link,
                        })
                      }
                    >
                      {splitItems[splitItems.length - 1] === 'pdf' ? (
                        <Document file={item.link}>
                          <Page pageNumber={1} height={360} />
                        </Document>
                      ) : (
                        <img src={item.link} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="child-title">Berufsukunde</div>
            <div className="row">
              {information.data.files_consultation.map((item: any, index: number) => {
                const splitItems = item?.file_name?.split('.');
                return (
                  <div className="col-md-6">
                    <div
                      key={index}
                      className="child-document"
                      onClick={() =>
                        setModalViewDocument({
                          show: true,
                          name: 'Berufsukunde',
                          url: item.link,
                        })
                      }
                    >
                      {splitItems[splitItems.length - 1] === 'pdf' ? (
                        <Document file={item.link}>
                          <Page pageNumber={1} height={360} />
                        </Document>
                      ) : (
                        <img src={item.link} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </DocumentItemWrapper>
        <DocumentItemWrapper title="Ihre Unterschrift">
          <div
            className="child-signature"
            onClick={() =>
              setModalViewDocument({
                show: true,
                name: 'Ihre Unterschrift',
                url: information.data.signature,
              })
            }
          >
            <img src={information.data.signature || defaultAvatar} alt="e-signature" />
          </div>
        </DocumentItemWrapper>
      </div>
    </div>
  );
};

export default Documents;
