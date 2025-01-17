import React, { useContext, useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import Navpanel from '../components/Navpanel'
import ImageIcon from '../assets/svg/ImageIcon'
import { MdEdit } from "react-icons/md";

import { jwtDecode } from "jwt-decode";


import '../styles/profile.styles.css'
import AuthContext from '../service/AuthContext';
import Loader from '../components/Loader';
import UpgradeSubscriptionModal from '../components/UpgradeSubscriptionModal';
import { BASE_URL, URL } from '../config/config';
import ServiceFunctions from '../service/serviceFunctions';

const Profile = () => {

    const { user, loading, setAuthToken, setUser } = useContext(AuthContext)


    const [allSources, setAllSources] = useState([])
    useEffect(() => {
        ServiceFunctions.getAllContent().then(data => setAllSources(data))
    }, [])

    const isStandard = allSources && allSources.length ? allSources.filter(item => item.subscription_type === 'standard').length : '0'

    const [edit, setEdit] = useState(false)
    const [saved, setSaved] = useState(false)

    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleHide = () => setShow(false)

    const fileInputRef = useRef(null);

    const [modified, setModified] = useState({})
    useEffect(() => {
        if (user) {
            setModified({
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                phone: user.phone,
                id: user.id
            })
        }
    }, [user])

    console.log(user);


    const [fileName, setFileName] = useState('');

    const handleIconClick = () => {
        // Открыть окно выбора файла
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];

        if (file && user) {
            // Сохраняем название файла в состоянии (если нужно)
            setFileName(file.name);
            // Создаем FormData для отправки файла
            const formData = new FormData();
            formData.append('static', file);

            try {
                // Отправляем файл на сервер
                const uploadResponse = await fetch(`${URL}/uploadfile`, {
                    method: 'POST',
                    body: formData,
                });


                if (!uploadResponse.ok) {
                    throw new Error('Ошибка загрузки файла');
                }

                const uploadData = await uploadResponse.json();
                console.log('Файл успешно загружен:', uploadData);

                // Получаем новое имя файла с сервера
                const { filename, filePath } = uploadData;

                console.log(uploadData);


                // Обновляем данные пользователя, включая имя файла
                const updateResponse = await fetch(`${URL}/user/${user.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: user.id,
                        profile_image: BASE_URL + filePath, // Используем имя файла с сервера
                    }),
                });

                if (!updateResponse.ok) {
                    throw new Error('Ошибка обновления объекта');
                }

                const updateData = await updateResponse.json();
                if (updateData.token) {
                    setAuthToken(updateData)
                    setUser(jwtDecode(updateData?.token))
                    localStorage.setItem('authToken', updateData?.token)
                    window.location.reload()
                }
                console.log('Объект успешно обновлен:', updateData);
            } catch (error) {
                console.error('Ошибка:', error.message);
            }
        }
    };


    const changeUserData = async (id, userData, authToken) => {
        ServiceFunctions.updateUser(id, userData).then(data => {
            if (data && data.token) {
                setEdit(true)
                setUser(jwtDecode(data.token))
                localStorage.setItem('authToken', data.token)
                // window.location.reload()
            }
        })
    }


    return (
        <div>
            <Header loc={'settings'} />
            <Navpanel loc={'profile'} />
            {
                loading ?
                    <Loader />
                    :
                    <div>
                        <div className='container col-11'>
                            {
                                user && user.profile_image ?
                                    <div className="image-wrapper">
                                        <span onClick={handleIconClick}>
                                            <img src={user.profile_image} alt="" className="user-image" />
                                        </span>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            style={{ display: 'none' }} // Скрываем input
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                    :
                                    <div className="image-wrapper">
                                        <span onClick={handleIconClick}>
                                            <ImageIcon className='image-icon-svg' />
                                        </span>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            style={{ display: 'none' }} // Скрываем input
                                            onChange={handleFileChange}
                                        />
                                    </div>
                            }

                        </div>
                        <div className="profile-data">
                            <div className="container col-11">
                                <div className="profile-name">
                                    <div className="col-2">&nbsp;</div>
                                    <span className="col">{user && `${user.first_name} ${user.last_name}` || 'Unknown User'}</span>
                                    {
                                        edit
                                            ?
                                            <div className="col-2">&nbsp;</div>
                                            :
                                            <div className="col-2">
                                                <MdEdit style={{ fontSize: '24px' }} onClick={e => setEdit(true)} />
                                            </div>
                                    }
                                </div>
                                {
                                    saved ?
                                        <div className='d-flex flex-column align-items-center'>
                                            <h3 className='text-center mb-2'>Ваши данные успешно обновлены!</h3>
                                            <button className='prime-btn' onClick={e => setSaved(false)}>OK</button>
                                        </div>
                                        :
                                        edit ?
                                            <div className='profile-edit-block'>
                                                <div className="input-block">
                                                    <label htmlFor="">Имя</label>
                                                    <input type="text" defaultValue={user ? user.first_name : ''}
                                                        onChange={e => setModified({ ...modified, first_name: e.target.value })}
                                                    />
                                                </div>
                                                <div className="input-block">
                                                    <label htmlFor="">Фамилия</label>
                                                    <input type="text" defaultValue={user ? user.last_name : ''}
                                                        onChange={e => setModified({ ...modified, last_name: e.target.value })}
                                                    />
                                                </div>
                                                <div className="input-block">
                                                    <label htmlFor="">Email</label>
                                                    <input type="text" defaultValue={user ? user.email : ''}
                                                        onChange={e => setModified({ ...modified, email: e.target.value })}
                                                    />
                                                </div>
                                                <div className="input-block">
                                                    <label htmlFor="">Телефон</label>
                                                    <input type="text" defaultValue={user ? user.phone : ''}
                                                        onChange={e => setModified({ ...modified, phone: e.target.value })}
                                                    />
                                                </div>
                                                <div className="edit-block-buttons">
                                                    <button
                                                        className="secondary-btn"
                                                        onClick={e => {
                                                            setEdit(false)
                                                        }}
                                                    >
                                                        Отмена
                                                    </button>
                                                    <button
                                                        className="prime-btn"
                                                        onClick={e => {
                                                            if (user && user.id) {
                                                                changeUserData(user.id, modified)
                                                            }
                                                        }}
                                                    >
                                                        Сохранить
                                                    </button>
                                                </div>
                                            </div>
                                            :
                                            <div>
                                                <div className="profile-data-row">
                                                    <span className="data-row-field">Email:</span>
                                                    <span className="data-row-value">{user && user.email || 'Email неизвестен'}</span>
                                                </div>
                                                <div className="profile-data-row">
                                                    <span className="data-row-field">Тел.:</span>
                                                    <span className="data-row-value">{user && user.phone || 'Телефон неопределен'}</span>
                                                </div>
                                                <div className="profile-data-row">
                                                    <span className="data-row-field">Тариф:</span>
                                                    <span className="data-row-value">
                                                        <span
                                                            className="plan-value-standard"
                                                            onClick={e => {
                                                                if (user && user.subscription_status === 'premium') {
                                                                    return
                                                                }
                                                                else {
                                                                    handleShow()
                                                                }
                                                            }}
                                                        >
                                                            {user && user.subscription_status ? String(user.subscription_status).toUpperCase() : ''}
                                                        </span>
                                                        <div className="round-icon-blue"></div>
                                                    </span>
                                                </div>
                                                <div className="profile-data-row">
                                                    <span className="data-row-field">Доступно ресурсов:</span>
                                                    {
                                                        user && user.subscription_status && user.subscription_status === 'premium' ?
                                                            <span className="data-row-value">
                                                                {allSources.length} / {allSources.length}
                                                            </span>
                                                            :
                                                            <span className="data-row-value">
                                                                {isStandard} / {allSources.length}
                                                            </span>
                                                    }
                                                </div>
                                            </div>
                                }
                            </div>
                        </div>
                    </div>
            }

            <UpgradeSubscriptionModal
                show={show}
                handleHide={handleHide}
                headerText={'Обновите план до Premium'}
            />
        </div>
    )
}

export default Profile