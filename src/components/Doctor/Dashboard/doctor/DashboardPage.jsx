import React, { useEffect, useState } from 'react'
import img from '../../../../images/avatar.jpg';
import { FaEye, FaCheck, FaTimes, FaBriefcaseMedical } from "react-icons/fa";
import { useGetDoctorAppointmentsQuery, useUpdateAppointmentMutation } from '../../../../redux/api/appointmentApi';
import moment from 'moment';
import { Button, Tag, message } from 'antd';
import CustomTable from '../../../UI/component/CustomTable';
import { Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { StatusAppoint } from '../../../../constant/global';
import { toast } from 'react-toastify';
import DoctorDashCard from './DoctorDashCard';

const DashboardPage = () => {
    const [sortBy, setSortBy] = useState("upcoming");
    let { data, refetch, isLoading } = useGetDoctorAppointmentsQuery({});
    const [pageSize, setPageSize] = useState(5);
    const [pageNumber, setPageNumber] = useState(1);
    const [updateAppointment, { isError, isSuccess, error }] = useUpdateAppointmentMutation();
    
    const day = moment().format('YYYY-MM-DD') + '';
    const tData = data?.filter(i => i.scheduleDate.indexOf(day) !== -1)
    const handleOnselect = (value) => {
        // eslint-disable-next-line eqeqeq
        setSortBy(value == 1 ? 'upcoming' : value == 2 ? 'today' : sortBy)
        refetch()
    }

    const onPaginationChange = (page, pageSize) => {
        setPageNumber(page);
        setPageSize(pageSize);
    }

    const updatedApppointmentStatus = (data, type) => {
        const changeObj = {
            status: type
        }
        if (data.id) {
            updateAppointment({ id: data.id, data: changeObj })
        }
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success('Cập nhật cuộc hẹn thành công');
        }
        if (isError) {
            message.error(error?.data?.message);
        }
    }, [isSuccess, isError, error])

    const upcomingColumns = [
        {
            title: 'Bệnh nhân',
            key: '1',
            width: 50,
            render: function (data) {
                const fullName = `${data?.patient?.name ?? ''}`;
                const patientName = fullName.trim() || "Un Patient";
                return <>
                    <div className="table-avatar">
                        <a className="avatar-sm mr-2 d-flex gap-2">
                            <div>
                                <p className='p-0 m-0 text-nowrap'>
                                    {patientName}
                                </p>
                                <p className='p-0 m-0'>{data?.patient?.designation}</p>
                            </div>
                        </a>
                    </div>
                </>
            }
        },
        {
            title: 'Email bệnh nhân',
            key: '3',
            width: 50,
            render: function (data) {
                return (
                    <p>{ data?.email }</p>
                )
            }
        },
        {
            title: 'Lý do khám',
            key: '4',
            width: 50,
            render: function (data) {
                return (
                    <p>{ data?.reasonForVisit }</p>
                )
            }
        },
        {
            title: 'Trạng Thái',
            key: '5',
            width: 50,
            render: function (data) {
                return (
                    <Tag color="#87d068" className='text-uppercase'>{data?.status}</Tag>
                )
            }
        },
        {
            title: 'Ngày hẹn',
            key: '2',
            width: 50,
            render: function (data) {
                return (
                    <div>{moment(data?.scheduleDate).format("LL")} <span className="d-block text-info">{data?.startTime + ' _ ' + data?.endTime }</span></div>
                )
            }
        },
        {
            title: 'Ngày tạo cuộc hẹn',
            key: '2',
            width: 50,
            render: function (data) {
                return (
                    <div>{moment(data?.createdAt).format("LL")}</div>
                )
            }
        },
        {
            title: 'Hành động',
            key: '6',
            width: 50,
            render: function (data) {
                return (
                    <div className='d-flex gap-2'>
                        {
                            data?.status === 'Bỏ qua' || data?.status === 'Đang chờ' ? null :
                            
                                !data.prescriptionStatus
                                    ?
                                    <Link to={`/dashboard/appointment/treatment/${data?.id}`}>
                                        <Button type="primary" icon={<FaBriefcaseMedical />} size="small">+</Button>
                                    </Link>
                                    :
                                    <Link to={`/dashboard/prescription/${data?.prescription[0]?.id}`}>
                                        <Button type="primary" shape="circle" icon={<FaBriefcaseMedical />} size="small" />
                                    </Link>
                            
                        }
                         <Link to={`/dashboard/appointments/${data?.id}`}>
                            <Button type="primary" shape="circle" icon={<FaEye />} size="small" />
                        </Link>
                        {
                            data?.status === 'Đang chờ' &&
                            <>
                                <Button type="primary" icon={<FaCheck />} size="small" onClick={() => updatedApppointmentStatus(data, StatusAppoint.CONFIRMED)}>{StatusAppoint.CONFIRMED}</Button>
                                <Button type='primary' icon={<FaTimes />} size='small' danger onClick={() => updatedApppointmentStatus(data, StatusAppoint.CANCEL)}>{StatusAppoint.CANCEL}</Button>
                            </>
                        }
                    </div>
                )
            }
        },
    ];

    const items = [
        {
            key: '1',
            label: 'Cuộc hẹn của tôi',
            children: <CustomTable
                loading={isLoading}
                columns={upcomingColumns}
                dataSource={data}
                showPagination={true}
                pageSize={pageSize}
                currentPage={pageNumber}
                showSizeChanger={true}
                onPaginationChange={onPaginationChange}
            />,
        },
        {
            key: '2',
            label: 'Hôm nay',
            children: <CustomTable
                loading={isLoading}
                columns={upcomingColumns}
                dataSource={tData}
                showPagination={true}
                pageSize={10}
                showSizeChanger={true}
            />,
        },
    ];

    return (
        <>
        <DoctorDashCard 
                    totalPatient={data?.patient && data.patient}
                    todayPatient={tData?.length}
                    totalAppoint={data?.length}
                />
        <Tabs defaultActiveKey="1" items={items} onChange={handleOnselect} />
        </>
    )
}

export default DashboardPage;