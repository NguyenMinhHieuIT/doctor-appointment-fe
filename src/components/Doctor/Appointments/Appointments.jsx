import React, { useEffect } from 'react';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import img from '../../../images/avatar.jpg';

import './Appointments.css';
import { useGetDoctorAppointmentsQuery, useUpdateAppointmentMutation } from '../../../redux/api/appointmentApi';
import moment from 'moment';
import { Button, Empty, message, Tag, Tooltip } from 'antd';
import { FaEye, FaCheck, FaTimes } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaClock, FaEnvelope, FaLocationArrow, FaPhoneAlt, FaBriefcaseMedical } from "react-icons/fa";
import { appointStatusDsc } from '../../../constant/appointmentStatus';

const Appointments = () => {
    const { data, isError, isLoading } = useGetDoctorAppointmentsQuery({});
    const [updateAppointment, { isError: updateIsError, isSuccess, error }] = useUpdateAppointmentMutation();
    const updatedApppointmentStatus = (id, type) => {
        const changeObj = {
            status: type
        }
        if (id) {
            updateAppointment({ id, data: changeObj })
        }
    }

    useEffect(() => {
        if (isSuccess) {
            message.success("Succcessfully Appointment Updated")
        }
        if (isError) {
            message.error(error?.data?.message);
        }
    }, [isSuccess, updateIsError, error])

    let content = null;
    if (!isLoading && isError) content = <div>Something Went Wrong !</div>
    if (!isLoading && !isError && data?.length === 0) content = <Empty />
    if (!isLoading && !isError && data?.length > 0) content =
        <>
            {
                data && data.map((item) => (
                    <div className="w-100 mb-3 rounded p-3" style={{ background: '#f8f9fa' }} key={item.id}>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center gap-3">
                                <Link to={`/`} className="patient-img">
                                    <img src={item?.patient?.avatar ?? img} alt="" />
                                </Link>
                                <div className="patients-info">
                                    <h5>{item?.patient?.name}</h5>
                              

                                    <div className="info mt-2">
                                        <p><FaClock className='icon' /> {moment(item?.scheduleDate).format("MMM Do YY")} </p>
                                        {item?.patient?.address && <p><FaLocationArrow className='icon' /> {item?.patient?.address}</p>}
                                        {item?.patient?.email && <p><FaEnvelope className='icon' /> {item?.patient?.email}</p>}
                                        {item?.patient?.phone && <p><FaPhoneAlt className='icon' />{item?.patient?.phone}</p>}

                                    </div>
                                </div>
                                <div className='appointment-status card p-3 border-primary'>
                                    <p>Status - <span><Tag color="#f50" className='text-uppercase'>{item?.status}</Tag></span></p>
                                </div>
                            </div>
                            <div className='d-flex gap-2'>
                                <Link to={`/dashboard/appointments/${item?.id}`}>
                                    <Button type="primary" icon={<FaEye />} size="small">Xem</Button>
                                </Link>
                                {
                                    !item.prescriptionStatus
                                        ?
                                        <Link to={`/dashboard/appointment/treatment/${item?.id}`}>
                                            <Button type="primary" icon={<FaBriefcaseMedical />} size="small">Đơn thuốc</Button>
                                        </Link>
                                        :
                                        <Link to={`/dashboard/prescription/${item?.prescription[0]?.id}`}>
                                            <Button type="primary" icon={<FaEye />} size="small" >Đơn thuốc</Button>
                                        </Link>
                                }
                                {
                                    item?.isFollowUp && <Link to={`/dashboard/appointment/treatment/edit/${item?.prescription[0]?.id}`}>
                                        <Button type="primary" icon={<FaBriefcaseMedical />} size="small">Follow Up</Button>
                                    </Link>
                                }

                                {
                                    item?.status === 'Đang chờ' &&
                                    <>
                                        <Button type="primary" icon={<FaCheck />} size="small" onClick={() => updatedApppointmentStatus(item.id, 'scheduled')}>Chấp nhận</Button>
                                        <Button type='primary' icon={<FaTimes />} size="small" danger onClick={() => updatedApppointmentStatus(item.id, 'cancel')}>Bỏ qua</Button>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    return (
        <DashboardLayout>
            {content}
        </DashboardLayout>
    )
}

export default Appointments