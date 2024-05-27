import DashboardLayout from "../DashboardLayout/DashboardLayout";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { Button, DatePicker, Space, message } from "antd";
import dayjs from 'dayjs';
import { useEffect, useState } from "react";
import { DatePickerSinglePresets, DiagnosisOptions, DiseaseOptions, DosageOptions, FrequencyOptions, MedicalCheckupOptions, PatientStatus, StatusAppointOptions, appointemntStatusOption } from "../../../constant/global";
import SelectForm from "../../UI/form/SelectForm";
import TextArea from "antd/es/input/TextArea";
import InputAutoCompleteForm from "../../UI/form/InputAutoCompleteForm";
import { useForm } from "react-hook-form";
import SelectFormForMedicine from "../../UI/form/SelectFormForMedicine";
import MedicineRangePickerForm from "../../UI/form/MedicineRangePickerForm";
import { useCreatePrescriptionMutation } from "../../../redux/api/prescriptionApi";
import { useGetSingleAppointmentQuery } from "../../../redux/api/appointmentApi";
import TreatmentOverview from "./TreatmentOverview";

const Treatment = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data } = useGetSingleAppointmentQuery(id)
    const { register, handleSubmit } = useForm();
    const [isDisable, setIsDisable] = useState(true);
    const [selectAppointmentStatus, setSelectAppointmentStatus] = useState('');
    const [medicalCheckup, setMedicalCheckup] = useState([]);
    const [instruction, setInstruction] = useState('');
    const [medicineList, setMedicineList] = useState([{ id: 1 }]);

    useEffect(() => {
        const isInputEmpty = !selectAppointmentStatus || !instruction || !medicalCheckup.length === 0;
        setIsDisable(isInputEmpty);
    }, [selectAppointmentStatus, instruction, medicineList, medicalCheckup]);

    const [createPrescription, { isSuccess, isLoading, isError, error }] = useCreatePrescriptionMutation();

    const addField = (e) => {
        e.preventDefault();
        setMedicineList([...medicineList, { id: medicineList.length + 1 }])
    }

    const removeFromMedicineList = (id) => {
        setMedicineList(medicineList.filter((item) => item.medicine !== id))
    }


    const onSubmit = (data) => {
        const obj = {};
        obj.status = selectAppointmentStatus;
        obj.patientStatus = data.patientStatus;
        obj.daignosis = data.daignosis;
        obj.disease = data.disease;
        medicalCheckup.length && (obj["test"] = medicalCheckup.join(','))
        obj.instruction = instruction;
        obj.medicine = medicineList;
        obj.appointmentId = +id;

        createPrescription({ data: obj });
    }

    useEffect(() => {
        if (!isLoading && isError) {
            message.error(error?.data?.message);
        }
        if (isSuccess) {
            message.success('Successfully Changed Saved !');
            setSelectAppointmentStatus("");
            setMedicalCheckup([]);
            setInstruction('');
            setMedicineList([{ id: 1 }]);
            navigate('/dashboard/prescription')
        }
    }, [isLoading, isError, error, isSuccess])

    return (
        <DashboardLayout>
            <TreatmentOverview data={data} />
            <div className="w-100 mb-3 rounded p-3 bg-gray-g">
                <div className="text-center mb-2 d-flex justify-content-center">
                    <h5 className="border-success border-bottom w-25 pb-2 border-5">Start Treatment</h5>
                </div>

                <form className="row form-row" onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-md-6">
                        <div className="form-group mb-4">
                            <div className="mb-2">
                                <h6 className="card-title text-secondary">Change Appointment Status</h6>
                            </div>
                            <SelectForm
                                showSearch={true}
                                options={StatusAppointOptions}
                                setSelectData={setSelectAppointmentStatus}
                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-4">
                            <div className="mb-2">
                                <h6 className="card-title text-secondary">Change Patient Status</h6>
                            </div>
                            <input required {...register("patientStatus")} className="form-control" placeholder='Patient Status'/>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="card p-3 mb-3">
                            <h6 className="card-title text-secondary">Identify Disease & Symtomps</h6>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group mb-3">                                      
                                        <input required {...register("daignosis")} className="form-control" placeholder='Daignosis'/>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                    <input required {...register("disease")} className="form-control" placeholder='disease'/>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="col-md-12 mb-3">
                        <div className="card mb-2 p-3 mt-2">
                            <h6 className="card-title text-secondary">Medical Checkup</h6>
                            <div className="row form-row">
                                <div className="form-group mb-2 card-label">
                                    <SelectForm
                                        mode={true}
                                        setSelectData={setMedicalCheckup}
                                        options={MedicalCheckupOptions}
                                    />
                                    <small className="form-text text-muted">Note : Type & Press enter to add new services</small>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="card mb-2 p-3 mt-2">
                            <h6 className="card-title text-secondary">Medicine</h6>
                            {
                                medicineList?.map((item, index) => (
                                    <div className="row form-row mb-4 position-relative border border-success rounded m-2 p-2" key={index + 1}>
                                        <div className="col-md-6 mb-3">
                                            <label>Medicine Name</label>
                                            <div className="form-group mb-2">
                                                <InputAutoCompleteForm
                                                    id={item.id}
                                                    keyName={"medicine"}
                                                    medicineList={medicineList}
                                                    setMedicineList={setMedicineList}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label>Dosage</label>
                                            <div className="form-group mb-2">
                                                <InputAutoCompleteForm
                                                    id={item.id}
                                                    keyName={"dosage"}
                                                    medicineList={medicineList}
                                                    setMedicineList={setMedicineList}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label>Frequency</label>
                                            <div className="form-group mb-2">
                                                <InputAutoCompleteForm
                                                    id={item.id}
                                                    keyName={"frequency"}
                                                    medicineList={medicineList}
                                                    setMedicineList={setMedicineList}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label>Start Date / End Date</label>
                                            <div className="form-group mb-2">
                                                <Space direction="vertical" size={12}>
                                                    <MedicineRangePickerForm
                                                        id={item.id}
                                                        medicineList={medicineList}
                                                        setMedicineList={setMedicineList}
                                                    />

                                                </Space>
                                            </div>
                                        </div>

                                        <a className="text-danger position-absolute text-end mb-3"
                                            onClick={() => removeFromMedicineList(item?.id)} style={{ top: '-35px' }}>
                                            <FaRegTrashAlt />
                                        </a>
                                    </div>
                                ))
                            }
                        </div>

                        <div className="mb-4" style={{ width: '120px' }}>
                            <Button type="primary" size='small' htmlType="button" onClick={addField} block icon={<FaPlus />}>
                                Add
                            </Button>
                        </div>
                    </div>

                    {/* <div className="col-md-12 mb-3">
                        <label>Follow Up Date</label>
                        <div className="form-group mb-2">
                            <DatePicker
                                presets={DatePickerSinglePresets}
                                onChange={handleFollowUpChange}
                                showTime
                                size="large"
                                style={{ width: '100%' }}
                            />
                        </div>
                    </div> */}

                    <div className="col-md-12 mb-3">
                        <div className="form-group mb-2">
                            <label>Instruction</label>
                            <TextArea rows={4} placeholder="Instruction text ..." onChange={(e) => setInstruction(e.target.value)} />
                        </div>
                    </div>

                    <div className='text-center my-3'>
                        <Button htmlType='submit' type="primary" size='large' disabled={isDisable} loading={isLoading}>
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    )
}

export default Treatment;