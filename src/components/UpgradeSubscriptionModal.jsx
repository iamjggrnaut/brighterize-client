import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { useNavigate } from 'react-router-dom'

const UpgradeSubscriptionModal = ({ show, handleHide, headerText }) => {

    const navigate = useNavigate()

    return (
        <Modal show={show} onHide={handleHide}>
            <Modal.Header closeButton>
                {/* <Modal.Title>Modal heading</Modal.Title> */}
            </Modal.Header>
            <Modal.Body>
                <div>
                    <h4>{headerText}</h4>
                    <p>
                        Не упустите возможность получить доступ к эксклюзивным функциям и контенту, которые сделают ваше взаимодействие еще более продуктивным и увлекательным!
                    </p>
                    <div className="edit-block-buttons">
                        <button
                            className="secondary-btn"
                            onClick={e => {
                                handleHide()
                            }}
                        >
                            Отмена
                        </button>
                        <button
                            className="green-btn"
                            onClick={e => {
                                handleHide()
                            }}
                        >
                            Обновить
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default UpgradeSubscriptionModal