import { CHeader } from '@coreui/react';
import React from 'react';
import { logoMain } from '../../../extensions';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  return <CHeader className={styles.header}>{logoMain}</CHeader>;
};

export default Header;
