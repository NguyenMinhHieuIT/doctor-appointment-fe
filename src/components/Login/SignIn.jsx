import React, { useState, useEffect } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import SocialSignUp from "./SocialSignUp";
import { useForm } from "react-hook-form";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import {
  useForgotPassMutation,
  useRecoverPassMutation,
  useUserLoginMutation,
} from "../../redux/api/authApi";
import { useMessageEffect } from "../../utils/messageSideEffect";
import { toast } from "react-toastify";
import ModalOtpForgotPass from "./ModalOtpForgotPass";
const SignIn = ({ handleResponse }) => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [infoError, setInfoError] = useState("");
  const [show, setShow] = useState(true);
  const [showForgot, setShowForgot] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [userLogin, { isError, isLoading, isSuccess, error, data: dataLogin }] =
    useUserLoginMutation();
  const [forgotEmail, setForgotEmail] = useState("");
 
  const [
    forgotPassMutation,
    { isLoading: fIsLoading, isSuccess: fIsSuccess, isError: fIsError },
  ] = useForgotPassMutation();
  const [
    recoverPassMutation,
    { isLoading: rIsLoading, isSuccess: rIsSuccess, isError: rIsError },
  ] = useRecoverPassMutation();

  const handleClose = () => {
    setShowForgot(false);
  }

  setTimeout(() => {
    setShow(false);
  }, 10000);

  const onSubmit = async (event) => {
    userLogin(event);
  };

  const onHandleForgotPassword = async (e) => {
    e.preventDefault();
    // setForgotEmail("");
    setShowForgotPassword(false);
  };
 
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
      setInfoError(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Đăng nhập thành công");
      if (dataLogin?.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [isError, error, isSuccess, navigate]);

  useEffect(()=>{
    if(fIsSuccess){

    }
    if(fIsError){
        toast.error('Gửi mail thất bại');
    }
  },[fIsSuccess, fIsError]);

  const handleShowForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword);
  };

  const forgotPass = () => {
    forgotPassMutation({
        email: forgotEmail,
    });
    setShowForgot(true);
  };

  return (
    <>
      {showForgotPassword ? (
        <form className="sign-in-form" onSubmit={onHandleForgotPassword}>
          <h2 className="title">Quên mật khẩu ?</h2>
          <div>Vui lòng nhập email của bạn</div>
          <div className="input-field">
            <span className="fIcon">
              <FaEnvelope />
            </span>
            <input
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              placeholder="Email"
              type="email"
              required
            />
          </div>
          <div
            onClick={handleShowForgotPassword}
            className="text-bold"
            style={{ cursor: "pointer", color: "#4C25F5" }}
          >
            Quay lại
          </div>
          <button
            className="iBtn"
            type="submit"
            value="sign In"
            onClick={forgotPass}
          >
            {fIsLoading ? (
              <Spinner animation="border" variant="info" />
            ) : (
              "Quên mật khẩu"
            )}
          </button>
        </form>
      ) : (
        <form className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="title">Đăng nhập</h2>
          <div className="input-field">
            <span className="fIcon">
              <FaEnvelope />
            </span>
            <input
              {...register("email", { required: true })}
              placeholder="Email"
              type="email"
            />
          </div>
          {errors.email && (
            <span className="text-danger">Vui lòng nhập email</span>
          )}
          <div className="input-field">
            <span className="fIcon">
              <FaLock />
            </span>
            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="Mật khẩu"
            />
          </div>
          {errors.password && (
            <span className="text-danger">Vui lòng nhập mật khẩu</span>
          )}
          {infoError && <p className="text-danger">{infoError}</p>}
          <div
            onClick={handleShowForgotPassword}
            className="text-bold"
            style={{ cursor: "pointer", color: "#4C25F5" }}
          >
            Quên mật khẩu ?
          </div>
          <button
            className="iBtn"
            type="submit"
            value="sign In"
            style={{ backgroundColor: "#3291e6" }}
          >
            {isLoading ? (
              <Spinner animation="border" variant="info" />
            ) : (
              "Đăng nhập"
            )}
          </button>
          <p className="social-text">
            Hoặc đăng nhập bằng tài khoản mạng xã hội
          </p>
          <SocialSignUp handleResponse={handleResponse} />
        </form>
      )}
    <ModalOtpForgotPass show={showForgot} handleClose={handleClose} email={forgotEmail} />
    </>
  );
};

export default SignIn;
