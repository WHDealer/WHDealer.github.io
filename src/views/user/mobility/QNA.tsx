import React, { useState } from 'react';
import { HBButtonSmall } from '../../../hbBaseClass';
import './QNA.scss';

interface Props {
  handleClose: any;
}

const QNA: React.FC<Props> = (props) => {
  const { handleClose } = props;

  const [qnaData, setQnaData] = useState([
    {
      id: '1',
      title: 'Wie kann ich die Intensität der Übung steigern?',
      content: [
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo.',
      ],
      show: true,
    },
    {
      id: '2',
      title: 'Wie kann ich die Intensität der Übung steigern?',
      content: [
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo.',
      ],
      show: false,
    },
    {
      id: '3',
      title: 'Wie kann ich die Intensität der Übung steigern?',
      content: [
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo.',
      ],
      show: false,
    },
    {
      id: '4',
      title: 'Wie kann ich die Intensität der Übung steigern?',
      content: [
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo.',
      ],
      show: false,
    },
  ]);

  const handleChange = (index: number) => {
    const newQna = [...qnaData];
    newQna[index].show = !newQna[index].show;
    setQnaData(newQna);
  };

  return (
    <div className="hb-wrapper">
      <div className="hb-mx-20">
        <div className="hb-my-28">
          <HBButtonSmall
            color="nightblue"
            onClick={() => {
              handleClose();
              window.scrollTo(0, 0);
            }}
          >
            <i className="hb-icon-arrow-left hb-icon-md" /> Zurück
          </HBButtonSmall>
        </div>
        <div className="hb-title hb-qna-title">Häufige Fragen zum Video</div>
      </div>
      <div className="hb-mx-20 hb-qna-contentWrapper">
        <div className="hb-qna-card">
          {qnaData.map((item, index) => (
            <div key={item.id} style={{ marginTop: index === 0 ? 0 : 16 }}>
              <div
                className="hb-qna-item-header"
                style={{ borderRadius: item.show ? '24px 24px 0 0' : 24 }}
                onClick={() => handleChange(index)}
              >
                <span>{item.title} </span>
                <i
                  className="hb-icon-angle-down"
                  style={{ transform: `rotate(${item.show ? -180 : 0}deg)`, fontSize: 8, height: 9 }}
                />
              </div>
              {item.show && (
                <div className="hb-qna-item-wrapper">
                  {item.content.map((text, index1) => (
                    <div key={index1} className="hb-qna-content" style={{ marginTop: index1 === 0 ? 0 : 10 }}>
                      {text}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QNA;
