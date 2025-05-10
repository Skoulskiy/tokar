import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './ConstructionSecrets.module.css';
import { Link } from 'react-router-dom';

const translations = {
  ua: {
    title: "З чого складаються наші будівлі?",
    itemTitleFirst: "Створення 3D-макету",
    itemSubTitleFirst: "Це візуалізація структури через екран гаджета. Макет створюється індивідуально для клієнта. Основне завдання 3D-візуалізації: врахувати всі деталі при розробці і показати кінцевий вигляд проекту в оригінальному кольорі і розмірі, з використанням актуальних матеріалів і наповнення всередині",
    itemTitleSecond: "Взяття замірів і створення фундаменту",
    itemSubTitleSecond: "Ми виїжджаємо на об'єкт, обговорюємо завдання, визначаємо потреби замовника і проводимо заміри. Будуємо несучу конструкцію, яка витримає навантаження від будівлі та погодних умов. Професіонали використовують лазерний рівень і якісні матеріали, щоб зробити фундамент максимально міцним і рівним.",
    itemTitleThird: "Виробництво конструкції",
    itemSubTitleThird: "На одному з 4-х заводів по всій Україні ми виготовляємо конструкцію за технічним завданням. Завдання створюється і узгоджується з вами через договір на початку роботи",
    itemTitleFourth: "Монтажні роботи",
    itemSubTitleFourth: "Ми виконаємо весь комплекс робіт: від фундаменту до покрівлі. Зрештою, ви зможете одразу ж користуватися будівлею, а не купувати матеріали за власні кошти. Ми виконаємо сантехнічні роботи до того, як проект буде повністю завершений.",
    slidersBtnFirst: "Перейти до каталогу будинків",
    slidersBtnSecond: "Каталог лазень"
  }, 
  en: {
    title: "What are our structures made of?",
    itemTitleFirst: "3D layout creation",
    itemSubTitleFirst: "It is a visualization of the structure through the screen of a gadget. The layout is created individually for the client. The main task of 3D-visualization: to take into account all details in the development and show the final appearance of the project in the original color and size, using actual materials and filling inside.",
    itemTitleSecond: "Taking measurements and creating a foundation",
    itemSubTitleSecond: "We travel to the site, discuss the task, identify the customer's need and take measurements. We build a load-bearing structure that will withstand the load from the building and weather conditions. Professionals use a laser level and quality materials to make the foundation as strong and level as possible.",
    itemTitleThird: "Production of the structure",
    itemSubTitleThird: "In one of 4 factories throughout Ukraine we produce the construction according to the technical task. The task is created and agreed with you through a prescribed contract at the beginning of the work.",
    itemTitleFourth: "Installation work",
    itemSubTitleFourth: "We will carry out the full scope of work: from foundation to roofing. In the end, you will be able to use the building immediately, rather than having to buy materials with your own money. We will carry out plumbing work before the project is fully completed.",
    slidersBtnFirst: "Go to the catalog of houses",
    slidersBtnSecond: "Baths catalog"
  }
};

const ConstructionSecrets = ({ language = 'en', openFailedModal }) => {
  const [currentSlider, setCurrentSlider] = useState(1);
  const selectedLanguage = translations[language] ? language : 'en';
  const slides = [
    './assets/images/slider1.png',
    './assets/images/slider2.png',
    './assets/images/slider3.png',
    './assets/images/slider4.png',
    './assets/images/slider5.png',
  ];

  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [itemsRef, itemsInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [sliderRef, sliderInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [buttonsRef, buttonsInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const handlePrev = () => {
    setCurrentSlider((prev) => (prev === 1 ? 5 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlider((prev) => (prev === 5 ? 1 : prev + 1));
  };

  const items = [
    { title: translations[selectedLanguage].itemTitleFirst, subtitle: translations[selectedLanguage].itemSubTitleFirst, numberImage: './assets/images/01.png', img: "./assets/images/secrets1.png" },
    { title: translations[selectedLanguage].itemTitleSecond, subtitle: translations[selectedLanguage].itemSubTitleSecond, numberImage: './assets/images/02.png', img: "./assets/images/secrets2.png" },
    { title: translations[selectedLanguage].itemTitleThird, subtitle: translations[selectedLanguage].itemSubTitleThird, numberImage: './assets/images/03.png', img: "./assets/images/secrets3.png" },
    { title: translations[selectedLanguage].itemTitleFourth, subtitle: translations[selectedLanguage].itemSubTitleFourth, numberImage: './assets/images/04.png', img: "./assets/images/secrets4.png" },
  ];

  const groupedItems = [
    items.slice(0, 2),
    items.slice(2, 4),
  ];

  return (
    <div className={styles['constructions']}>
      <div className="container">
        <div
          ref={titleRef}
          className={`${styles['constructions-title']} ${titleInView ? styles['fade-in'] : ''}`}
        >
          {translations[selectedLanguage].title}
        </div>
        <div
          ref={itemsRef}
          className={`${styles['construction-wrapper']} ${itemsInView ? styles['fade-in'] : ''}`}
        >
          {groupedItems.map((group, groupIndex) => (
            <div key={groupIndex} className={styles['constructions-wrap']}>
              {group.map((item, index) => (
                <div key={index} className={styles['constructions-wrap__item']}>
                  <h3 className={styles['constructions-wrap__item-title']}>{item.title}</h3>
                  <span className={styles['constructions-wrap__item-subtitle']}>{item.subtitle}</span>
                  <img
                    className={styles['constructions-wrap__item-image']}
                    alt="image"
                    src={item.img}
                  />
                  <img
                    className={styles['constructions-wrap__item-number']}
                    alt="number"
                    src={item.numberImage}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
        <div
          ref={sliderRef}
          className={`${styles['slider']} ${sliderInView ? styles['fade-in'] : ''}`}
        >
          <img
            src={slides[currentSlider - 1]}
            alt="slider"
            className={styles['slider-img']}
          />
          <div className={styles['slider-btns']}>
            <a onClick={handlePrev} aria-label="Previous slide">
              <img src="./assets/images/arr-left.png" alt="Previous" />
            </a>
            <span>{currentSlider}/5</span>
            <a onClick={handleNext} aria-label="Next slide">
              <img src="./assets/images/arr-right.png" alt="Next" />
            </a>
          </div>
        </div>
        <div
          ref={buttonsRef}
          className={`${styles['sliders-btns']} ${buttonsInView ? styles['fade-in'] : ''}`}
        >
          <Link to="/tokar/catalog">
          <a className={styles['sliders-btns__first']}>
            {translations[selectedLanguage].slidersBtnFirst}
          </a>
          </Link>
          <a className={styles['sliders-btns__second']} onClick={openFailedModal}>
            <img src="./assets/images/right-arrow.png" alt="arrow" />
            {translations[selectedLanguage].slidersBtnSecond}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ConstructionSecrets;