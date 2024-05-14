import React from 'react';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import { Button, message } from 'antd';
import { useForm } from 'react-hook-form';
import { useChangePassMutation } from '../../../redux/api/patientApi';
import { useNavigate } from 'react-router-dom';
import { loggedOut } from '../../../service/auth.service';
import { useEffect } from 'react';
import { useState } from 'react';
const ChangePassword = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [userChangePass, { isError, isLoading, isSuccess, error }] = useChangePassMutation();
    const [isLoad, setLoad] = useState(false);
    const navigate = useNavigate()
    const onSubmit = async (data) => {
        if (data?.confirmPassword !== data?.newPassword) {
            message.error('confirmPassword not like newPassword');
            return;
        }
        userChangePass({
            password: data?.password,
            newPassword: data?.newPassword,
        });
        setLoad(true);
    }
    useEffect(() => {
        if (isSuccess && !isError) {
            loggedOut();
            navigate('/'); 
            return;   
        }
        message.error('password or newPassword wrong');
        setLoad(false);
    }, [isSuccess, isError])
    return (
        <DashboardLayout>
            <div className="w-100 mb-3 rounded p-2" style={{ background: '#f8f9fa' }}>
                <h5 className='text-title mt-3'>Change Your Password</h5>
                <form className='container row form-row px-5 mx-auto my-5' onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-md-12">
                        <div className="form-group mb-3 card-label">
                            <label>Old Password</label>
                            <input {...register('password', { required: true })} type="password" placeholder='Old Password' className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group mb-3 card-label">
                            <label>New Password</label>
                            <input {...register('newPassword', { required: true })} type="password" placeholder='New Password' className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group mb-2 card-label">
                            <label>Confirm Password</label>
                            <input {...register('confirmPassword', { required: true })} type="password" placeholder='Confirm Password' className="form-control" />
                        </div>
                    </div>
                    <div className='mt-5 text-center'>
                        <Button htmlType='submit' type="primary" size='large'>Save Changes</Button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    )
}

export default ChangePassword;