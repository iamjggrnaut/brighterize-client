import React from 'react'
import { Link } from 'react-router-dom'
import { GiBrain } from "react-icons/gi";
import { BiSolidPhotoAlbum } from "react-icons/bi";
import { MdOutlineFavorite } from "react-icons/md";
import { FaPlayCircle } from "react-icons/fa";
import { BsHouseHeartFill } from "react-icons/bs";
import { IoLibrary } from "react-icons/io5";
import { FaUser } from "react-icons/fa";


const Navpanel = ({ loc }) => {

    return (
        <div className='navpanel'>
            <Link className='navlink col' to={'/sources'}>
                <GiBrain className={loc === 'sources' ? 'active' : ''} />
                <p className={loc === 'sources' ? 'active' : ''}>Ресурсы</p>
            </Link>
            <Link className='navlink col' to={'/media'}>
                <FaPlayCircle className={loc === 'media' ? 'active' : ''} />
                <p className={loc === 'media' ? 'active' : ''}>Медиа</p>
            </Link>
            {/* <Link className='navlink col' to={'/'}>
                <BsHouseHeartFill className={loc === 'main' ? 'active' : ''} />
                <p className={loc === 'main' ? 'active' : ''}>Main</p>
            </Link> */}
            <Link className='navlink col' to={'/favorite'}>
                <MdOutlineFavorite className={loc === 'favorite' ? 'active' : ''} />
                <p className={loc === 'favorite' ? 'active' : ''}>Избранное</p>
            </Link>
            <Link className='navlink col' to={'/profile'}>
                <FaUser className={loc === 'profile' ? 'active' : ''} />
                <p className={loc === 'profile' ? 'active' : ''}>Профиль</p>
            </Link>
        </div>
    )
}

export default Navpanel