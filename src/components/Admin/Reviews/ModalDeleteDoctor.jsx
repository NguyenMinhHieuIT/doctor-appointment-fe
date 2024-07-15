import React, { useEffect, useState } from 'react';
import { useAdminDeleteAppointMutation, useAdminDeleteDoctorMutation, useAdminDeletePatientMutation, useAdminDeleteReviewMutation} from '../../../redux/api/adminApi';
import { Modal, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

function ModalDeleteDoctor(props) {
    const { show, handleClose, id, refetch } = props;
    const [Delete, {isLoading, isError, isSuccess}] = useAdminDeleteReviewMutation();
    const { register, handleSubmit, setValue } = useForm({});
   
    const onSubmit = () => {
        Delete(+id)
    }

    useEffect(()=>{
        if( isError ) {
            toast.error('Xóa đánh giá thất bại')
        }
        if(isSuccess){
            toast.success('Xóa đánh giá thành công')
            refetch()
            handleClose()
        }

    },[isError, isSuccess])

    return (
        <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Bạn có muốn xóa đánh giá này</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button type='submit' variant="primary mx-3" onClick={handleSubmit(onSubmit)}>
                        Xóa
                    </Button>
            </Modal.Body>
        </Modal>
    );
}

export default ModalDeleteDoctor;
