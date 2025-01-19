import React, { useContext, useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import Checked from '../assets/svg/Checked'
import Checkbox from '../assets/svg/Checkbox'
import TermsOfService from '../components/TermsOfService'
import AuthContext from '../service/AuthContext'

const SignUpPremium = () => {

    const { registerWithPremium } = useContext(AuthContext)

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
            registerWithPremium(candidate)
            console.log('Форма успешно отправлена:', candidate);
            // Выполнить действие, например, отправку на сервер
        }
    };

    const [open, setOpen] = useState(false)
    const handleShow = () => setOpen(true)
    const handleHide = () => setOpen(false)


    return (
        <div className='sign-page'>
            <Header loc={'login'} />
            <div className="signup-container container">
                <div className="sign-form mt-4">
                    <div className="text-center">
                        <h2 className='m-0'>Sign Up</h2>
                    </div>
                    <div className="form-field-block">
                        <label htmlFor="">First Name</label>
                        <input type="text" className="form-input" />
                    </div>
                    <div className="form-field-block">
                        <label htmlFor="">Last Name</label>
                        <input type="text" className="form-input" />
                    </div>
                    <div className="form-field-block">
                        <label htmlFor="">Email</label>
                        <input type="text" className="form-input" />
                    </div>
                    <div className="form-field-block">
                        <label htmlFor="">Phone</label>
                        <input type="text" className="form-input" />
                    </div>
                    <div className="form-field-block">
                        <label htmlFor="">Password</label>
                        <input type="password" className="form-input" />
                    </div>
                    <div className='d-flex justify-content-start mt-2 mb-2'>
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
                            I accept the &nbsp;
                            <span
                                className="link"
                                onClick={handleShow}
                            >
                                Terms of use
                            </span>
                        </span>
                    </div>
                    <div className="d-flex justify-content-center mt-2 mb-2">
                        <button className="prime-btn" style={{ backgroundColor: 'var(--plan-title)' }}>
                            Оплатить
                        </button>
                    </div>
                    <div className='text-center mt-2 mb-2'>
                        <span>Already have an account? <Link className='link' to={'/login'}>Log in</Link></span>
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

export default SignUpPremium