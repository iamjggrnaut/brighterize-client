import React, { useContext, useState } from 'react'
import '../styles/sign.styles.css'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import Checked from '../assets/svg/Checked'
import Checkbox from '../assets/svg/Checkbox'
import AuthContext from '../service/AuthContext'
import TermsOfService from '../components/TermsOfService'

const Register = () => {

    const { registerWithStandard } = useContext(AuthContext)

    const [checked, setChecked] = useState(false)

    const [candidate, setCandidate] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
    })

    const [errors, setErrors] = useState({
        email: '',
        phone: '',
    });

    // Функция валидации email
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Функция валидации телефона
    const validatePhone = (phone) => {
        const phoneRegex = /^[+]?[0-9]{10,15}$/; // Подходит для номеров в международном формате
        console.log(phoneRegex);

        if (phone.length < 11) return null
        else return phoneRegex.test(phone);
    };

    // Обработчик отправки формы
    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!validateEmail(candidate.email)) {
            newErrors.email = 'Введите корректный email.';
        }
        if (!validatePhone(candidate.phone)) {
            newErrors.phone = 'Введите корректный номер телефона.';
        }

        setErrors(newErrors);

        // Если ошибок нет, выполняем логику регистрации
        if (Object.keys(newErrors).length === 0) {
            registerWithStandard(candidate)
            console.log('Форма успешно отправлена:', candidate);
            // Выполнить действие, например, отправку на сервер
        }
    };

    const [open, setOpen] = useState(false)
    const handleShow = () => setOpen(true)
    const handleHide = () => setOpen(false)



    return (
        <div className='sign-page'>
            <Header loc={'sign'} />
            <div className="signup-container container">
                <div className="sign-form mt-4">
                    <div className="text-center">
                        <h2 className='m-0'>Регистрация</h2>
                    </div>
                    <div className="form-field-block">
                        <label htmlFor="">Имя</label>
                        <input type="text" className="form-input"
                            onChange={e => setCandidate({ ...candidate, first_name: e.target.value })}
                        />
                    </div>
                    <div className="form-field-block">
                        <label htmlFor="">Фамилия</label>
                        <input type="text" className="form-input"
                            onChange={e => setCandidate({ ...candidate, last_name: e.target.value })}
                        />
                    </div>
                    <div className="form-field-block">
                        <label htmlFor="">Email</label>
                        <input type="text" className="form-input"
                            placeholder='random@example.com'
                            onChange={e => setCandidate({ ...candidate, email: e.target.value })}
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>
                    <div className="form-field-block">
                        <label htmlFor="">Телефон</label>
                        <input type="text" className="form-input"
                            placeholder='+79876543210'
                            onChange={e => setCandidate({ ...candidate, phone: e.target.value })}
                        />
                        {errors.phone && <span className="error">{errors.phone}</span>}
                    </div>
                    <div className="form-field-block">
                        <label htmlFor="">Пароль</label>
                        <input type="password" className="form-input"
                            onChange={e => setCandidate({ ...candidate, password: e.target.value })}
                        />
                    </div>
                    <div className='d-flex justify-content-start'>
                        {
                            checked ?
                                <span className='me-2' onClick={e => setChecked(!checked)}>
                                    <Checked />
                                </span>
                                :
                                <span className='me-2' onClick={e => setChecked(!checked)}>
                                    <Checkbox />
                                </span>
                        }
                        <span>
                            Я принимаю &nbsp;
                            <span
                                className="link"
                                onClick={handleShow}
                            >
                                Пользовательское соглашение
                            </span>
                        </span>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button className="prime-btn" style={{ fontSize: '16px' }}
                            onClick={e => handleSubmit(e)}
                            disabled={!checked ? true : false}
                        >
                            Зарегистрироваться
                        </button>
                    </div>
                    <div className='text-center'>
                        <span>Уже есть акканут? <Link className='link' to={'/login'}>Войти</Link></span>
                    </div>
                </div>
            </div>
            <TermsOfService
                show={open}
                handleHide={handleHide}
            />
        </div>
    )
}

export default Register