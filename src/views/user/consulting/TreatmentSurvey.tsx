import React, { useState, useEffect } from 'react';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import config from '../../../config';
import { useDispatch } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import TreatmentForWhom from './TreatmentForWhom';
import TreatmentQuestions from './TreatmentQuestions';
import BookAppointment from './BookAppointment';
import EnterInformation from './EnterInformation';
import TreatmentOverview from './TreatmentOverview';
import BookSuccessfully from './BookSuccessfully';
import ProgressLine from '../../../components/progressLine/ProgressLine';
import { addUserLS } from '../../../utils';
import { updateProfile } from '../../../store/auth/actions';

const TreatmentSurvey: React.FC<RouteComponentProps> = (props) => {
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));
  const history = useHistory();
  const params: any = props.match?.params;
  const treatmentId = params?.id;
  const [toMe, setToMe] = useState(false);
  const [nurses, setNurses] = useState<any>({
    data: [],
    loading: true,
    full: false,
    page: 0,
  });
  const [book, setBook] = useState<any>({
    nurse: null,
    appointment_time_begin: null,
    appointment_time_end: null,
  });
  const [info, setInfo] = useState<any>({
    gender: '',
    first_name: '',
    last_name: '',
    date_of_birth: '',
    phone: '',
    street: '',
    no: '',
    post_code: '',
    place: '',
  });
  const [answers, setAnswers] = useState<{ question_id: string; question_title: string; answer_title: string }[]>([]);
  const [steps, setSteps] = useState<any>({
    loading: true,
    data: {},
  });
  const [step, setStep] = useState<any>('for-whom');
  const length = steps.data.length;

  let newStep = 1;
  const fullSteps = 1 + length + 4;

  const getNurses = (name: string) => {
    callApi(
      {
        method: 'get',
        api: config.rest.getNurses(name, nurses.page, 10),
        loading: !steps.loading,
      },
      (response) => {
        const { data, status } = response;
        if (status) {
          setNurses({
            ...nurses,
            data: data.nurses,
            loading: false,
          });
        } else {
          setNurses({
            ...nurses,
            loading: false,
          });
        }
      },
    );
  };

  const getSurveys = (id: any) => {
    callApi(
      {
        method: 'get',
        api: config.rest.getSurveys(id),
        loading: true,
      },
      (response) => {
        const { data, status } = response;
        if (status === SUCCESS) {
          setSteps({
            data: data.steps,
            loading: false,
          });
        }
      },
    );
  };

  const sendData = () => {
    const body = {
      result_survey: { questions: answers },
      appointment_time_begin: book.appointment_time_begin,
      appointment_time_end: book.appointment_time_end,
      request_nurses_id: book.nurse || '',
      selected_treatments_id: treatmentId,
      customer_gender: info.gender === 'male' ? 0 : info.gender === 'female' ? 1 : 2,
      first_name: info.first_name,
      last_name: info.last_name,
      birthday: info.date_of_birth,
      phone_number: info.phone,
      street: info.street,
      postcode: info.post_code,
      no: info.no,
      place: info.place,
      is_me: toMe ? 1 : 0,
    };
    callApi({ method: 'post', api: config.rest.createAppointment(), body: body, loading: true }, (response: any) => {
      const { status } = response;
      if (status === SUCCESS) {
        setStep('book-successfully');
        if (toMe) {
          const user = {
            gender: info.gender,
            birthday: info.date_of_birth,
            mobile: info.phone,
            street: info.street,
            no: info.no,
            place: info.place,
            postcode: info.post_code,
          };
          addUserLS(user);
          dispatch(updateProfile(user));
        }
      }
    });
  };

  useEffect(() => {
    getSurveys(treatmentId);
    getNurses('');
  }, []);

  if (steps.loading) return <div />;

  if (length === 0) return <h3>Error</h3>;

  let render = <div />;

  if (!steps.loading)
    switch (step) {
      case 'for-whom': {
        render = (
          <TreatmentForWhom
            setToMe={setToMe}
            next={() => {
              setStep(1);
            }}
            back={() => history.push('/consulting/treatments')}
          />
        );
        newStep = 1;
        break;
      }

      case 'book-appointment': {
        render = (
          <BookAppointment
            nurses={nurses}
            getNurses={getNurses}
            book={book}
            setBook={setBook}
            next={() => setStep('enter-info')}
            back={() => setStep(length)}
          />
        );
        newStep = 1 + length + 1;
        break;
      }

      case 'enter-info': {
        render = (
          <EnterInformation
            info={info}
            setInfo={setInfo}
            toMe={toMe}
            next={() => setStep('overview')}
            back={() => setStep('book-appointment')}
          />
        );
        newStep = 1 + length + 2;
        break;
      }

      case 'overview': {
        render = (
          <TreatmentOverview
            sendData={sendData}
            book={book}
            info={info}
            setStep={setStep}
            back={() => setStep('enter-info')}
          />
        );
        newStep = 1 + length + 3;
        break;
      }

      case 'book-successfully': {
        render = <BookSuccessfully />;
        newStep = 1 + length + 4;
        break;
      }

      default:
        render = (
          <TreatmentQuestions
            step={step}
            steps={steps.data}
            next={() => (step === length ? setStep('book-appointment') : setStep(step + 1))}
            back={() => (step === 1 ? setStep('for-whom') : setStep(step - 1))}
            answers={answers}
            setAnswers={setAnswers}
          />
        );
        newStep = 1 + step;
        break;
    }

  return (
    <div style={{ flex: 1 }}>
      <ProgressLine
        backgroundColor="transparent"
        visualParts={[
          {
            id: '1',
            percentage: `${Math.floor((newStep * 100) / fullSteps)}%`,
            color: 'var(--primary)',
          },
        ]}
      />
      <div className="treatment-step-wrapper">{render}</div>
    </div>
  );
};

export default TreatmentSurvey;
