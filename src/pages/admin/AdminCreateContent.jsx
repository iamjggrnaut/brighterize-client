import React, { useEffect, useState } from 'react'
import AdminHeader from '../../components/AdminHeader'
import CreateCategory from '../../containers/CreateCategory'
import CreateContent from '../../containers/CreateContent'
import ServiceFunctions from '../../service/serviceFunctions'

const AdminCreateContent = () => {

    const [active, setActive] = useState(1)

    const [categories, setCategories] = useState([])
    useEffect(() => {
        ServiceFunctions.getCategories().then(data => setCategories(data))
    }, [])

    return (
        <div className='admin-create-content-page'>
            <AdminHeader
                loc={'create'}
            />
            <div className="admin-container container">
                <h5>Создание контента</h5>
                <div className="d-flex gap-2 mt-4">
                    <span className={active === 1 ? 'prime-btn' : "secondary-btn"} onClick={e => setActive(1)}
                        style={{ cursor: 'pointer' }}
                    >
                        Контент
                    </span>
                    <span className={active === 2 ? 'prime-btn' : "secondary-btn"} onClick={e => setActive(2)}
                        style={{ cursor: 'pointer' }}
                    >
                        Категории
                    </span>
                </div>

                {
                    active === 1 ?
                        <CreateContent categories={categories} />
                        :
                        <CreateCategory />
                }

            </div>
        </div>
    )
}

export default AdminCreateContent