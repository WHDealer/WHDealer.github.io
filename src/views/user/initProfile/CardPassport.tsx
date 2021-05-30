import React, { forwardRef, useRef, useState } from 'react';
import { CCol, CInput, CInputGroup, CRow, CFormGroup, CInvalidFeedback, CLabel } from '@coreui/react';
import { useDispatch } from 'react-redux';
import { callApiAction } from '../../../store/callApi/actions';
import config from '../../../config';
import { loadingRequest, loadingSuccess } from '../../../store/loading/actions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './InitProfile.module.scss';
import moment from 'moment';
import { HBButtonFull, HBButtonSmall } from '../../../hbBaseClass';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const CustomInput = forwardRef(({ value, onClick }: any, ref: any) => {
  return (
    <div className={styles.iconDate} onClick={onClick} ref={ref}>
      <i className="hb-icon-calendar-date"></i>
    </div>
  );
});

interface Props {
  uploadMetaData: any;
  data: {
    card_number: string;
    card_location: string;
    card_expires?: number;
    image_front: string;
    image_back: string;
  };
  values: any;
  setValues: any;
  frontFile: any;
  backFile: any;
  cardExpires: any;
  setDataNew: any;
  back: any;
  next: any;
}

const CardPassport: React.FC<Props> = (props) => {
  const { uploadMetaData, data, values, setValues, frontFile, backFile, cardExpires, setDataNew, back, next } = props;
  const frontRef = useRef<any>(null);
  const backRef = useRef<any>(null);
  const [invalidCard, setInvalidCard] = useState<any>(null);
  const [loaded, setLoaded] = useState(false);

  function onDocumentLoadSuccess({ numPages }: any) {
    setLoaded(!loaded);
  }

  const setFrontFile = (value: any) =>
    setDataNew((dataNew: any) => {
      return { ...dataNew, frontFile: value };
    });

  const setBackFile = (value: any) =>
    setDataNew((dataNew: any) => {
      return { ...dataNew, backFile: value };
    });

  const setCardExpires = (value: any) =>
    setDataNew((dataNew: any) => {
      return { ...dataNew, cardExpires: value };
    });

  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));

  /**
   * Handle upload image
   *
   * @param e DOM Event
   * @param isFrontImg Front or back image
   */
  const handleUploadImage = (e: any, isFrontImg: boolean) => {
    // let reader = new FileReader();
    let file = e.target.files[0];
    if (!file) return;

    // reader.onload = () => {
    const data = { url: URL.createObjectURL(file), file, name: file.name };
    isFrontImg ? setFrontFile(data) : setBackFile(data);
    // };
    // reader.readAsDataURL(file);
  };

  /**
   * Reset upload image
   *
   * @param e DOM Event
   * @param isFrontImg Front or back image
   */
  const handleResetUploadImage = (isFrontImg: boolean) => (e: any) => {
    e.stopPropagation();
    const defaultData = { url: null, file: null };
    const imgRef = isFrontImg ? frontRef : backRef;

    imgRef.current.value = null;
    isFrontImg ? setFrontFile(defaultData) : setBackFile(defaultData);
  };

  const onSubmit = () => {
    if (
      values.card_number === data.card_number &&
      values.card_location === data.card_location &&
      cardExpires.getTime() / 1000 === data.card_expires &&
      !frontFile.file &&
      !backFile.file
    ) {
      next();
      return;
    }
    let countDone = 0;

    const arr: any = [];
    let imageFront = frontFile.url;
    let imageBack = backFile.url;
    if (frontFile.file) arr.push({ file: frontFile.file, type: 'image_front' });
    if (backFile.file) arr.push({ file: backFile.file, type: 'image_back' });

    const done = () => {
      const newCardExpires = cardExpires.getTime() / 1000;
      const newData = {
        ...data,
        image_front: imageFront,
        image_back: imageBack,
        card_number: values.card_number.toUpperCase(),
        card_location: values.card_location,
        card_expires: newCardExpires,
      };
      const next2 = () => {
        setDataNew((dataNew: any) => {
          return { ...dataNew, frontFile: { url: imageFront, file: null }, backFile: { url: imageBack, file: null } };
        });
        next();
      };
      uploadMetaData({ ...newData, step: 2 }, next2, (id: string) => {
        if (id === '1101') setInvalidCard(values.card_number.toUpperCase());
        else setInvalidCard(null);
      });
    };

    if (arr.length === 0) done();
    else {
      dispatch(loadingRequest());
      arr.forEach((item: any) => {
        callApi(
          {
            api: config.rest.getTemporaryUploadNurse(item.file.name, item.type),
            method: 'get',
          },
          (response: any) => {
            if (item.type === 'image_front') imageFront = response.data.documents.link;
            if (item.type === 'image_back') imageBack = response.data.documents.link;
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
                if (countDone === arr.length) {
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

  let imagePreviewFront: any = null;
  let imagePreviewBack: any = null;

  if (frontFile.url) {
    const splitItems = (frontFile.name || frontFile.url).split?.('.');

    imagePreviewFront = (
      <div className={styles.frontImagePreview}>
        {splitItems[splitItems.length - 1] === 'pdf' ? (
          <Document file={frontFile.url} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={1} height={267} />
          </Document>
        ) : (
          <img alt="IMG" className={styles.imgFrontPreview} src={frontFile.url} height="267" />
        )}
        <HBButtonSmall color="petrol" className={styles.btnCancelFront} onClick={handleResetUploadImage(true)}>
          Löschen
        </HBButtonSmall>
      </div>
    );
  } else {
    imagePreviewFront = (
      <div className={styles.btnFrontImage}>
        <div className={styles.contentLeftFront}>
          <div className={styles.uploadBtnFrontImage}>
            <i className="hb-icon-image-upload"></i>
          </div>
          <span>Foto hochladen</span>
        </div>
        <div className={styles.iconArrowFront}>
          <i className="hb-icon-arrow-right"></i>
        </div>
      </div>
    );
  }

  if (backFile.url) {
    const splitItems = (backFile.name || backFile.url).split?.('.');

    imagePreviewBack = (
      <div className={styles.backImagePreview}>
        {splitItems[splitItems.length - 1] === 'pdf' ? (
          <Document file={backFile.url} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={1} height={267} />
          </Document>
        ) : (
          <img alt="IMG" className={styles.imgBackPreview} src={backFile.url} height="267" />
        )}
        <HBButtonSmall color="petrol" className={styles.btnCancelBack} onClick={handleResetUploadImage(false)}>
          Löschen
        </HBButtonSmall>
      </div>
    );
  } else {
    imagePreviewBack = (
      <div className={styles.btnBackImage}>
        <div className={styles.contentLeftBack}>
          <div className={styles.uploadBtnBackImage}>
            <i className="hb-icon-image-upload"></i>
          </div>
          <span>Foto hochladen</span>
        </div>
        <div className={styles.iconArrowBack}>
          <i className="hb-icon-arrow-right"></i>
        </div>
      </div>
    );
  }

  const isInvalidCard = invalidCard && invalidCard.toUpperCase() === values.card_number.toUpperCase();

  return (
    <div className={styles.cardPassport}>
      <p className={styles.title}>Identität bestätigen</p>
      <CFormGroup className={styles.firstGroupWrapper}>
        <CRow>
          <CCol xs="6" className={styles.passport}>
            <CLabel>Personalausweis</CLabel>
            <CInput
              className={`${styles.passportInput} ${isInvalidCard ? 'is-invalid' : ''}`}
              type="text"
              placeholder="Ausweisnummer"
              value={(values.card_number || '').toUpperCase()}
              onChange={(e: any) => {
                const { value } = e.target;
                if (/^[0-9a-zA-Z]*$/.test(value)) setValues({ card_number: value });
              }}
              maxLength={20}
            />
            <CInvalidFeedback className="ml-2">
              {isInvalidCard
                ? 'This card/passport number already exists. Please enter another card/passport number.'
                : ''}
            </CInvalidFeedback>
          </CCol>
          <CCol xs="6" className={styles.location}>
            <CLabel>Staatsangehörigkeit</CLabel>
            <CInput
              type="text"
              placeholder="Staatsangehörigkeit"
              value={values.card_location || ''}
              onChange={(e: any) => {
                if (config.validate.valueTypingExpressionsName(e)) {
                  const { value } = e.target;
                  setValues({ card_location: value });
                }
              }}
              maxLength={50}
              className={styles.inputLocation}
            />
          </CCol>
        </CRow>
      </CFormGroup>

      <CFormGroup className={styles.dateGroup}>
        <CRow>
          <CCol xs="12">
            {/* <DatePicker fullWidth date={cardExpires} setDate={setCardExpires} /> */}
            <CLabel>Gültig bis</CLabel>
            <div className={styles.date}>
              <div className={styles.valueDate}>
                {cardExpires ? moment(cardExpires).format('DD.MM.YYYY') : 'TT.MM.JJJJ'}
              </div>

              <div style={{ width: 50 }} className={`hb-datepicker ${styles.dataPicker}`}>
                <DatePicker
                  selected={cardExpires}
                  customInput={<CustomInput />}
                  onChange={(date: any) => setCardExpires(date)}
                  yearDropdownItemNumber={40}
                  showYearDropdown
                  showMonthDropdown
                  scrollableYearDropdown
                  adjustDateOnChange
                  withPortal
                  minDate={new Date()}
                  popperPlacement="top-end"
                />
              </div>
            </div>
          </CCol>
        </CRow>
      </CFormGroup>

      <CFormGroup className={styles.groupImageWrapper}>
        <CRow>
          <CCol xs="6" className={styles.imageFrontGroup}>
            <CLabel>Vorderseite Reisepass</CLabel>
            <input
              ref={frontRef}
              className="form-control custom-file-input mb-2"
              type="file"
              placeholder="Upload image"
              name="front_image"
              accept="image/x-png,image/jpeg,application/pdf"
              onChange={(e) => handleUploadImage(e, true)}
              hidden
            />
            {/* <div
                className="form-control cursor-pointer mb-2 d-flex justify-content-between"
                style={{ zIndex: 0, borderRadius: 4, padding: '0 0 0 12px', overflow: 'hidden' }}
                onClick={() => frontRef.current.click()}
              >
                Front card/passport
                <div
                  style={{
                    backgroundColor: '#ebedef',
                    height: '100%',
                    color: '#768192',
                    padding: '0 10px',
                    display: 'flex',
                    alignItems: 'center',
                    borderLeft: '1px solid #d8dbe0',
                  }}
                >
                  Browser
                </div>
              </div> */}
            <div className={`${styles.imagePreviewFront} cursor-pointer`} onClick={() => frontRef.current.click()}>
              {imagePreviewFront}
            </div>
          </CCol>
          <CCol xs="6" className={styles.imageBackGroup}>
            <CLabel>Rückseite Reisepass</CLabel>
            <input
              ref={backRef}
              className="form-control custom-file-input mb-2"
              type="file"
              placeholder="Upload image"
              name="back_image"
              accept="image/x-png,image/jpeg,application/pdf"
              onChange={(e) => handleUploadImage(e, false)}
              hidden
            />
            {/* <div
                className="form-control cursor-pointer mb-2 d-flex justify-content-between"
                style={{ zIndex: 0, borderRadius: 4, padding: '0 0 0 12px', overflow: 'hidden' }}
                onClick={() => backRef.current.click()}
              >
                Back card/passport
                <div
                  style={{
                    backgroundColor: '#ebedef',
                    height: '100%',
                    color: '#768192',
                    padding: '0 10px',
                    display: 'flex',
                    alignItems: 'center',
                    borderLeft: '1px solid #d8dbe0',
                  }}
                >
                  Browser
                </div>
              </div> */}
            <div className={`${styles.imagePreviewBack} cursor-pointer`} onClick={() => backRef.current.click()}>
              {imagePreviewBack}
            </div>
          </CCol>
        </CRow>
      </CFormGroup>
      {/* <CFormGroup>
        <CButton className="float-left pl-3 pr-4 ml-4" color="primary" onClick={() => back()}>
          <i className="fas fa-angle-left" /> Back
        </CButton>
        <CButton
          className="float-right pl-4 pr-3 mr-4"
          color="primary"
          disabled={
            !(
              values.card_number?.trim() &&
              values.card_location?.trim() &&
              frontFile.url &&
              backFile.url &&
              cardExpires
            )
          }
          onClick={onSubmit}
        >
          Continue <i className="fas fa-angle-right" />
        </CButton>
      </CFormGroup> */}
      <div className={styles.footer}>
        <div className={styles.wrapperBack}>
          <HBButtonFull
            color="petrol"
            outline
            children="Überspringen"
            onClick={() => back()}
            type="button"
            // className={styles.wrapperBack}
          />
        </div>

        <div className={styles.wrapperBack}>
          <HBButtonFull
            color="petrol"
            children="Weiter"
            disabled={
              !(
                values.card_number?.trim() &&
                values.card_location?.trim() &&
                frontFile.url &&
                backFile.url &&
                cardExpires
              )
            }
            onClick={onSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default CardPassport;
