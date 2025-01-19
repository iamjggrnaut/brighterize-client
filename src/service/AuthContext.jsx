import { createContext, useState, useEffect } from "react";
import { URL } from "../config/config";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom'
import ServiceFunctions from "./serviceFunctions";

const AuthContext = createContext()

export default AuthContext


export const AuthProvider = ({ children }) => {

    const [authToken, setAuthToken] = useState()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true); // Добавили состояние загрузки


    const registerWithPremium = async (formData) => {
        try {
            const response = await fetch(URL + '/user/register-premium', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            const data = await response.json();
            localStorage.setItem('authToken', data.token);
            alert('Registration successful with Premium!');
            window.location.href = '/sources';
        } catch (error) {
            alert(error.message);
        }
    }

    const registerWithStandard = async (formData) => {
        try {
            const response = await fetch(URL + '/user/register/standard', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            console.log(response);


            if (!response.ok) {
                throw new Error('Registration failed');
            }

            const data = await response.json();
            setAuthToken(data)
            setUser(jwtDecode(data?.token))
            localStorage.setItem('authToken', data?.token);
            window.location.href = '/sources';
        } catch (error) {
            alert(error);
        }
    }


    const login = async (email, password, setError, setShow) => {

        let latitude = null;
        let longitude = null;

        if (window.Telegram && window.Telegram.WebApp) {
            window.Telegram.WebApp.ready(() => {

                alert('ready')
                window.Telegram.WebApp.requestWriteAccess(async (granted) => {
                    if (granted) {
                        try {
                            const result = await window.Telegram.WebApp.requestGeolocation();
                            if (result && result.error) {
                                console.error('Ошибка получения геолокации в Telegram:', result.error);
                                setError('Не удалось получить геолокацию в Telegram');
                                setShow(true);
                                return;
                            }
                            latitude = result.latitude;
                            longitude = result.longitude;

                            alert(latitude);

                        } catch (error) {
                            alert(error)
                            console.error('Ошибка получения геолокации в Telegram:', error);
                            setError('Не удалось получить геолокацию в Telegram');
                            setShow(true);
                            return;
                        }

                    } else {
                        console.error('Ошибка получения доступа к данным Telegram: Отказано в доступе');
                        setError('Не удалось получить доступ к данным Telegram');
                        setShow(true);
                        return;
                    }
                });
            });
        }

        if (!password || !email) {
            setError('Введите корректное значение для всех полей')
        }
        const response = await fetch(URL + '/user/login', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        })
        const data = await response.json()
        if (response.status !== 200) {
            setError(data.message)
            setShow(true)
        }
        if (response.status === 200) {
            setAuthToken(data)
            setUser(jwtDecode(data?.token))
            localStorage.setItem('authToken', data?.token)
            window.location.href = '/sources'
        }
        return data
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error('Failed to load user:', error);
            } finally {
                setLoading(false); // Завершаем загрузку
            }
        };

        fetchUser();
    }, []);



    const target = localStorage.getItem('authToken')
    useEffect(() => {
        if (target) {
            setAuthToken(target)
            setUser(jwtDecode(target))
        }
    }, [target])


    const sign = async (obj) => {
        const res = await fetch(`${URL}user/register`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        const data = await res.json()
        console.log(data);

        if (res.status !== 200) {
            setError(data.message)
            setShow(true)
        }
        if (res.status === 200) {
            setAuthToken(data)
            setUser(jwtDecode(data?.token))
            localStorage.setItem('authToken', data?.token)
        }
    }


    const logout = () => {
        setAuthToken(null)
        setUser(null)
        localStorage.removeItem('authToken')
        window.location.href = '/login'
    }

    const [categories, setCategories] = useState([])
    useEffect(() => {
        ServiceFunctions.getCategories().then(data => setCategories(data))
    }, [])

    const [activeCategory, setActiveCategory] = useState()

    const [show, setShow] = useState(false)

    const contextData = {
        login: login,
        logout: logout,
        user: user,
        setUser: setUser,
        authToken: authToken,
        sign,
        activeCategory: activeCategory,
        setActiveCategory: setActiveCategory,
        categories: categories,
        setCategories: setCategories,
        show: show,
        setShow: setShow,
        loading: loading,
        registerWithPremium: registerWithPremium,
        registerWithStandard: registerWithStandard,
        setAuthToken: setAuthToken
    }

    useEffect(() => {
        let interval = setInterval(() => {
            if (user && user.exp * 1000 < Date.now()) {
                logout()
            }
        }, 6000)
        return () => clearInterval(interval)
    }, [])

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}