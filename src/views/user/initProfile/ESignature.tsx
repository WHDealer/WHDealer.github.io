import React, { useEffect, useRef, useState } from 'react';
import { CButton, CFormGroup, CModal, CModalHeader, CModalBody, CModalFooter } from '@coreui/react';
import SignatureCanvas from 'react-signature-canvas';
import defaultSignature from './default_signature.png';
import { useDispatch } from 'react-redux';
import { callApiAction } from '../../../store/callApi/actions';
import config from '../../../config';
import { loadingRequest, loadingSuccess } from '../../../store/loading/actions';
import styles from './InitProfile.module.scss';
import { HBButtonFull, HBButtonSmall } from '../../../hbBaseClass';

interface Props {
  uploadMetaData: any;
  data: { signature: any };
  signature: any;
  setDataNew: any;
  back: any;
  next: any;
}

const ESignature: React.FC<Props> = (props) => {
  const { uploadMetaData, data, signature, setDataNew, next, back } = props;
  const uploadRef = useRef<any>(null);
  const signatureRef = useRef<any>(null);
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));

  const [showModal, setShowModal] = useState(false);

  const reloadCanvas = (src: any) => {
    const canvas = signatureRef.current.getCanvas();
    const context = canvas.getContext('2d');
    const image = new Image();
    image.src = src;
    image.crossOrigin = 'Anonymous';
    image.onload = function () {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  };

  useEffect(() => {
    reloadCanvas(signature.url);
  }, []);

  const setSignature = (value: any) =>
    setDataNew((dataNew: any) => {
      return { ...dataNew, signature: value };
    });

  const signDone = () => {
    let file: any;
    const canvas = signatureRef.current.getCanvas();
    if (
      canvas
        .getContext('2d')
        .getImageData(0, 0, canvas.width, canvas.height)
        .data.some((channel: any) => channel !== 0)
    ) {
      canvas.toBlob((blob: any) => {
        file = new File([blob], 'signature.png', { type: 'image/png' });
        setSignature({ url: canvas.toDataURL('image/png'), file });
      }, 'image/png');
    } else {
      setSignature({ url: '', file: null });
    }

    setShowModal(false);
  };

  const handleSelectImage = (e: any) => {
    let reader: any = new FileReader();
    let file = e.target.files[0];
    if (!file) return;

    reader.onload = () => {
      setSignature({ url: reader.result, file });
      reloadCanvas(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = () => {
    const done = (url: string) => {
      const newData = {
        ...data,
        signature: url,
      };
      const finish2 = () => {
        setSignature({ url, file: null });
        next();
      };
      uploadMetaData({ ...newData, step: 4 }, finish2);
    };

    if (signature.file) {
      dispatch(loadingRequest());
      callApi(
        {
          api: config.rest.getTemporaryUploadNurse(signature.file.name, 'signature'),
          method: 'get',
        },
        (response: any) => {
          const myHeaders = new Headers();
          myHeaders.append('x-amz-acl', 'public-read');
          const requestOptions: any = {
            method: 'PUT',
            headers: myHeaders,
            body: signature.file,
            redirect: 'follow',
          };
          fetch(response.data?.link, requestOptions)
            .then((response) => response.text())
            .then((result) => {
              done(response.data.documents.link);
            })
            .catch((error) => {
              dispatch(loadingSuccess());
            });
        },
      );
    } else next();
  };

  return (
    <>
      <input ref={uploadRef} type="file" hidden onChange={handleSelectImage} accept="image/x-png,image/jpeg" />
      <CModal
        className={styles.signatureModal}
        size="xl"
        centered
        show={showModal}
        closeOnBackdrop={false}
        onClose={() => setShowModal(false)}
      >
        <CModalHeader closeButton>Write Down A Signature</CModalHeader>
        <CModalBody className={`popup--update-user text-center ${styles.signatureWrapper}`}>
          <SignatureCanvas
            ref={signatureRef}
            penColor="black"
            // minWidth={1.5}
            // maxWidth={3}
            canvasProps={{ width: 860, height: 400, className: styles.signatureCanvas }}
          />
        </CModalBody>
        <CModalFooter>
          <CButton className="px-4" color="secondary" onClick={() => signatureRef.current.clear()}>
            Clear
          </CButton>
          <CButton className="px-4" color="primary" onClick={() => signDone()}>
            OK
          </CButton>
        </CModalFooter>
      </CModal>
      <div className={styles.eSignature}>
        <p className={styles.title}>Daten mit Unterschrift bestätigen</p>
        <div className={styles.content}>Mit Ihrer Unterschrift bestätigen Sie die Richtigkeit Ihrer Angaben. </div>
        <div className={styles.imgWrap} onClick={() => setShowModal(true)}>
          <img alt="IMG" src={signature.url || defaultSignature} className={styles.imgEsignature} />
        </div>
        <CFormGroup className={`mb-4 ${styles.actions}`}>
          <div className="d-flex flex-row justify-content-evenly">
            <HBButtonSmall className="px-4" color="petrol" onClick={() => uploadRef.current.click()}>
              Choose Image
            </HBButtonSmall>
            <HBButtonSmall className="px-4" color="petrol" onClick={() => setShowModal(true)}>
              Sign Hand
            </HBButtonSmall>
          </div>
        </CFormGroup>
        {/* <CFormGroup>
       
        <CButton
          className="float-right px-4 mr-4"
          color="primary"
          disabled={!signature.url && !signature.file}
          onClick={onSubmit}
        >
          Done
        </CButton>
      </CFormGroup> */}
        <div className={styles.footer}>
          <div className={styles.wrapperBack}>
            <HBButtonFull
              color="petrol"
              outline
              children="Überspringen"
              // className={styles.back}
              // disabled={step === 0}
              onClick={back}
              type="button"
              //className={styles.wrapperBack}
            />
          </div>

          <div className={styles.wrapperBack}>
            <HBButtonFull
              color="petrol"
              children="Weiter"
              // className={styles.next}
              onClick={onSubmit}
              disabled={!signature.url && !signature.file}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ESignature;
