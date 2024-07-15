import React, { useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useDeleteReviewMutation } from '../../../redux/api/reviewsApi';


const ModalDelete = (props) => {
    const { show, handleClose, id, refetch } = props;
    const {handleSubmit} = useForm();

    const [Delete, {isSuccess, isError}] = useDeleteReviewMutation();
    const onSubmit = () => {
        Delete(+id);
    }

    useEffect(() => {
        if(isSuccess){
            toast.success('Xóa đánh giá thành công');
            handleClose();
            refetch();
        }
        if(isError){
            toast.error('Xóa đánh giá thất bại');
            handleClose();
        }
    }, [isSuccess, isError])

    return (
         <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Bạn có muốn xóa đánh giá này ?</Modal.Title>
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
};

export default ModalDelete;