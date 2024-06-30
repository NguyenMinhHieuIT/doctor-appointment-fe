import React from 'react';
import { Link } from 'react-router-dom';
import showImg from '../../../images/specialities/specialities-01.png'
import showImg1 from '../../../images/specialities/specialities-02.png'
import showImg2 from '../../../images/specialities/specialities-03.png'
import showImg3 from '../../../images/specialities/specialities-04.png'
import showImg4 from '../../../images/specialities/specialities-05.png'
import avatar from '../../../images/avatar.jpg';
import StarRatings from 'react-star-ratings';
import { Tag } from 'antd';
import './index.css';
import { FaLocationArrow, FaRegThumbsUp, FaDollarSign, FaComment } from "react-icons/fa";
import { truncate } from '../../../utils/truncate';
import { Special } from '../../../constant/global';

const SearchContent = ({ data, userData }) => {
    const services = data?.services?.split(',');
    let imgSpecial = null;
    switch(data?.specialization){
        case Special[0]:
            imgSpecial = showImg;
            break;
        case Special[1]:
            imgSpecial = showImg1;
            break;
        case Special[2]:
            imgSpecial = showImg2;
            break;
        case Special[3]:
            imgSpecial = showImg3;
            break;
        case Special[4]:
            imgSpecial = showImg4;
            break;
    }
    return (
        <div className="mb-4 rounded" style={{ background: '#f3f3f3' }}>
            <div className='d-flex p-3 justify-content-between'>
                <div className='d-flex gap-3'>
                    <div className='doc-img-fluid d-flex align-items-center'>
                        <img src={ data?.avatar ? data?.avatar : avatar } className="" alt="User Image" />
                    </div>
                    <div className="doc-info">
                        <h5 className='mb-0'><Link to={`/doctors/profile/${data?.id}`}>Dr. {data?.name}</Link></h5>
                        <p className='m-0 form-text'>{data?.email}</p>               
                        <p className="doc-department m-0"><img src={imgSpecial} className="img-fluid" alt="Speciality" />
                        {data?.specialization}</p>
                             
                        <div className='d-flex align-items-center'>
                            <div>
                                <StarRatings
                                    rating={data?.like*5/100}
                                    starRatedColor="#f4c150"
                                    numberOfStars={5}
                                    name='rating'
                                    starDimension="15px"
                                    starSpacing="2px"
                                />
                            </div>
                            <div>({data?.totalReview})</div>
                        </div>

                        <div className="clinic-details">
                            <p className="form-text text-secondary"><FaLocationArrow /> { data?.clinicName } <br />
                            Địa chỉ: {data?.clinicAddress}</p>
                            <ul className="clinic-gallery mt-3">
                                <li>
                                    <img src={imgSpecial} alt="Feature" style={{ maxWidth: "30px" }} />
                                </li>
                                <li>
                                    <img src={imgSpecial} alt="Feature" style={{ maxWidth: "30px" }} />
                                </li>
                                <li>
                                    <img src={imgSpecial} alt="Feature" style={{ maxWidth: "30px" }} />
                                </li>
                                <li>
                                    <img src={imgSpecial} alt="Feature" style={{ maxWidth: "30px" }} />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="doc-info-right me-3">
                    <div className="clini-infos">
                        <ul>
                            <li><FaRegThumbsUp /> {data?.like} %</li>
                            <li><FaComment /> {data?.totalReview} Nhận xét</li>
                            <li><FaDollarSign /> {data?.price} vnđ/30p</li>
                        </ul>
                    </div>
                    <div className="clinic-booking">
                        <Link to={`/doctors/profile/${data?.id}`} className="view-pro-btn">Thông tin cá nhân</Link>
                        {userData?.role === 'doctor' ? null : <Link to={`/booking/${data?.id}`} className="apt-btn">Đặt lịch khám</Link>}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SearchContent