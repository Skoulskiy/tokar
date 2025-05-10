import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const translations = {
  en: {
    title: "TokarCompany - manufacturing and construction company",
    contact: "Contact directly:",
    callHours: "09:00 to 18:00 (Mon-Fri)",
    callBtn: "Book a call",
    callNote: "Free of charge in Ukraine",
    residential: "Residential",
    commercial: "Commercial",
    garden: "Garden",
    about: "About the company",
    works: "Our works",
    contacts: "Contacts",
  },
  ua: {
    title: "TokarCompany — виробнича та будівельна компанія",
    contact: "Зв'яжіться з нами:",
    callHours: "09:00 до 18:00 (Пн-Пт)",
    callBtn: "Замовити дзвінок",
    callNote: "Безкоштовно по Україні",
    residential: "Жиле",
    commercial: "Комерційне",
    garden: "Город",
    about: "Про компанію",
    works: "Наші роботи",
    contacts: "Контакти",
  }
};

const Header = ({ language, setLanguage, openFailedModal }) => {
  const [languageListVisible, setLanguageListVisible] = useState(false);
  const headerRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (headerRef.current) observer.observe(headerRef.current);
    if (navRef.current) observer.observe(navRef.current);

    return () => {
      if (headerRef.current) observer.unobserve(headerRef.current);
      if (navRef.current) observer.unobserve(navRef.current);
    };
  }, []);

  return (
    <div className={styles.header}>
      <div className="container">
        <header className={styles['header-container']} ref={headerRef}>
          <img src="./assets/images/logo.png" alt="logo" />
          <span className={styles['header-title']}>
            {translations[language].title}
          </span>
          <div className={styles['header-contact']}>
            <p>{translations[language].contact}</p>
            <div className={styles['header-social']}>
              <img src="./assets/images/Telegram.png" alt="telegram" onClick={openFailedModal} />
              <img src="./assets/images/WhatsApp.png" alt="whatsapp" onClick={openFailedModal} />
              <img src="./assets/images/Viber.png" alt="viber" onClick={openFailedModal} />
            </div>
          </div>
          <div className={styles['header-call']}>
            <div className={styles['header-call__left']}>
              <p>+380 (67) 175 56 30</p>
              <span>{translations[language].callHours}</span>
            </div>
            <div className={styles['header-call__right']}>
              <a onClick={openFailedModal}>{translations[language].callBtn}</a>
              <span>{translations[language].callNote}</span>
            </div>
          </div>
          <div className={styles['header-language']}>
            <span
              className={styles['header-language__selecter']}
              onClick={() => setLanguageListVisible(!languageListVisible)}
            >
              <img
                src={`./assets/images/${language}.png`}
                alt={language}
                className={styles['header-language__current']}
              />
              <img src="./assets/images/bottom-arrow.png" alt="bottom-arrow" />
            </span>
            <div
              className={`${styles['header-language__list']} ${
                languageListVisible ? styles.visible : ''
              }`}
            >
              {['en', 'ua']
                .filter((lang) => lang !== language)
                .map((lang) => (
                  <img
                    key={lang}
                    src={`./assets/images/${lang}.png`}
                    alt={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setLanguageListVisible(false);
                    }}
                  />
                ))}
            </div>
          </div>
        </header>
        <div className={styles['header-navigation']} ref={navRef}>
          <div className={styles['header-navbar']}>
            <div className={styles['header-navbar__navigate']}>
              <span className={styles['header-navbar__navigate-btn']}>
                <Link to="/catalog" style={{color: '#fff'}}>{translations[language].residential}</Link>
              </span>
              <span className={styles['header-navbar__navigate-btn']} onClick={openFailedModal}>
                {translations[language].commercial}
              </span>
              <span className={styles['header-navbar__navigate-btn']} onClick={openFailedModal}>
                {translations[language].garden}
              </span>
            </div>
            <div className={styles['header-navbar-navigate__right']}>
              <span className={styles['header-navbar__navigate-nf']} onClick={openFailedModal}>
                {translations[language].about}
              </span>
              <span className={styles['header-navbar__navigate-nf']} onClick={openFailedModal}>
                {translations[language].works}
              </span>
              <span className={styles['header-navbar__navigate-nf']} onClick={openFailedModal}>
                {translations[language].contacts}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;