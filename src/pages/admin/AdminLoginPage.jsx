import React from 'react'
import '../../styles/admin.styles.css'

const AdminLoginPage = () => {

    return (
        <div className='admin-login-page'>
            <div className="admin-login-form">
                <h3 className="text-center">Log in</h3>
                <div className="admin-login-input-field">
                    <label htmlFor="">username</label>
                    <input type="text" name="" id="admin-username" />
                </div>
                <div className="admin-login-input-field">
                    <label htmlFor="">password</label>
                    <input type="password" name="" id="" />
                </div>
                <div className="text-center mt-3">
                    <button className="prime-btn">
                        Log in
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AdminLoginPage