import React, { useEffect, useRef } from 'react';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';

const translations = {
  en: {
    residential: "Residential",
    commercial: "Commercial",
    garden: "Garden",
    about: "About the company",
    works: "Our works",
    bookCall: "Book a call",
    clients: "Houses",
    company: "Commercial Buildings",
    vacancies: "Additional Structures",
    profiledTimberHouses: "Profiled Timber Houses",
    cylindricalTimberHouses: "Cylindrical Timber Houses",
    frameHouses: "Frame Houses",
    blockHouses: "Block Houses",
    restBases: "Rest Bases",
    hotels: "Hotels",
    restaurants: "Restaurants",
    cafes: "Cafes",
    shops: "Shops",
    woodenBaths: "Wooden Baths",
    gazebos: "Gazebos",
    arbors: "Arbors",
    playgrounds: "Children's Playgrounds",
    garages: "Garages",
    woodenPlayhouses: "Wooden Children's Playhouses",
    barbecueZones: "Barbecue Zones",
    kitchens: "Kitchens",
    title: "TokarCompany - manufacturing and construction company",
    contact: "Contact directly:",
    callHours: "09:00 to 18:00 (Mon-Fri)",
    rights: "© 2025. All rights reserved. TokarCompany - Production and construction company. The information provided on the website is not a public offer."
  },
  ua: {
    residential: "Жиле",
    commercial: "Комерційне",
    garden: "Город",
    about: "Про компанію",
    works: "Наші роботи",
    bookCall: "Замовити дзвінок",
    clients: "Будинки",
    company: "Комерційні будівлі",
    vacancies: "Додаткові споруди",
    profiledTimberHouses: "Дома из профилированного бруса",
    cylindricalTimberHouses: "Дома из оцилиндрованного бруса",
    frameHouses: "Каркасные дома",
    blockHouses: "Дома из блока",
    restBases: "Базы отдыха",
    hotels: "Гостинницы",
    restaurants: "Рестораны",
    cafes: "Кафе",
    shops: "Магазины",
    woodenBaths: "Деревянные бани",
    gazebos: "Беседки",
    arbors: "Альтанки",
    playgrounds: "Детские игровые площадки",
    garages: "Гаражи",
    woodenPlayhouses: "Деревянные детские домики",
    barbecueZones: "Мангальные зоны и барбекю",
    kitchens: "Кухни",
    title: "TokarCompany — виробнича та будівельна компанія",
    contact: "Зв'яжіться з нами:",
    callHours: "09:00 до 18:00 (Пн-Пт)",
    rights: "© 2025. Усі права захищені. TokarCompany - Виробничо-будівельна компанія. Інформація, представлена на сайті, не є публічною офертою."
  }
};

const Footer = ({ language, openFailedModal }) => {
  const menuItems = {
    clients: ['profiledTimberHouses', 'cylindricalTimberHouses', 'frameHouses', 'blockHouses'],
    company: ['restBases', 'hotels', 'restaurants', 'cafes', 'shops'],
    vacancies: ['woodenBaths', 'gazebos', 'arbors', 'playgrounds', 'garages', 'woodenPlayhouses', 'barbecueZones', 'kitchens']
  };

  const footerRef = useRef(null);
  const navRef = useRef(null);
  const bottomRef = useRef(null);

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

    if (footerRef.current) observer.observe(footerRef.current);
    if (navRef.current) observer.observe(navRef.current);
    if (bottomRef.current) observer.observe(bottomRef.current);

    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current);
      if (navRef.current) observer.unobserve(navRef.current);
      if (bottomRef.current) observer.unobserve(bottomRef.current);
    };
  }, []);

  return (
    <div ref={footerRef} className={styles['footer']}>
      <div className="container">
        <div ref={navRef} className={styles['footer-navigation']}>
          <div className={styles['footer-navbar']}>
            <div className={styles['footer-navbar__navigate']}>
              <span className={styles['footer-navbar__navigate-btn']}><Link to="/tokar/catalog" style={{color: "#fff"}}>{translations[language].residential}</Link></span>
              <span className={styles['footer-navbar__navigate-btn']} onClick={openFailedModal}>{translations[language].commercial}</span>
              <span className={styles['footer-navbar__navigate-btn']} onClick={openFailedModal}>{translations[language].garden}</span>
            </div>
            <div className={styles['footer-navbar-navigate__right']}>
              <span className={styles['footer-navbar__navigate-nf']} onClick={openFailedModal}>{translations[language].about}</span>
              <span className={styles['footer-navbar__navigate-nf']} onClick={openFailedModal}>{translations[language].works}</span>
              <div>
                <a onClick={openFailedModal} className={styles['footer-book__call']}>{translations[language].bookCall}</a>
              </div>
            </div>
          </div>
          <div ref={bottomRef} className={styles['footer-nav__bottom']}>
            <div className={styles['footer-list__left']}>
              <div className={styles['footer-list']}>
                {menuItems.clients.map((item) => (
                  <p key={item} onClick={openFailedModal}>{translations[language][item]}</p>
                ))}
              </div>
              <div className={styles['footer-list']}>
                {menuItems.company.map((item) => (
                  <p key={item} onClick={openFailedModal}>{translations[language][item]}</p>
                ))}
              </div>
              <div className={styles['footer-list']}>
                {menuItems.vacancies.map((item) => (
                  <p key={item} onClick={openFailedModal}>{translations[language][item]}</p>
                ))}
              </div>
            </div>
            <div className={styles['footer-list__right']}>
              <div className={styles['footer-logo']}>
                <img src="./assets/images/logo.png" alt="logo" />
                <span className={styles['footer-title']}>
                  {translations[language].title}
                </span>
              </div>
              <div className={styles['footer-contact']}>
                <p>{translations[language].contact}</p>
                <div className={styles['footer-social']}>
                  <img src="./assets/images/Telegram.png" alt="telegram" />
                  <img src="./assets/images/WhatsApp.png" alt="whatsapp" />
                  <img src="./assets/images/Viber.png" alt="viber" />
                </div>
              </div>
              <div className={styles['footer-call__left']}>
                <p>+380 (67) 175 56 30</p>
                <span>{translations[language].callHours}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr style={{ borderColor: 'rgba(231, 216, 199, 1)' }} />
      <div className={styles['footer-bottom']}>
        <span>{translations[language].rights}</span>
      </div>
    </div>
  );
};

export default Footer;