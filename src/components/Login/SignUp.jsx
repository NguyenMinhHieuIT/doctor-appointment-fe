import React, { useEffect, useState } from 'react';
import { FaCheck, FaEnvelope, FaLock, FaTimes, FaUser } from 'react-icons/fa';
import SocialSignUp from './SocialSignUp';
import Spinner from 'react-bootstrap/Spinner'
import swal from 'sweetalert';
import { useDoctorSignUpMutation, usePatientSignUpMutation } from '../../redux/api/authApi';
import { message } from 'antd';
import { toast } from 'react-toastify';

// password regex
// ^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$
// At least one upper case English letter, (?=.*?[A-Z])
// At least one lower case English letter, (?=.*?[a-z])
// At least one digit, (?=.*?[0-9])
// At least one special character, (?=.*?[#?!@$%^&*-])
// Minimum eight in length .{8,} (with the anchors)

const SignUp = ({ setSignUp }) => {
    const [error, setError] = useState({});
    const [infoError, setInfoError] = useState('');
    const [loading, setLoading] = useState(false);
    const formField = {
        name: '',
        email: '',
        password: '',
    }
    const [user, setUser] = useState(formField);
    const [userType, setUserType] = useState('patient');
    const [doctorSignUp, { data: dData, isSuccess: dIsSuccess, isError: dIsError, error: dError, isLoading: dIsLoading }] = useDoctorSignUpMutation();
    const [patientSignUp, { data: pData, isSuccess: pIsSuccess, isError: pIsError, error: pError, isLoading: pIsLoading }] = usePatientSignUpMutation();
    const [passwordValidation, setPasswordValidation] = useState({
        carLength: false,
        specailChar: false,
        upperLowerCase: false,
        numeric: false
    });

    const handleSignUpSuccess = () => {
        setLoading(false);
        setUser(formField)
    }
    useEffect(() => {
        // doctor account
        if (dIsError && dError) {
            message.error("Email Already Exist !!")
            setLoading(false);
        }

        if (!dIsError && dIsSuccess) {
            handleSignUpSuccess();
            setLoading(false);
            setLoading(false);
            toast.success('Đăng kí tài khoản thành công')
        }

        // Patient account
        if (pIsError && pError) {
            message.error("Email Already Exist !!");
            setLoading(false);
        }
        if (!pIsError && pIsSuccess) {
            handleSignUpSuccess();
            setLoading(false);
            setSignUp(false);
            toast.success('Đăng kí tài khoản thành công')
        }

    }, [dIsError, dError, pError, pIsError, , pIsLoading, dIsLoading, pData, dData, setSignUp, setLoading, dIsSuccess])

    const [emailError, setEmailError] = useState({
        emailError: false
    })

    const handleEmailError = (name, value) => {
        if (name === 'email') {
            setEmailError({
                emailError: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            })
        }
    }
    const hanldeValidation = (name, value) => {
        if (name === 'password') {
            setPasswordValidation({
                carLength: (value.length > 8),
                specailChar: /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(value),
                upperLowerCase: /^(?=.*[a-z])(?=.*[A-Z])/.test(value),
                numeric: /^(?=.*\d)/.test(value),
            })
        }
    }

    const hanldeOnChange = (e) => {
        let { name, value } = e.target;
        hanldeValidation(name, value)
        handleEmailError(name, value)
        let isPassValid = true;

        if (value === 'email') {
            isPassValid = /\S+@\S+\.\S+/.test(value);
        }
        if (value === 'password') {
            isPassValid = ((value.length > 8)
                && /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(value)
                && /^(?=.*[a-z])(?=.*[A-Z])/.test(value)
                && /^(?=.*\d)/.test(value))
        }
        if (isPassValid) {
            const newPass = { ...user };
            newPass[name] = value
            setUser(newPass)
        }
    }

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
    }
    const hanldeOnSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (userType === "doctor") {
            user['role'] = 'doctor';
            doctorSignUp(user);
        } else {
            user['role'] = 'patient';
            patientSignUp(user)
        }
    }

    return (
        <form className="sign-up-form" onSubmit={hanldeOnSubmit}>
            <h2 className="title">Đăng kí</h2>
            <div className="input-field">
                <span className="fIcon"><FaUser /></span>
                <input placeholder="Họ và tên" name="name" type="text" onChange={(e) => hanldeOnChange(e)} value={user.name} />
            </div>
            <div className="input-field">
                <span className="fIcon"><FaEnvelope /></span>
                <input placeholder="Email" name="email" type="email" onChange={(e) => hanldeOnChange(e)} value={user.email} />
            </div>
            <div className="input-field">
                <span className="fIcon"><FaLock /></span>
                <input type="password" name="password" placeholder="Mật khẩu" onChange={(e) => hanldeOnChange(e)} value={user.password} />
            </div>
            <div className='input-field d-flex align-items-center gap-2 justify-content-center'>
                <div className='text-nowrap'>Bạn là </div>
                <select
                    className="form-select w-50"
                    aria-label="select"
                    onChange={(e) => handleUserTypeChange(e)}
                    defaultValue='patient'
                >
                    <option value="patient">Bệnh nhân</option>
                    <option value="doctor">Bác sĩ</option>
                </select>
            </div>
            {error.length && <h6 className="text-danger text-center">{error}</h6>}
            {infoError && <h6 className="text-danger text-center">{infoError}</h6>}
            <button type="submit"
                className="btn btn-primary btn-block mt-2 iBtn"
                disabled={
                    passwordValidation.carLength && passwordValidation.numeric && passwordValidation.upperLowerCase && passwordValidation.specailChar && emailError.emailError ? "" : true
                }
            >
                {loading ? <Spinner animation="border" variant="info" /> : "Đăng kí"}
            </button>

            <div className="password-validatity mx-auto">

                <div style={emailError.emailError ? { color: "green" } : { color: "red" }}>
                    <p>{passwordValidation.numeric ? <FaCheck /> : <FaTimes />}
                        <span className="ms-2">Email của bạn phải hợp lệ.</span></p>
                </div>

                <div style={passwordValidation.carLength ? { color: "green" } : { color: "red" }}>
                    <p> 
                    {
                    passwordValidation.carLength &&
                    passwordValidation.numeric &&
                    passwordValidation.upperLowerCase &&
                    passwordValidation.specailChar ? <FaCheck /> : <FaTimes />
                    }
                        <span className="ms-2">Mật khẩu của bạn phải có 8 kí tự, số, kí tự đặc biệt, chữ hoa và chữ thường.</span></p>
                </div>              
            </div>

            <p className="social-text">Hoặc đăng kí bằng tài khoản mạng xã hội</p>
            <SocialSignUp />
        </form>

    );
};

export default SignUp;