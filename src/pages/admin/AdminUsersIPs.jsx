import React, { useContext, useEffect, useState } from 'react'
import AdminHeader from '../../components/AdminHeader'
import AuthContext from '../../service/AuthContext'
import ServiceFunctions from '../../service/serviceFunctions'

const AdminUsersIPs = () => {

    const { authToken } = useContext(AuthContext)

    const [logs, setLogs] = useState([])
    useEffect(() => {
        authToken && ServiceFunctions.getLogs(authToken).then(data => setLogs(data))
    }, [authToken])

    const [userId, setUserId] = useState()


    return (
        <div className='admin-users-ips'>
            <AdminHeader
                loc={'logs'}
            />

            <div className="container admin-logs-container mt-5">
                <div className="d-flex align-items-center justify-content-between">
                    <h5>Logs</h5>
                    <span
                        style={{
                            color: 'var(--prime-red)',
                            cursor: 'pointer'
                        }}
                        onClick={e => ServiceFunctions.deleteAllLogs(authToken)}
                    >
                        Очистить логи
                    </span>
                </div>

                <div className="mt-3 mb-3 admin-login-input-field">
                    <label htmlFor="">User ID</label>
                    <input type="text" onChange={e => setUserId(e.target.value)} />
                </div>
                <div className="mt-3 manage-users-row-header">
                    <span className="col-4">User ID</span>
                    <span className="col">Фамилия и имя</span>
                    <span className="col">IP адрес</span>
                    <span className="col">Посещение</span>
                    <span className="col">Действие</span>
                </div>
                <div className="mt-2">
                    {
                        userId && userId.length ?
                            logs && logs.length && logs.filter(obj => obj.user_id === userId).map(log => (
                                <div className='manage-users-row' key={log.id}>
                                    <span className="col-4">{log.user_id}</span>
                                    <span className="col">{log.last_name + ' ' + log.first_name}</span>
                                    <span className="col">{log.ip_address}</span>
                                    <span className="col">{new Date(log.last_login).toLocaleString('ru')}</span>
                                    <span
                                        className="col"
                                        style={{
                                            color: 'var(--prime-red)'
                                        }}
                                        onClick={e => ServiceFunctions.deleteLog(log.id, authToken)}
                                    >
                                        Удалить
                                    </span>
                                </div>
                            ))
                            :
                            logs && logs.length && logs.map(log => (
                                <div className='manage-users-row' key={log.id}>
                                    <span className="col-4">{log.user_id}</span>
                                    <span className="col">{log.last_name + ' ' + log.first_name}</span>
                                    <span className="col">{log.ip_address}</span>
                                    <span className="col">{new Date(log.last_login).toLocaleString('ru')}</span>
                                    <span
                                        className="col"
                                        style={{
                                            color: 'var(--prime-red)'
                                        }}
                                        onClick={e => ServiceFunctions.deleteLog(log.id, authToken)}
                                    >
                                        Удалить
                                    </span>
                                </div>
                            ))
                    }
                </div>
            </div>
        </div>
    )
}

export default AdminUsersIPs