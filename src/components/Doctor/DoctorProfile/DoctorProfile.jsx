import React from 'react'
import Footer from '../../Shared/Footer/Footer'
import './index.css';
import { useParams } from 'react-router-dom';
import Header from '../../Shared/Header/Header';
import SubHeader from '../../Shared/SubHeader';
import { useGetDoctorQuery } from '../../../redux/api/doctorApi';
import { Empty, message } from 'antd';
import SearchContent from '../SearchDoctor/SearchContent';
import { Tabs } from 'antd';
import OverView from './OverView';
import Review from './Review';
import useAuthCheck from '../../../redux/hooks/useAuthCheck';

const DoctorProfile = () => {
    const { id } = useParams();
    const { data, refetch, isLoading, isError } = useGetDoctorQuery(id);
    const { authChecked , data: dataUser } = useAuthCheck();
    let content = null;
    if (!isLoading && isError) content = <div>{message.error('Something went Wrong!')}</div>
    if (!isLoading && !isError && data?.id === undefined) content = <Empty />
    if (!isLoading && !isError && data?.id) content = <SearchContent data={data} userData={dataUser} />

    const items = [
        {
            key: '1',
            label: 'Tổng quan',
            children: <OverView data={data}/>,
        },
        {
            key: '2',
            label: 'Đánh giá',
            children: <Review doctorId={id} refetch={refetch}/>,
        }
    ];

    
    return (
        <>
            <Header />
            <div className="container" style={{ marginBottom: '4rem', marginTop: '6rem' }}>
                {content}
                <div className='p-4 rounded' style={{ marginBottom: '7rem', backgroundColor: '#f3f3f3' }}>
                    <Tabs defaultActiveKey="1" items={items} />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default DoctorProfile;