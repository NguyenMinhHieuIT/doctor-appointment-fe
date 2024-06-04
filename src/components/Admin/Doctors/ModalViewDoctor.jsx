import React from 'react';
import { useAdminGetOneDoctorQuery } from '../../../redux/api/adminApi';
import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import moment from 'moment';

function ModalViewDoctor(props) {
    const { handleClose, show, id } = props;
    const { data, refetch } = useAdminGetOneDoctorQuery(id, { skip: !id });
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
                    <Modal.Title>Bác sĩ { formData.name }</Modal.Title>
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



                    <div className="col-md-12">
                        <div className="card mb-2 mt-2">
                            <div className="card-body">
                                <h6 className="card-title text-secondary">Về tôi</h6>
                                <div className="form-group mb-2 card-label">
                                    <label>Giới thiệu</label>
                                    <textarea defaultValue={ formData.description } className="form-control" rows={5} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="card mb-2 p-3 mt-2">
                            <h6 className="card-title text-secondary">Thông tin phòng khám</h6>
                            <div className="row form-row">
                                <div className="col-md-6">
                                    <div className="form-group mb-2 card-label">
                                        <label>Tên phòng khám</label>
                                        <input defaultValue={ formData.clinicName } className="form-control" rows={5} />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group mb-2 card-label">
                                        <label>Địa chỉ phòng khám</label>
                                        <input defaultValue={ formData.clinicAddress }  type="text" className="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="col-md-12">
                        <div className="card mb-2 p-3 mt-2">
                            <h6 className="card-title text-secondary">Phí khám</h6>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group mb-2 card-label">
                                        <label>Phí khám cho 30 phút</label>
                                        <input defaultValue={ formData.price } type='number' className="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="card mb-2 p-3 mt-2">
                            <div className="row form-row">
                                <div className="form-group mb-2 card-label">
                                <label>Chuyên khoa</label>
                                <input defaultValue={ formData.specialization } className="form-control" />                            
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="card mb-2 p-3 mt-2">
                            <h6 className="card-title text-secondary">Giáo dục</h6>
                            <div className="row form-row">
                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="form-group mb-2 card-label">
                                        <label>Loại bằng</label>
                                        <input defaultValue={ formData.degree } className="form-control" />
                                    </div>
                                </div>

                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="form-group mb-2 card-label">
                                        <label>Trường</label>
                                        <input defaultValue={ formData.college } className="form-control" />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="form-group mb-2 card-label">
                                        <label>Năm hoàn thành</label>
                                        <input defaultValue={ formData.completionYear } className="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="card mb-2 p-3 mt-2">
                            <h6 className="card-title text-secondary">Kinh nghiệm</h6>
                            <div className="row form-row">
                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="form-group mb-2 card-label">
                                        <label>Tên bệnh viện</label>
                                        <input defaultValue={ formData.experienceHospitalName } className="form-control" />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="form-group mb-2 card-label">
                                        <label>Từ</label>
                                        <input defaultValue={ formData.expericenceStart } className="form-control" />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="form-group mb-2 card-label">
                                        <label>Đến</label>
                                        <input defaultValue={ formData.expericenceEnd } className="form-control" />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="form-group mb-2 card-label">
                                        <label>Mô tả</label>
                                        <input defaultValue={ formData.designation } className="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalViewDoctor;