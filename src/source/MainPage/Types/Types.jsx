import React from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './Types.module.css';

const translations = {
  en: {
    title: "We distinguish between 3 types of buildings",
    residential: {
      title: "Residential Buildings",
      items: [
        "Houses from profiled timber",
        "Houses from rounded logs",
        "Frame houses",
        "Block houses"
      ]
    },
    commercial: {
      title: "Commercial Buildings",
      items: [
        "Recreation bases",
        "Hotels",
        "Restaurants",
        "Cafes",
        "Shops"
      ]
    },
    garden: {
      title: "Garden and Utility",
      items: [
        "Wooden saunas",
        "Gazebos",
        "Arbors",
        "Children's playgrounds",
        "Garages",
        "Wooden children's houses",
        "Barbecue and grill areas",
        "Kitchens"
      ]
    }
  },
  ua: {
    title: "Ми поділяємо 3 види будівель",
    residential: {
      title: "Житлові будівлі",
      items: [
        "Будинки з профільованого бруса",
        "Будинки з оциліндрованого бруса",
        "Каркасні будинки",
        "Будинки з блоку"
      ]
    },
    commercial: {
      title: "Комерційні",
      items: [
        "Бази відпочинку",
        "Готелі",
        "Ресторани",
        "Кафе",
        "Магазини"
      ]
    },
    garden: {
      title: "Садові та господарські",
      items: [
        "Дерев'яні бані",
        "Бесідки",
        "Альтанки",
        "Дитячі ігрові майданчики",
        "Гаражі",
        "Дерев'яні дитячі будиночки",
        "Мангальні зони та барбекю",
        "Кухні"
      ]
    }
  }
};

const buildingTypes = [
  { key: 'residential', image: './assets/images/types1.png' },
  { key: 'commercial', image: './assets/images/types2.png' },
  { key: 'garden', image: './assets/images/types3.png' }
];

const Types = ({ language }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [item1Ref, item1InView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [item2Ref, item2InView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [item3Ref, item3InView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const itemRefs = [item1Ref, item2Ref, item3Ref];
  const itemInViews = [item1InView, item2InView, item3InView];

  return (
    <div ref={ref} className={`${styles['types']} ${inView ? styles['visible'] : ''}`}>
      <div className="container">
        <h2 className={styles['title']}>{translations[language].title}</h2>
        <div className={styles['type-wrapper']}>
          {buildingTypes.map((type, index) => (
            <div
              key={type.key}
              ref={itemRefs[index]}
              className={`${styles['type-item']} ${itemInViews[index] ? styles['visible'] : ''}`}
            >
              <img src={type.image} alt={`${translations[language][type.key].title} photo`} />
              <h3 className={styles['type-item__title']} style={{padding: '0 40px'}}>{translations[language][type.key].title}</h3>
              <div className={styles['type-item__list']}>
                {translations[language][type.key].items.map((item, idx) => (
                  <span key={idx} className={styles['type-item__list-item']}>
                    <img src='./assets/images/right-arrow.png' alt="arrow" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Types;