import React from 'react';

interface Props {
  petrol?: boolean;
  onChange: any;
  value: any;
  type: string;
  placeholder: string;
  autoComplete: string;
  name: string;
}
const HBInput: React.FC<Props> = (props: any) => {
  const { petrol, onChange, value, name, type, placrholder, autoComplete } = props;

  return (
    <input
      type={type}
      className="hb-input"
      value={value}
      style={{ background: petrol ? 'var(--petrol-5)' : '#fff' }}
      onChange={onChange}
      placeholder={placrholder}
      autoComplete={autoComplete}
      name={name}
    />
  );
};
export default HBInput;
