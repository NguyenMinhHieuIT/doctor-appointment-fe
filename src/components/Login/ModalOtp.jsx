import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { InputOTP } from "antd-input-otp";
import moment from "moment";
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "../../redux/api/authApi";
function ModalOtp(props) {
  const { handleClose, show, email } = props;
  const [value, setValue] = useState([]);
  const [timer, setTimer] = useState(120);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [
    verifyOtpMutation,
    { isLoading: vIsLoading, isError: vIsError, isSuccess: vIsSuccess },
  ] = useVerifyOtpMutation();
  const [
    sendOtpMutation,
    { isLoading: sIsLoading, isError: sIsError, isSuccess: sIsSuccess },
  ] = useSendOtpMutation();

  const startTimer = () => {
    setTimer(120);
    setIsResendDisabled(true);
  };

  const sendOtp = () => {
    sendOtpMutation({ email });
    startTimer();
  };
  
  const handleFinish = () => {
    verifyOtpMutation({
      email,
      otp: value.join(""),
    });
  };

  useEffect(() => {
    if(show){
      sendOtp();
      setValue([]);
      setTimer(120);
    } 
  }, [show]);

  useEffect(() => {
    let interval;
    if (timer > 0 && show) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendDisabled(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer, show]);

  useEffect(() => {
    if (vIsSuccess) {
      toast.success("Đăng kí tài khoản thành công");
      handleClose();
    }
    if (vIsError) {
      toast.error("Mã OTP không hợp lệ");
    }
  }, [vIsSuccess, vIsError]);

  
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Xác thực mã OTP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputOTP length={4} onChange={setValue} value={value} />
          <div style={{ marginTop: 10 }}>
            {timer > 0 ? (
              <span>
                {moment.utc(timer * 1000).format("mm:ss")}
              </span>
            ) : (
              <Button onClick={sendOtp} disabled={isResendDisabled}>
                Resend OTP
              </Button>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleFinish}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalOtp;
