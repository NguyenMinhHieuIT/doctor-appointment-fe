import React from 'react';
import './InfoPage.css';
import { FaClock, FaHeadset,FaHouseUser  } from "react-icons/fa";
import { Link } from 'react-router-dom';

const InfoPage = () => {
    return (
        <section className="why-us mt-5 mt-md-0">
            <div className="container">

                <div className="row">
                    <div className="col-lg-4 d-flex align-items-stretch">
                        <div className="content">
                            <h3>Tại sao chọn chúng tôi?</h3>
                            <p>
                            Đặt lịch hẹn với bác sĩ nhanh chóng và tiện lợi, mọi lúc mọi nơi. Chỉ cần vài cú click, bạn đã có thể chọn thời gian phù hợp và xác nhận cuộc hẹn với bác sĩ của mình.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-8 d-flex align-items-stretch">
                        <div className="icon-boxes d-flex flex-column justify-content-center">
                            <div className="row">
                                <div className="col-xl-4 d-flex align-items-stretch">
                                    <div className="icon-box mt-4 mt-xl-0">
                                        <FaHouseUser className="icon"/>
                                        <h4>Cuộc hẹn</h4>
                                        <small className='text-secondary'>Dịch vụ 24 giờ </small>
                                        <p>Kết nối với bác sĩ một cách dễ dàng và nhanh chóng qua hệ thống đặt lịch hẹn trực tuyến của chúng tôi. Tiết kiệm thời gian, tăng cường hiệu quả chăm sóc sức khỏe.</p>
                                    </div>
                                </div>
                                <div className="col-xl-4 d-flex align-items-stretch">
                                    <div className="icon-box mt-4 mt-xl-0">
                                        <FaHeadset className="icon"/>
                                        <h4>Liên hệ</h4>
                                        <h6 className='text-secondary'>+84 971790548</h6>
                                        <p>Đơn giản hóa việc đặt lịch hẹn với bác sĩ. Truy cập trang web của chúng tôi để xem lịch trống và đặt hẹn ngay lập tức, không cần phải chờ đợi.</p>
                                    </div>
                                </div>
                                <div className="col-xl-4 d-flex align-items-stretch">
                                    <div className="icon-box mt-4 mt-xl-0">
                                        <FaClock className="icon"/>
                                        <h4>Giờ làm việc</h4>
                                        <small className='text-secondary'>Lịch trình</small>
                                        <ul className='list-group list-group-flush'>
                                        <li className="list-group-item d-flex justify-content-between text-nowrap" ><p>Sun - Wed : </p> <p>8:00 - 17: 00</p></li>
                                        <li className="list-group-item d-flex justify-content-between text-nowrap" ><p>Thus - Fri : </p> <p>9:00 - 17: 00</p></li>
                                        <li className="list-group-item d-flex justify-content-between text-nowrap" ><p>Sat - Sun : </p> <p>10:00 - 17: 00</p></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default InfoPage