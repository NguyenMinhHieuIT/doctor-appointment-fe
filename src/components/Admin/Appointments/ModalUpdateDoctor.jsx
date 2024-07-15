import React, { useEffect, useState } from 'react';
import { useAdminGetOneAppointQuery, useAdminGetOneDoctorQuery, useAdminGetOnePatientQuery, useAdminUpdateAppointMutation, useAdminUpdateDoctorMutation, useAdminUpdatePatientMutation } from '../../../redux/api/adminApi';
import { Modal, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { DatePicker, Select } from 'antd';
import { SpecialOptions } from '../../../constant/global';
import moment from 'moment';
import { toast } from 'react-toastify';

function ModalUpdateDoctor(props) {
    const { handleClose, show, id, refetchParent } = props;
    const { data, refetch } = useAdminGetOneAppointQuery(id, { skip: !id });
    const [update, { isLoading, isError, isSuccess, error }] = useAdminUpdateAppointMutation();
    const [formData, setFormData] = useState({});
    const { register, handleSubmit, setValue } = useForm({});

    useEffect(() => {
        if (show && id) {
            refetch();
        } else {
            setFormData({});
        }
    }, [show, id, refetch]);

    useEffect(() => {
        if (data) {
            setFormData(data);
            Object.keys(data).forEach(key => {
                setValue(key, data[key]);
            });
        }
    }, [data, setValue]);

    useEffect(() => {
        if (isError && error) {
            toast.error(`Dữ liệu cập nhật không hợp lệ: ${error.data.message}`);
        }
        if (isSuccess) {
            toast.success('Cập nhật bệnh nhân thành công');
            handleClose();
            refetchParent();
        }
    }, [isError, isSuccess]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        setValue(name, value);
    };

    const handleDateChange = (date, dateString) => {
        setFormData(prevState => ({
            ...prevState,
            birth: dateString
        }));
        setValue('birth', dateString);
    };

    const handleSpecializationChange = (value) => {
        setFormData(prevState => ({
            ...prevState,
            specialization: value
        }));
        setValue('specialization', value);
    };

    const onSubmit = (data) => {
        update({data: {...formData,...data}, id: id});
    };

    return (
        <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Cập nhật cuộc hẹn ngày { moment(formData?.scheduleDate).format('YYY/MM/DD') }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row form-row" onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Tên bệnh nhân <span className="text-danger">*</span></label>
                            <input 
                                name="name"
                                value={formData.name || ''} 
                                {...register("name")} 
                                onChange={handleInputChange} 
                                type='text' 
                                className="form-control" 
                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Email bệnh nhân <span className="text-danger">*</span></label>
                            <input 
                                name="email"
                                value={formData.email || ''} 
                                {...register("email")} 
                                onChange={handleInputChange} 
                                className="form-control" 
                                readOnly 
                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Tên bác sĩ <span className="text-danger">*</span></label>
                            <input 
                                name="phone"
                                value={formData?.doctor?.name || ''} 
                                {...register("phone")} 
                                onChange={handleInputChange} 
                                className="form-control" 
                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Email bệnh nhân <span className="text-danger">*</span></label>
                            <input 
                                name="email"
                                value={formData.email || ''} 
                                {...register("email")} 
                                onChange={handleInputChange} 
                                className="form-control" 
                                readOnly 
                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Địa chỉ </label>
                            <input 
                                name="address"
                                value={formData.address || ''} 
                                {...register("address")} 
                                onChange={handleInputChange} 
                                className="form-control" 
                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Giới tính</label>
                            <select 
                                name="gender"
                                className="form-control select" 
                                value={formData.gender || ''} 
                                {...register("gender")} 
                                onChange={handleInputChange}
                            >
                                <option value=''>---</option>
                                <option value='male'>Nam</option>
                                <option value='female'>Nữ</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Ngày sinh</label>
                            <DatePicker
                                getPopupContainer={(triggerNode) => {
                                return triggerNode.parentNode;
                                }}
                                value={formData.birth ? moment(formData.birth) : null}
                                onChange={handleDateChange}
                                format={"YYYY-MM-DD"}
                                style={{ width: '100%', padding: '6px' }} 
                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Nhóm máu</label>
                            <input 
                                name="bloodGroup"
                                value={formData.bloodGroup || ''} 
                                {...register("bloodGroup")} 
                                onChange={handleInputChange} 
                                type='text' 
                                className="form-control" 
                            />
                        </div>
                    </div>

                    
                    <div className="col-md-12 text-center">
                        <Button type="submit" disabled={isLoading}>{isLoading ? '...Loading':'Cập nhật'}</Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default ModalUpdateDoctor;
