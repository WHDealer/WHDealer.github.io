import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { HBIcon, HBButton, HBButtonSmall } from './index';

const TestBaseClass: React.FC<RouteComponentProps> = () => {
  return (
    <div className="p-5">
      <div>
        <HBIcon name="newsfeed" filled={true} />
        <HBIcon name="newsfeed" filled={false} />
        <HBIcon name="mobility" filled={true} />
        <HBIcon name="mobility" filled={false} />
        <HBIcon name="consulting" filled={true} />
        <HBIcon name="consulting" filled={false} />
        <HBIcon name="activity" filled={true} />
        <HBIcon name="activity" filled={false} />
        <HBIcon name="profile" filled={true} />
        <HBIcon name="profile" filled={false} />
        <i className="hb-icon-planet" style={{ fontSize: 50, color: 'var(--violet-80)' }} />
        <i className="hb-icon-book" style={{ fontSize: 50, color: 'var(--primary)' }} />
        <i className="hb-icon-image-upload" style={{ fontSize: 50, color: 'var(--primary)' }} />
        <i className="hb-icon-award" style={{ fontSize: 50, color: 'var(--primary)' }} />
        <i className="hb-icon-planet" style={{ fontSize: 50, color: 'var(--primary)' }} />
        <i className="hb-icon-book" style={{ fontSize: 50, color: 'var(--primary)' }} />
        <i className="hb-icon-image-upload" style={{ fontSize: 50, color: 'var(--primary)' }} />
        <i className="hb-icon-award" style={{ fontSize: 50, color: 'var(--primary)' }} />
      </div>
      <HBButton className="m-2" color="violet" children="Click here" />
      <HBButton className="m-2" color="violet" disabled children="Click here" />
      <HBButton className="m-2" color="violet" outline children="Click here" />
      <HBButton className="m-2" color="violet" outline disabled children="Click here" />
      <HBButton className="m-2" color="petrol" children="Click here" />
      <HBButton className="m-2" color="petrol" disabled children="Click here" />
      <HBButton className="m-2" color="petrol" outline children="Click here" />
      <HBButton className="m-2" color="petrol" outline disabled children="Click here" />
      <HBButtonSmall color="violet">ASAD</HBButtonSmall>
      <HBButtonSmall color="violet" disabled>
        ASAD
      </HBButtonSmall>
    </div>
  );
};

export default TestBaseClass;
