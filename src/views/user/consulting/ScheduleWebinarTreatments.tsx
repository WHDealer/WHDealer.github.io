import React from 'react';
import { CModal, CModalBody, CModalHeader } from '@coreui/react';

interface Props {
  show: boolean;
  treatments: any;
  selectedTreatments: any;
  setSelectedTreatments: any;
  handleClose: any;
}

const ScheduleWebinarTreatments: React.FC<Props> = (props) => {
  const { show, treatments, selectedTreatments, setSelectedTreatments, handleClose } = props;

  const handleChange = (index: number) => {
    setSelectedTreatments((selectedTreatments: any) => {
      if (selectedTreatments.includes(index)) return selectedTreatments.filter((item: any) => item !== index);
      else return [...selectedTreatments, index];
    });
  };

  return (
    <CModal size="lg" style={{ height: '90vh' }} centered show={show} onClose={handleClose} closeOnBackdrop={false}>
      <CModalHeader closeButton>Treatments</CModalHeader>
      <CModalBody className="px-0 py-3" style={{ overflowY: 'auto', overflowX: 'hidden' }}>
        <div className="py-2 px-5">
          <h3 className="mb-3">Treatments</h3>
          {treatments.data.map((treatment: { id: string; tile: string; thumbnail: string }, index: number) => (
            <div key={treatment.id} className="d-flex justify-content-between p-2">
              <div>
                <img
                  className="mr-3"
                  alt="treatment-thumbnail"
                  style={{ width: 60, height: 40, borderRadius: 10 }}
                  src={treatment.thumbnail}
                />
                {treatment.tile}
              </div>
              <div>
                <input
                  style={{ width: 20, height: 20 }}
                  type="checkbox"
                  className="form-control"
                  checked={selectedTreatments.includes(index)}
                  onChange={() => handleChange(index)}
                />
              </div>
            </div>
          ))}
        </div>
      </CModalBody>
    </CModal>
  );
};

export default ScheduleWebinarTreatments;
