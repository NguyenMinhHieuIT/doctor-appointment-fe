import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import log from '../../images/doc/info.svg';
import register from '../../images/doc/register.svg';
import SignIn from './SignIn';
import './SignInForm.css';
import SignUp from './SignUp';
import ModalOtp from './ModalOtp';

const SignInForm = () => {
    const [isSignUp, setSignUp] = useState(false);
    const [showModalOtp, setShowModalOtp] = useState(false);
    const [email, setEmail] = useState('');
    const handleClose = () => {
        setShowModalOtp(false);
    }
    return (
        <>
        <ModalOtp show={showModalOtp} handleClose={handleClose} email={email}/>
        <div className={`${isSignUp ? "signin-signup-container sign-up-mode" : "signin-signup-container"}`}>
            <Link to="/">
                <span className="pageCloseBtn"><FaTimes /></span>
            </Link>
            <div className="forms-container">
                <div className="signIn-singUp">
                    <SignIn />
                    <SignUp setSignUp={setSignUp} setModalOtp={setShowModalOtp} setEmail={setEmail}/>
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3 className='text-white'>Bạn là người mới ?</h3>
                        <p>Hãy đăng kí ngay để đến với nền tảng tuyệt vời của chúng tôi!</p>
                        <button className="iBtn transparent" onClick={() => setSignUp(true)}>Đăng kí</button>
                    </div>
                    <img src={`${log}`} alt="" className="pImg" />
                </div>

                <div className="panel right-panel">
                    <div className="content">
                        <h3 className='text-white'>Bạn đã có tài khoản ?</h3>
                        <p>Hãy đăng nhập ngay!</p>
                        <button className="iBtn transparent" onClick={() => setSignUp(false)}>Đăng nhập</button>
                    </div>
                    <img src={`${register}`} alt="" className="pImg" />
                </div>
            </div>
        </div>
        </>
    );
};

export default SignInForm;