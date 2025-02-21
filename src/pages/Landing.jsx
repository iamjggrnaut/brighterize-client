import React, { useState } from 'react'
import Header from '../components/Header'
import '../styles/main.styles.css'
import Sphere from '../assets/svg/Sphere'
import Navpanel from '../components/Navpanel'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'

const Landing = () => {

    const slides = [
        {
            id: 1,
            title: "Раскройте свой потенциал",
            description: "Brighterize поможет Вам открыть новые горизонты. Погрузитесь в мир знаний и начните свой путь к саморазвитию уже сегодня.",
        },
        {
            id: 2,
            title: "Практические навыки для жизни",
            description: "Улучшите свою эффективность, коммуникабельность, научитесь решать сложные задачи.",
        },
        {
            id: 3,
            title: "Все для Вас",
            description: "Получите знания и навыки, которые необходимы именно вам, с помощью нашего персонального подхода.",
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? slides.length - 1 : prev - 1
        );
    };

    const navigate = useNavigate()

    return (
        <div className='landing-page'>
            <Header loc={'landing'} />
            <div className="landing-top">
                <div className="container col-11">
                    <div className="landing-hero">
                        <div className='col-7'>
                            <h2 className='hero-title'>
                                Знания тысяч умов
                                у тебя на ладони
                            </h2>
                            <p className='hero-description'>
                                <span className='name-blue'>Brighterize</span> - это приложение, которое поможет вам стать лучше во всех сферах жизни. Получите доступ к знаниям и инструментам, необходимым для личностного роста.
                            </p>
                            <button className="prime-btn"
                                onClick={e => navigate('signup')}
                            >
                                Начать
                            </button>
                        </div>
                        <div className="col">
                            <div className="hero-sphere">
                                <Sphere />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='opportunities'>
                    <div className="container col-11">
                        <h2 className="fs-5 mb-3 title">
                            Что Вы получите с <span className="name-blue">Brighterize</span>
                        </h2>
                    </div>

                    <div className="container col-12">
                        <div className="carousel-container-big">
                            <div className="carousel-big">
                                {slides.map((slide, index) => {
                                    return (
                                        <div className={'slide-item'} key={slide.id}>
                                            <div className="slide-content">
                                                <div className="slide-icon" />
                                                <h3 className='slide-title fs-6'>{slide.title}</h3>
                                                <p className='slide-descr'>{slide.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>


                    <div className="container col-12">
                        <div className="carousel-container">
                            <button className="control-btn left" onClick={handlePrev}>
                                ◀
                            </button>
                            <div className="carousel">
                                {slides.map((slide, index) => {
                                    const position =
                                        index === currentIndex
                                            ? "active"
                                            : index === (currentIndex + 1) % slides.length
                                                ? "next"
                                                : index === (currentIndex - 1 + slides.length) % slides.length
                                                    ? "prev"
                                                    : "hidden";

                                    return (
                                        <div className={`slide ${position}`} key={slide.id}>
                                            <div className="slide-content">
                                                <div className="slide-icon" />
                                                <h3 className='slide-title fs-6'>{slide.title}</h3>
                                                <p className='slide-descr'>{slide.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <button className="control-btn right" onClick={handleNext}>
                                ▶
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="m-0">
                <div className="container col-11">
                    <h2 className="fs-5 mb-3 title">
                        Почему <span className="name-blue">Brighterize</span> Ваш лучший выбор?
                    </h2>
                    <ul className="advantage-list">
                        <li>
                            <span className="fw-bold">Уникальный контент</span>:  Мы собираем только проверенную и полезную информацию от лучших экспертов в сфере саморазвития.
                        </li>
                        <li>
                            <span className="fw-bold">Удобный интерфейс</span>: Наше приложение интуитивно понятно и легко в использовании даже для новичков.
                        </li>
                        <li>
                            <span className="fw-bold">Индивидуальный подход</span>: Мы подбираем контент и рекомендуем курсы с учетом ваших личных потребностей и целей.
                        </li>
                    </ul>
                </div>
                <div className="container col-11">
                    <h2 className="fs-5 mb-3">Выберите свой путь к развитию</h2>
                    <div className="plan-cards">
                        <div className="plan-option">
                            <h2>Free</h2>
                            <p className="fs-5">Доступ к базовым статьям и тестам</p>
                            <button className="prime-btn"
                                onClick={e => navigate('signup')}
                            >
                                Начать
                            </button>
                        </div>
                        <div className="plan-option">
                            <h2>Premium</h2>
                            <p className="fs-5">
                                Полный доступ к курсам, видео и всем материалам. <span className="fw-bold">449 руб./мес</span>
                            </p>
                            <button className="prime-btn" style={{ backgroundColor: 'var(--plan-title)' }}>Подписаться</button>
                        </div>
                    </div>
                </div>

                <div className="container col-11 mt-3 center">
                    <h2 className="fs-5 mb-3 title">Готовы начать свой путь к развитию?</h2>
                    <p className="light-text">
                        Зарегистрируйтесь сейчас и получите доступ к нашему уникальному контенту, тестам и курсам!
                    </p>
                    <div className="text-center pt-3">
                        <button className="prime-btn"
                            onClick={e => navigate('signup')}
                        >
                            Зарегистрироваться
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Landing