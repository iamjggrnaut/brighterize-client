import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlinePoweroff } from "react-icons/ai";
import AuthContext from '../service/AuthContext';


const AdminHeader = ({ loc }) => {

    const { logout } = useContext(AuthContext)

    return (
        <div className='admin-header'>
            <div className="container admin-header-container">
                <span className="logo-title">
                    BRIGHTERIZE ADMIN
                </span>
                <div className="admin-links">
                    <Link className={loc === 'create' ? 'admin-link admin-active-link' : 'admin-link'} to={'/admin/add-content'}>Создать контент</Link>
                    <Link className={loc === 'content' ? 'admin-link admin-active-link' : 'admin-link'} to={'/admin/manage-content'}>Управление контентом</Link>
                    <Link className={loc === 'users' ? 'admin-link admin-active-link' : 'admin-link'} to={'/admin/manage-users'}>Управление пользователями</Link>
                    <Link className={loc === 'logs' ? 'admin-link admin-active-link' : 'admin-link'} to={'/admin/logs'}>Логи</Link>
                    <button
                        className='prime-btn'
                        style={{ padding: '4px 8px' }}
                        onClick={() => logout()}
                    >
                        <AiOutlinePoweroff style={{ fontSize: 14 }} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AdminHeader