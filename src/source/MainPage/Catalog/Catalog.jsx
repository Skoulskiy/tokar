import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import styles from './Catalog.module.css';

const translations = {
  en: {
    title: 'Project Catalog',
    section1: 'Residential',
    section2: 'Commercial',
    section3: 'Garden',
    desc1: 'Section with houses, cottages, villas, estates, and mansions',
    desc2: 'Section with resorts, hotels, restaurants, cafes, and shops',
    desc3: 'Section with saunas, gazebos, pavilions, garages, kitchens, platforms, barbecue areas, and BBQ zones',
    aboutBtn: 'Explore Projects',
  },
  ua: {
    title: 'Каталог проектів',
    section1: 'Житлове',
    section2: 'Комерційне',
    section3: 'Садове',
    desc1: 'Розділ з будинками, дачами, котеджами, віллами, садибами та особняками',
    desc2: 'Розділ з базами відпочинку, готелями, ресторанами, кафе та магазинами',
    desc3: 'Розділ з банями, бесідками, альтанками, гаражами, кухнями, майданчиками, мангальними зонами та зонами барбекю',
    aboutBtn: 'Ознайомитися з проєктами',
  },
};

const Catalog = ({ language = 'en', openFailedModal }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [item1Ref, item1InView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [item2Ref, item2InView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [item3Ref, item3InView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const selectedLanguage = translations[language] ? language : 'en';
  const itemInViews = [item1InView, item2InView, item3InView];
  const itemRefs = [item1Ref, item2Ref, item3Ref];

  const catalogItems = [
    { section: 'section1', desc: 'desc1', image: './assets/images/catalog1.png' },
    { section: 'section2', desc: 'desc2', image: './assets/images/catalog2.png' },
    { section: 'section3', desc: 'desc3', image: './assets/images/catalog3.png', isThird: true },
  ];

  return (
    <div ref={ref} className={`${styles['catalog']} ${inView ? styles['visible'] : ''}`}>
      <div className={styles['container']}>
        <div className={styles['catalog-container']}>
          <h2
            ref={titleRef}
            className={`${styles['catalog-title']} ${titleInView ? styles['visible'] : ''}`}
          >
            {translations[selectedLanguage].title}
          </h2>
          <div className={styles['catalog-grid']}>
            {catalogItems.map((item, index) => (
              <div
                key={item.section}
                ref={itemRefs[index]}
                className={`${styles['catalog-item']} ${itemInViews[index] ? styles['visible'] : ''}`}
              >
                {item.isThird ? (
                  <>
                    <div>
                      <h3>{translations[selectedLanguage][item.section]}</h3>
                      <p>{translations[selectedLanguage][item.desc]}</p>
                       <Link to="/tokar/catalog"><a className={styles['catalog-btn']} >
                        <img src="./assets/images/right-arrow.png" alt="right-arrow" />
                        {translations[selectedLanguage].aboutBtn}
                      </a></Link>
                    </div>
                    <img
                      src={item.image}
                      style={{ height: '310px' }}
                      alt={translations[selectedLanguage][item.section]}
                      className={styles['catalog-item__img']}
                    />
                  </>
                ) : (
                  <>
                    <img
                      src={item.image}
                      alt={translations[selectedLanguage][item.section]}
                      className={styles['catalog-item__img']}
                    />
                    <h3>{translations[selectedLanguage][item.section]}</h3>
                    <p>{translations[selectedLanguage][item.desc]}</p>
                    <Link to="/tokar/catalog"><a className={styles['catalog-btn']} >
                        <img src="./assets/images/right-arrow.png" alt="right-arrow" />
                        {translations[selectedLanguage].aboutBtn}
                      </a></Link>
                  </>
                )}
              </div>
            ))}
          </div>
          <img
            src="./assets/images/catalog-bg.png"
            alt="Catalog background"
            className={`${styles['catalog-bg']} ${inView ? styles['visible'] : ''}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Catalog;