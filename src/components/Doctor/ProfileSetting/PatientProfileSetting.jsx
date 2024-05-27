import React, { useEffect, useRef, useState } from 'react'
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { bloodGrupOptions } from '../../../constant/global';
import { useUpdatePatientMutation } from '../../../redux/api/patientApi';
import useAuthCheck from '../../../redux/hooks/useAuthCheck';
import { message } from 'antd';
import ImageUpload from '../../UI/form/ImageUpload';
import pImage from '../../../images/avatar.jpg';
import { DatePicker } from 'antd';
import './index.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { GenderOptions } from '../../../constant/user.constant';

const PatientProfileSetting = () => {
    const navigate = useNavigate()
    const { data } = useAuthCheck();
    const { register, handleSubmit } = useForm({});
    const [selectBloodGroup, setSelectBloodGroup] = useState('');
    const [selectValue, setSelectValue] = useState({})
    const [updatePatient, { isSuccess, isError, error, isLoading }] = useUpdatePatientMutation();
    const [date, setDate] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [file, setFile] = useState(null);

    const onChange = (date, dateString) => { 
        setDate(moment(dateString).format());
    };

    useEffect(() => {
        if (data) {
            setSelectBloodGroup(data?.bloodGroup)
        }
    }, [data]);

    useEffect(() => {
        if (!isLoading && isError) {
            message.error(error?.data?.message)
        }
        if (isSuccess) {
            window.location.reload();
            setTimeout(()=>{
                 toast.success('Cập nhật hồ sơ thành công');
            },3000);
        }
    }, [isLoading, isError, error, isSuccess]);

    const handleChangeBloodGroup = (e) => {  
        setSelectValue({ ...selectValue, [e.target.name]: e.target.value });
        setSelectBloodGroup(e.target.value);
    }

    const handleChangeGender = (e) => {
        setSelectValue({ ...selectValue, [e.target.name]: e.target.value === 'Nam' ? 'male' : 'female' });
    }

    const onSubmit = (data) => {
        const obj = data;
        const newObj = { ...obj, ...selectValue };
        date && (newObj['birth'] = date);
        const changedValue = Object.fromEntries(Object.entries(newObj).filter(([key, value]) => value !== ''));
        const formData = new FormData();
        selectedImage && formData.append('file', file);
        for(const i in changedValue){
            formData.append(i,changedValue[i]);
        }
        updatePatient({ data: formData });
    };

    return (
        <div style={{ marginBottom: '10rem' }}>
            <div className="w-100 mb-3 rounded mb-5 p-2" style={{ background: '#f8f9fa' }}>
                <h5 className="text-title mb-2 mt-3">Cập nhật hồ sơ của bạn</h5>
                <form className="row form-row" onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-md-12">
                        <div className="form-group">
                            <div className='change-avatar d-flex gap-2 align-items-center'>
                                <Link to={'/'} className="my-3 patient-img">
                                    <img src={selectedImage ? selectedImage : data?.avatar || pImage} alt="" />
                                </Link>
                                <div className="mt-3">
                                    <ImageUpload setSelectedImage={setSelectedImage} setFile={setFile}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Tên <span className="text-danger">*</span></label>
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
                            <label>Ngày sinh {moment(data?.birth).format('LL')}</label>
                            <DatePicker onChange={onChange} format={"YYYY-MM-DD"} style={{ width: '100%', padding: '6px' }} />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Số điện thoại</label>
                            <input defaultValue={data?.phone} {...register("phone")} className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group mb-2">
                         <label>Giới tính:  {GenderOptions[data?.gender]}</label>
                            <select className="form-control select" onChange={handleChangeGender} name='gender'>
                                <option className={''}>---</option>
                                <option className='text-capitalize'>Nam</option>
                                <option className='text-capitalize'>Nữ</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2">
                            <label className='form-label'>Nhóm máu</label>
                            <select className="form-control select"
                                onChange={handleChangeBloodGroup}
                                name='bloodGroup'
                                value={selectBloodGroup}
                            >
                                {
                                    bloodGrupOptions.map((option, index) => (
                                        <option key={index} value={option.value} className='text-capitalize'>{option.label}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>       
                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Trạng thái</label>
                            <input defaultValue={data?.state} {...register("state")} className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Địa chỉ</label>
                            <input defaultValue={data?.address} {...register("address")} className="form-control" />
                        </div>
                    </div>
                    <div className='text-center'>
                        <button type="submit" className="btn btn-primary my-3" disabled={isLoading ? true : false}>
                        {isLoading ? 'Đang lưu ...' : 'Lưu thay đổi'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PatientProfileSetting