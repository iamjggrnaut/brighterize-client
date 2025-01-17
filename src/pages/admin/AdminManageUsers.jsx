import React, { useContext, useEffect, useState } from 'react'
import AdminHeader from '../../components/AdminHeader'
import AuthContext from '../../service/AuthContext'
import ServiceFunctions from '../../service/serviceFunctions'
import { CiEdit, CiCircleRemove } from "react-icons/ci";

import EditUserModal from '../../components/EditUserModal';


const AdminManageUsers = () => {

    const { authToken } = useContext(AuthContext)

    const [users, setUsers] = useState([])
    useEffect(() => {
        authToken && ServiceFunctions.getUsers(authToken).then(data => setUsers(data))
    }, [authToken])

    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)



    return (
        <div className='admin-manage-users-page'>
            <AdminHeader
                loc={'users'}
            />
            <div className="container manage-users-container">
                <div className="pt-5">
                    <h5>Управление пользователями</h5>
                </div>
                <div
                    className='manage-users-row-header'
                >
                    <span className='col-2'>Имя и фамилия</span>
                    <span className='col'>Email</span>
                    <span className='col-2'>Телефон</span>
                    <span className='col-1'>Статус</span>
                    <span className='col-1'>Роль</span>
                    <span className='col-2'>Дата регистрации</span>
                    <span className='col-1'>Premium до</span>
                    <div className="col-1 d-flex align-items-center gap-3">
                        <span className=''>Управление</span>
                    </div>
                </div>
                <div className="mt-2">
                    {
                        users && users.length && users.map(user => (
                            <div
                                key={user.id}
                                className='manage-users-row'
                            >
                                <span className='col-2'>{user.first_name + ' ' + user.last_name}</span>
                                <span className='col'>{user.email}</span>
                                <span className='col-2'>{user.phone}</span>
                                <span className='col-1'>{user.subscription_status}</span>
                                <span className='col-1'>{user.role}</span>
                                <span className='col-2'>{new Date(user.created_at).toLocaleDateString('ru')}</span>
                                <span className='col-1'>{user.premium_end ? new Date(user.premium_end).toLocaleDateString('ru') : '-'}</span>
                                <div className="col-1 d-flex align-items-center gap-3 mu-icons">
                                    <span className='edit-icon'
                                        onClick={handleShow}
                                    >
                                        <CiEdit />
                                    </span>
                                    <span className='remove-icon'
                                        onClick={e => ServiceFunctions.deleteUser(user.id, authToken)}
                                    >
                                        <CiCircleRemove />
                                    </span>
                                </div>
                                <EditUserModal
                                    show={show}
                                    handleClose={handleClose}
                                    user={user}
                                    authToken={authToken}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default AdminManageUsers