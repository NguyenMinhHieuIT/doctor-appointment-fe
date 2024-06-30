import React from 'react';
import './Footer.css';
import logo from '../../../images/logo.webp';
import { Link } from 'react-router-dom';
import { FaAngleDoubleRight } from "react-icons/fa";

const Footer = () => {
	return (
		<footer className="footer position-relative">
			<div className="footer-top">
				<div className="container-fluid">
					<div className="row">
						<div className="col-6 col-md-6 col-lg-3">
							<div className="footer-widget footer-about">
								<div className="footer-logo">
									<Link to={'/'}>
										<img src={logo} alt="logo" style={{ maxWidth: '160px' }} />
									</Link>
								</div>
								<div className="footer-about-content">
									<p className='form-text' style={{maxWidth:200}}>Điều quan trọng là phải chăm sóc bệnh nhân, được bệnh nhân yêu mến, nhưng điều đó sẽ phải đánh đổi bằng rất nhiều sức khỏe thể chất và tinh thần.</p>
								</div>
							</div>
						</div>

						<div className="col-6 col-md-6 col-lg-3">
							<div className="footer-widget footer-menu">
								<h2 className="footer-title">Tính năng cho bệnh nhân</h2>
								<ul>
									<li><Link to={'/doctors'}><FaAngleDoubleRight className='icon' />  Tìm kiếm bác sĩ</Link></li>
									<li><Link to={'/login'}><FaAngleDoubleRight className='icon' />  Đăng nhập & Đăng kí</Link></li>
									<li><Link to={'/login'}><FaAngleDoubleRight className='icon' />  Đặt lịch hẹn</Link></li>
									<li><Link to={'/doctors'}><FaAngleDoubleRight className='icon' />  Đánh giá bác sĩ</Link></li>
									<li><Link to={'/'}><FaAngleDoubleRight className='icon' />  Trang cá nhân</Link></li>
								</ul>
							</div>
						</div>

						<div className="col-6 col-md-6 col-lg-3">

							<div className="footer-widget footer-menu">
								<h2 className="footer-title">Tính năng cho bác sĩ</h2>
								<ul>
									<li><Link to={'/'}><FaAngleDoubleRight className='icon' /> Quản lý lịch hẹn</Link></li>
									<li><Link to={'/login'}><FaAngleDoubleRight className='icon' /> Đăng nhập & Đăng kí</Link></li>
									<li><Link to={'/register'}><FaAngleDoubleRight className='icon' /> Tạo đơn thuốc cho bệnh nhân</Link></li>
									<li><Link to={'/dashboard'}><FaAngleDoubleRight className='icon' /> Trang cá nhân</Link></li>
								</ul>
							</div>
						</div>

						<div className="col-6 col-md-6 col-lg-3">
							<div className="footer-widget footer-contact">
								<h2 className="footer-title mt-3 mt-md-0">Liên hệ với chúng tôi</h2>
								<div className="footer-contact-info">
									<div className="footer-address">
										<span><i className="fas fa-map-marker-alt"></i></span>
									</div>
									<p>
										<i className="fas fa-phone-alt"></i>
										Phone: 0971790548
									</p>
									<p className="mb-0">
										<i className="fas fa-envelope"></i>
										Email: hieukd01yc@gmail.com
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;