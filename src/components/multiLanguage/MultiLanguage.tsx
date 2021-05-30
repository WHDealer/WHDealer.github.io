import i18n from 'i18next';
import React, { useEffect, useState } from 'react';
import flagEn from './flag_en.png';
import flagDe from './flag_de.png';
import { ls } from '../../extensions';
import { useSelector } from 'react-redux';

const MultiLanguage: React.FC = () => {
  let lang = ls.get('lang');
  if (!['en', 'de'].includes(lang)) lang = i18n.language;
  const [currentLanguage, setCurrentLanguage] = useState(lang);

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
    ls.set('lang', currentLanguage);
  }, [currentLanguage]);

  const groupName = useSelector((state: any) => state.auth?.group_name);

  if (groupName && groupName.includes('admin')) return <div />;

  return (
    <div
      style={{
        position: 'fixed',
        top: 16,
        right: 160,
        cursor: 'pointer',
        zIndex: 1040,
        borderRadius: 5,
        overflow: 'hidden',
        boxShadow: '3px 3px 10px 0 rgba(0, 0, 0, 0.2)',
      }}
    >
      <img
        src={currentLanguage === 'en' ? flagEn : flagDe}
        style={{ width: 30, height: 20 }}
        alt="lang"
        onClick={() => setCurrentLanguage(currentLanguage === 'en' ? 'de' : 'en')}
      />
    </div>
  );
};

export default MultiLanguage;
