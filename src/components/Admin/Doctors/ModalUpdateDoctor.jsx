import React, { useEffect, useState } from 'react';
import { useAdminGetOneDoctorQuery, useAdminUpdateDoctorMutation } from '../../../redux/api/adminApi';
import { Modal, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { DatePicker, Select } from 'antd';
import { SpecialOptions } from '../../../constant/global';
import moment from 'moment';
import { toast } from 'react-toastify';

function ModalUpdateDoctor(props) {
    const { handleClose, show, id, refetchParent } = props;
    const { data, refetch } = useAdminGetOneDoctorQuery(id, { skip: !id });
    const [update, { isLoading, isError, isSuccess, error }] = useAdminUpdateDoctorMutation();
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
            toast.success('Cập nhật bác sĩ thành công');
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
        formData?.price && (formData['price']= +formData?.price);
        update({data: {...formData,...data}, id: id});
    };

    return (
        <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Cập nhật bác sĩ: {formData.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row form-row" onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Tên <span className="text-danger">*</span></label>
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
                            <label>Email <span className="text-danger">*</span></label>
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
                            <label>Số điện thoại</label>
                            <input 
                                name="phone"
                                value={formData.phone || ''} 
                                {...register("phone")} 
                                onChange={handleInputChange} 
                                type='number' 
                                className="form-control" 
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

                    <div className="col-md-12">
                        <div className="card mb-2 mt-2">
                            <div className="card-body">
                                <h6 className="card-title text-secondary">Về tôi</h6>
                                <div className="form-group mb-2 card-label">
                                    <label>Giới thiệu</label>
                                    <textarea 
                                        name="description"
                                        value={formData.description || ''} 
                                        {...register("description")} 
                                        onChange={handleInputChange} 
                                        className="form-control" 
                                        rows={5} 
                                    />
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
                                        <input 
                                            name="clinicName"
                                            value={formData.clinicName || ''} 
                                            {...register("clinicName")} 
                                            onChange={handleInputChange} 
                                            className="form-control" 
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group mb-2 card-label">
                                        <label>Địa chỉ phòng khám</label>
                                        <input 
                                            name="clinicAddress"
                                            value={formData.clinicAddress || ''} 
                                            {...register("clinicAddress")} 
                                            onChange={handleInputChange} 
                                            type="text" 
                                            className="form-control" 
                                        />
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
                                        <input 
                                            name="price"
                                            value={formData.price || ''} 
                                            {...register("price")} 
                                            onChange={handleInputChange} 
                                            type='number' 
                                            className="form-control" 
                                        />
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
                                    <Select
                                        getPopupContainer={(triggerNode) => {
                                        return triggerNode.parentNode;
                                        }}
                                        style={{ width: '100%' }}
                                        placeholder="Please select"
                                        value={formData.specialization || ''}
                                        onChange={handleSpecializationChange}
                                        options={SpecialOptions}
                                    />
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
                                        <input 
                                            name="degree"
                                            value={formData.degree || ''} 
                                            {...register("degree")} 
                                            onChange={handleInputChange} 
                                            className="form-control" 
                                        />
                                    </div>
                                </div>

                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="form-group mb-2 card-label">
                                        <label>Trường</label>
                                        <input 
                                            name="college"
                                            value={formData.college || ''} 
                                            {...register("college")} 
                                            onChange={handleInputChange} 
                                            className="form-control" 
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="form-group mb-2 card-label">
                                        <label>Năm hoàn thành</label>
                                        <input 
                                            name="completionYear"
                                            value={formData.completionYear || ''} 
                                            {...register("completionYear")} 
                                            onChange={handleInputChange} 
                                            className="form-control" 
                                        />
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
                                        <label>Nơi làm việc</label>
                                        <input 
                                            name="experienceHospitalName"
                                            value={formData.experienceHospitalName || ''} 
                                            {...register("experienceHospitalName")} 
                                            onChange={handleInputChange} 
                                            className="form-control" 
                                        />
                                    </div>
                                </div>

                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="form-group mb-2 card-label">
                                        <label>Từ</label>
                                        <input 
                                            name="expericenceStart"
                                            value={formData.expericenceStart || ''} 
                                            {...register("expericenceStart")} 
                                            onChange={handleInputChange} 
                                            className="form-control" 
                                        />
                                    </div>
                                </div>

                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="form-group mb-2 card-label">
                                        <label>Đến</label>
                                        <input 
                                            name="expericenceEnd"
                                            value={formData.expericenceEnd || ''} 
                                            {...register("expericenceEnd")} 
                                            onChange={handleInputChange} 
                                            className="form-control" 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="card mb-2 p-3 mt-2">
                            <div className="row form-row">
                                <div className="form-group mb-2 card-label">
                                    <label>Mô tả</label>
                                    <input 
                                        name="designation"
                                        value={formData.designation || ''} 
                                        {...register("designation")} 
                                        onChange={handleInputChange} 
                                        className="form-control" 
                                    />
                                </div>
                            </div>
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
