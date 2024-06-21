import React, { useEffect } from 'react';
import Footer from '../Shared/Footer/Footer';
import { FaBriefcase, FaCalendarCheck, FaRegClock, FaLocationArrow, FaCalendarAlt, FaLink, FaAlignLeft  } from "react-icons/fa";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Tag, Tooltip } from 'antd';
import moment from 'moment';
import { Empty } from 'antd';
import Header from '../Shared/Header/Header';
import { useGetSingleAppointmentQuery } from '../../redux/api/appointmentApi';
import { clickToCopyClipBoard } from '../../utils/copyClipBoard';

const BookingSuccess = () => {
    const { id } = useParams();
    const { data } = useGetSingleAppointmentQuery(id);
    const start = moment(data?.startTime, 'hh:mm a');
    const end = moment(data?.endTime, 'hh:mm a');

    const duration = moment.duration(end.diff(start));
    const minutes = duration.asMinutes();

    const navigate = useNavigate();

    useEffect(() => {
        const timeOut = setTimeout(() => {
            if (!data?.id) {
                navigate('/');
            }
        }, 5000)
        return () => clearTimeout(timeOut)
    }, [navigate, data])

    return (
        <>
            <Header />
            <div className="container mx-auto d-flex justify-content-center align-items-center text-center">
                {
                    data?.id ?

                        <div className=" p-3" style={{ marginTop: '8rem', marginBottom: '5rem', height: '60vh', background: '#f8f9fa', maxWidth: '400px' }}>

                            <div className='border-bottom my-2'>
                                <FaCalendarCheck style={{ fontSize: '2.5rem' }} className='text-success' />
                                <h6 className='py-2'>Cuộc hẹn đã được lên lịch</h6>
                            </div>

                            <div className='card border-0 p-3 rounded mb-5'>
                                <div className='d-flex gap-3 mb-2 align-items-center'>
                                    <FaAlignLeft style={{ fontSize: '1rem' }}/>
                                    <Link to={`/dashboard/appointments/${id}`}><h5 className='text-primary'>Xem chi tiết cuộc hẹn</h5></Link>
                                </div>
                                <div className='d-flex gap-3 mb-1'>
                                    <FaBriefcase style={{ fontSize: '1rem' }} />
                                    <p>Doctor: { data?.doctor?.name }</p>
                                </div>
                                <div className='d-flex gap-3 mb-1'>
                                    <FaRegClock style={{ fontSize: '1rem' }} />
                                    <p>{minutes} phút</p>
                                </div>
                                <div className='d-flex gap-3 mb-1'>
                                    <div><FaLocationArrow style={{ fontSize: '1rem' }} /></div>
                                    <p className='text-start'>{data?.doctor?.clinicAddress}</p>
                                </div>
                                <div className='d-flex gap-3'>
                                    <div><FaCalendarAlt style={{ fontSize: '1rem' }} /> </div>
                                    <p>{(data?.scheduleDate && data?.startTime && data?.endTime) && moment(data.scheduleDate).format('LL') + '/ ' + data?.startTime + ' - ' + data?.endTime}</p>
                                </div>
                            </div>
                        </div>
                        :
                        <div className='rounded p-3 d-flex flex-column justify-content-center align-items-center' style={{ background: "#f8f9fa", marginTop: '8rem', marginBottom: '5rem' }} >
                            <Empty />
                            <h6 className='p-2 my-3'>You will be redirect to homepage !</h6>
                        </div>
                }
            </div>
            <Footer />
        </>

    )
}

export default BookingSuccess