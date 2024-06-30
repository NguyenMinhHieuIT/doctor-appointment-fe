import DashboardLayout from "../DashboardLayout/DashboardLayout";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { Button, Space } from "antd";
import { useEffect, useState } from "react";
import {  MedicalCheckupOptions, appointemntStatusOption, StatusAppointOptions } from "../../../constant/global";
import SelectForm from "../../UI/form/SelectForm";
import TextArea from "antd/es/input/TextArea";
import InputAutoCompleteForm from "../../UI/form/InputAutoCompleteForm";
import { useForm } from "react-hook-form";
import MedicineRangePickerForm from "../../UI/form/MedicineRangePickerForm";
import { useGetPrescriptionQuery, useUpdatePrescriptionMutation } from "../../../redux/api/prescriptionApi";
import { useMessageEffect } from "../../../utils/messageSideEffect";
import TreatmentOverview from "./TreatmentOverview";

const TreatmentEdit = () => {
    const [updatePrescription, { isLoading: presIsloading, isSuccess: presIsSuccess, isError: presIsError, error: presError }] = useUpdatePrescriptionMutation()
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isLoading } = useGetPrescriptionQuery(id);
    const [isReadyData, setIsReadyData] = useState(false);
    const { register, handleSubmit } = useForm();
    const [selectAppointmentStatus, setSelectAppointmentStatus] = useState('');
    const [medicalCheckup, setMedicalCheckup] = useState([]);
    const [instruction, setInstruction] = useState('');
    const [medicineList, setMedicineList] = useState([]);

    const defatulTests = data?.test.split(',');

    const addField = (e) => {
        e.preventDefault();
        setMedicineList([...medicineList, { id: medicineList.length + 1 }])
    }

    const removeFromMedicineList = (id) => {
        setMedicineList(medicineList.filter((item) => item.id !== id))
    }

    const dataQuery = data;

    const onSubmit = (data) => {
        const obj = {};
        obj.status = selectAppointmentStatus;
        obj.patientStatus = data.patientStatus;
        obj.daignosis = data.daignosis;
        obj.disease = data.disease;
        medicalCheckup.length && (obj["test"] = medicalCheckup.join(','))
        obj.instruction = instruction;
        obj.medicine = medicineList;
        obj.appointId = +dataQuery?.appoint?.id;
        const filteredData = Object.fromEntries(Object.entries(obj).filter(([key, value]) => value !== ''))
        updatePrescription({id: id, data: filteredData});
    }


    // Side Effect
    useEffect(() => {
        if (data) {
            setIsReadyData(true);
            setMedicineList(data?.medicine)
        }
        if (presIsSuccess) {
            navigate('/dashboard/prescription')
        }
    }, [data, presIsSuccess]);

  
    useMessageEffect(presIsloading, presIsSuccess, presIsError, presError, 'Đã cập nhật đơn thuốc thành công!');

    return (
        <DashboardLayout>
            <TreatmentOverview data={data?.appoint} isAppointment={true} />
            <div className="w-100 mb-3 rounded p-3 bg-gray-g">
                <div className="text-center mb-2 d-flex justify-content-center">
                    <h5 className="border-success border-bottom w-25 pb-2 border-5">Sửa đơn thuốc</h5>
                </div>

                <form className="row form-row" onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-md-6">
                        <div className="form-group mb-4">
                            <div className="mb-2">
                                <h6 className="card-title text-secondary">Trạng thái cuộc hẹn</h6>
                            </div>
                            {isReadyData &&
                                <SelectForm
                                    showSearch={true}
                                    options={StatusAppointOptions}
                                    setSelectData={setSelectAppointmentStatus}
                                    defaultValue={data?.appoint?.status}
                                />
                            }
                        </div>
                    </div>



                    <div className="col-md-12">
                        <div className="card p-3 mb-3">
                            <h6 className="card-title text-secondary">Xác định bệnh & triệu chứng</h6>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <input defaultValue={data?.daignosis}  required {...register("daignosis")} className="form-control" placeholder='daignosis' />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <input defaultValue={data?.disease}  required {...register("disease")} className="form-control" placeholder='disease' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12 mb-3">
                        <div className="card mb-2 p-3 mt-2">
                            <h6 className="card-title text-secondary">Kiểm tra sức khỏe</h6>
                            <div className="row form-row">
                                <div className="form-group mb-2 card-label">
                                    {isReadyData &&
                                        <SelectForm
                                            mode={true}
                                            setSelectData={setMedicalCheckup}
                                            options={MedicalCheckupOptions}
                                            defaultValue={defatulTests}
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="card mb-2 p-3 mt-2">
                            <h6 className="card-title text-secondary">Thuốc</h6>
                            {
                                isReadyData && medicineList?.map((item, index) => (
                                    <div className="row form-row mb-4 position-relative border border-success rounded m-2 p-2" key={index + 1}>
                                        <div className="col-md-6 mb-3">
                                            <label>Tên loại thuốc</label>
                                            <div className="form-group mb-2">
                                                <InputAutoCompleteForm
                                                    id={item.id}
                                                    keyName={"medicine"}
                                                    defaultValue={item.medicine}
                                                    medicineList={medicineList}
                                                    setMedicineList={setMedicineList}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label>Liều lượng</label>
                                            <div className="form-group mb-2">
                                                <InputAutoCompleteForm
                                                    id={item.id}
                                                    keyName={"dosage"}
                                                    defaultValue={item.dosage}
                                                    medicineList={medicineList}
                                                    setMedicineList={setMedicineList}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label>Tần suất</label>
                                            <div className="form-group mb-2">
                                                <InputAutoCompleteForm
                                                    id={item.id}
                                                    keyName={"frequency"}
                                                    defaultValue={item.frequency}
                                                    medicineList={medicineList}
                                                    setMedicineList={setMedicineList}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label>Ngày bắt đầu / ngày kết thúc {item.duration}</label>
                                            <div className="form-group mb-2">
                                                <Space direction="vertical" size={12}  >
                                                    <MedicineRangePickerForm
                                                        id={item.id}
                                                        medicineList={medicineList}
                                                        setMedicineList={setMedicineList}
                                                    />
                                                </Space>
                                            </div>
                                        </div>

                                        <a className="text-danger position-absolute text-end mb-3"
                                            onClick={() => removeFromMedicineList(item?.id)}>
                                             <FaRegTrashAlt />
                                        </a>                                                                    
                                    </div>
                                ))
                            }
                        </div>

                        <div className="mb-4">
                            <Button style={{ width: '120px' }} type="primary" size='small' htmlType="button" onClick={addField} block icon={<FaPlus />}>
                                Add
                            </Button>
                        </div>
                    </div>

                    <div className="col-md-12 mb-3">
                        <div className="form-group mb-2">
                            <label>Chỉ dẫn</label>
                            {isReadyData &&
                                <TextArea rows={4} placeholder="Instruction text ..." onChange={(e) => setInstruction(e.target.value)} defaultValue={data?.instruction} />
                            }
                        </div>
                    </div>

                    <div className='text-center my-3'>
                        <Button htmlType='submit' type="primary" size='large' loading={isLoading}>
                            Submit
                        </Button>
                    </div>
                </form>
            </div>

        </DashboardLayout>
    )
}

export default TreatmentEdit;