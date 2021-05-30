import React, { useEffect, useRef, useState } from 'react';
import { CCard, CCardBody, CContainer, CRow } from '@coreui/react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import Intro from './Intro';
import PersonalInformation from './PersonalInformation';
import CardPassport from './CardPassport';
import Certificate from './Certificate';
import ESignature from './ESignature';
import InitDone from './InitDone';
import { useDispatch, useSelector } from 'react-redux';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import config from '../../../config';
import { ProgressLine } from '../../../components';
import Header from '../authContainers/Header';
import styles from './InitProfile.module.scss';
import { HBButtonSmall, HBModalConfirm } from '../../../hbBaseClass/index';

const UpdateProfile: React.FC<RouteComponentProps> = () => {
  const auth = useSelector((state: { auth: { status_name: string } }) => state.auth);
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));
  const formRef = useRef<any>(null);
  const [showPopupSignout, setShowPopupSignout] = useState(false);

  const defaultData: any = {
    first_name: '',
    last_name: '',
    date_of_birth: undefined,
    gender: '',
    card_number: '',
    card_location: '',
    card_expires: undefined,
    image_front: '',
    image_back: '',
    files_professional: [],
    files_consultation: [],
    signature: '',
  };

  const [data, setData] =
    useState<{
      first_name: string;
      last_name: string;
      date_of_birth?: string;
      gender: number;
      card_number: string;
      card_location: string;
      card_expires?: number;
      image_front: string;
      image_back: string;
      files_professional: string[];
      files_consultation: string[];
      signature: string;
    }>(defaultData);

  const [dataNew, setDataNew] = useState({
    values: defaultData,
    setValues: (values: any) =>
      setDataNew((dataNew: any) => {
        return { ...dataNew, values: { ...dataNew.values, ...values } };
      }),
    frontFile: { url: data.image_front, file: null },
    backFile: { url: data.image_front, file: null },
    cardExpires: data.card_expires ? new Date(data.card_expires * 1000) : null,
    filesProfessional: data.files_professional || [],
    filesConsultation: data.files_consultation || [],
    signature: { url: data.signature, file: null },
  });

  const history = useHistory();
  if (!auth.status_name?.toLowerCase?.().includes('pending')) history.push('/sign-in');

  const [step, setStep] = useState<number>(0);

  const uploadMetaData = (body: any, callback: any, callbackFailed?: any) => {
    callApi(
      {
        method: 'post',
        api: config.rest.updateProfileDocuments(),
        body: body,
        loading: true,
      },
      (response: any) => {
        const { status, id } = response;
        if (status === SUCCESS) {
          setData(body);
          callback();
        } else {
          callbackFailed?.(id);
        }
      },
    );
  };

  const getProfile = () => {
    callApi(
      {
        method: 'get',
        api: config.rest.getProfileDocuments(),
      },
      (response: any) => {
        const { status } = response;
        if (status === SUCCESS) {
          const data1 = response.data;
          const data2 = {
            image_front: data1.image_front,
            card_location: data1.card_location,
            image_back: data1.image_back,
            signature: data1.signature,
            card_expires: data1.card_expires,
            card_number: data1.card_number,
            last_name: data1.last_name,
            first_name: data1.first_name,
            gender: data1.gender,
            date_of_birth: data1.date_of_birth,
            files_professional: data1.files_professional,
            files_consultation: data1.files_consultation,
          };
          setData(data2);
          setDataNew((dataNew: any) => {
            return {
              ...dataNew,
              values: data2,
              frontFile: { url: data1.image_front, file: null },
              backFile: { url: data1.image_back, file: null },
              cardExpires: data1.card_expires ? new Date(data1.card_expires * 1000) : null,
              filesProfessional: data1.files_professional || [],
              filesConsultation: data1.files_consultation || [],
              signature: { url: data1.signature, file: null },
            };
          });
        } else history.push('/sign-in');
      },
    );
  };

  useEffect(() => {
    getProfile();
  }, []);

  let Form;

  switch (step) {
    case 0:
      Form = <Intro next={() => setStep(1)} data={data} step={0} />;
      break;
    case 1:
      Form = (
        <PersonalInformation
          uploadMetaData={uploadMetaData}
          data={data}
          formRef={formRef}
          next={() => setStep(2)}
          prev={() => setStep(0)}
        />
      );
      break;
    case 2:
      Form = (
        <CardPassport
          {...dataNew}
          uploadMetaData={uploadMetaData}
          data={data}
          setDataNew={setDataNew}
          back={() => setStep(1)}
          next={() => setStep(3)}
        />
      );
      break;
    case 3:
      Form = (
        <Certificate
          {...dataNew}
          uploadMetaData={uploadMetaData}
          data={data}
          setDataNew={setDataNew}
          back={() => setStep(2)}
          next={() => setStep(4)}
        />
      );
      break;
    case 4:
      Form = (
        <ESignature
          {...dataNew}
          uploadMetaData={uploadMetaData}
          data={data}
          setDataNew={setDataNew}
          back={() => setStep(3)}
          next={() => setStep(5)}
        />
      );
      break;
    case 5:
      Form = <InitDone back={() => setStep(4)} />;
      break;
  }

  return (
    <div className={styles.initProfile}>
      <Header />

      <div className={styles.wrapper}>
        <CContainer className={styles.wrapperResContainer}>
          <div className="petrol">
            <HBModalConfirm
              show={showPopupSignout}
              handleClose={() => setShowPopupSignout(false)}
              title="Abmelden"
              content="Sie wollen sich von Ihrem Account abmelden?"
              up="Ja, abmelden"
              upCallback={() => history.push('sign-in')}
              down="Abbrechen"
              downCallback={() => setShowPopupSignout(false)}
            />
          </div>

          <HBButtonSmall color="petrol" onClick={() => setShowPopupSignout(true)} className={styles.btnSignUp}>
            <i className={`hb-icon-arrow-left ${styles.hbIcon}`} /> Zurück
          </HBButtonSmall>
          <CRow className="nopadding">
            <CCard className={[styles.card, styles.cardResContainer]}>
              <CCardBody className={styles.cardResBody}>
                <div className={`${styles.title} ${styles.stepInfo}`}>{`Schritt ${step} von 5`}</div>
                <ProgressLine
                  backgroundColor="var(--petrol-20)"
                  visualParts={[
                    {
                      id: '1',
                      percentage: (step * 100) / 5 + '%',
                      color: 'var(--aquamarin-90)',
                    },
                  ]}
                />

                {Form}
              </CCardBody>
            </CCard>
          </CRow>
        </CContainer>
      </div>
    </div>
  );
};

export default UpdateProfile;
