import React, { useContext, useEffect, useState } from 'react'
import '../../styles/admin.styles.css'
import AdminHeader from '../../components/AdminHeader'
import ServiceFunctions from '../../service/serviceFunctions'
import AuthContext from '../../service/AuthContext'

const AdminManageContent = () => {

    const { authToken } = useContext(AuthContext)

    const [content, setContent] = useState([])
    useEffect(() => {
        ServiceFunctions.getAllContent().then(data => setContent(data))
    }, [])

    console.log(content);


    return (
        <div className='admin-manage-content-page'>
            <AdminHeader
                loc={'content'}
            />

            <div className="container admin-container">
                <h5>Контент</h5>
                <div className="mt-3">
                    {
                        content && content.length && content.map(item => (
                            <div key={item.id} className='manage-users-row'>
                                <span>{item.title}</span>
                                <span>{item.category}</span>
                                <span>{item.type}</span>
                                <span>{item.subscription_type}</span>
                                <span onClick={e => ServiceFunctions.deleteContent(item.id, authToken)}>delete</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default AdminManageContent