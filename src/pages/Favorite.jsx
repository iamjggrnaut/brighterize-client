import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Navpanel from '../components/Navpanel'
import '../styles/favorite.styles.css'

import { data } from '../data'
import { FiSearch } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import HamburgerMenu from '../components/HamburgerMenu'
import AuthContext from '../service/AuthContext'
import ServiceFunctions from '../service/serviceFunctions'
import Loader from '../components/Loader'
import UpgradeSubscriptionModal from '../components/UpgradeSubscriptionModal'

const Favorite = () => {

    const navigate = useNavigate()

    const { activeCategory, show, setShow, user } = useContext(AuthContext)

    const [loading, setLoading] = useState(true)

    const [favorite, setFavorite] = useState([])
    useEffect(() => {
        if (user && activeCategory) {
            ServiceFunctions.getLikedByCategory(user.id, activeCategory).then(data => {
                setFavorite(data);
                setTimeout(() => {
                    setLoading(false)
                }, 1500);
            })
        } else {
            user && ServiceFunctions.getLikedContent(user.id).then(data => {
                setFavorite(data);
                setTimeout(() => {
                    setLoading(false)
                }, 1500);
            })
        }
    }, [user, activeCategory])


    const role = user && user.subscription_status || 'standard'


    const filterButtons = favorite && favorite.length ? [new Set(favorite.map(item => item.type))] : []

    const [filterText, setFilterText] = useState()

    const [open, setOpen] = useState(false)
    const handleShow = () => setOpen(true)
    const handleHide = () => setOpen(false)


    return (
        <div>
            <Header
                loc={'favorite'}
                show={show}
                setShow={setShow}
            />
            <Navpanel loc={'favorite'} />
            <HamburgerMenu
                show={show}
                setShow={setShow}
            />
            <div className='container col-11'>
                <div className="media-filter">
                    <div className="search-block">
                        <input
                            type="text"
                            className='search-input'
                            onChange={e => setFilterText(e.target.value)}
                        />
                        <FiSearch className='filter-search-icon' />
                    </div>
                </div>
                <div className="source-slider mt-3 mb-0">
                    {
                        filterButtons && filterButtons.map((item, i) => (
                            <div key={i} className='filter-btn'>
                                {item}
                            </div>
                        ))
                    }
                </div>
                {/* <div className='mb-3'>
                    <span style={{ color: 'var(--prime-blue)', borderBottom: '1px solid var(--prime-blue)', paddingBottom: 2, marginLeft: 4 }}>фильтр</span>
                </div> */}

                {
                    loading ?
                        <Loader />
                        :
                        <div className="fav-scroller">
                            {
                                filterText && filterText.length ?
                                    favorite && favorite.filter(item => item.title.toLowerCase().indexOf(filterText.toLowerCase()) >= 0).map((item, i) => (
                                        <div
                                            key={i}
                                            className='fav-item-wrapper'
                                            onClick={e => {
                                                if (role && role !== 'premium' && role !== item.subscription_type) {
                                                    handleShow()
                                                } else {
                                                    if (item.type === 'text') {
                                                        navigate('/sources/' + item.id)
                                                    }
                                                    if (item.type === 'media') {
                                                        navigate('/media/' + item.id)
                                                    }
                                                }

                                            }}
                                        >
                                            <div className="fav-item">
                                                <img src={item.preview_image} alt="" />
                                                <div className="fav-item-title">{item.title.substring(0, 16)}{item.title.length > 16 ? '...' : ''}</div>
                                            </div>
                                        </div>
                                    ))
                                    ||
                                    <div>
                                        <h6>Ничего не найдено</h6>
                                    </div>
                                    :
                                    favorite && favorite.map((item, i) => (
                                        <div
                                            key={i}
                                            className='fav-item-wrapper'
                                            onClick={e => {
                                                if (role && role !== 'premium' && role !== item.subscription_type) {
                                                    handleShow()
                                                } else {
                                                    if (item.type === 'text') {
                                                        navigate('/sources/' + item.id)
                                                    }
                                                    if (item.type === 'media') {
                                                        navigate('/media/' + item.id)
                                                    }
                                                }

                                            }}
                                        >
                                            <div className="fav-item">
                                                <img src={item.preview_image} alt="" />
                                                <div className="fav-item-title">{item.title.substring(0, 16)}{item.title.length > 16 ? '...' : ''}</div>
                                            </div>
                                        </div>
                                    ))
                                    ||
                                    <div>
                                        <h6>Ничего не найдено</h6>
                                    </div>
                            }
                        </div>
                }
            </div>
            <UpgradeSubscriptionModal
                show={open}
                handleHide={handleHide}
                headerText={'Данный контент доступен по подписке Premium'}
            />
        </div>
    )
}

export default Favorite