import React, { useContext, useEffect, useState } from 'react'
import { FaEye, FaHeart } from 'react-icons/fa'
import Header from '../components/Header'
import Navpanel from '../components/Navpanel'
import '../styles/media.styles.css'

import { useNavigate } from 'react-router-dom'
import ServiceFunctions from '../service/serviceFunctions'
import AuthContext from '../service/AuthContext'
import Loader from '../components/Loader'

const MediaItemPage = () => {

    const navigate = useNavigate()

    const { user } = useContext(AuthContext)

    const link = document.location.href
    const chuncksArray = link ? link.split('/').reverse() : []
    const id = chuncksArray[0]

    const [loading, setLoading] = useState(true)

    const [allMedia, setAllMedia] = useState([])
    useEffect(() => {
        ServiceFunctions.getMediaContent().then(data => setAllMedia(data))
    }, [])

    const [target, setTarget] = useState()
    useEffect(() => {
        ServiceFunctions.getContent(id).then(data => {
            setTarget(data)
            setTimeout(() => {
                setLoading(false)
            }, 1500);
        })
    }, [])

    const [liked, setLiked] = useState(false)

    const [fullDescription, setFullDescription] = useState(false)

    useEffect(() => {
        if (target && user) {
            ServiceFunctions.getLike(target.id, user.id).then(data => {
                if (data) {
                    setLiked(true)
                } else {
                    return
                }
            });
            ServiceFunctions.viewContent({ user_id: user.id, content_id: target.id }).then(data => setTarget(data))
        }
    }, [target && target.id])

    const likeContent = (uId, cId) => {
        setLiked(true)
        ServiceFunctions.likeContent({ user_id: uId, content_id: cId }).then(data => setTarget(data))
    }

    const dislikeContent = (uId, cId) => {
        setLiked(false)
        ServiceFunctions.dislikeContent(uId, cId).then(data => setTarget(data))
    }

    return (
        <div>
            <Header loc={'item'} />
            <Navpanel loc={'media'} />
            {
                loading ?
                    <Loader />
                    :
                    <div className='source-element-page'>
                        <div className="container col-11">
                            <div className="src-item-name">
                                <span>
                                    {
                                        target && target.title
                                    }
                                </span>
                                <div className="icon-list-heart">
                                    <FaHeart
                                        className={liked ? 'icon-list-heart' : "icon-list-heart-inactive"}
                                        onClick={e => {
                                            if (!liked && user && target) {
                                                likeContent(user.id, target.id)
                                            } else if (liked && user && target) {
                                                dislikeContent(user.id, target.id)
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="src-item-bg">
                            <div className="container col-11">
                                <div className="src-item-media mb-4">
                                    <img src={target && target.media_url} className='src-item-img' alt="" />
                                    <div className="d-flex justify-content-center gap-2 mt-1 mb-1">
                                        <span style={{ color: 'var(--prime-blue)' }} className='d-flex align-items-center'><FaHeart className='like-icon' style={{ marginRight: 4 }} /> {target && target.likes_count}</span>
                                        <span style={{ color: 'var(--prime-blue)' }} className='d-flex align-items-center'><FaEye className='view-icon' style={{ marginRight: 4 }} /> {target && target.views_count}</span>
                                    </div>
                                    <div className="text-center">
                                        {target && new Date(target.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                                <div className='mb-5'>
                                    {
                                        fullDescription ?
                                            <div>
                                                {target && target.description.length && target.description}
                                                <span
                                                    className='expand-link'
                                                    onClick={e => setFullDescription(false)}
                                                >
                                                    hide
                                                </span>
                                            </div>
                                            :
                                            <div>
                                                {target && target.description.length && target.description.substring(0, 90)}...
                                                <span
                                                    className='expand-link'
                                                    onClick={e => setFullDescription(true)}
                                                >
                                                    more
                                                </span>
                                            </div>
                                    }
                                </div>

                                <h4 className='slider-title mb-3'>Рекомендации</h4>
                                <div className="recommendation-slider">
                                    {
                                        allMedia && allMedia.length && allMedia.map((item, i) => (
                                            <div key={item.id} className='slider-item-wrapper'
                                                onClick={e => navigate('/media/' + item.id)}
                                            >
                                                <div className="slider-item">
                                                    <img src={item.media_url} alt="" style={{ height: '100%', width: '100%', borderRadius: 8 }} />
                                                </div>
                                                <div className="d-flex justify-content-center gap-2 mt-1 mb-1">
                                                    <span style={{ color: 'var(--prime-blue)' }} className='d-flex align-items-center'><FaHeart className='like-icon' style={{ marginRight: 4 }} /> {item.likes_count}</span>
                                                    <span style={{ color: 'var(--prime-blue)' }} className='d-flex align-items-center'><FaEye className='view-icon' style={{ marginRight: 4 }} /> {item.views_count}</span>
                                                </div>
                                                <span className='slider-item-name'>{item.title.substring(0, 30)}{item.title.length > 30 ? '...' : ''}</span>
                                            </div>
                                        ))
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default MediaItemPage