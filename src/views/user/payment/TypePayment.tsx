import { CCol, CRow } from '@coreui/react';
import React from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { HBButtonSmall, HBSearch } from '../../../hbBaseClass';
import PaymentItem from './PaymentItem';
import styles from './Payment.module.scss';
import i1 from '../../../assets/images/i1.png';
import i2 from '../../../assets/images/i2.png';
import i3 from '../../../assets/images/i3.png';
import i4 from '../../../assets/images/i4.png';
import i5 from '../../../assets/images/i5.png';
import { Waypoint } from 'react-waypoint';

const TypePayment: React.FC<RouteComponentProps> = () => {
  const history = useHistory();

  const data = [
    {
      id: 1,
      image: i1,
      brand_name: 'AOK',
      title: 'Allgemeine Ortskrankenkassen',
    },
    {
      id: 2,
      image: i2,
      brand_name: 'Barmer',
      title: 'Ersatzkasse',
    },
    {
      id: 3,
      image: i3,
      brand_name: 'HEK',
      title: 'Hanseatische Krankenkasse',
    },
    {
      id: 4,
      image: i4,
      brand_name: 'Handelskrankenkasse',
      title: '',
    },
    {
      id: 5,
      image: i5,
      brand_name: 'DAK-Gesundheit',
      title: '',
    },
    {
      id: 6,
      image: i1,
      brand_name: 'Barmer',
      title: 'Ersatzkasse',
    },
    {
      id: 7,
      image: i2,
      brand_name: 'AOK',
      title: 'Allgemeine Ortskrankenkassen',
    },
    {
      id: 8,
      image: i4,
      brand_name: 'AOK',
      title: 'Allgemeine Ortskrankenkassen',
    },
    // {
    //   id: 9,
    //   image: i3,
    //   brand_name: 'AOK',
    //   title: 'Allgemeine Ortskrankenkassen',
    // },
    // {
    //   id: 10,
    //   image: i1,
    //   brand_name: 'AOK',
    //   title: 'Allgemeine Ortskrankenkassen',
    // },
    // {
    //   id: 11,
    //   image: i2,
    //   brand_name: 'AOK',
    //   title: 'Allgemeine Ortskrankenkassen',
    // },
    // {
    //   id: 12,
    //   image: i1,
    //   brand_name: 'AOK',
    //   title: 'Allgemeine Ortskrankenkassen',
    // },
    // {
    //   id: 13,
    //   image: i5,
    //   brand_name: 'AOK',
    //   title: 'Allgemeine Ortskrankenkassen',
    // },
    // {
    //   id: 14,
    //   image: i4,
    //   brand_name: 'AOK',
    //   title: 'Allgemeine Ortskrankenkassen',
    // },
    // {
    //   id: 15,
    //   image: i3,
    //   brand_name: 'AOK',
    //   title: 'Allgemeine Ortskrankenkassen',
    // },

    // {
    //   id: 16,
    //   image: i2,
    //   brand_name: 'AOK',
    //   title: 'Allgemeine Ortskrankenkassen',
    // },
  ];

  return (
    <div className="wide">
      <div className={styles.paymentInformation}>
        <div className="hb-mx-20">
          <div className="d-flex justify-content-between hb-my-28">
            <HBButtonSmall color="nightblue" onClick={() => history.goBack()}>
              <i className="hb-icon-arrow-left hb-icon-md" /> Zurück
            </HBButtonSmall>
          </div>
          <h3 className={styles.title}>Versicherung hinzufügen</h3>
        </div>
        <div className={styles.paymentInformationContent}>
          <div className="hb-card">
            <CRow>
              <CCol md={12}>
                <HBSearch
                  placeholder="Videos suchen"
                  //{...searchParams}
                  nightBlue
                />
              </CCol>
            </CRow>
            <CRow style={{ paddingTop: 20 }}>
              {data.map((item: any) => (
                <CCol
                  md={6}
                  key={item.id}
                  style={{ marginTop: 8 }}
                  onClick={() => history.push(`/mobility/payment-detail/${item.id}`)}
                >
                  <PaymentItem {...item} />
                </CCol>
              ))}
            </CRow>
            {/* {trainers.page !== 0 && trainers.loading && <Frame size="large" render={loadingSmall} />} */}
            {/* <Waypoint onEnter={loadMoreTrainers} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypePayment;
