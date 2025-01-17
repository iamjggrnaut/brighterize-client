import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Navpanel from '../components/Navpanel'
import '../styles/media.styles.css'

import { FiSearch } from "react-icons/fi";


import { data } from '../data'
import { FaEye, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import HamburgerMenu from '../components/HamburgerMenu';
import ServiceFunctions from '../service/serviceFunctions';
import AuthContext from '../service/AuthContext';
import Loader from '../components/Loader';
import UpgradeSubscriptionModal from '../components/UpgradeSubscriptionModal';

const Media = () => {

    const navigate = useNavigate()

    const { activeCategory, show, setShow, user } = useContext(AuthContext)

    const role = user && user.subscription_status || 'standard'


    const [loading, setLoading] = useState(true)

    const [media, setMedia] = useState([])
    useEffect(() => {
        if (activeCategory !== undefined) {
            ServiceFunctions.getMediaByCategory(activeCategory).then(data => {
                setMedia(data)
                setTimeout(() => {
                    setLoading(false)
                }, 1500);
            })
        }
        else {
            ServiceFunctions.getMediaContent().then(data => {
                setMedia(data)
                setTimeout(() => {
                    setLoading(false)
                }, 1500);
            })
        }
    }, [activeCategory])

    const filterButtons = media && media.length ? [new Set(media.map(item => item.type))] : []

    const [filterText, setFilterText] = useState()

    const [open, setOpen] = useState(false)
    const handleShow = () => setOpen(true)
    const handleHide = () => setOpen(false)


    return (
        <div className='media-page'>
            <Header
                loc={'media'}
                show={show}
                setShow={setShow}
            />
            <Navpanel loc={'media'} />
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
                        <div className='media-scroller'>
                            {
                                filterText ?
                                    media && media.length && media.filter(obj => obj.title.toLowerCase().indexOf(filterText.toLowerCase()) >= 0).map((item, i) => (
                                        <div
                                            className='media-scroller-item-wrapper'
                                            key={item.id}
                                            onClick={e => {
                                                if (role && role !== 'premium' && role !== item.subscription_type) {
                                                    handleShow()
                                                }
                                                else {
                                                    navigate('/media/' + item.id)
                                                }
                                            }}>

                                            <div className="media-scroller-item">
                                                <img className='media-item-img' src={item.media_url} alt="" />
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
                                    )) ||
                                    <div>
                                        <h5>Ничего не найдено</h5>
                                    </div>
                                    :
                                    media && media.length && media.map((item, i) => (
                                        <div
                                            className='media-scroller-item-wrapper'
                                            key={item.id}
                                            onClick={e => {
                                                if (role && role !== 'premium' && role !== item.subscription_type) {
                                                    handleShow()
                                                }
                                                else {
                                                    navigate('/media/' + item.id)
                                                }
                                            }}>

                                            <div className="media-scroller-item">
                                                <img className='media-item-img' src={item.media_url} alt="" />
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
                                    )) ||
                                    <div>
                                        <h5>Ничего не найдено</h5>
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

export default Media