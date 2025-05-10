import React, { useEffect, useRef } from 'react';
import styles from './Leader.module.css';

const translations = {
    en: {
        title: "About TokarMebel",
        play: "Watch a short video about the company (3:30 min)",
        leaderName: "Alexander Nikolaevich Tochilov",
        leaderComment: "A quote about the company, a few words on behalf of the company. A quote about the company, a few words from the face of the company.",
        aboutTitleFirst: "21 years",
        aboutSubTitleFirst: "We have been working on the Ukrainian market since 1998",
        aboutTitleSecond: "300 +",
        aboutSubTitleSecond: "Positions of various structures",
        aboutTitleThird: "up to 7%",
        aboutSubTitleThird: "Humidity of dried wood, which corresponds to GOST norms",
        aboutTitleFourth: "1.5 times",
        aboutSubTitleFourth: "Shipping costs below market value",
        btn: "More about the company"
    },
    ua: {
        title: "Про TokarMebel",
        play: "Переглянути коротке відео про компанію (3:30 хв)",
        leaderName: "Олександр Миколайович Точилов",
        leaderComment: "Цитата про компанію, кілька слів від імені компанії. Цитата про компанію, кілька слів від імені компанії.",
        aboutTitleFirst: "21 рік",
        aboutSubTitleFirst: "Працюємо на ринку України з 1998 року",
        aboutTitleSecond: "300 +",
        aboutSubTitleSecond: "Позиції різних структур",
        aboutTitleThird: "до 7%",
        aboutSubTitleThird: "Вологість просушеного дерева, що відповідає нормативам ДСТУ",
        aboutTitleFourth: "у 1,5 раза",
        aboutSubTitleFourth: "Вартість доставки нижче ринкової",
        btn: "Детальніше про компанію"
    }
};

const Leader = ({ language, openFailedModal }) => {
    const videoRef = useRef(null);
    const aboutRef = useRef(null);

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

        if (videoRef.current) observer.observe(videoRef.current);
        if (aboutRef.current) observer.observe(aboutRef.current);

        return () => {
            if (videoRef.current) observer.unobserve(videoRef.current);
            if (aboutRef.current) observer.unobserve(aboutRef.current);
        };
    }, []);

    return (
        <div className={styles.leader}>
            <div className="container">
                <h2 className={styles['leader-title']}>{translations[language].title}</h2>
                <div className={styles['leader-video__wrap']} ref={videoRef}>
                    <img src="./assets/images/leader-videofon.png" alt="video-bg" className={styles['leader-bg']} />
                    <img src="./assets/images/leader-photo.png" alt="leader-photo" className={styles['leader-photo']} />
                    <div
                        className={styles['play-video']}
                        onClick={() => window.open('https://www.youtube.com/watch?v=uTw5Y7iEkjA', '_blank', 'noopener,noreferrer')}
                    >
                        <img src="./assets/images/play.png" alt="play" />
                        <span>{translations[language].play}</span>
                    </div>
                    <div className={styles['leader-comment']}>
                        <img src="./assets/images/comment.png" alt="comment" />
                        <div className={styles['leader-comment__right']}>
                            <p>{translations[language].leaderName}</p>
                            <span>{translations[language].leaderComment}</span>
                        </div>
                    </div>
                </div>
                <div className={styles['about-section']} ref={aboutRef}>
                    <div className={styles['about-wrapper']}>
                        <div className={styles['about-item']}>
                            <h3 className={styles['about-item__title']}>{translations[language].aboutTitleFirst}</h3>
                            <span className={styles['about-item__subtitle']}>{translations[language].aboutSubTitleFirst}</span>
                        </div>
                        <div className={styles['about-item']}>
                            <h3 className={styles['about-item__title']}>{translations[language].aboutTitleSecond}</h3>
                            <span className={styles['about-item__subtitle']}>{translations[language].aboutSubTitleSecond}</span>
                        </div>
                        <div className={styles['about-item']}>
                            <h3 className={styles['about-item__title']}>{translations[language].aboutTitleThird}</h3>
                            <span className={styles['about-item__subtitle']}>{translations[language].aboutSubTitleThird}</span>
                        </div>
                        <div className={styles['about-item']}>
                            <h3 className={styles['about-item__title']}>{translations[language].aboutTitleFourth}</h3>
                            <span className={styles['about-item__subtitle']}>{translations[language].aboutSubTitleFourth}</span>
                        </div>
                    </div>
                    <div className={styles['btn-section']}>
                        <a onClick={openFailedModal} className={styles['about-section__btn']}>{translations[language].btn}</a>
                    </div>
                </div>
            </div>
            <img className={styles.bg_first} src="./assets/images/leader_bg1.png" alt="bg" />
            <img className={styles.bg_second} src="./assets/images/leader_bg2.png" alt="bg" />
        </div>
    );
};

export default Leader;