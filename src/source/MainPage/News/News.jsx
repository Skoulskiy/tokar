import React, { useState, useEffect, useRef } from 'react';
import styles from './News.module.css';

const translations = {
  en: {
    title: "Recent articles",
    architecture: "Architecture",
    newsTitle1: "Ready-made country house or independent construction?",
    newsSubTitle1: "Buying or building a house from scratch is an inevitable question when the desire to purchase private real estate outside the city arises.",
    newsTitle2: "Author's house projects - why exclusivity is more profitable",
    newsSubTitle2: "The owner will have to decide whether to buy a ready-made standard version or to order a customized one.",
    newsTitle3: "Beautiful houses: 100+ photos of the best projects",
    newsSubTitle3: "Modern low-rise buildings in Russia are represented by both standard architectural solutions, popular.",
    newsTitle4: "Smart Homes: The Future of Residential Design",
    newsSubTitle4: "Integrating technology into home design offers unparalleled convenience and energy efficiency for modern living.",
    newsTitle5: "Restoring Historic Buildings: Challenges and Rewards",
    newsSubTitle5: "Preserving architectural heritage while adapting old structures for contemporary use is a delicate balance.",
    newsTitle6: "Modular Construction: Fast and Flexible Solutions",
    newsSubTitle6: "Prefabricated modules are revolutionizing the construction industry with speed and cost-effective designs.",
    ceoText: "Headline text for SEO"
  },
  ua: {
    title: "Останні статті",
    architecture: "Архітектура",
    newsTitle1: "Готовий заміський будинок чи самостійне будівництво?",
    newsSubTitle1: "Купити або побудувати будинок з нуля - неминуче питання, коли виникає бажання придбати приватну нерухомість за містом.",
    newsTitle2: "Авторські проекти будинків - чому ексклюзив вигідніший",
    newsSubTitle2: "Власнику належить вирішити питання: купити готовий типовий варіант або замовити індивідуальний.",
    newsTitle3: "100+ фото найкращих проектів",
    newsSubTitle3: "Сучасна малоповерхова забудова в Росії представлена як типовими архітектурними рішеннями, так і популярними.",
    newsTitle4: "Розумні будинки: Майбутнє житлового дизайну",
    newsSubTitle4: "Інтеграція технологій у дизайн будинку пропонує неперевершену зручність та енергоефективність для сучасного життя.",
    newsTitle5: "Відновлення історичних будівель: Виклики та винагороди",
    newsSubTitle5: "Збереження архітектурної спадщини при адаптації старих споруд до сучасного використання - це делікатний баланс.",
    newsTitle6: "Модульне будівництво: Швидкі та гнучкі рішення",
    newsSubTitle6: "Збірні модулі революціонізують будівельну галузь завдяки швидкості та економічним дизайнам.",
    ceoText: "Заголовок тексту для СЕО"
  }
};

const newsItems = [
  { id: 1, titleKey: "newsTitle1", subtitleKey: "newsSubTitle1", image: './assets/images/news1.png' },
  { id: 2, titleKey: "newsTitle2", subtitleKey: "newsSubTitle2", image: './assets/images/news2.png' },
  { id: 3, titleKey: "newsTitle3", subtitleKey: "newsSubTitle3", image: './assets/images/news3.png' },
  { id: 4, titleKey: "newsTitle4", subtitleKey: "newsSubTitle4", image: './assets/images/news4.png' },
  { id: 5, titleKey: "newsTitle5", subtitleKey: "newsSubTitle5", image: './assets/images/news5.png' },
  { id: 6, titleKey: "newsTitle6", subtitleKey: "newsSubTitle6", image: './assets/images/news6.png' }
];

const News = ({ language }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const newsRef = useRef(null);
  const titleRef = useRef(null);
  const sliderRef = useRef(null);
  const ceoRef = useRef(null);

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

    if (newsRef.current) observer.observe(newsRef.current);
    if (titleRef.current) observer.observe(titleRef.current);
    if (sliderRef.current) observer.observe(sliderRef.current);
    if (ceoRef.current) observer.observe(ceoRef.current);

    return () => {
      if (newsRef.current) observer.unobserve(newsRef.current);
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (sliderRef.current) observer.unobserve(sliderRef.current);
      if (ceoRef.current) observer.unobserve(ceoRef.current);
    };
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === 1 ? 0 : prev + 1));
  };

  const slides = [
    newsItems.slice(0, 3), 
    newsItems.slice(3, 6)  
  ];

  return (
    <div ref={newsRef} className={styles['news']}>
      <div className="container">
        <div className={styles['news-wrap']}>
          <div className={styles['news-top']}>
            <h2 ref={titleRef} className={styles['title']}>
              {translations[language].title}
            </h2>
            <div className={styles['slider-btns']}>
              <img
                src='./assets/images/left-arr-orange.png'
                alt='arrow'
                onClick={handlePrev}
                className={styles['slider-btn']}
              />
              <span>{currentSlide + 1}/2</span>
              <img
                src='./assets/images/right-arr-orange.png'
                alt='arrow'
                onClick={handleNext}
                className={styles['slider-btn']}
              />
            </div>
          </div>
          <div ref={sliderRef} className={styles['news-slider']}>
            {slides[currentSlide].map((item) => (
              <div key={item.id} className={styles['news-item']}>
                <div className={styles['news-item__image-container']}>
                  <img
                    src={item.image}
                    alt={translations[language][item.titleKey]}
                    className={styles['news-item__img']}
                  />
                  <span className={styles['news-item__architecture']}>
                    {translations[language].architecture}
                  </span>
                  <div className={styles['news-item__text']}>
                    <h3>{translations[language][item.titleKey]}</h3>
                    <p>{translations[language][item.subtitleKey]}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div ref={ceoRef} className={styles['ceo-comment']}>
          <div className={styles['ceo-comment__left']}>
            <h2>{translations[language].ceoText}</h2>
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In fermentum posuere urna nec. Tincidunt eget nullam non nisi est sit amet facilisis magna. Faucibus vitae aliquet nec ullamcorper sit amet risus.</span>
            <span>Aliquet nec ullamcorper sit amet risus nullam. Adipiscing elit pellentesque habitant morbi tristique senectus et netus. Commodo viverra maecenas accumsan lacus vel facilisis.</span>
            <span>Tempor orci eu lobortis elementum nibh tellus molestie nunc non. Enim facilisis gravida neque convallis a.</span>
          </div>
          <img src='./assets/images/ceo-bg.png' alt='bg' />
        </div>
        </div>
      </div>
    </div>
  );
};

export default News;