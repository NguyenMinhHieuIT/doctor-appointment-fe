import React, { useEffect, useState } from 'react';
import { useAdminGetOneAppointQuery,useAdminGetOneReviewQuery,useAdminUpdateReviewMutation } from '../../../redux/api/adminApi';
import { Modal, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { DatePicker, Select } from 'antd';
import { SpecialOptions } from '../../../constant/global';
import moment from 'moment';
import { toast } from 'react-toastify';

function ModalUpdateDoctor(props) {
    const { handleClose, show, id, refetchParent } = props;
    const { data, refetch } = useAdminGetOneReviewQuery(id, { skip: !id });
    const [update, { isLoading, isError, isSuccess, error }] = useAdminUpdateReviewMutation();
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
                <Modal.Title>Cập nhật cuộc đánh giá </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row form-row" onSubmit={handleSubmit(onSubmit)}>
                
                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Sao</label>
                            <input 
                                name="star"
                                value={formData?.star || ''} 
                                {...register("star")} 
                                type={Number}
                                onChange={handleInputChange} 
                                className="form-control" 
                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-2 card-label">
                            <label>Đánh giá</label>
                            <input 
                                name="description"
                                value={formData?.description || ''} 
                                {...register("description")} 
                                onChange={handleInputChange} 
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
