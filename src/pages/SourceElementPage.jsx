import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Navpanel from '../components/Navpanel'
import '../styles/sources.styles.css'

import { data } from '../data'
import { FaEye, FaHeart } from 'react-icons/fa'
import ServiceFunctions from '../service/serviceFunctions'
import AuthContext from '../service/AuthContext'
import Loader from '../components/Loader'


const SourceElementPage = () => {

    const { user } = useContext(AuthContext)

    const [loading, setLoading] = useState(true)

    const link = document.location.href
    const chuncksArray = link ? link.split('/').reverse() : []
    const id = chuncksArray[0]

    const [source, setSource] = useState()
    useEffect(() => {
        ServiceFunctions.getContent(id).then(data => {
            setSource(data)
            setTimeout(() => {
                setLoading(false)
            }, 1500);
        })
    }, [])

    const [liked, setLiked] = useState(false)

    useEffect(() => {
        if (source && user) {
            ServiceFunctions.getLike(source.id, user.id).then(data => {
                if (data) {
                    setLiked(true)
                } else {
                    return
                }
            });
            ServiceFunctions.viewContent({ user_id: user.id, content_id: source.id }).then(data => setSource(data))
        }
    }, [source && source.id])

    const likeContent = (uId, cId) => {
        setLiked(true)
        ServiceFunctions.likeContent({ user_id: uId, content_id: cId }).then(data => setSource(data))
    }

    const dislikeContent = (uId, cId) => {
        setLiked(false)
        ServiceFunctions.dislikeContent(uId, cId).then(data => setSource(data))
    }

    return (
        <div>
            <Header loc={'item'} />
            <Navpanel loc={'sources'} />
            {
                loading ?
                    <Loader />
                    :
                    <div className='source-element-page'>
                        <div className="container col-11">
                            <div className="src-item-name">
                                <span>
                                    {
                                        source && source.title
                                    }
                                </span>
                                <div className="icon-list-heart">
                                    <FaHeart
                                        className={liked ? 'icon-list-heart' : "icon-list-heart-inactive"}
                                        onClick={e => {
                                            if (!liked && user && source) {
                                                likeContent(user.id, source.id)
                                            } else if (liked && user && source) {
                                                dislikeContent(user.id, source.id)
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="src-item-bg">
                            <div className="container col-11">
                                <div className="src-item-media">
                                    <img src={source && source.preview_image} className='src-item-img' alt="" />
                                    <div className="d-flex justify-content-center gap-2 mt-1 mb-1">
                                        <span style={{ color: 'var(--prime-blue)' }} className='d-flex align-items-center'><FaHeart className='like-icon' style={{ marginRight: 4 }} /> {source && source.likes_count}</span>
                                        <span style={{ color: 'var(--prime-blue)' }} className='d-flex align-items-center'><FaEye className='view-icon' style={{ marginRight: 4 }} /> {source && source.views_count}</span>
                                    </div>
                                    <div className="text-center mb-3">
                                        {new Date(source && source.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                                <div>
                                    {
                                        source && source.content
                                    }
                                </div>

                                <br />

                                <div style={{ paddingBottom: 80 }}>
                                    {
                                        source && source.content_structure && source.content_structure.chapters && source.content_structure.chapters.length && source.content_structure.chapters.map((item, i) => (
                                            <div key={i} className='mt-3'>
                                                <h6>{item.title}</h6>
                                                <p>{item.content}</p>
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

export default SourceElementPage