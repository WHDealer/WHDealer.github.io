import React, { useEffect, useState } from 'react';
import './ProgressLine.css';

const ProgressLine = ({
  backgroundColor = '#e5e5e5',
  visualParts = [
    {
      id: '1',
      percentage: '0%',
      color: 'white',
    },
  ],
}: any) => {
  const [widths, setWidths] = useState(
    visualParts.map(() => {
      return 0;
    }),
  );

  useEffect(() => {
    requestAnimationFrame(() => {
      setWidths(
        visualParts.map((item: any) => {
          return item.percentage;
        }),
      );
    });
  }, [visualParts]);

  return (
    <>
      <div
        className="progressVisualFull"
        style={{
          backgroundColor,
        }}
      >
        {visualParts.map((item: any, index: number) => {
          return (
            <div
              key={item.id}
              style={{
                width: widths[index],
                backgroundColor: item.color,
              }}
              className="progressVisualPart"
            />
          );
        })}
      </div>
    </>
  );
};

export default ProgressLine;
