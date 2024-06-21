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
                            Điều quan trọng là phải chăm sóc bệnh nhân, được bệnh nhân theo dõi, nhưng điều đó sẽ xảy ra vào thời điểm có rất nhiều công sức và đau đớn. Duis hay irure nỗi đau khiển trách những nỗi đau khắc nghiệt hơn nhưng và Nó được tổ chức bởi vì họ Tuy nhiên, ở những thời điểm hoặc nhu cầu nhất định, sự lựa chọn của cơ thể.
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
                                        <p>Chúng là kết quả hoặc có thể nói là của một cái gì đó tương đương với những lao động này, ngoại trừ một số</p>
                                    </div>
                                </div>
                                <div className="col-xl-4 d-flex align-items-stretch">
                                    <div className="icon-box mt-4 mt-xl-0">
                                        <FaHeadset className="icon"/>
                                        <h4>Trường hợp khẩn cấp</h4>
                                        <h6 className='text-secondary'>+88 01751 040425</h6>
                                        <p>Cảm ơn rất nhiều. Những người dễ chịu vì nhất. Chịu đựng gánh nặng lao động chẳng là gì cả, đau đớn và rắc rối.</p>
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