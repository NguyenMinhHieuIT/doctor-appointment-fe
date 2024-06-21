import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { InputOTP } from "antd-input-otp";
import { FaLock } from "react-icons/fa";
import {
    useRecoverPassMutation,
} from "../../redux/api/authApi";
import moment from "moment";

function ModalOtpForgotPass(props) {
  const { handleClose, show, email } = props;
  const [value, setValue] = useState([]);
  const [password, setPassword] = useState('');
  const [passwordC, setPasswordC] = useState('');
  const [timer, setTimer] = useState(120);
  const [
    recoverPassMutation,
    { isLoading: rIsLoading, isError: rIsError, isSuccess: rIsSuccess },
  ] = useRecoverPassMutation();

  useEffect(() => {
    let interval;
    if (timer > 0 && show) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer, show]);

  useEffect(()=> {
    if(show){
        setTimer(120);
        setValue([]);
        setPassword('');
        setPasswordC('');
    }
  },[show])

  useEffect(()=> {
    if(rIsSuccess){
        toast.success('Đổi mật khẩu thành công');
        handleClose();
    }
    if(rIsError){
        toast.error('Mã OTP không hợp lệ');
    }
  },[rIsError, rIsSuccess])


  const handleFinish = () => {
    if(password !== passwordC){
        toast.error('Mật khẩu không khớp, vui lòng điền lại');
        return;
    }
    recoverPassMutation({
      email: email,
      otp: value.join(''),
      newPassword: password
    });
    console.log('passC>>', email);
  };

  
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
          <div className="input-field">
            <span className="fIcon">
              <FaLock />
            </span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Mật khẩu mới"
            />
          </div>
          <div className="input-field">
            <span className="fIcon">
              <FaLock />
            </span>
            <input
              value={passwordC}
              onChange={(e) => setPasswordC(e.target.value)}
              type="password"
              placeholder="Nhập lại mật khẩu"
            />
          </div>
          <InputOTP length={4} onChange={setValue} value={value} />
          <div style={{ marginTop: 10 }}>
            {timer > 0 ? (
              <span>
                {moment.utc(timer * 1000).format("mm:ss")}
              </span>
            ) : null
            }
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

export default ModalOtpForgotPass;
