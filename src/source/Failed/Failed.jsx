import React, { useEffect, useState } from 'react';
import styles from './Failed.module.css';

const translations = {
  en: {
    failedText: "Unfortunately, this feature is still under development!",
    failedBtn: "Close"
  },
  ua: {
    failedText: "На жаль, ця функція все ще перебуває на стадії розробки!",
    failedBtn: "Закрити"
  }
};

const Failed = ({ isOpen, onClose, language }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`${styles['modal-backdrop']} ${isOpen ? styles.open : styles.close}`}>
      <div className={`${styles['modal-content']} ${isOpen ? styles.open : styles.close}`} onClick={(e) => e.stopPropagation()}>
        <img src="./assets/images/fail.png" alt="Failed" />
        <p>{translations[language]?.failedText || translations.en.failedText}</p>
        <button className={styles['close-button']} onClick={onClose}>
          {translations[language]?.failedBtn || translations.en.failedBtn}
        </button>
      </div>
    </div>
  );
};

export default Failed;