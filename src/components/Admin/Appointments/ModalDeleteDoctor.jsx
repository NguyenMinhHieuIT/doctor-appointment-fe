import React, { useEffect, useState } from 'react';
import { useAdminDeleteAppointMutation, useAdminDeleteDoctorMutation, useAdminDeletePatientMutation} from '../../../redux/api/adminApi';
import { Modal, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

function ModalDeleteDoctor(props) {
    const { show, handleClose, id, refetch } = props;
    const [Delete, {isLoading, isError, isSuccess}] = useAdminDeleteAppointMutation();
    const { register, handleSubmit, setValue } = useForm({});
   
    const onSubmit = () => {
        Delete(+id)
    }

    useEffect(()=>{
        if( isError ) {
            toast.error('Xóa cuộc hẹn thất bại')
        }
        if(isSuccess){
            toast.success('Xóa cuộc hẹn thành công')
            refetch()
            handleClose()
        }

    },[isError, isSuccess])

    return (
        <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Bạn có muốn xóa cuộc hẹn này <br /> Lưu ý: Nếu xóa cuộc hẹn có thể xóa các đơn thuốc nằm trong cuộc hẹn</Modal.Title>
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
