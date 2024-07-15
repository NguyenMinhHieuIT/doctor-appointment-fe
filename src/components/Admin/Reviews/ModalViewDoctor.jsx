import React from 'react';
import { useAdminGetOneAppointQuery, useAdminGetOneDoctorQuery, useAdminGetOnePatientQuery, useAdminGetOneReviewQuery } from '../../../redux/api/adminApi';
import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import moment from 'moment';

function ModalViewDoctor(props) {
    const { handleClose, show, id } = props;
    const { data, refetch } = useAdminGetOneReviewQuery(id, { skip: !id });
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
    console.log(formData)
    return (
        <>
            <Modal show={show} onHide={()=>{handleClose();resetFormData()}} backdrop='static' keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Đánh giá</Modal.Title>
                </Modal.Header>
                <Modal.Body>
            <form className="row form-row">
                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Tên bệnh nhân</label>
                            <input defaultValue={ formData?.user?.name } className="form-control" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                        <label>Email bệnh nhân</label>
                            <input defaultValue={ formData?.user?.email } className="form-control" />
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
                        <label>Thời gian đánh giá</label>
                            <input defaultValue={ moment(formData?.createdAt).format('Y/M/D') } className="form-control" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                        <label>Số sao</label>
                            <input defaultValue={ formData?.star } className="form-control" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Đánh giá</label>
                            <input defaultValue={ formData?.description } className="form-control" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Có giới thiệu</label>
                            <input defaultValue={ formData?.isRecommended } className="form-control" />
                        </div>
                    </div>
                </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalViewDoctor;