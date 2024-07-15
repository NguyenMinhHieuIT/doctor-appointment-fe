import React from 'react';
import { useAdminGetOneAppointQuery, useAdminGetOneDoctorQuery, useAdminGetOnePatientQuery } from '../../../redux/api/adminApi';
import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import moment from 'moment';

function ModalViewDoctor(props) {
    const { handleClose, show, id } = props;
    const { data, refetch } = useAdminGetOneAppointQuery(id, { skip: !id });
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (show && id) {
            refetch().then(() => {
                if (data) {
                    setFormData(data);
                }
            });
        } else {
            setFormData({});
        }
    }, [show, id, refetch, data]);

    const resetFormData = () => {
        setFormData({});
    };

    return (
        <>
            <Modal show={show} onHide={()=>{handleClose();resetFormData()}} backdrop='static' keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Cuộc hẹn ngày { moment(formData?.scheduleDate).format('Y/M/D') }</Modal.Title>
                </Modal.Header>
                <Modal.Body>
            <form className="row form-row">
                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Tên bệnh nhân</label>
                            <input defaultValue={ formData?.name } className="form-control" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                        <label>Email bệnh nhân</label>
                            <input defaultValue={ formData?.email } className="form-control" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Tên bác sĩ</label>
                            <input defaultValue={ formData?.doctor?.name } className="form-control" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                        <label>Email bác sĩ</label>
                            <input defaultValue={ formData?.doctor?.email } className="form-control" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                        <label>Thời gian bắt đầu</label>
                            <input defaultValue={ formData?.startTime } className="form-control" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                        <label>Thời gian kết thúc</label>
                            <input defaultValue={ formData?.endTime } className="form-control" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Địa chỉ khám</label>
                            <input defaultValue={ formData?.doctor?.clinicAddress } className="form-control" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Cơ sở khám</label>
                            <input defaultValue={ formData?.doctor?.clinicName } className="form-control" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Email người đặt lịch hẹn</label>
                            <input defaultValue={ formData?.patient?.email } className="form-control" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Giá khám mỗi 30 phút</label>
                            <input defaultValue={ formData?.doctor?.price } className="form-control" />
                        </div>
                    </div>
                </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalViewDoctor;