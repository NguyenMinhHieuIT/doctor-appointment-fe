import React from 'react';
import './AdminSidebar.css';
import {
    FaHome,
    FaUserMd,
    FaUserInjured,
    FaDonate,
    FaCog,
    FaSignOutAlt,
    FaExclamationCircle,
    FaListUl,
    FaRegUser,
    FaRegStar
} from "react-icons/fa";
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
    return (
        <div className="sidebar" id="sidebar">
            <div className="sidebar-inner slimscroll">
                <div id="sidebar-menu" className="sidebar-menu">
                    <ul>                     
                        <li className="active">
                            <Link to={'/admin/dashboard'}>
                                <FaHome /> <span>Trang chủ</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/admin/appointments'}>
                                <FaListUl /> <span>Cuộc hẹn</span>
                            </Link>


                        </li>               
                        <li>
                            <Link to={'/admin/doctors'}>
                                <FaUserMd /> <span>Bác sĩ</span>
                            </Link>

                        </li>
                        <li>
                            <Link to={'/admin/patients'}>
                                <FaUserInjured /> <span>Bệnh nhân</span>
                            </Link>

                        </li>
                        <li>
                            <Link to={'/admin/reviews'}>
                                <FaRegStar /> <span>Đánh giá</span>
                            </Link>

                        </li>
                        <li>
                            <Link to={'/admin/transaction'}>
                                <FaDonate /><span>Giao dịch</span>
                            </Link>

                        </li>
                        <li className='text-white'>
                            <Link to={'/dashboard/profile-setting'}>
                                <FaExclamationCircle /> <span>Báo cáo</span>
                            </Link>
                        </li>

                        <li className='text-white'>
                            <Link to={'/admin/profile'}>
                                <FaCog /> <span>Cài đặt</span>
                            </Link>
                        </li>

                        <li className='text-white'>
                            <Link to={'/dashboard/profile-setting'}>
                                <FaRegUser /> <span>Hồ sơ</span>
                            </Link>
                        </li>
                       
                        {/* <li className='text-white'>
                            <Link to={'/admin/profile'}>
                                <FaSignOutAlt /> <span>Đăng xuất</span>
                            </Link>
                        </li> */}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AdminSidebar