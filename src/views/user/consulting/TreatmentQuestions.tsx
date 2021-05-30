import React, { useRef, useState } from 'react';
import { CButton, CForm, CInput } from '@coreui/react';

interface Props {
  step: any;
  steps: any;
  back: any;
  next: any;
  answers: any;
  setAnswers: any;
}

const RecursionSubQuestion = ({ questionTreatment, answers, setAnswers }: any) => {
  const index = useRef(answers?.findIndex((answer: any) => answer.question_id === questionTreatment.id));
  const [value, setValue] = useState(index.current > -1 ? answers[index.current]?.answer_title : '');

  const handleSave = (question: any, value: any) => {
    setAnswers((answers: any) => {
      let newArr = [...answers];
      const index = answers?.findIndex((answer: any) => answer.question_id === question.id);
      if (index === -1)
        return [...answers, { question_id: question.id, question_title: question.question_title, answer_title: value }];
      newArr[index] = { question_id: question.id, question_title: question.question_title, answer_title: value };
      return newArr;
    });
  };

  const renderInput = (question: any) => {
    if (question.question_type === 1) {
      return (
        <div>
          <div style={{ marginTop: 8 }}>
            <div className="d-flex">
              <CInput
                className="form-control"
                onChange={(e: any) => {
                  setValue(e.target.value);
                  handleSave(question, e.target.value);
                }}
                maxLength={200}
                placeholder="Please specify"
                value={value}
                required={question.required === 1}
              />
            </div>
          </div>
        </div>
      );
    }

    if (question.question_type === 2) {
      return (
        <div>
          {question.answers.map((answer: any, index: number) => (
            <div key={index} style={{ marginTop: 8 }}>
              <div className="d-flex">
                <input
                  type="radio"
                  onChange={(e: any) => {
                    setValue(answer.answer_title);
                    handleSave(question, answer.answer_title);
                  }}
                  checked={answer.answer_title === value}
                  name={question.id}
                  className="form-control"
                  required={question.required === 1}
                />
                <label>{answer.answer_title}</label>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (question.question_type === 4) {
      return (
        <div className="d-flex">
          {question.answers.map((answer: any, index: number) => (
            <div key={index} className="mx-3">
              <div className="d-flex">
                <input
                  type="radio"
                  onChange={() => {
                    setValue(answer.answer_title);
                    handleSave(question, answer.answer_title);
                  }}
                  checked={answer.answer_title === value}
                  name={question.id}
                  style={{ width: 30 }}
                  className="form-control mr-2"
                  required={question.required === 1}
                />
                <label>{answer.answer_title}</label>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div>
        {question.answers.map((answer: any, index: any) => (
          <div key={index} style={{ marginTop: 8 }}>
            <div className="d-flex">
              <input
                className="form-control"
                style={{ fontSize: 5, maxWidth: 60 }}
                type="checkbox"
                name={question.id}
                onChange={() => {
                  setValue(
                    value.includes(answer.answer_title)
                      ? value.replace(answer.answer_title, '')
                      : value + answer.answer_title,
                  );
                  handleSave(question, answer.answer_title);
                }}
                checked={value.includes(answer.answer_title)}
              />
              <label>{answer.answer_title}</label>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ marginBottom: 40 }}>
      <div>
        <h3 style={{ marginBottom: 20, marginTop: 20 }}>{questionTreatment.question_title} </h3>
        {renderInput(questionTreatment)}
        {questionTreatment.answers.map((answer: any, index: number) => (
          <div key={index}>
            {value.includes(answer.answer_title) && (
              <div>
                {answer.sub_questions.map((question: any) => (
                  <RecursionSubQuestion
                    key={question.id}
                    questionTreatment={question}
                    answers={answers}
                    setAnswers={setAnswers}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const TreatmentQuestions: React.FC<Props> = (props) => {
  const { step, steps, back, next, answers, setAnswers } = props;
  const questions = steps[step - 1].questions;

  const nextStep = (e: any) => {
    e.preventDefault();
    next();
  };

  return (
    <div style={{ padding: '10px 40px' }}>
      <CForm onSubmit={nextStep}>
        {questions.map((question: any) => (
          <RecursionSubQuestion
            key={question.id}
            questionTreatment={question}
            answers={answers}
            setAnswers={setAnswers}
          />
        ))}

        <div className="d-flex justify-content-evenly my-5">
          <CButton style={{ width: 100 }} variant="outline" color="primary" onClick={back}>
            Back
          </CButton>
          <CButton style={{ width: 100 }} variant="outline" color="primary" type="submit">
            Continue
          </CButton>
        </div>
      </CForm>
    </div>
  );
};

export default TreatmentQuestions;
