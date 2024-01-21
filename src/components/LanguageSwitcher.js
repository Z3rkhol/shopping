import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="language-switcher">
            <button className="flag-button flag-czech" onClick={() => changeLanguage('cs')} title="Čeština"></button>
            <button className="flag-button flag-english" onClick={() => changeLanguage('en')} title="English"></button>
        </div>
    );
};

export default LanguageSwitcher;