import React, { useState, useEffect, useRef } from 'react';
import styles from './Head.module.css';
import { Link } from 'react-router-dom';

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
        aboutTitle: "We manufacture and install various types of structures in Ukraine",
        aboustSubtitle: "Individually under your request build a house, restaurant, bathhouse, gazebo, barbecue or any other building.",
        aboutBtnFirst: "Go to the catalog of houses",
        aboutBtnSecond: "Catalog of baths",
        advantagesTitle: "Why choose us:",
        advantagestitleFirst: "Exclusive design",
        advantagestitleSecond: "Model development",
        advantagestitleThird: "Quality certificates",
        advantagestitleFourth: "Turnkey work",
        advantagessubTitleFirst: "Unparalleled in Ukraine",
        advantagessubTitleSecond: "Individual with 3D visualization in our application",
        advantagessubTitleThird: "Confirm our materials and components",
        advantagessubTitleFourth: "On average in X days from installation of the foundation to commissioning of the object"
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
        aboutTitle: "Виробляємо і встановлюємо будови різних видів в Україні",
        aboustSubtitle: "Індивідуально під ваш запит побудуємо будинок, ресторан, лазню, альтанку, барбекю або будь-яку іншу будівлю.",
        aboutBtnFirst: "Перейти в каталог будинків",
        aboutBtnSecond: "Каталог бань",
        advantagesTitle: "Чому обирають нас:",
        advantagestitleFirst: "Ексклюзивний дизайн",
        advantagestitleSecond: "Розробка моделі",
        advantagestitleThird: "Сертифікат якості",
        advantagestitleFourth: "Робота під ключ",
        advantagessubTitleFirst: "Який не має аналогів в Україні",
        advantagessubTitleSecond: "Індивідуальної за допомогою 3D-візуалізації в нашому додатку",
        advantagessubTitleThird: "Підтверджують наші матеріали та комплектуючі",
        advantagessubTitleFourth: "У середньому за Х днів від встановлення фундаменту до здачі об'єкта в експлуатацію"
    }
};

export const Head = ({ language, setLanguage, openFailedModal }) => {
    const [languageListVisible, setLanguageListVisible] = useState(false);
    const headerRef = useRef(null);
    const navRef = useRef(null);
    const aboutRef = useRef(null);
    const advantagesRef = useRef(null);

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
        if (aboutRef.current) observer.observe(aboutRef.current);
        if (advantagesRef.current) observer.observe(advantagesRef.current);

        return () => {
            if (headerRef.current) observer.unobserve(headerRef.current);
            if (navRef.current) observer.unobserve(navRef.current);
            if (aboutRef.current) observer.unobserve(aboutRef.current);
            if (advantagesRef.current) observer.unobserve(advantagesRef.current);
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
                            <img src="./assets/images/Telegram.png" alt="telegram" onClick={openFailedModal}/>
                            <img src="./assets/images/WhatsApp.png" alt="whatsapp" onClick={openFailedModal}/>
                            <img src="./assets/images/Viber.png" alt="viber" onClick={openFailedModal}/>
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
                                languageListVisible ? styles['visible'] : ''
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
                            <span className={styles['header-navbar__navigate-btn']}><Link to="/tokar/catalog" style={{color: "#fff"}}>{translations[language].residential}</Link></span>
                            <span className={styles['header-navbar__navigate-btn']} onClick={openFailedModal}>{translations[language].commercial}</span>
                            <span className={styles['header-navbar__navigate-btn']} onClick={openFailedModal}>{translations[language].garden}</span>
                        </div>
                        <div className={styles['header-navbar-navigate__right']}>
                            <span className={styles['header-navbar__navigate-nf']} onClick={openFailedModal}>{translations[language].about}</span>
                            <span className={styles['header-navbar__navigate-nf']} onClick={openFailedModal}>{translations[language].works}</span>
                            <span className={styles['header-navbar__navigate-nf']} onClick={openFailedModal}>{translations[language].contacts}</span>
                        </div>
                    </div>
                </div>
                <div className={styles['header-about']} ref={aboutRef}>
                    <div className={styles['header-about__left']}>
                        <h1 className={styles['header-about__title']}>{translations[language].aboutTitle}</h1>
                        <span className={styles['header-about__subtitle']}>{translations[language].aboustSubtitle}</span>
                        <div className={styles['header-about__buttons']}>
                            <Link to="/tokar/catalog"><a className={styles['header-about__btn-first']}>{translations[language].aboutBtnFirst}</a></Link>
                            <a className={styles['header-about__btn-second']} onClick={openFailedModal}>
                                <img src='./assets/images/right-arrow.png' alt='right-arrow'/>
                                {translations[language].aboutBtnSecond}
                            </a>
                        </div>
                    </div>
                    <div className={styles['header-about__right']}>
                        <img src='./assets/images/slider.png' alt='slider'/>
                    </div>
                </div>
                <div className={styles['header-advantages']} ref={advantagesRef}>
                    <div className={styles['header-advantages__container']}>
                        <h2 className={styles['advantages-container__title']}>{translations[language].advantagesTitle}</h2>
                        <div className={styles['advantages-container__items']}>
                            <div className={styles['advantages-container__item']}>
                                <img src='./assets/images/icon1.png' alt='item'/>
                                <span>{translations[language].advantagestitleFirst}</span>
                                <p>{translations[language].advantagessubTitleFirst}</p>
                            </div>
                            <div className={styles['advantages-container__item']}>
                                <img src='./assets/images/icon2.png' alt='item'/>
                                <span>{translations[language].advantagestitleSecond}</span>
                                <p>{translations[language].advantagessubTitleSecond}</p>
                            </div>
                            <div className={styles['advantages-container__item']}>
                                <img src='./assets/images/icon3.png' alt='item'/>
                                <span>{translations[language].advantagestitleThird}</span>
                                <p>{translations[language].advantagessubTitleThird}</p>
                            </div>
                            <div className={styles['advantages-container__item']}>
                                <img src='./assets/images/icon4.png' alt='item'/>
                                <span>{translations[language].advantagestitleFourth}</span>
                                <p>{translations[language].advantagessubTitleFourth}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};