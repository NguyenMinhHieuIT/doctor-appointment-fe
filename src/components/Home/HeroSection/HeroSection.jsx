import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <section id="hero" className="d-flex align-items-center">
            <div className="container">
                <div>
                    <h1>Giải pháp chăm sóc <br /> sức khỏe tổng thể <br />Đối tác sức khỏe của bạn</h1>
                </div>
                <div className="d-flex justify-content-start gap-2">
                    <Link to={'/doctors'} className="btn-get-started scrollto">Bắt đầu</Link>
                </div>
            </div>
        </section>
    )
}
export default HeroSection;