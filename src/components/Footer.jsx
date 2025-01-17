import React from 'react'

const Footer = () => {

    return (
        <div className='footer'>
            <div className="footer-container container col-11">
                <div className="col">
                    <div className="name-blue footer-title fs-4">
                        ARCANE&nbsp;DEVLAB
                    </div>
                    {/* <div>
                        <p className='mb-1'>Ахмедов Рустам Расулжонович</p>
                        <p className='mb-1'>ИНН: 540134089994</p>
                    </div> */}
                </div>
                <div className="col col-right">
                    <a
                        className='fs-6 main-link'
                        href="https://arcanedevlab.ru" target='_blank'
                    >
                        www.arcanedevlab.ru
                    </a>
                    <a
                        className='fs-6 main-link'
                        href="https://t.me/+79994654345"
                        target='_blank'
                    >
                        tg: @arcanedevlab
                    </a>
                    <a
                        className='fs-6 main-link'
                        href="mailto:arcanedevlab@gmail.com"
                        target='_blank'
                    >
                        email: arcanedevlab@gmail.com
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Footer