import React from 'react'
import AdminLayout from '../AdminLayout/AdminLayout'
import './Dashboard.css';
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
import { useAdminGetStatDoctorQuery } from '../../../redux/api/adminApi';

const AdminDashboard = () => {
    const { data: doctorStat, refetch } = useAdminGetStatDoctorQuery();
    return ( 
        <>
            <AdminLayout >
                <div className="row">
                    <div className="col-xl-3 col-sm-6 col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="dash-widget-header">
                                    <div className='text-primary' style={{fontSize:'40px'}}> <FaUserMd/> </div>
                                   
                                    <div className="dash-count">
                                        <h3>168</h3>
                                    </div>
                                </div>
                                <div className="dash-widget-info">
                                    <h6 className="text-muted">Số lượng bác sĩ</h6>
                                    <div className="progress progress-sm">
                                        <div className="progress-bar bg-primary w-50"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="dash-widget-header">
                                <div className='text-success' style={{fontSize:'40px'}}> <FaUserInjured/> </div>
                                    <div className="dash-count">
                                        <h3>487</h3>
                                    </div>
                                </div>
                                <div className="dash-widget-info">

                                    <h6 className="text-muted">Số lượng bệnh nhân</h6>
                                    <div className="progress progress-sm">
                                        <div className="progress-bar bg-success w-50"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="dash-widget-header">
                                <div className='text-danger' style={{fontSize:'40px'}}> <FaListUl/> </div>
                                    <div className="dash-count">
                                        <h3>485</h3>
                                    </div>
                                </div>
                                <div className="dash-widget-info">

                                    <h6 className="text-muted">Số lượng cuộc hẹn</h6>
                                    <div className="progress progress-sm">
                                        <div className="progress-bar bg-danger w-50"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="dash-widget-header">
                                <div className='text-warning' style={{fontSize:'40px'}}> <FaDonate/> </div>
                                    <div className="dash-count">
                                        <h3>$62523</h3>
                                    </div>
                                </div>
                                <div className="dash-widget-info">

                                    <h6 className="text-muted">Tổng doanh thu</h6>
                                    <div className="progress progress-sm">
                                        <div className="progress-bar bg-warning w-50"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               
            </AdminLayout>
        </>
    )
}
export default AdminDashboard;