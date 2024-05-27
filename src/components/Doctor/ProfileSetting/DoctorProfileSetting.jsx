import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { Button, Select, message } from 'antd';
import { Link } from 'react-router-dom';
import { useUpdateDoctorMutation } from '../../../redux/api/doctorApi';
import useAuthCheck from '../../../redux/hooks/useAuthCheck';
import { doctorSpecialistOptions, SpecialOptions } from '../../../constant/global';
import ImageUpload from '../../UI/form/ImageUpload';
import dImage from '../../../images/avatar.jpg';
import { DatePicker } from 'antd';
import './index.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { GenderOptions } from '../../../constant/user.constant';

const DoctorProfileSetting = () => {
    const navigate = useNavigate()
    const [selectedItems, setSelectedItems] = useState('');
    const [updateDoctor, { isLoading, isSuccess, isError, error }] = useUpdateDoctorMutation()
    const { data } = useAuthCheck();
    const { register, handleSubmit } = useForm({});
    const [userId, setUserId] = useState('');
    const [selectValue, setSelectValue] = useState({});
    const [date, setDate] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (data) {
            const { id, specialization } = data;
            setUserId(id);
            setSelectedItems(specialization);
        };
    }, [data]);

    const handleChange = (e) => {
        setSelectValue({ ...selectValue, [e.target.name]: e.target.value === 'Nam' ? 'male' : 'female' })
    }

    const onChange = (date, dateString) => { 
        setDate(moment(dateString).format());
    };

    const onSubmit = (data) => {
        const obj = data
        obj.price && obj.price.toString();
        const newObj = { 
            ...obj, 
            ...selectValue,
            specialization: selectedItems,
        };
        date && (newObj['birth'] = date);
        const changedValue = Object.fromEntries(Object.entries(newObj).filter(([key, value]) => value !== ''));
        const formData = new FormData();
        selectedImage && formData.append('file', file);
        for(const i in changedValue){
            formData.append(i, changedValue[i]);
        }
        updateDoctor({ data: formData })
    };

    useEffect(() => {
        if (!isLoading && isError) {
            message.error(error?.data?.message);
        }
        if (isSuccess) {

            toast.success('Cập nhật hồ sơ thành công'); 
            setTimeout(()=>{
                window.location.reload();
            }, 3000);
        }
    }, [isLoading, isError, error, isSuccess]);
    return (
        <div style={{ marginBottom: '10rem' }}>
            <div className="w-100 mb-3 rounded mb-5 p-2" style={{ background: '#f8f9fa' }}>
                <h5 className="text-title mb-2 mt-3">Cập nhật hồ sơ của bạn</h5>
                <form className="row form-row" onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-md-12 mb-5">
                        <div className="form-group">
                            <div className="change-avatar d-flex gap-2 align-items-center">
                                <Link to={'/'} className="my-3 patient-img">
                                    <img src={selectedImage ? selectedImage : data?.avatar || dImage} alt=""/>
                                </Link>
                                <div className='mt-3'>
                                    <ImageUpload setSelectedImage={setSelectedImage} setFile={setFile} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Name <span className="text-danger">*</span></label>
                            <input defaultValue={data?.name} {...register("name")} className="form-control" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                        <label>Email <span className="text-danger">*</span></label>
                            <input defaultValue={data?.email} disabled className="form-control" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Phone Number</label>
                            <input defaultValue={data?.phone} {...register("phone")} className="form-control" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Giới tính:  {GenderOptions[data?.gender]}</label>
                            <select className="form-control select" onChange={handleChange} name='gender'>
                                <option value={''}>---</option>
                                <option className='text-capitalize'>Nam</option>
                                <option className='text-capitalize'>Nữ</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Date of Birth {data?.birth ? '--->'+moment(data?.birth).format('LL') : null}</label>
                            <DatePicker onChange={onChange} format={"YYYY-MM-DD"} style={{ width: '100%', padding: '6px' }} />
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="card mb-2 mt-2">
                            <div className="card-body">
                                <h6 className="card-title text-secondary">About Me</h6>
                                <div className="form-group mb-2 card-label">
                                    <label>Biography</label>
                                    <textarea defaultValue={data?.description} {...register("description")} className="form-control" rows={5} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="card mb-2 p-3 mt-2">
                            <h6 className="card-title text-secondary">Clinic Info</h6>
                            <div className="row form-row">
                                <div className="col-md-6">
                                    <div className="form-group mb-2 card-label">
                                        <label>Clinic Name</label>
                                        <input defaultValue={data?.clinicName} {...register("clinicName")} className="form-control" rows={5} />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group mb-2 card-label">
                                        <label>Clinic Address</label>
                                        <input type="text" defaultValue={data?.clinicAddress} {...register("clinicAddress")} className="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="col-md-12">
                        <div className="card mb-2 p-3 mt-2">
                            <h6 className="card-title text-secondary">Contact Details</h6>
                            <div className="row form-row">
                                <div className="col-md-6">
                                    <div className="form-group mb-2 card-label">
                                        <label>Address </label>
                                        <input defaultValue={data?.address} {...register("address")} className="form-control" />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group mb-2 card-label">
                                        <label>State / Province</label>
                                        <input defaultValue={data?.state} {...register("state")} className="form-control" />
                                    </div>
                                </div>                            
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="card mb-2 p-3 mt-2">
                            <h6 className="card-title text-secondary">Pricing</h6>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group mb-2 card-label">
                                        <label>30 Min Fee</label>
                                        <input defaultValue={data?.price} {...register("price")} type='number' className="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="card mb-2 p-3 mt-2">
                            <h6 className="card-title text-secondary">Specialization</h6>
                            <div className="row form-row">
                                <div className="form-group mb-2 card-label">
                                    <Select
                                    defaultValue={data?.specialization ? data?.specialization : null }
                                    style={{ width: '100%' }}
                                    placeholder="Please select"
                                    value={selectedItems}
                                    onChange={setSelectedItems}
                                    options={SpecialOptions}
                                    />                                  
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="card mb-2 p-3 mt-2">
                            <h6 className="card-title text-secondary">Education</h6>
                            <div className="row form-row">
                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="form-group mb-2 card-label">
                                        <label>Degree</label>
                                        <input defaultValue={data?.degree} {...register("degree")} className="form-control" />
                                    </div>
                                </div>

                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="form-group mb-2 card-label">
                                        <label>College/Institute</label>
                                        <input defaultValue={data?.college} {...register("college")} className="form-control" />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="form-group mb-2 card-label">
                                        <label>Year of Completion</label>
                                        <input defaultValue={data?.completionYear} {...register("completionYear")} className="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="card mb-2 p-3 mt-2">
                            <h6 className="card-title text-secondary">Experience</h6>
                            <div className="row form-row">
                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="form-group mb-2 card-label">
                                        <label>Hospital Name</label>
                                        <input defaultValue={data?.experienceHospitalName} {...register("experienceHospitalName")} className="form-control" />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="form-group mb-2 card-label">
                                        <label>From</label>
                                        <input defaultValue={data?.expericenceStart} {...register("expericenceStart")} className="form-control" />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="form-group mb-2 card-label">
                                        <label>To</label>
                                        <input defaultValue={data?.expericenceEnd} {...register("expericenceEnd")} className="form-control" />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="form-group mb-2 card-label">
                                        <label>Designation</label>
                                        <input defaultValue={data?.designation} {...register("designation")} className="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='text-center my-3'>
                        <Button htmlType='submit' type="primary" size='large' loading={isLoading} disabled={isLoading ? true : false} >
                            {isLoading ? 'Đang lưu ...' : 'Lưu thay đổi'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DoctorProfileSetting