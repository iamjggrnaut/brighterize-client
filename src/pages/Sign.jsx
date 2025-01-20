import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import '../styles/sign.styles.css'
import { Link } from 'react-router-dom'
import AuthContext from '../service/AuthContext'
import { getDeviceInfo, getUserGeolocation } from '../service/utils'

const Sign = () => {

    const { login, user } = useContext(AuthContext)

    const [error, setError] = useState()
    const [show, setShow] = useState(false)

    const [phone, setPhone] = useState()
    const [password, setPassword] = useState()

    const [info, setInfo] = useState()

    return (
        <div className='sign-page'>
            <Header loc={'login'} />
            <div className="sign-container container">
                <div className="sign-form">
                    <div className="text-center">
                        <h2 className='m-0'>Вход</h2>
                    </div>
                    <div className="form-field-block">
                        <label htmlFor="">Номер телефона</label>
                        <input type="text" className='form-input'
                            onChange={e => setPhone(e.target.value.toLocaleLowerCase())}
                            placeholder='79998765432'
                        />
                    </div>
                    <div className="form-field-block">
                        <label htmlFor="">Пароль</label>
                        <input type="password" className='form-input'
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    {
                        show ?
                        <span className='error'>{error}</span>
                    : null    
                    }
                    <div className="d-flex justify-content-center mt-2 mb-2">
                        <button className="prime-btn" style={{ fontSize: '16px' }}
                            onClick={e => login(phone, password, setError, setShow, setInfo)}
                        >
                            Войти
                        </button>
                    </div>
                    <div className='text-center'>
                        <span>Еще нет аккаунта? <Link className='link' to={'/signup'}>Зарегистрироваться</Link></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sign