import React from 'react';
import { useAdminGetOneDoctorQuery, useAdminGetOnePatientQuery } from '../../../redux/api/adminApi';
import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import moment from 'moment';

function ModalViewDoctor(props) {
    const { handleClose, show, id } = props;
    const { data, refetch } = useAdminGetOnePatientQuery(id, { skip: !id });
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
                    <Modal.Title>Bệnh nhân { formData.name }</Modal.Title>
                </Modal.Header>
                <Modal.Body>
            <form className="row form-row">
                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Tên <span className="text-danger">*</span></label>
                            <input defaultValue={ formData.name } className="form-control" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                        <label>Email <span className="text-danger">*</span></label>
                            <input defaultValue={ formData.email } className="form-control" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Số điện thoại</label>
                            <input defaultValue={ formData.phone } type='number' className="form-control" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Địa chỉ </label>
                            <input defaultValue={ formData.address } className="form-control" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Giới tính</label>
                            <input defaultValue={ formData.gender === 'male' ? 'Nam' : 'Nữ' } className="form-control" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Ngày sinh </label>
                            <input defaultValue={formData.birth ? moment(formData.birth).format('YYYY/MM/DD') : ''}  className="form-control" />
                        </div>         
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Tuổi </label>
                            <input defaultValue={formData.age}  className="form-control" />
                        </div>         
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Avatar </label>
                            <input defaultValue={formData.avatar}  className="form-control" />
                        </div>         
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Nhóm máu </label>
                            <input defaultValue={formData.bloodGroup}  className="form-control" />
                        </div>         
                    </div>
                </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalViewDoctor;