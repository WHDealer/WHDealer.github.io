import React from 'react';
import styles from './Payment.module.scss';

interface Props {
  image: string;
  brand_name: string;
  title: string;
  id: string;
}
const PaymentItem: React.FC<Props> = (props: any) => {
  const { image, brand_name, title, id } = props;

  return (
    <div className={styles.paymentItems}>
      <div className={styles.paymentItemsWrapperLeft}>
        <div
          style={{
            backgroundImage: `url("${image}")`,
            backgroundSize: 'center',
            backgroundRepeat: 'no-repeat',
            width: 42,
            height: 42,
          }}
        ></div>
        <div className={styles.leftContent}>
          <div className={styles.brandName}>{brand_name}</div>
          <div className={styles.brandTitle}>{title}</div>
        </div>
      </div>
      <div className={styles.rightContent}>
        <i className="hb-icon-arrow-right" />
      </div>
    </div>
  );
};

export default PaymentItem;
