import React from 'react';
import img from '../../images/avatar.jpg';
import './DashboardSidebar.css';
import { Link, NavLink } from 'react-router-dom';
import useAuthCheck from '../../redux/hooks/useAuthCheck';
import {
    FaTable,
    FaCalendarDay,
    FaUserInjured,
    FaHourglassStart,
    FaRegStar, FaUserCog, FaBlog,
    FaSignOutAlt,
    FaLock,
    FaHouseUser
} from "react-icons/fa";

const DashboardSidebar = () => {
    const { data, role } = useAuthCheck();

    return (
        <div className="profile-sidebar p-3 rounded">
            <div className="p-2 text-center border-bottom">
                {
                    role === 'doctor' ?
                        <div className="profile-info text-center">
                            <Link to={'/'} className="my-3 patient-img"><img src={data?.avatar ? data?.avatar : img} alt="" className='' /></Link>
                            <div className='profile-details'>
                                <h5 className='mb-0'>{data?.name}</h5>
                                <h5 className='mb-0'>{data?.email}</h5>
                                <div>
                                    <p className="mb-0">{data?.designation}</p>
                                    <p className="mb-0">{data?.specialization}</p>
                                    <p className="mb-0">{data?.clinicName}</p>
                                    <p className="mb-0">{data?.clinicAddress}</p>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="profile-info text-center">
                            <Link to={'/'} className="my-3 patient-img"><img src={data?.avatar ? data?.avatar : img} alt="" /></Link>
                            <div className='profile-details'>
                                <h5 className='mb-0'>{data?.name}</h5>
                                <h5 className='mb-0'>{data?.email}</h5>
                                <div className='mt-2'>
                                    <p className=' form-text m-0'>{data?.address}</p>
                                </div>
                            </div>
                        </div>
                }

            </div>
            <nav className="dashboard-menu">
                
                {
                    role === 'admin' ? 
                    <ul>
                        <li>
                                <NavLink to={'/dashboard/profile-setting'} activeClassName="active">
                                    <FaUserCog className="icon" />
                                    <span>Hồ sơ</span>
                                </NavLink>
                            </li>       
                    </ul>
                    :
                    role === 'patient' ?
                        <ul>
                            <li>
                                <NavLink to={'/dashboard'} activeClassName="active" end>
                                    <FaTable className="icon" />
                                    <span>Trang chủ</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/profile-setting'} activeClassName="active">
                                    <FaUserCog className="icon" />
                                    <span>Hồ sơ</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to={'/dashboard/change-password'} activeClassName="active">
                                    <FaLock className="icon" />
                                    <span>Đổi mật khẩu</span>
                                </NavLink>
                            </li>
                        </ul>
                        :
                        <ul>
                            <li>
                                <NavLink to={'/dashboard'} activeClassName="active" end>
                                    <FaTable className="icon" />
                                    <span>Trang chủ</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/appointments'} activeClassName="active" end >
                                    <FaCalendarDay className="icon" />
                                    <span>Cuộc hẹn</span>
                                </NavLink>
                            </li>
                            {/* <li>
                                <NavLink to={'/dashboard/my-patients'} activeClassName="active" end>
                                    <FaUserInjured className="icon" />
                                    <span>Bệnh nhân của tôi</span>
                                </NavLink>
                            </li> */}
                            <li>
                                <NavLink to={'/dashboard/prescription'} activeClassName="active" end>
                                    <FaUserInjured className="icon" />
                                    <span>Đơn thuốc</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/schedule'} activeClassName="active" end>
                                    <FaCalendarDay className="icon" />
                                    <span>Lịch làm việc</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/invoices'} activeClassName="active" end>
                                    <FaHourglassStart className="icon" />
                                    <span>Hóa đơn</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to={'/dashboard/reviews'} activeClassName="active" end>
                                    <FaRegStar className="icon" />
                                    <span>Đánh giá</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to={'/dashboard/profile-setting'} activeClassName="active" end>
                                    <FaUserCog className="icon" />
                                    <span>Hồ sơ</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to={'/dashboard/change-password'} activeClassName="active" end>
                                    <FaLock className="icon" />
                                    <span>Đổi mật khẩu</span>
                                </NavLink>
                            </li>
                        </ul>
                }
            </nav>
        </div>
    )
}
export default DashboardSidebar;