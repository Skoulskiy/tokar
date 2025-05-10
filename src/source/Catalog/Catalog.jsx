import React from 'react';
import styles from './Catalog.module.css';
import Header from './Header/Header';
import Content from './Content/Content';
import Footer from '../MainPage/Footer/Footer';


const Catalog = ({ language, setLanguage, openFailedModal }) => {
  return (
    <div className={styles.container}>
        <Header language={language} setLanguage={setLanguage} openFailedModal={openFailedModal}/>
        <Content language={language} openFailedModal={openFailedModal}/>
        <Footer language={language} openFailedModal={openFailedModal} />
    </div>
  );
};

export default Catalog;