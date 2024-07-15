import React from 'react'
import './index.css';
import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';
import ImageHeading from '../../images/doc/doctor 5.jpg'
import img from '../../images/doctor/dr-nguyen-nam-binh.jpg';
const About = () => {
   
    return (
        <>
            <Header />
            <div className="container" style={{ marginBottom: 100, marginTop: 100 }}>
                <div className="row p-5">
                    <div className="col-lg-4">
                        <div className='section-title text-center'>
                            <h2 className='text-uppercase'>Bác sĩ Nguyễn Văn A</h2>
                            <p className='form-text m-0'>-----------------</p>
                        </div>
                        <p className='mt-3'>Chào mừng bạn đến với trang web đặt lịch hẹn trực tuyến của chúng tôi. Với nền tảng này, bạn có thể dễ dàng chọn thời gian phù hợp để gặp gỡ bác sĩ, giúp tiết kiệm thời gian và nâng cao chất lượng chăm sóc sức khỏe.Tôi rất vui khi giới thiệu đến bạn trang web đặt lịch hẹn giữa bác sĩ và bệnh nhân. Với hệ thống này, việc quản lý lịch hẹn trở nên dễ dàng hơn bao giờ hết, giúp chúng tôi phục vụ bạn tốt hơn và hiệu quả hơn.</p>
                    </div>

                    <div className="col-lg-8">

                        <img src={img} alt="" className="img-fluid rounded shadow" />
                    </div>
                </div>
            </div>

            <div className="container" style={{ marginBottom: 100, marginTop: 100 }}>
                <div className="row">
                </div>
            </div>


            <div className="container" style={{ marginBottom: 100, marginTop: 100 }}>
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className='mb-4 section-title text-center'>
                            <h2 className='text-uppercase'>GẶP GỠ CHUYÊN GIA CỦA CHÚNG TÔI</h2>
                        </div>
                    </div>
                </div>

                <div className="row">

                </div>
            </div>

            <div className="container say-about" style={{ marginBottom: 100, marginTop: 100 }}>
                <div className="row">
                    <div className="col-lg-6 offset-lg-6">
                        <div className='mb-4 section-title text-center'>
                            <h2 className='text-uppercase'>BÁC SĨ NÓI GÌ</h2>
                        </div>
                    </div>
                </div>

                <div className="row align-items-center">
                    <div className="col-lg-6 offset-lg-6">
                        <div className="my-2">
                            <h4 style={{ color: '#223a66' }} className='my-0'>Trang web tuyệt vời!</h4>
                            <span>John Partho</span>
                        </div>
                        <p className='form-text'>
                        Trang web đặt lịch hẹn của chúng tôi mang lại sự tiện lợi và nhanh chóng cho bạn. Chỉ cần vài thao tác đơn giản, bạn có thể chọn thời gian khám bệnh phù hợp và nhận được sự chăm sóc chu đáo từ chúng tôi.Đặt lịch hẹn với bác sĩ chưa bao giờ dễ dàng đến thế. Với trang web của chúng tôi, bạn có thể linh hoạt chọn thời gian phù hợp, giúp bạn chủ động hơn trong việc chăm sóc sức khỏe. </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default About