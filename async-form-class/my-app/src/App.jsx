import './App.css'
import React, { useState, useEffect } from 'react';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // начальное состояние авторизации
    const [isReady, setIsReady] = useState(false); // состояние готовности компонента

    // имитация загрузки данных, тут может быть прелоадер
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsReady(true); // компонент будет готов через 2 секунды
        }, 2000);
        return () => clearTimeout(timer);
    }, []);
    // после выполнения useEffect и вызова setIsReady(true) происходит ререндеринг компонента
    // вызов setIsReady(true) обновляет состояние isReady (из false в true)
    // а в React любое изменение состояния (через setState) вызывает ререндеринг компонента, чтобы отобразить новое состояние в UI

    // условие: если сегодня среда
    const today = new Date();
    const itsWednesdayMyDudes = today.getDay() === 3; // вторник имеет индекс 2

    if (itsWednesdayMyDudes) {
        return (
            <div className="container">
                <h1 className="title">Сайт недоступен</h1>
                <p className="error-message">Извините, этот сайт закрыт по средам.</p>
                <div className="video-wrapper">
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/d-RbOVJNtBs?autoplay=1&mute=1"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        );
    }

    // обработчик для переключения состояния авторизации
    const handleToggle = () => {
        setIsLoggedIn(!isLoggedIn);
    };

    // ранний возврат null, если компонент не готов
    if (!isReady) {
        return null; // ничего не рендерится
    }

    // рендеринг в зависимости от состояния авторизации
    // в h1 используется тернарный оператор
    // перед баттоном используется &&, если isLoggedIn = true, то выражение isLoggedIn && <p>...</p> возвращает вторую часть, то есть рендерит абзац
    return (
        <div className="container">
            <h1 className="title">
                {isLoggedIn ? 'Добро пожаловать, пользователь!' : 'Пожалуйста, войдите в систему'}
            </h1>
            {isLoggedIn && <p className="status-text">Ваш профиль активен</p>}
            {!isLoggedIn && <p className="status-text">Войдите, чтобы увидеть профиль</p>}
            <button
                onClick={handleToggle}
                className={isLoggedIn ? 'logout-btn' : 'login-btn'}
            >
                {isLoggedIn ? 'Выйти' : 'Войти'}
            </button>
        </div>
    );
}

export default App;