import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slider';
import styles from "./Content.module.css";
import Buildings from './Buildings.json';

const translations = {
  en: {
    mainPage: "Home page",
    residential: "Residential",
    title: "Residential Buildings Catalog",
    placeholder: "Search by residential buildings...",
    podcategory: "Subcategory",
    categoriesTitle: "Houses and residential buildings",
    home: "Home",
    homeWithAdditionalArea: "Home with additional area",
    improvedHome: "Improved home",
    additionalArea: "Additional area",
    farmhouse: "Farmhouse",
    homeWithFloor: "Home with floor",
    cottage: "Cottage",
    villa: "Villa",
    summerhouse: "Summerhouse",
    ossuary: "Ossuary",
    sort: "Sort by:",
    alphabet: "Alphabet",
    price: "Price (uah):",
    popularity: "Popularity",
    area: "Area (m²):",
    buttonText: "Explore",
    unitMeter: "m",
    unitArea: "m²",
    unitCurrency: "uah"
  },
  ua: {
    mainPage: "Головна сторінка",
    residential: "Жиле",
    title: "Каталог житлових будинків",
    placeholder: "Пошук за житловими будівлями...",
    podcategory: "Підкатегорія",
    categoriesTitle: "Будинки та житлові будівлі",
    home: "Дома",
    homeWithAdditionalArea: "Дома із прибудованою буса",
    improvedHome: "Покращені будинки",
    additionalArea: "Прибудована буса",
    farmhouse: "Корківський дім",
    homeWithFloor: "Дома із підлогою",
    cottage: "Котеджі",
    villa: "Вілли",
    summerhouse: "Усадьби",
    ossuary: "Оссонарії",
    sort: "Сортувати за:",
    alphabet: "Алфавіт",
    price: "Ціна (грн):",
    popularity: "Популярність",
    area: "Площа (м²):",
    buttonText: "Ознайомитись",
    unitMeter: "м",
    unitArea: "м²",
    unitCurrency: "грн"
  }
};

const Content = ({ language, openFailedModal }) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isAreaOpen, setIsAreaOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [areaValues, setAreaValues] = useState([10, 500]);
  const [currentAreaValues, setCurrentAreaValues] = useState([10, 500]);
  const [priceValues, setPriceValues] = useState([1000000, 5000000]);
  const [currentPriceValues, setCurrentPriceValues] = useState([1000000, 5000000]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBuildings, setFilteredBuildings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleArea = () => {
    setIsAreaOpen(!isAreaOpen);
  };

  const togglePrice = () => {
    setIsPriceOpen(!isPriceOpen);
  };

  const toggleCategory = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const toggleSort = () => {
    setIsSortOpen(!isSortOpen);
  };

  const [sortType, setSortType] = useState(null);
  const [isAscending, setIsAscending] = useState(true);

  const handleSort = (type) => {
    if (sortType === type) {
      setIsAscending(!isAscending);
    } else {
      setSortType(type);
      setIsAscending(true);
    }
  };

  const handleAreaSliderChange = (newValues) => {
    setAreaValues(newValues);
    setCurrentAreaValues(newValues);
  };

  const handlePriceSliderChange = (newValues) => {
    setPriceValues(newValues);
    setCurrentPriceValues(newValues);
  };

  const formatPrice = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const filtered = Buildings
        .filter((building) => {
          const area = parseInt(building.properties[1], 10);
          const price = building.price;
          const matchesSearch = building.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          return (
            matchesSearch &&
            area >= areaValues[0] &&
            area <= areaValues[1] &&
            price >= priceValues[0] &&
            price <= priceValues[1]
          );
        })
        .sort((a, b) => {
          if (!sortType) return 0;
          if (sortType === 'alphabet') {
            return isAscending
              ? a.title.localeCompare(b.title)
              : b.title.localeCompare(a.title);
          }
          if (sortType === 'price') {
            return isAscending ? a.price - b.price : b.price - a.price;
          }
          if (sortType === 'popularity') {
            return isAscending ? a.popularity - b.popularity : b.popularity - a.popularity;
          }
          return 0;
        });

      setFilteredBuildings(filtered);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, areaValues, priceValues, sortType, isAscending]);

  return (
    <div className={styles['content']}>
      <div className="container">
        <p className={styles['navigation']}>
          <span style={{ cursor: "pointer" }}>
            <Link to="/tokar/" style={{ color: "rgba(130, 130, 130, 1)" }}>{translations[language].mainPage}</Link>
          </span> / <span>{translations[language].residential}</span>
        </p>
        <div className={styles['catalog-top']}>
          <h2>{translations[language].title}</h2>
          <input
            type="text"
            style={{ backgroundImage: "url('./assets/images/search.png')" }}
            placeholder={translations[language].placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={styles['catalog-content']}>
          <div className={styles['catalog-content__left']}>
            <div className={styles['catalog-content__left-podcategory']} onClick={toggleCategory}>
              <span>{translations[language].podcategory}</span>
              <img
                src='./assets/images/arr-top.png'
                alt='arr'
                className={isCategoryOpen ? styles['rotated'] : ''}
              />
            </div>
            <div className={`${styles['catalog-content__left-categories']} ${isCategoryOpen ? styles['open'] : ''}`}>
              <h2 className={styles['catalog-content__left-categories-title']}>
                {translations[language].categoriesTitle}
              </h2>
              <div className={styles["catalog-content__left-categories-items"]}>
                <span className={styles['catalog-content__left-categories-item']} onClick={openFailedModal}>
                  <img src='./assets/images/right-arrow.png' alt='right-arrow' /> {translations[language].home}
                </span>
                <span className={styles['catalog-content__left-categories-item']} onClick={openFailedModal}>
                  <img src='./assets/images/right-arrow.png' alt='right-arrow' /> {translations[language].homeWithAdditionalArea}
                </span>
                <span className={styles['catalog-content__left-categories-item']} onClick={openFailedModal}>
                  <img src='./assets/images/right-arrow.png' alt='right-arrow' /> {translations[language].improvedHome}
                </span>
                <span className={styles['catalog-content__left-categories-item']} onClick={openFailedModal}>
                  <img src='./assets/images/right-arrow.png' alt='right-arrow' /> {translations[language].additionalArea}
                </span>
                <span className={styles['catalog-content__left-categories-item']} onClick={openFailedModal}>
                  <img src='./assets/images/right-arrow.png' alt='right-arrow' /> {translations[language].farmhouse}
                </span>
                <span className={styles['catalog-content__left-categories-item']} onClick={openFailedModal}>
                  <img src='./assets/images/right-arrow.png' alt='right-arrow' /> {translations[language].homeWithFloor}
                </span>
                <span className={styles['catalog-content__left-categories-item']} onClick={openFailedModal}>
                  <img src='./assets/images/right-arrow.png' alt='right-arrow' /> {translations[language].cottage}
                </span>
                <span className={styles['catalog-content__left-categories-item']} onClick={openFailedModal}>
                  <img src='./assets/images/right-arrow.png' alt='right-arrow' /> {translations[language].villa}
                </span>
                <span className={styles['catalog-content__left-categories-item']} onClick={openFailedModal}>
                  <img src='./assets/images/right-arrow.png' alt='right-arrow' /> {translations[language].summerhouse}
                </span>
                <span className={styles['catalog-content__left-categories-item']} onClick={openFailedModal}>
                  <img src='./assets/images/right-arrow.png' alt='right-arrow' /> {translations[language].ossuary}
                </span>
              </div>
            </div>
            <div className={styles['catalog-content__left-podcategory']} onClick={toggleSort}>
              <span>{translations[language].sort}</span>
              <img
                src='./assets/images/arr-top.png'
                alt='arr'
                className={isSortOpen ? styles['rotated'] : ''}
              />
            </div>
            <div className={`${styles['catalog-content__left-categories']} ${isSortOpen ? styles['open'] : ''}`}>
              <div className={styles["catalog-content__left-categories-items"]} style={{ paddingTop: "0px" }}>
                {['alphabet', 'price', 'popularity'].map((type) => (
                  <span
                    key={type}
                    className={`${styles['catalog-content__left-categories-item']}
                      ${sortType === type ? styles['active'] : ''}`}
                    onClick={() => handleSort(type)}
                  >
                    <img src='./assets/images/right-arrow.png' alt='right-arrow' />
                    <div className={styles['sorted-item']}>
                      {translations[language][type]}
                      {sortType === type && (
                        <img
                          src='./assets/images/arrow-top-orange.png'
                          alt='sort-arrow'
                          className={isAscending ? styles['sort-asc'] : styles['sort-desc']}
                        />
                      )}
                    </div>
                  </span>
                ))}
              </div>
            </div>
            <div className={styles['catalog-content__left-podcategory']} onClick={toggleArea}>
              <span>{translations[language].area}</span>
              <img
                src='./assets/images/arr-top.png'
                alt='arr'
                className={isAreaOpen ? styles['rotated'] : ''}
              />
            </div>
            {isAreaOpen && (
              <div style={{ paddingTop: '35px' }}>
                <div className={styles.areaSliderContainer}>
                  <Slider
                    className={styles.areaSlider}
                    thumbClassName={styles.areaThumb}
                    trackClassName={styles.areaTrack}
                    min={10}
                    max={500}
                    value={areaValues}
                    onChange={handleAreaSliderChange}
                    pearling
                    renderThumb={(props, state) => (
                      <div {...props}>
                        <div className={styles.areaThumbValue}>{currentAreaValues[state.index]}</div>
                      </div>
                    )}
                    renderTrack={(props, state) => (
                      <div {...props} className={state.index === 1 ? styles.areaTrackFill : styles.areaTrackUnfill} />
                    )}
                  />
                </div>
              </div>
            )}
            <div className={styles['catalog-content__left-podcategory']} onClick={togglePrice} style={{ marginTop: "35px" }}>
              <span>{translations[language].price}</span>
              <img
                src='./assets/images/arr-top.png'
                alt='arr'
                className={isPriceOpen ? styles['rotated'] : ''}
              />
            </div>
            {isPriceOpen && (
              <div style={{ paddingTop: '35px' }}>
                <div className={styles.priceSliderContainer}>
                  <Slider
                    className={styles.priceSlider}
                    thumbClassName={styles.priceThumb}
                    trackClassName={styles.priceTrack}
                    min={1000000}
                    max={5000000}
                    value={priceValues}
                    onChange={handlePriceSliderChange}
                    pearling
                    renderThumb={(props, state) => (
                      <div {...props}>
                        <div className={styles.priceThumbValue}>{formatPrice(currentPriceValues[state.index])}</div>
                      </div>
                    )}
                    renderTrack={(props, state) => (
                      <div {...props} className={state.index === 1 ? styles.priceTrackFill : styles.priceTrackUnfill} />
                    )}
                  />
                </div>
              </div>
            )}
          </div>
          <div className={styles['catalog-content__right']}>
            {isLoading ? (
              <div className={styles['loader']}>
                <div className={styles['spinner']}></div>
              </div>
            ) : (
              <div className={styles['buildings-wrap']}>
                {filteredBuildings.map((building) => (
                  <div key={building.id} className={styles['buildings-item']}>
                    <img src={building.image} alt="building" className={styles['building-image']} />
                    <div className={styles['building-insert']}>
                      <span className={styles['buildings-item__title']}>{building.title}</span>
                      <div className={styles['buildings-item__properties']}>
                        <div className={styles['buildings-item__property']}>
                          <img src="./assets/images/width.png" alt="width" />
                          <span>{building.properties[0]} {translations[language].unitMeter}</span>
                        </div>
                        <div className={styles['buildings-item__property']}>
                          <img src="./assets/images/area.png" alt="area" />
                          <span>{building.properties[1]} {translations[language].unitArea}</span>
                        </div>
                      </div>
                      <div className={styles['buildings-item__info']}>
                        <a href="#" className={styles['buildings-item__info-btn']} onClick={openFailedModal}>{translations[language].buttonText}</a>
                        <p>{formatPrice(building.price)} {translations[language].unitCurrency}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;