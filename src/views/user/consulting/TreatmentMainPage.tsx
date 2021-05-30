import React, { useState, useEffect } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { CCol, CRow, CButton, CContainer } from '@coreui/react';
import { useDispatch } from 'react-redux';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import config from '../../../config';
import Search from '../../../components/search/Search';
import StackGrid, { transitions } from 'react-stack-grid';
import TreatmentEmergenciesPage from './TreatmentEmergencies';
import { ls } from '../../../extensions';

const TreatmentMainPage: React.FC<RouteComponentProps> = (props) => {
  const { scaleDown } = transitions;
  const history = useHistory();
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));
  const [treatments, setTreatment] = useState<any>({ data: [{ title: '', list_diseases: [] }], loading: false });
  const [searchName, setSearchName] = useState('');
  const [searchSuggestionNames, setSearchSuggestionNames] = useState({ show: false, list_diseases: [] });
  const [step, setStep] = useState<number>(1);
  const [treatmentId, setTreatmentId] = useState('');

  const getAllTreatments = () => {
    callApi(
      {
        method: 'get',
        api: config.rest.getAllTreatments(),
        loading: true,
      },
      (response) => {
        const { data, status } = response;
        if (status === SUCCESS) {
          setTreatment({
            data: data.group_treatments,
            loading: false,
          });
        }
      },
    );
  };

  useEffect(() => {
    getAllTreatments();
  }, []);

  const getDiseasessNameSearch = (searchName: string) => {
    callApi(
      {
        method: 'get',
        api: config.rest.getSearchTreatments(searchName),
        loading: true,
      },
      (response) => {
        const { data, status } = response;
        if (status === SUCCESS) {
          if (status === SUCCESS && searchName.trim()) {
            setSearchSuggestionNames({ show: true, ...data });
          }
        }
      },
    );
  };
  const showSuggestionName = () => {
    if (searchSuggestionNames.list_diseases.length === 0)
      return <li className="list-group-item disabled">No Result</li>;
    return searchSuggestionNames.list_diseases.map((item: { id: string; tile: string }) => (
      <li className="list-group-item" key={item.id} onClick={() => setStep(2)}>
        <div className="btn-item" onClick={() => setStep(2)}>
          <i className="fas fa-user-nurse" style={{ fontSize: '1rem', marginRight: '20px' }}></i>
          <div className="treatment-item--title">{item.tile} </div>
        </div>
      </li>
    ));
  };

  const searchParams = {
    className: 'header-topic--wrapper__search--selection__world',
    searchName,
    setSearchName,
    dropdown: searchSuggestionNames.show ? (
      <div className="header-topic--wrapper__search--selection__suggestion">
        <ul className="list-group">{showSuggestionName()}</ul>
      </div>
    ) : null,
    callbackSearch: getDiseasessNameSearch,
    callbackEmpty: () => setSearchSuggestionNames({ show: false, list_diseases: [] }),
  };

  const TreatmentSelect = (
    <div className="treatment-main-page--wrapper">
      <CContainer>
        <div className="treatment-main-page__header">
          <h3 className="treatment-main-page__header--title">Our treatments</h3>
          <p className="treatment-main-page__header--content">
            Our doctors can treat almost anything that a traditional general practitioner would treat. If necessary, our
            doctors will provide you with prescriptions, sick notes and referrals
          </p>

          <Search {...searchParams} className="videos--saved__search" placeholder="Search treatment" />
        </div>
        <CRow>
          {treatments.data.length === 0
            ? 'No data'
            : treatments.data.map((treatment: any, index: number) => (
                <CCol key={index} md={4}>
                  <div className="treatment-list-item">
                    <h4 className="treatment-item--title">{treatment.title_treatments}</h4>
                    <StackGrid
                      columnWidth="100%"
                      appear={scaleDown.appear}
                      appeared={scaleDown.appeared}
                      enter={scaleDown.enter}
                      entered={scaleDown.entered}
                      leaved={scaleDown.leaved}
                      gutterHeight={15}
                    >
                      {treatment.list_diseases.map((disease: any) => (
                        <CButton
                          key={disease.id}
                          color="primary"
                          className="treatment-item--block"
                          onClick={() => {
                            setStep(2);
                            setTreatmentId(disease.id);
                            ls.set('treatmentTitle', disease.tile);
                          }}
                        >
                          <i className="fas fa-user-nurse" style={{ fontSize: '1rem' }}></i>
                          <div className="treatment-item--title">{disease.tile} </div>
                          <i className="fas fa-arrow-right"></i>
                        </CButton>
                      ))}
                    </StackGrid>
                  </div>
                </CCol>
              ))}
        </CRow>
      </CContainer>
    </div>
  );

  if (step === 1) {
    return TreatmentSelect;
  }

  return (
    <TreatmentEmergenciesPage
      back={() => setStep(1)}
      next={() => history.push(`/consulting/treatments/${treatmentId}`)}
    />
  );
};

export default TreatmentMainPage;
