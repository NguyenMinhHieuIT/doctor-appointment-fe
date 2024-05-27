import React, { useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useGetSingleAppointmentQuery } from '../../../redux/api/appointmentApi';
import Header from '../../Shared/Header/Header';
import Footer from '../../Shared/Footer/Footer';
import moment from 'moment';
import './index.css';
import { Button, Tag } from 'antd';
import { clickToCopyClipBoard } from '../../../utils/copyClipBoard';
import { FaPrint } from "react-icons/fa";
import ReactToPrint from "react-to-print";
import avatar from '../../../images/avatar.jpg'
const ViewAppointment = () => {
    const ref = useRef();
    const { id } = useParams();
    const { data, isLoading, isError } = useGetSingleAppointmentQuery(id);
    
    let content = null;
    if (!isLoading && isError) content = <div>Something Went Wrong!</div>
    if (isLoading && !isError) content = <h2>Loading...</h2>
    if (!isLoading && !isError && data?.id) content =
        <>
            <page size="A4" className="container mx-auto border border-primary-subtle p-3 pb-3">
                <div className='d-flex justify-content-between rounded p-2' style={{ background: '#f2f4fe' }}>
                    <div>
                        <p className='form-text text-black mb-0'> <b>Ngày tạo :</b>  <Tag bordered={false} color="volcano">{moment(data?.createdAt).format('LL')}</Tag></p>
                    </div>

                    <div style={{ fontWeight: 500 }}>
                        {data?.patientType &&
                        <p className='mb-1'>Patient Type : <Tag bordered={false} color="processing">{data?.patientType}</Tag></p>}
                        <p className='mb-1'>Current Status:  <Tag bordered={false} color="orange">{data?.status}</Tag></p>
                        <p className='mb-1'>Payment : <Tag bordered={false} color="success">{data?.paymentStatus}</Tag></p>
                        <p className='mb-1'>Prescription Status : <Tag bordered={false} color="green">{data?.prescriptionStatus}</Tag></p>
                    </div>
                </div>

                <div>
                    <h4 className='text-center my-3 fw-bold'>
                        THÔNG TIN CUỘC HẸN
                    </h4>
                    <div className='border border-light-subtle rounded p-3'>
                        <p className='mb-1'>Hình thức: <Tag bordered={false} color="#f50">OFFLINE</Tag></p>
                        {data?.link && <p className='mb-1'>Meeting Link : <a href={data?.link}target='_blank' rel='noreferrer'>{data?.link}</a></p>}
                        <p className='mb-1'>Ngày : <Tag bordered={false} color="orange">{moment(data?.scheduleDate).format('LL')}</Tag></p>
                        <p className='mb-1'>Thời gian : <Tag bordered={false} color="orange">{data?.startTime + ' _ ' + data?.endTime }</Tag></p>
                        <p className='mb-1'>Cơ sở : <Tag bordered={false} color="orange">{data?.doctor?.clinicName }</Tag></p>
                        <p className='mb-1'>Địa điểm : <Tag bordered={false} color="orange">{data?.doctor?.clinicAddress }</Tag></p>
                    </div>
                </div>

                <div>
                    <h4 className='text-center my-3 fw-bold text-secondary'>THÔNG TIN BÁC SĨ</h4>
                    {
                        data?.doctor &&
                        <div className='border border-light-subtle rounded p-3 d-flex gap-3'>
                            <div>
                                <img src={data?.doctor?.avatar ?? avatar} alt="" style={{ border: '2px solid #ffbc21', width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', objectPosition: 'top' }} />
                            </div>
                            <div>
                                <h4 className="mb-1">{data?.doctor.name}</h4>
                                <p className="mb-1">{data?.doctor?.specialization}</p>
                                <p className="mb-1 form-text">Tuổi : {data?.doctor?.age}</p>
                                <p className="mb-1 form-text">Địa chỉ : {data?.doctor?.address}</p>
                                <p className="mb-1 form-text">Chứng chỉ : {data?.doctor?.designation}</p>
                                <p className="mb-1 form-text">Tốt nghiệp : {data?.doctor?.college}</p>
                            </div>
                        </div>
                    }
                </div>

                <div>
                    <h4 className='text-center my-3 fw-bold text-secondary'>THÔNG TIN NGƯỜI BỆNH</h4>
                    <div className='border border-light-subtle rounded p-3 d-flex gap-3'>
                        <div>
                            <img src={data?.patient?.avatar ?? avatar} alt="" style={{ border: '2px solid #ffbc21', width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', objectPosition: 'top' }} />
                        </div>
                        <div>

                            <h4 className="mb-1">{data?.patient?.name}</h4>
                            <p className="mb-1 form-text">Tuổi : {data?.patient?.age}</p>
                            <p className="mb-1 form-text">Nhóm máu : {data?.patient?.bloodGroup}</p>
                            <p className="mb-1 form-text">Trạng thái : {data?.patient?.state}</p>
                            <p className="mb-1 form-text">Địa chỉ: {data?.patient?.address}</p>

                            <div className='mt-2'>
                                <p>Lý do thăm khám - <span className='text-warning'>{data?.reasonForVisit}</span></p>
                                <p className='text-warning'>{data?.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </page>
        </>
    return (
        <>
            <Header />
            <div style={{ margin: '10rem 7rem' }}>
                <div className="d-flex justify-content-end mb-4" style={{ marginRight: '8rem' }}>
                    <ReactToPrint
                        bodyClass="print-agreement"
                        content={() => ref.current}
                        trigger={() => (<Button type="primary" icon={<FaPrint />}> Print</Button>)}
                    />
                </div>
                <div ref={ref}>
                    {content}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ViewAppointment