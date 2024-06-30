import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import img from '../../../images/doc/doctor 3.jpg'
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import StarRatings from 'react-star-ratings';
import { useCreateReviewMutation, useGetDoctorReviewsQuery } from '../../../redux/api/reviewsApi';
import { Button, Radio, message, Space, Rate } from 'antd';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import moment from 'moment';
import 'moment/locale/vi'; // Import Vietnamese locale

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
moment.locale('vi'); // Set moment to use Vietnamese

const Review = ({ doctorId, refetch }) => {
    const { register, handleSubmit, } = useForm({});
    const [value, setValue] = useState(null);
    const [recommend, setRecommend] = useState(null);
    const [showError, setShowError] = useState(false);

    const { data: dataReview, isError, isLoading } = useGetDoctorReviewsQuery(doctorId);
    const [createReview, { isSuccess: createIsSuccess, isError: createTsError, error: createError, isLoading: createIsLoading }] = useCreateReviewMutation();

    const onChange = (e) => setRecommend(e.target.value);

    useEffect(() => {
        if (recommend !== null && value !== null) {
            setShowError(true)
        }
    }, [recommend, value]);


    const onSubmit = (data) => {
        const obj = {}
        obj.isRecommended = recommend === 1 ? true : recommend === 2 ? false : null;
        obj.description = data.description;
        obj.star = value;
        obj.doctorId = +doctorId;
        if (obj.description !== '') {
            createReview({ data: obj });
        } else {
            toast.error("Bạn chưa điền đánh giá !!");
        }

    };

    useEffect(() => {
        if (!createIsLoading && createTsError) {
            message.error(createError?.dataReview?.message);
            message.error('Bạn phải là bệnh nhân đã đến khám với bác sĩ');
        }
        if (createIsSuccess) {
            toast.success('Thêm đánh giá thành công !');
            setRecommend(null);
            setValue(null);
            refetch()
        }
    }, [createIsLoading, createTsError, createError, createIsSuccess])

    let content = null;
    if (!isLoading && isError) content = <div>Something Went Wrong !</div>
    if (!isLoading && !isError && dataReview?.data.length === 0) content = <div>Empty</div>
    if (!isLoading && !isError && dataReview?.data.length > 0) content =
        <>
            {
                dataReview?.data && dataReview?.data.map((item, key) => (
                    <div className='mb-4' key={item?.id + key}>
                        <div className='d-flex gap-3 justify-content-between'>
                            <div className='d-flex gap-4'>
                                <div className='review-img'>
                                    <img className="" alt="" src={item?.user?.avatar ? item?.user?.avatar : img} />
                                </div>
                                <div>
                                    <h5 className="text-nowrap">{item?.user?.name}</h5>
                                {item?.isRecommended ?
                                    <p className="text-success"><FaRegThumbsUp />Tôi muốn giới thiệu bác sĩ với mọi người </p>
                                    :
                                    <p className='text-danger'><FaRegThumbsDown/> Tôi không muốn giới thiệu bác sĩ với mọi người</p>                                   
                                }
                                    
                                </div>
                            </div>

                            <div className='text-end'>
                                <div>
                                    <StarRatings
                                        rating={5}
                                        starRatedColor="#f4c150"
                                        numberOfStars={5}
                                        name='rating'
                                        starDimension="15px"
                                        starSpacing="2px"
                                    />
                                </div>
                                <div className="">{moment(item?.createdAt).fromNow()}</div>
                            </div>
                        </div>
                        <div>
                            <p className="">{item?.description}</p>
                        </div>
                    </div>
                ))
            }
        </>
    return (
        <>
            <div>
                <div className="w-100 mb-3 rounded py-3 px-2" style={{ background: '#f8f9fa' }}>
                    {content}
                </div>

                <div className="text-center">
                    <Link to={'/'} className='more-btn'>Tất cả đánh giá:  <strong>{dataReview?.meta.totalItems}</strong></Link>
                </div>

                <div className="mt-5">
                    <h4>Viết đánh giá của bạn</h4>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group mb-3">
                            <div className='d-flex flex-column'>
                                <label className='form-label'>Số ngôi sao của bạn {value ? <strong>{desc[value - 1]}</strong> : ''}</label>
                                <Space>
                                    <Rate tooltips={desc} onChange={setValue} value={value} />
                                </Space>
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <Radio.Group onChange={onChange} value={recommend}>
                                <Space direction="vertical">
                                    <Radio value={1}>Giới thiệu bác sĩ</Radio>
                                    <Radio value={2}>Không giới thiệu bác sĩ</Radio>
                                </Space>
                            </Radio.Group>
                        </div>

                        <div className="form-group">
                            <label className='form-label'>Đánh giá</label>
                            <textarea className="form-control" {...register("description")} placeholder="Description..." rows={8} />
                        </div>
                        <hr />
                        <div className="submit-section">
                            <Button htmlType='submit' size='medium' type='primary' disabled={!showError}>Thêm</Button>
                        </div>
                    </form>

                </div>

            </div>


        </>
    )
}

export default Review