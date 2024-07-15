import React, { useState } from 'react';
import './Reviews.css';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import img from '../../../images/avatar.jpg';
import { useGetDoctorReviewsQuery } from '../../../redux/api/reviewsApi';
import { FaRegThumbsUp, FaRegThumbsDown, FaRegTrashAlt } from "react-icons/fa";
import moment from 'moment';
import StarRatings from 'react-star-ratings';
import useAuthCheck from '../../../redux/hooks/useAuthCheck';
import { Empty } from 'antd';
import { getFromLocalStorage } from '../../../utils/local-storage';
import { Pagination } from 'antd';
import ModalDelete from './ModalDelete';
const Reviews = () => {
    const { data: loginInfo, userId } = useAuthCheck();
    const [pageSize, setPageSize] = useState(5);
    const [pageNumber, setPageNumber] = useState(1);
    const [show, setShow] = useState(false);
    const doctorId = getFromLocalStorage('userId');
    const [id, setId] = useState(0);
    const [query, setQuery] = useState({ 
        pageSize: pageSize,
        pageNumber: pageNumber,
        search: doctorId + '',
        searchFields: ['doctorId']
    });
    const { data: dataReview, isError, isLoading, refetch } = useGetDoctorReviewsQuery(query);
    let data = dataReview?.data;
    let meta = dataReview?.meta;
    const onDelete = (id) => {
        setShow(true);
        setId(id);
    }
    const handleClose = () => {
        setShow(false);
    }

    let content = null;
    if (!isLoading && isError) content = <div>Something Went Wrong !</div>
    if (!isLoading && !isError && data?.length === 0) content = <Empty />
    if (!isLoading && !isError && data?.length > 0) content =
        <>
            {
                data && data.map((item, key) => (
                    <div className='mb-4' key={item?.id + key}>
                        <div className='d-flex gap-3 justify-content-between'>
                            <div className='d-flex gap-4'>
                                <div className='review-img'>
                                    <img className="mt-3" alt="" src={item?.user?.avatar ? item?.user?.avatar : img} />
                                    
                                </div>
                                <div>
                                    <h5 className="text-nowrap text-capitalize">{item?.user?.name} 
                                        <span className='text-danger' onClick={() => onDelete(item?.id)}> <FaRegTrashAlt/> </span>
                                    </h5>
                                    <div>
                                        {item?.isRecommended ?
                                        <span className="text-success"><FaRegThumbsUp/></span>
                                        :
                                        <span className='text-danger'><FaRegThumbsDown/></span>                                   
                                        }
                                        <span className="mx-2 form-text">{item?.description}</span>
                                    </div>
                                </div>
                            </div>

                            <div className='text-end'>
                                <div>
                                    <StarRatings
                                        rating={item.star}
                                        starRatedColor="#f4c150"
                                        numberOfStars={5}
                                        name='rating'
                                        starDimension="15px"
                                        starSpacing="2px"
                                    />
                                </div>
                                <div className="">Reviewed {moment(item?.createdAt).startOf('day').fromNow()}</div>
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>
                ))
            }
        </>

const onPaginationChange = (page, pageSizee) => {
    if (page !== pageNumber) {
      setPageNumber(page);
      setPageSize(pageSizee);
      setQuery({
        pageSize: pageSizee,
        pageNumber: page,
        search: doctorId + '',
        searchFields: ['doctorId']
      });
    }

    if (pageSizee !== pageSize) {
      setPageNumber(1);
      setPageSize(pageSizee);
      setQuery({
        pageSize: pageSizee,
        pageNumber: 1,
        search: doctorId + '',
        searchFields: ['doctorId']
      });
    }
    meta = dataReview?.meta;
    data = dataReview?.data;
}


    return (
        <DashboardLayout>
            <ModalDelete show={show} handleClose={handleClose} id={id} refetch={refetch} />
            <div className="w-100 mb-3 rounded py-3 px-2" style={{ background: '#f8f9fa' }}>
                {content}
            </div>
            <div className='text-center mt-5 mb-5'>
                <Pagination
                  showSizeChanger
                  onChange={onPaginationChange}
                  total={meta?.totalPages * meta?.pageSize}
                  pageSizeOptions={[1, 2, 3, 5, 10, 20, 30]} 
                  current={pageNumber}
                  pageSize={pageSize}
                />
              </div>
        </DashboardLayout>
    )
}

export default Reviews;