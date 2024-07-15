import React from 'react';
import './index.css';
import img from '../../../images/doc/doc1.jpg'
import img2 from '../../../images/doc/doc4.jpg'
import img3 from '../../../images/doc/doctor 5.jpg';
import img4 from '../../../images/doctor/b5a1.jpg';
import img5 from '../../../images/doctor/doctor1.jpg';
import { Link } from 'react-router-dom';

const Service = () => {
    return (
        <section className="container" style={{marginTop: 200, marginBottom:200}}>
            <div className='mb-5 section-title text-center'>
                <h2>Dịch vụ</h2>
            </div>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-4 col-sm-6">
                        <div className="service-img">
                            <img src={img4} alt="" className="img-fluid" />
                            <img src={img2} alt="" className="img-fluid mt-4" />
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <div className="service-img mt-4 mt-lg-0">
                            <img src={img5} alt="" className="img-fluid" />
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="service-content ps-4 mt-4 mt-lg-0">
                            <h2>Chăm sóc cá nhân <br /> lối sống lành mạnh</h2>
                            <p className="mt-4 mb-5 text-secondary form-text">Chúng tôi cung cấp dịch vụ y tế hàng đầu tốt nhất.</p>
                            <Link to={'/about'} className="btn-get-started scrollto">Về chúng tôi</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Service