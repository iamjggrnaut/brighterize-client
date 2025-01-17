import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { FaHeart, FaEye } from "react-icons/fa";
import Navpanel from '../components/Navpanel';
import { useNavigate } from 'react-router-dom';
import HamburgerMenu from '../components/HamburgerMenu';
import ServiceFunctions from '../service/serviceFunctions';
import AuthContext from '../service/AuthContext';
import { FiSearch } from 'react-icons/fi';
import '../styles/sources.styles.css'
import '../styles/media.styles.css'
import Loader from '../components/Loader';
import UpgradeSubscriptionModal from '../components/UpgradeSubscriptionModal';

const Sources = () => {

    const navigate = useNavigate()

    const { show, setShow, setCategories, activeCategory, user } = useContext(AuthContext)

    const role = user && user.subscription_status || 'standard'

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        ServiceFunctions.getCategories().then(data => setCategories(data))
    }, [])

    const [sources, setSources] = useState([])
    useEffect(() => {
        if (activeCategory) {
            ServiceFunctions.getContentByCategory(activeCategory).then(data => {
                setSources(data)
                setTimeout(() => {
                    setLoading(false)
                }, 1500);
            })
        }
        else {
            ServiceFunctions.getAllContent().then(data => {
                setSources(data)
                setTimeout(() => {
                    setLoading(false)
                }, 1500);
            })
        }
    }, [activeCategory])

    const filterButtons = sources && sources.length ? sources.map(item => item.type) : []

    const [filterText, setFilterText] = useState()

    const [open, setOpen] = useState(false)
    const handleShow = () => setOpen(true)
    const handleHide = () => setOpen(false)


    return (
        <div className='sources-page'>
            <Header
                loc={'sources'}
                show={show}
                setShow={setShow}
            />
            <Navpanel loc={'sources'} />

            <HamburgerMenu
                show={show}
                setShow={setShow}
            />

            <div className='container col-11'>

                {
                    loading ?
                        <Loader />
                        :
                        <div>
                            {
                                !activeCategory ?
                                    <div>
                                        <h4 className='slider-title'>Популярное</h4>
                                        <div className="source-slider">
                                            {
                                                sources && sources.length && sources.slice(0, 10).map((item, i) => (
                                                    <div key={i} className='slider-item-wrapper'
                                                        onClick={e => {
                                                            if (role && role !== 'premium' && role !== item.subscription_type) {
                                                                handleShow()
                                                            }
                                                            else {
                                                                if (item.type === 'media') {
                                                                    navigate('/media/' + item.id)
                                                                } else {
                                                                    navigate('/sources/' + item.id)
                                                                }
                                                            }
                                                        }}
                                                    >
                                                        <div className="slider-item">
                                                            <img src={item.preview_image} alt="" style={{ height: '100%', width: '100%', borderRadius: 8, objectFit: 'cover' }} />
                                                        </div>
                                                        <div className="d-flex justify-content-center gap-2 mt-1 mb-1">
                                                            <span style={{ color: 'var(--prime-blue)' }} className='d-flex align-items-center'><FaHeart className='like-icon' style={{ marginRight: 4 }} /> {item.likes_count}</span>
                                                            <span style={{ color: 'var(--prime-blue)' }} className='d-flex align-items-center'><FaEye className='view-icon' style={{ marginRight: 4 }} /> {item.views_count}</span>
                                                        </div>
                                                        <span className='slider-item-name'>{item.title.substring(0, 37)}{item.title.length > 30 ? '...' : ''}</span>
                                                    </div>
                                                )) || null
                                            }
                                        </div>

                                        <h4 className='slider-title' style={{ color: 'var(--prime-blue)', fontWeight: 500, filter: 'drop-shadow(0 0 8px var(--plan-card-shadow))' }}>Premium</h4>
                                        <div className="source-slider">
                                            {
                                                sources && sources.length && sources.filter(item => item.subscription_type === 'premium').slice(0, 10).map((item, i) => (
                                                    <div key={i} className='slider-item-wrapper'
                                                        onClick={e => {
                                                            if (role && role !== 'premium' && role !== item.subscription_type) {
                                                                handleShow()
                                                            }
                                                            else {
                                                                if (item.type === 'media') {
                                                                    navigate('/media/' + item.id)
                                                                } else {
                                                                    navigate('/sources/' + item.id)
                                                                }
                                                            }
                                                        }}
                                                    >
                                                        <div className="slider-item">
                                                            <img src={item.preview_image} alt="" style={{ height: '100%', width: '100%', borderRadius: 8, objectFit: 'cover' }} />
                                                        </div>
                                                        <div className="d-flex justify-content-center gap-2 mt-1 mb-1">
                                                            <span style={{ color: 'var(--prime-blue)' }} className='d-flex align-items-center'><FaHeart className='like-icon' style={{ marginRight: 4 }} /> {item.likes_count}</span>
                                                            <span style={{ color: 'var(--prime-blue)' }} className='d-flex align-items-center'><FaEye className='view-icon' style={{ marginRight: 4 }} /> {item.views_count}</span>
                                                        </div>
                                                        <span className='slider-item-name'>{item.title.substring(0, 37)}{item.title.length > 30 ? '...' : ''}</span>
                                                    </div>
                                                )) || null
                                            }
                                        </div>

                                        <h4 className='slider-title'>Новое</h4>
                                        <div className="source-slider">
                                            {
                                                sources && sources.length && sources.slice(0, 10).map((item, i) => (
                                                    <div key={i} className='slider-item-wrapper'
                                                        onClick={e => {
                                                            if (role && role !== 'premium' && role !== item.subscription_type) {
                                                                handleShow()
                                                            }
                                                            else {
                                                                if (item.type === 'media') {
                                                                    navigate('/media/' + item.id)
                                                                } else {
                                                                    navigate('/sources/' + item.id)
                                                                }
                                                            }
                                                        }}
                                                    >
                                                        <div className="slider-item">
                                                            <img src={item.preview_image} alt="" style={{ height: '100%', width: '100%', borderRadius: 8, objectFit: 'cover' }} />
                                                        </div>
                                                        <div className="d-flex justify-content-center gap-2 mt-1 mb-1">
                                                            <span style={{ color: 'var(--prime-blue)' }} className='d-flex align-items-center'><FaHeart className='like-icon' style={{ marginRight: 4 }} /> {item.likes_count}</span>
                                                            <span style={{ color: 'var(--prime-blue)' }} className='d-flex align-items-center'><FaEye className='view-icon' style={{ marginRight: 4 }} /> {item.views_count}</span>
                                                        </div>
                                                        <span className='slider-item-name'>{item.title.substring(0, 37)}{item.title.length > 30 ? '...' : ''}</span>
                                                    </div>
                                                )) || null
                                            }
                                        </div>
                                    </div>
                                    : null
                            }

                            <div className="mt-3">

                                <div className="media-filter">
                                    {
                                        activeCategory &&
                                        <div className="search-block">
                                            <input
                                                type="text"
                                                className='search-input'
                                                onChange={e => setFilterText(e.target.value)}
                                            />

                                            <FiSearch className='filter-search-icon' />

                                        </div>
                                    }
                                </div>
                                <div className="source-slider mt-3 mb-0">
                                    {
                                        activeCategory && filterButtons && filterButtons.map((item, i) => (
                                            <div key={i} className='filter-btn'>
                                                {item}
                                            </div>
                                        ))
                                    }
                                </div>

                                <h5 className="mb-3 mt-3">{activeCategory || ''}</h5>
                                {
                                    filterText ?
                                        sources && sources.length && sources.filter(obj => obj.title.toLowerCase().indexOf(filterText.toLowerCase()) >= 0).map(item => (
                                            <div
                                                className='media-scroller-item-wrapper'
                                                key={item.id}
                                                onClick={e => {
                                                    if (role && role !== 'premium' && role !== item.subscription_type) {
                                                        handleShow()
                                                    }
                                                    else {
                                                        if (item.type === 'media') {
                                                            navigate('/media/' + item.id)
                                                        } else {
                                                            navigate('/sources/' + item.id)
                                                        }
                                                    }
                                                }}>
                                                <div className="media-scroller-item">
                                                    <img className='media-item-img' src={item.preview_image} alt="" />
                                                    <div className="media-item-stats-wrapper">
                                                        <div>
                                                            <span>{new Date(item.created_at).toLocaleDateString()}</span>
                                                        </div>
                                                        <div className="media-item-stats">
                                                            <span className='d-flex align-items-center'><FaHeart className='media-like-icon' style={{ marginRight: 4 }} /> {item.likes_count}</span>
                                                            <span className='d-flex align-items-center'><FaEye className='media-view-icon' style={{ marginRight: 4 }} /> {item.views_count}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className='media-item-title'>{item.title}</span>
                                            </div>
                                        ))
                                        :
                                        sources && sources.length && sources.map(item => (
                                            <div
                                                className='media-scroller-item-wrapper'
                                                key={item.id}
                                                onClick={e => {
                                                    if (role && role !== 'premium' && role !== item.subscription_type) {
                                                        handleShow()
                                                    }
                                                    else {
                                                        if (item.type === 'media') {
                                                            navigate('/media/' + item.id)
                                                        } else {
                                                            navigate('/sources/' + item.id)
                                                        }
                                                    }
                                                }}>
                                                <div className="media-scroller-item">
                                                    <img className='media-item-img' src={item.preview_image} alt="" />
                                                    <div className="media-item-stats-wrapper">
                                                        <div>
                                                            <span>{new Date(item.created_at).toLocaleDateString()}</span>
                                                        </div>
                                                        <div className="media-item-stats">
                                                            <span className='d-flex align-items-center'><FaHeart className='media-like-icon' style={{ marginRight: 4 }} /> {item.likes_count}</span>
                                                            <span className='d-flex align-items-center'><FaEye className='media-view-icon' style={{ marginRight: 4 }} /> {item.views_count}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className='media-item-title'>{item.title}</span>
                                            </div>
                                        ))
                                        ||
                                        <div>
                                            <h5>Ничего не найдено</h5>
                                        </div>
                                }
                                <div>
                                    {
                                        sources && filterText && sources.length && sources.filter(obj => obj.title?.toLowerCase().indexOf(filterText.toLowerCase()) >= 0).length === 0 ?
                                            <h5>Ничего не найдено</h5>
                                            : null
                                    }
                                </div>
                            </div>
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

export default Sources