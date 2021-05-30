import { configure, mount } from 'enzyme';
import { store } from '../../../../store';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import TreatmentQuestions from '../TreatmentQuestions';

configure({ adapter: new Adapter() });
const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>;

window.scrollTo = jest.fn();

describe('Test mobility saved has full fields', function () {
  let wrapper;

  const questions = {
    step: 1,
    steps: [
      {
        step: 1,
        questions: [
          {
            id: 4,
            question_title: 'Do you have pain?',
            question_type: 4,
            step_number: 1,
            answers: [
              {
                answer_title: 'Yes',
                description_answer: '',
                sub_questions: [
                  {
                    id: 5,
                    question_title: 'How bad is the pain? (on a scale of 1None0)',
                    question_type: 2,
                    step_number: 1,
                    answers: [
                      {
                        answer_title: 'Light to medium (1-7)',
                        description_answer: '',
                        sub_questions: [],
                      },
                      {
                        answer_title: 'Strong (8None0)',
                        description_answer: '',
                        sub_questions: [],
                      },
                    ],
                  },
                ],
              },
              {
                answer_title: 'No',
                description_answer: '',
                sub_questions: [],
              },
            ],
          },
          {
            id: 6,
            question_title: 'Do you have pen?',
            question_type: 3,
            step_number: 1,
            answers: [
              {
                answer_title: 'Yes',
                description_answer: '',
                sub_questions: [
                  {
                    id: 7,
                    question_title: 'Where my phone?',
                    question_type: 2,
                    step_number: 1,
                    answers: [
                      {
                        answer_title: 'there',
                        description_answer: '',
                        sub_questions: [],
                      },
                      {
                        answer_title: 'those',
                        description_answer: '',
                        sub_questions: [],
                      },
                    ],
                  },
                ],
              },
              {
                answer_title: 'No',
                description_answer: '',
                sub_questions: [],
              },
            ],
          },
          {
            id: 8,
            question_title: 'Do you play tennis?',
            question_type: 2,
            step_number: 1,
            answers: [
              {
                answer_title: 'Yes',
                description_answer: '',
                sub_questions: [
                  {
                    id: 9,
                    question_title: 'Where?',
                    question_type: 2,
                    step_number: 1,
                    answers: [
                      {
                        answer_title: 'there',
                        description_answer: '',
                        sub_questions: [],
                      },
                      {
                        answer_title: 'those',
                        description_answer: '',
                        sub_questions: [],
                      },
                    ],
                  },
                ],
              },
              {
                answer_title: 'No',
                description_answer: '',
                sub_questions: [],
              },
            ],
          },
        ],
      },
    ],
  };

  beforeEach(() => {
    wrapper = mount(
      <ReduxProvider>
        <TreatmentQuestions {...questions} />
      </ReduxProvider>,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Test survey than 1 tags div,h3', function () {
    expect(wrapper.find('div').length).toBe(29);
    expect(wrapper.find('h3').length).toBe(3);
  });
  it('Test survey render question', function () {
    expect(wrapper.find('input').length).toBe(6);
    expect(wrapper.find('label').length).toBe(6);
    expect(wrapper.text().includes(`${questions.steps.find((step) => step.question_title)}`)).toBe(false);
  });

  it('Test action click next and back', function () {
    expect(wrapper.find('button').length).toBe(2);
  });
});
