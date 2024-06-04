import React from 'react'
import logo from '../../images/logo.webp';
import avatar from '../../images/avatar.jpg';
import './AdminHeader.css';
import useAuthCheck from '../../redux/hooks/useAuthCheck';

const AdminHeader = () => {
    const {data, role} = useAuthCheck();
    return (
        <div className="header">
            <div className="header-left">
                <a href="/" className="logo">
                    <img src={logo} alt="Logo" />
                    <span style={{color: '#1977cc'}}>DoctorApp</span>
                </a>
            </div>

            <a id="toggle_btn">
                <i className="fe fe-text-align-left"></i>
            </a>

            <div className="top-nav-search">
                <form>
                    <input type="text" className="form-control" placeholder="Search here" />
                    <button className="btn" type="submit"><i className="fa fa-search"></i></button>
                </form>
            </div>

            <a className="mobile_btn" id="mobile_btn">
                <i className="fa fa-bars"></i>
            </a>
            <ul className="nav user-menu">
                <li className="nav-item has-arrow">
                    <a href="#" className="nav-link">
                        <span className="user-img"><img className="rounded-circle avatar" src={data?.avatar ?? avatar} width="31" alt="Ryan Taylor" /></span>
                    </a>
                </li>

            </ul>

        </div>
    )
}

export default AdminHeader