import { CCard, CCol, CRow, CSpinner } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import config from '../../../config';
import { ls } from '../../../extensions';
import { HBButtonFull, HBModalConfirm } from '../../../hbBaseClass';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import styles from './PostureType.module.scss';
import { changeSetting } from '../../../store/settings/actions';

const PostureType: React.FC<RouteComponentProps> = (props) => {
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));
  const history = useHistory();
  // const [posture, setPosture] = useState<any>(null);
  const email = useSelector((state: any) => state.auth.email);
  const [isloading, setIsLoading] = useState(false);
  const postureType = useSelector((state: any) => state.settings.posture_type) || 'all';
  const [posture, setPosture] = useState(postureType);
  const [showAttention, setShowAttention] = useState(false);
  const attentions = ls.get('mobility-attentions') || [];
  const needShowAttention = !attentions.includes(email);

  const data = [
    {
      id: 'all',
      title: 'Alle Videos',
      content: 'Sie können alle Videos mit allen Schwierigkeitsstufen sehen (Stehen, Sitzen, Liegen). ',
    },
    {
      id: 'standing',
      title: 'Übungen im Stehen',
      content: 'Sie haben keine Einschränkungen in Ihren Bewegungen.',
    },
    {
      id: 'sit',
      title: 'Übungen im Sitzen',
      content: 'Bei Bewegungen im Sitzen fühlen Sie sich sicher.',
    },
    {
      id: 'lie',
      title: 'Übungen im Liegen',
      content: 'Bei Bewegungen im Liegen fühlen Sie sich sicher.',
    },
  ];

  useEffect(() => {
    ls.set(`posture-${email}`, postureType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const choosePosture = (posture: any) => {
    const body: any = {
      posture_type: posture,
    };
    setIsLoading(true);
    callApi(
      {
        method: 'post',
        api: config.rest.settings(),
        body: body,
      },
      (response) => {
        const { status, data } = response;

        if (status === SUCCESS) {
          ls.set(`posture-${email}`, posture);
          setIsLoading(false);
          dispatch(changeSetting(data));

          if (needShowAttention) setShowAttention(true);
          else history.push('/mobility');
        }
      },
    );
  };

  return (
    <>
      <HBModalConfirm
        show={showAttention}
        handleClose={() => setShowAttention(false)}
        title="Achtung"
        content="Bevor Sie die Übung starten, konsultieren Sie Ihren Arzt um mögliche Verletzungsrisiken zu vermeiden."
        up="Bestätigen"
        upCallback={() => {
          ls.set('mobility-attentions', [...attentions, email]);
          setShowAttention(false);
          history.push('/mobility');
        }}
        // dark
      />
      <div className="wide">
        <div className={`hb-wrapper ${styles.posture}`}>
          <h1 className={styles.title}>Welche Übungen können Sie absolvieren?</h1>
          <div className={styles.sub_title}>Wählen Sie aus welche Übungen Sie angezeigt bekommen möchten:</div>
          <CRow className={[styles.cardWrapper, styles.cardWrapperFirst]} style={{ justifyContent: 'center' }}>
            {data.map((item) => (
              <CCol md={6} key={item.id}>
                <CCard className={styles.card}>
                  <div className={styles.radio}>
                    <input
                      id={item.id}
                      type="radio"
                      name="posture"
                      onChange={() => setPosture(item.id)}
                      checked={item.id === posture}
                    />
                    <label htmlFor={item.id} className={`${styles.container} container`}></label>
                  </div>
                  <label className={styles.infomation} htmlFor={item.id}>
                    <span className={styles.titleCard}>{item.title}</span>
                    <span className={styles.content}>{item.content} </span>
                  </label>
                </CCard>
              </CCol>
            ))}
          </CRow>

          <div className={styles.footer}>
            <div className={styles.wrapperBack}>
              <HBButtonFull
                className={styles.button}
                disabled={posture === 'none'}
                color="violet"
                children={isloading ? <CSpinner size="sm" color="light" /> : 'Filter anwenden'}
                onClick={() => choosePosture(posture)}
                type="button"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostureType;
