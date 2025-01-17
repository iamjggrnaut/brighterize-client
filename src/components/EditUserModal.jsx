import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { formatDateForInput } from '../service/utils'
import ServiceFunctions from '../service/serviceFunctions'

const EditUserModal = ({ show, handleClose, user, authToken }) => {

    const [changing, setChanging] = useState(user)

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Title className='p-3'>
                <h5>Редактировать пользователя</h5>
            </Modal.Title>
            <Modal.Body className='p-3'>
                <div>
                    <div className="mb-2">
                        {
                            user.profile_image ?
                                <img src={user.profile_image} alt=""
                                    style={{ maxWidth: 200 }}
                                />
                                : null
                        }
                    </div>
                    <div className='admin-login-input-field'>
                        <label htmlFor="">Имя</label>
                        <input
                            type="text"
                            defaultValue={user.first_name}
                            onChange={e => setChanging({ ...changing, first_name: e.target.value })}
                        />
                    </div>
                    <div className='admin-login-input-field'>
                        <label htmlFor="">Фамилия</label>
                        <input
                            type="text"
                            defaultValue={user.last_name}
                            onChange={e => setChanging({ ...changing, last_name: e.target.value })}
                        />
                    </div>
                    <div className='admin-login-input-field'>
                        <label htmlFor="">Email</label>
                        <input
                            type="text"
                            defaultValue={user.email}
                            onChange={e => setChanging({ ...changing, email: e.target.value })}
                        />
                    </div>
                    <div className='admin-login-input-field'>
                        <label htmlFor="">Пароль</label>
                        <input
                            type="text"
                            defaultValue={user.password}
                            onChange={e => setChanging({ ...changing, password: e.target.value })}
                        />
                    </div>
                    <div className='admin-login-input-field'>
                        <label htmlFor="">Телефон</label>
                        <input
                            type="text"
                            defaultValue={user.phone}
                            onChange={e => setChanging({ ...changing, phone: e.target.value })}
                        />
                    </div>
                    <div className='admin-login-input-field'>
                        <label htmlFor="">Подписка</label>
                        <select
                            name=""
                            id=""
                            defaultValue={user.subscription_status}
                            onChange={e => setChanging({ ...changing, subscription_status: e.target.value })}
                        >
                            <option value="">Выберите вариант</option>
                            <option value="standard">standard</option>
                            <option value="premium">premium</option>
                        </select>
                    </div>
                    <div className='admin-login-input-field'>
                        <label htmlFor="">Окончание премиум</label>
                        <input
                            onChange={e => setChanging({ ...changing, premium_end: new Date(e.target.value).toISOString() })}
                            type="date"
                            defaultValue={formatDateForInput(new Date(user.premium_end).toLocaleDateString('en')) || formatDateForInput(new Date().toLocaleDateString('en'))}
                        />
                    </div>
                    <div className='admin-login-input-field'>
                        <label htmlFor="">Роль</label>
                        <select
                            name=""
                            id=""
                            defaultValue={user.role}
                            onChange={e => setChanging({ ...changing, role: e.target.value })}
                        >
                            <option value="">Выберите вариант</option>
                            <option value="user">user</option>
                            <option value="admin">admin</option>
                        </select>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className='p-3 d-flex justify-content-center'>
                <div className="text-center">
                    <button className="prime-btn"
                        onClick={e =>
                            ServiceFunctions.updateUser(user.id, changing, authToken)
                        }
                    >
                        Сохранить
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default EditUserModal