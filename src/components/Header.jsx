import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import MenuIcon from '../assets/svg/MenuIcon';

import { FaHeart } from "react-icons/fa";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { AiOutlinePoweroff } from 'react-icons/ai';
import AuthContext from '../service/AuthContext';


const Header = ({ loc, show, setShow }) => {

    const navigate = useNavigate()

    const { logout } = useContext(AuthContext)

    return (
        <div className='header'>
            <div className="container col-11 header-container">
                <h2 className='logo-title mb-0'>BRIGHTERIZE</h2>
                {
                    loc === 'login' || loc === 'sign' ?
                        <span style={{ width: '8%' }}>&nbsp;</span>
                        :
                        loc === 'landing' ?
                            <button className='prime-btn'
                                onClick={e => navigate('/login')}
                            >
                                Войти
                            </button>
                            : loc === 'settings' ?
                                <button
                                    className='prime-btn'
                                    style={{ padding: '4px 8px' }}
                                    onClick={() => logout()}
                                >
                                    <AiOutlinePoweroff style={{ fontSize: 14, fill: 'white' }} />
                                </button>
                                // <div>&nbsp;</div>
                                : loc === 'item' ?
                                    <div className='icon-list'>
                                        <div className="icon-list-arrow">
                                            <IoArrowBackCircleSharp
                                                className="icon-list-arrow"
                                                style={{ fontSize: '30px' }}
                                                onClick={() => navigate(-1)}
                                            />
                                        </div>
                                    </div>
                                    :
                                    <span onClick={() => setShow(true)}>
                                        <MenuIcon />
                                    </span >
                }
            </div>
        </div>
    )
}

export default Header