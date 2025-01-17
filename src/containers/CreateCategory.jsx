import React, { useContext, useEffect, useState } from 'react'
import ServiceFunctions from '../service/serviceFunctions'
import AuthContext from '../service/AuthContext'

const CreateCategory = () => {

    const { authToken } = useContext(AuthContext)

    const [categories, setCategories] = useState([])
    useEffect(() => {
        ServiceFunctions.getCategories().then(data => setCategories(data))
    }, [])

    const [name, setName] = useState()

    const addCategory = (e, name, authToken) => {
        if (!name) {
            e.preventDefault()
        }
        else {
            ServiceFunctions.createCategory(name, authToken).then(data => console.log(data))
            // setName(null)
        }
    }

    return (
        <div className=''>
            <div className="admin-login-input-field mt-3">
                <label htmlFor="">Название категории</label>
                <input type="text" onChange={e => setName(e.target.value)} />
            </div>
            <button
                className="prime-btn"
                style={{ height: 32 }}
                onClick={e => addCategory(e, name, authToken)}
            >
                Добавить
            </button>

            <div className="mt-5">
                <h5>Все категории</h5>
                {
                    categories && categories.length && categories.map(cat => (
                        <div
                            key={cat.id}
                            className='mt-2 p-2 d-flex align-items-center justify-content-between'
                            style={{
                                borderBottom: '1px solid silver',
                                backgroundColor: 'rgb(10, 20, 32, 0.75)'
                            }}
                        >
                            <p className="mb-1" >{cat.name}</p>
                            <span
                                onClick={e => ServiceFunctions.deleteCategory(cat.id, authToken)}
                                style={{
                                    color: 'red',
                                    cursor: 'pointer'
                                }}
                            >
                                Удалить
                            </span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CreateCategory