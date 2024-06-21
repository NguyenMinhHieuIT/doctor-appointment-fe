import React, { useEffect, useState } from 'react'
import Footer from '../../Shared/Footer/Footer'
import img from '../../../images/doc/doctor 3.jpg'
import './index.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Empty, Button, message, Steps } from 'antd';
import { useGetOneDoctorQuery } from '../../../redux/api/doctorApi';
import { FaArchway } from "react-icons/fa";
import { useGetAppointmentTimeQuery } from '../../../redux/api/timeSlotApi';
import moment from 'moment';
import SelectDateAndTime from '../SelectDateAndTime';
import PersonalInformation from '../PersonalInformation';
import CheckoutPage from '../BookingCheckout/CheckoutPage';
import { useCreateAppointmentMutation } from '../../../redux/api/appointmentApi';
import { useDispatch } from 'react-redux';
import { addInvoice } from '../../../redux/feature/invoiceSlice';
import Header from '../../Shared/Header/Header';
import useAuthCheck from '../../../redux/hooks/useAuthCheck';

const DoctorBooking = () => {
    const dispatch = useDispatch();
    let initialValue = {
        paymentMethod: 'paypal',
        paymentType: 'creditCard',
        name: '',
        email: '',
        phone: '',
        reasonForVisit: '',
        description: '',
        address: '',
        nameOnCard: '',
        cardNumber: '',
        expiredMonth: '',
        cardExpiredYear: '',
        cvv: '',
    }
    const {data:loggedInUser, role} = useAuthCheck();
    const [current, setCurrent] = useState(0);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectDay, setSelecDay] = useState('');
    const [selectTimeStart, setSelectTimeStart] = useState('');
    const [selectTimeEnd, setSelectTimeEnd] = useState('');
    const [isCheck, setIsChecked] = useState(false);
    const [patientId, setPatientId] = useState('');
    const [createAppointment, { data: appointmentData, isSuccess: createIsSuccess, isError: createIsError, error: createError, isLoading: createIsLoading }] = useCreateAppointmentMutation();
    const { doctorId } = useParams();
    const navigation = useNavigate();
    const { data, isLoading, isError, error } = useGetOneDoctorQuery(doctorId);
    const { data: time, refetch, isLoading: dIsLoading, isError: dIsError, error: dError } = useGetAppointmentTimeQuery({ day: selectDay, id: doctorId });

    const [selectValue, setSelectValue] = useState(initialValue);
    const [IsdDisable, setIsDisable] = useState(true);
    const [IsConfirmDisable, setIsConfirmDisable] = useState(true);

    const handleChange = (e) => { setSelectValue({ ...selectValue, [e.target.name]: e.target.value }) }

    useEffect(() => {
        const { name, email, phone, nameOnCard, cardNumber, expiredMonth, cardExpiredYear, cvv, reasonForVisit } = selectValue;
        const isInputEmpty = !name || !email || !phone || !reasonForVisit;
        const isConfirmInputEmpty = !nameOnCard || !cardNumber || !expiredMonth || !cardExpiredYear || !cvv || !isCheck;
        setIsDisable(isInputEmpty);
        setIsConfirmDisable(isConfirmInputEmpty);
    }, [selectValue, isCheck])


    const handleDateChange = (_date, dateString) => {
        setSelectedDate(dateString)
        setSelecDay(moment(dateString).format('dddd').toLowerCase());
        refetch();
    }
    const disabledDateTime = (current) => current && (current < moment().add(1, 'day').startOf('day') || current > moment().add(8, 'days').startOf("day"))
    const handleSelectTime = (date) => { 
        setSelectTimeStart(date.timeStart);
        setSelectTimeEnd(date.timeEnd);
     }

    const next = () => { setCurrent(current + 1) };
    const prev = () => { setCurrent(current - 1) };

    let dContent = null;
    if (dIsLoading) dContent = <div>Loading ...</div>
    if (!dIsLoading && dIsError) dContent = <div>Something went Wrong!</div>
    if (!dIsLoading && !dIsError && time?.length === 0) dContent = <Empty children="Doctor Is not Available" />
    if (!dIsLoading && !dIsError && time?.length > 0) dContent =
        <>
            {
                time && time.map((item, id) => (
                    <div className="col-md-4" key={id + 155}>
                        <Button type={item?.slot?.startTime === selectTimeStart ? "primary" : "default"} shape="round" size='large' className='mb-3' onClick={() => handleSelectTime({
                            timeStart: item?.slot?.startTime,
                            timeEnd: item?.slot?.endTime}
                        )}>                        
                            {item?.slot?.startTime} - {item?.slot?.endTime}
                        </Button>
                    </div>
                ))
            }
        </>

    //What to render
    let content = null;
    if (!isLoading && isError) content = <div>Something Went Wrong!</div>
    if (!isLoading && !isError && data?.id === undefined) content = <Empty />
    if (!isLoading && !isError && data?.id) content =
        <>
            <div className="booking-doc-img my-3 mb-3 rounded">
                <Link to={`/doctors/${data?.id}`}>
                    <img src={data?.avatar ? data?.avatar : img} alt="" />
                </Link>
                <div className='text-start'>
                    <Link to={`/doctors/${data?.id}`} style={{ textDecoration: 'none' }}>Dr. {data?.name}</Link>
                    <p className="form-text mb-0"><FaArchway /> {data?.specialization + ', ' + data?.clinicName + ', ' 
                    + data?.clinicAddress}</p>
                </div>
            </div>
        </>
    const steps = [
        {
            title: 'Chọn ngày khám và thời gian khám',
            content: <SelectDateAndTime
                content={content}
                handleDateChange={handleDateChange}
                disabledDateTime={disabledDateTime}
                selectedDate={selectedDate}
                dContent={dContent}
                selectTimeStart={selectTimeStart}
                selectTimeEnd={selectTimeEnd}
            />
        },
        {
            title: 'Thông tin bệnh nhân',
            content: <PersonalInformation handleChange={handleChange} selectValue={selectValue}/>
        },
        {
            title: 'Thông tin thanh toán',
            content: <CheckoutPage
                handleChange={handleChange}
                selectValue={selectValue}
                isCheck={isCheck}
                setIsChecked={setIsChecked}
                data={data}
                selectedDate={selectedDate}
                selectTimeStart={selectTimeStart}
                selectTimeEnd={selectTimeEnd}
            />,
        },
    ]

    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }))

    const handleConfirmSchedule = () => {
        const obj = {
            name: selectValue.name,
            email: selectValue.email,
            phone: selectValue.phone,
            scheduleDate: selectedDate,
            startTime: selectTimeStart,
            endTime: selectTimeEnd,
            doctorId: +doctorId,
            reasonForVisit: selectValue.reasonForVisit,
        };
    
        // obj.payment = {
        //     paymentType: selectValue.paymentType,
        //     paymentMethod: selectValue.paymentMethod,
        //     cardNumber: selectValue.cardNumber,
        //     cardExpiredYear: selectValue.cardExpiredYear,
        //     cvv: selectValue.cvv,
        //     expiredMonth: selectValue.expiredMonth,
        //     nameOnCard: selectValue.nameOnCard
        // }
        createAppointment(obj);
    }

    useEffect(() => {
        if (createIsSuccess) {
            message.success("Succcessfully Appointment Scheduled")
            setSelectValue(initialValue);
            dispatch(addInvoice({ ...appointmentData }))
            navigation(`/booking/success/${appointmentData.id}`)
        }
        if (createIsError) {
            message.error(error?.data?.message);
        }
    }, [createIsSuccess, createError])
    return (
        <>
            <Header />
            <div className="container" style={{ marginBottom: '12rem', marginTop: '8rem' }}>
                <Steps current={current} items={items} />
                <div className='mb-5 mt-3 mx-3'>{steps[current].content}</div>
                <div className='text-end mx-3' >
                    {current < steps.length - 1 && (<Button type="primary"
                        disabled={current === 0 ? (selectTimeStart ? false : true) : (IsdDisable || !selectTimeStart)}
                        onClick={() => next()}>Tiếp</Button>)}

                    {current === steps.length - 1 && (<Button type="primary" disabled={IsConfirmDisable} loading={createIsLoading} onClick={handleConfirmSchedule}>Xác nhận</Button>)}
                    {current > 0 && (<Button style={{ margin: '0 8px', }} onClick={() => prev()} >Quay lại</Button>)}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default DoctorBooking