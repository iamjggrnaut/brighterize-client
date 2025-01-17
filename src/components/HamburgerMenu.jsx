import React, { useContext } from 'react'
import { IoMdClose } from "react-icons/io";
import AuthContext from '../service/AuthContext';


const HamburgerMenu = ({ show, setShow }) => {

    const { activeCategory, setActiveCategory, categories } = useContext(AuthContext)


    return (
        <div className={show ? 'hamburger-menu' : 'hamburger-hidden'}>
            <div className="container col-11">
                <div className='d-flex align-items-center justify-content-between'>
                    <h3>Категории</h3>
                    <span onClick={e => setShow(false)} className='pb-2'><IoMdClose style={{ width: 32, height: 32 }} /></span>
                </div>
                <div className="mt-4">
                    <p
                        className={activeCategory ? '' : 'active-category'}
                        onClick={e => {
                            setActiveCategory();
                            setShow(false)
                        }}>
                        Все
                    </p>
                    {
                        categories && categories.length && categories.map(category => (
                            <p
                                className={activeCategory === category.name ? 'active-category' : ''}
                                key={category.id}
                                onClick={e => {
                                    setActiveCategory(category.name)
                                    setShow(false)
                                }}
                            >
                                {category.name}
                            </p>
                        ))
                    }
                </div>
            </div>
        </div >
    )
}

export default HamburgerMenu