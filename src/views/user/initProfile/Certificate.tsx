import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { callApiAction } from '../../../store/callApi/actions';
import config from '../../../config';
import { loadingRequest, loadingSuccess } from '../../../store/loading/actions';
import styles from './InitProfile.module.scss';
import { CCol, CRow } from '@coreui/react';
import { Document, Page, pdfjs } from 'react-pdf';
import { HBButtonFull, HBButtonSmall } from '../../../hbBaseClass';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface Props {
  uploadMetaData: any;
  data: {
    files_professional: any[];
    files_consultation: any[];
  };
  filesProfessional: any;
  filesConsultation: any;
  setDataNew: any;
  back: any;
  next: any;
}

const Certificate: React.FC<Props> = (props) => {
  const { uploadMetaData, data, filesProfessional, filesConsultation, setDataNew, back, next } = props;
  const refProfessional = useRef<any>(null);
  const refConsultation = useRef<any>(null);
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
  }

  const setFilesProfessional = (value: any) =>
    setDataNew((dataNew: any) => {
      return { ...dataNew, filesProfessional: value };
    });

  const setFilesConsultation = (value: any) =>
    setDataNew((dataNew: any) => {
      return { ...dataNew, filesConsultation: value };
    });

  const includes = (arr: any[], item: any) => {
    return arr.findIndex((i: any) => i.file_name === item.file_name) !== -1;
  };

  const onUploadProfessional = (e: any) => {
    const files = e.target.files;
    if (files.length === 0) return;
    const newFiles = [...files]
      .filter((item: any) => item.size <= 52428800)
      .map((item) => {
        return { file_name: item.name, file: item, link: URL.createObjectURL(item) };
      })
      .filter((item: any) => !includes(filesProfessional, item));
    setFilesProfessional([...filesProfessional, ...newFiles].slice(0, 10));
  };

  const onUploadConsultation = (e: any) => {
    const files = e.target.files;
    if (files.length === 0) return;
    const newFiles = [...files]
      .filter((item: any) => item.size <= 52428800)
      .map((item) => {
        return { file_name: item.name, file: item, link: URL.createObjectURL(item) };
      })
      .filter((item: any) => !includes(filesConsultation, item));
    setFilesConsultation([...filesConsultation, ...newFiles].slice(0, 10));
  };

  const onSubmit = () => {
    if (filesProfessional === data.files_professional && filesConsultation === data.files_consultation) {
      next();
      return;
    }

    let countDone = 0;

    const arr1: any[] = filesProfessional.filter((item: any) => !item.file);
    const arr2: any[] = filesConsultation.filter((item: any) => !item.file);
    const newFilesProfessional = filesProfessional.filter((item: any) => item.file);
    const newFilesConsultation = filesConsultation.filter((item: any) => item.file);
    const total = newFilesProfessional.length + newFilesConsultation.length;

    const done = () => {
      const newData = {
        ...data,
        files_professional: arr1,
        files_consultation: arr2,
      };
      const next2 = () => {
        setDataNew((dataNew: any) => {
          return { ...dataNew, filesProfessional: arr1, filesConsultation: arr2 };
        });
        next();
      };
      uploadMetaData({ ...newData, step: 3 }, next2);
    };

    const upload = (files: any, arrLinks: any, type: string) => {
      if (files.length > 0) {
        files.forEach((item: any) => {
          callApi(
            {
              api: config.rest.getTemporaryUploadNurse(item.file_name, type),
              method: 'get',
            },
            (response: any) => {
              arrLinks.push({ ...response.data.documents });
              const myHeaders = new Headers();
              myHeaders.append('x-amz-acl', 'public-read');
              const requestOptions: any = {
                method: 'PUT',
                headers: myHeaders,
                body: item.file,
                redirect: 'follow',
              };
              fetch(response.data?.link, requestOptions)
                .then((response) => response.text())
                .then((result) => {
                  countDone += 1;
                  if (countDone === total) {
                    done();
                  }
                })
                .catch((error) => {
                  dispatch(loadingSuccess());
                  console.log(error);
                });
            },
          );
        });
      }
    };

    if (total === 0) {
      done();
    } else {
      dispatch(loadingRequest());
      upload(newFilesProfessional, arr1, 'files_professional');
      upload(newFilesConsultation, arr2, 'files_consultation');
    }
  };

  return (
    <div className={styles.certificate}>
      <div className={styles.title}>Berufsbescheinigung &amp; Zertifikate</div>
      <CRow className={styles.document}>
        <CCol xs={6}>
          <div className={styles.professionalDocument}>
            <p className={styles.title}>Pflegezertifikat</p>
            <input
              ref={refProfessional}
              type="file"
              onChange={onUploadProfessional}
              accept="image/x-png,image/jpeg,application/pdf"
              multiple
              hidden
            />
            {/* <div className="d-flex justify-content-center mb-3">
              <i className="fas fa-upload button-upload" onClick={() => refProfessional.current.click()} />
            </div> */}

            <div className={styles.btnProfessional} onClick={() => refProfessional.current.click()}>
              <div className={styles.contentNurse}>
                <div className={styles.uploadDocument}>
                  <i className="hb-icon-book"></i>
                </div>
                <span>Pfelgezertifikat hochladen</span>
              </div>
              <div className={styles.iconArrowNurse}>
                <i className="hb-icon-arrow-right"></i>
              </div>
            </div>

            <div className={styles.pdfNurse}>
              {filesProfessional.map((item: any, index: number) => {
                const splitItems = item.file_name.split('.');

                return (
                  <div key={index} className={styles.nurseDocumnet}>
                    {/* {ellipsis(item.file_name)} */}
                    {splitItems[splitItems.length - 1] === 'pdf' ? (
                      <Document
                        //file={'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf'}
                        file={item.link}
                        onLoadSuccess={onDocumentLoadSuccess}
                      >
                        <Page pageNumber={pageNumber} height={267} />
                      </Document>
                    ) : (
                      <img src={item.link} height="267" width="187" />
                    )}

                    <HBButtonSmall
                      color="petrol"
                      onClick={() =>
                        setFilesProfessional(filesProfessional.filter((_: any, index1: number) => index1 !== index))
                      }
                      className={styles.nurseClose}
                    >
                      Löschen
                    </HBButtonSmall>
                    {/* <i
                    className="fa fa-trash ml-2 cursor-pointer"
                    onClick={() =>
                      setFilesProfessional(filesProfessional.filter((_: any, index1: number) => index1 !== index))
                    }
                  /> */}
                  </div>
                );
              })}
            </div>
          </div>
        </CCol>
        <CCol xs={6}>
          <div className={styles.nurseDocumnet}>
            <p className={styles.title}>Berufsurkunde</p>
            <input
              ref={refConsultation}
              type="file"
              onChange={onUploadConsultation}
              accept="image/x-png,image/jpeg,application/pdf"
              multiple
              hidden
            />
            {/* <div className="d-flex justify-content-center mb-3">
              <i className="fas fa-upload button-upload"  />
            </div> */}

            <div className={styles.btnNurse} onClick={() => refConsultation.current.click()}>
              <div className={styles.contentNurse}>
                <div className={styles.uploadDocument}>
                  <i className="hb-icon-book"></i>
                </div>
                <span>Berufsurkunde hochladen</span>
              </div>
              <div className={styles.iconArrowNurse}>
                <i className="hb-icon-arrow-right"></i>
              </div>
            </div>
            <div className={styles.pdf}>
              {filesConsultation.map((item: any, index: number) => {
                const splitItems = item.file_name.split('.');
                return (
                  <div key={index} className={styles.consultingPdf}>
                    {/* {ellipsis(item.file_name)} */}
                    {splitItems[splitItems.length - 1] === 'pdf' ? (
                      <Document
                        //file={'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf'}
                        file={item.link}
                        onLoadSuccess={onDocumentLoadSuccess}
                      >
                        <Page pageNumber={pageNumber} height={267} />
                      </Document>
                    ) : (
                      <img src={item.link} height="267" width="187" />
                    )}

                    {/* <i
                    className="fa fa-trash ml-2 cursor-pointer"
                    onClick={() =>
                      setFilesConsultation(filesConsultation.filter((_: any, index1: number) => index1 !== index))
                    }
                  /> */}
                    <HBButtonSmall
                      color="petrol"
                      onClick={() =>
                        setFilesConsultation(filesConsultation.filter((_: any, index1: number) => index1 !== index))
                      }
                      className={styles.consultingClose}
                    >
                      Löschen
                    </HBButtonSmall>
                  </div>
                );
              })}
            </div>
          </div>
        </CCol>
      </CRow>

      {/* <CButton
        className="float-right pl-4 pr-3 mr-4"
        color="primary"
        onClick={onSubmit}
        disabled={filesProfessional.length === 0 || filesConsultation.length === 0}
      >
        Continue <i className="fas fa-angle-right" />
      </CButton> */}
      <div className={styles.footer}>
        <div className={styles.wrapperBack}>
          <HBButtonFull
            color="petrol"
            outline
            children="Überspringen"
            // btnClassName={styles.back}
            // disabled={step === 0}
            onClick={() => back()}
            type="button"
            // className={styles.wrapperBack}
          />
        </div>

        <div className={styles.wrapperBack}>
          <HBButtonFull
            color="petrol"
            children="Weiter"
            // btnClassName={styles.next}
            onClick={onSubmit}
            disabled={filesProfessional.length === 0 || filesConsultation.length === 0}
          />
        </div>
      </div>
    </div>
  );
};

export default Certificate;
