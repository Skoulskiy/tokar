import React from 'react';
import styles from './NotFound.module.css';

const translations = {
  en: {
    title: "Page Not Found",
    message: "Sorry, the page you are looking for does not exist.",
    back: "Back to Home"
  },
  ua: {
    title: "Сторінку не знайдено",
    message: "Вибачте, сторінка, яку ви шукаєте, не існує.",
    back: "Повернутися на головну"
  }
};

const NotFound = ({ language }) => {
  return (
    <div className={styles.container}>
      <h1>{translations[language]?.title || translations.en.title}</h1>
      <p>{translations[language]?.message || translations.en.message}</p>
      <a href="/" className={styles.backLink}>
        {translations[language]?.back || translations.en.back}
      </a>
    </div>
  );
};

export default NotFound;