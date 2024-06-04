import React, { useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DatePicker, Select} from 'antd';
import { SpecialOptions } from '../../../constant/global';
import moment from 'moment';
import { useAdminCreateDoctorMutation } from '../../../redux/api/adminApi';
import { toast } from 'react-toastify';
function ModalAddDoctor(props) {
    const { handleClose, show, refetch } = props;
    const [date, setDate] = useState(null);
    const [gender, setGender] = useState('');
    const [special, setSpecial] = useState('');
    const { register, handleSubmit } = useForm({});
    const [create, { isLoading, isSuccess, isError, error }] = useAdminCreateDoctorMutation();
    const onChangeDate = (date, dateString) => { 
        setDate(moment(dateString).format());
    };

    const onChangeGender = (e) => { 
        setGender(e.target.value);
    };

    const onSubmit = (data) => {
        date && (data.birth = date)
        gender && (data.gender = gender === 'Nam'?'male':'female')
        special && (data.specialization = special)
        data.phone && (data.phone = data.phone + '');
        create(data);
    }

    useEffect(()=>{
        if(isSuccess){
            toast.success('Thêm bác sĩ thành công');
            handleClose();
            refetch();
        }
        if(isError && error){
            toast.error(`Thông tin bác sĩ không hợp lệ: ${error.data.message}`);
        }
    },[isLoading, isSuccess, isError, error]);

   
    return (
        <div>
             <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm mới bác sĩ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
            <form className="row form-row" onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Tên <span className="text-danger">*</span></label>
                            <input {...register("name")} className="form-control" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                        <label>Email <span className="text-danger">*</span></label>
                            <input {...register("email")} className="form-control" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Số điện thoại</label>
                            <input {...register("phone")} type='number' className="form-control" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Địa chỉ </label>
                            <input {...register("address")} className="form-control" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Giới tính</label>
                            <select className="form-control select" name='gender' onChange={onChangeGender}>
                                <option value={''}>---</option>
                                <option className='text-capitalize'>Nam</option>
                                <option className='text-capitalize'>Nữ</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Ngày sinh </label>
                            <DatePicker
                                getPopupContainer={(triggerNode) => {
                                        return triggerNode.parentNode;
                                }}
                                onChange={onChangeDate}
                                format={"YYYY-MM-DD"}
                                style={{ width: '100%', padding: '6px' }} />
                        </div>         
                    </div>



                    <div className="col-md-12">
                        <div className="card mb-2 mt-2">
                            <div className="card-body">
                                <h6 className="card-title text-secondary">Về tôi</h6>
                                <div className="form-group mb-2 card-label">
                                    <label>Giới thiệu</label>
                                    <textarea {...register("description")} className="form-control" rows={5} />
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
                                        <input {...register("clinicName")} className="form-control" rows={5} />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group mb-2 card-label">
                                        <label>Địa chỉ phòng khám</label>
                                        <input type="text" {...register("clinicAddress")} className="form-control" />
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
                                        <input {...register("price")} type='number' className="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="card mb-2 p-3 mt-2">
                            <h6 className="card-title text-secondary">Chuyên khoa</h6>
                            <div className="row form-row">
                                <div className="form-group mb-2 card-label">
                                    <Select  
                                    getPopupContainer={(triggerNode) => {
                                        return triggerNode.parentNode;
                                    }}                        
                                    style={{ width: '100%' }}
                                    placeholder="Please select"
                                    value={special}
                                    onChange={setSpecial}
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
                                        <input {...register("degree")} className="form-control" />
                                    </div>
                                </div>

                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="form-group mb-2 card-label">
                                        <label>Trường</label>
                                        <input {...register("college")} className="form-control" />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="form-group mb-2 card-label">
                                        <label>Năm hoàn thành</label>
                                        <input {...register("completionYear")} className="form-control" />
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
                                        <input {...register("experienceHospitalName")} className="form-control" />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="form-group mb-2 card-label">
                                        <label>Từ</label>
                                        <input {...register("expericenceStart")} className="form-control" />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="form-group mb-2 card-label">
                                        <label>Đến</label>
                                        <input {...register("expericenceEnd")} className="form-control" />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="form-group mb-2 card-label">
                                        <label>Mô tả</label>
                                        <input {...register("designation")} className="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='text-center my-3'>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button type='submit' variant="primary mx-3">
                        {isLoading?'...Loading': 'Thêm'}
                    </Button>
                    </div>
                </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ModalAddDoctor;