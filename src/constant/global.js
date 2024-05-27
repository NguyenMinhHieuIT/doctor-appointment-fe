import dayjs from 'dayjs';
export const bloodGrup = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
export const bloodGrupOptions = bloodGrup.map((data) => {
    return {
        label: data,
        value: data
    }
})

const gender = ['male', 'female', 'shemale']

export const genderOptions = gender.map((data) => {
    return {
        label: data,
        value: data
    }
})
export const daysArray = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const StatusAppointArray = ['cancel','confirmed','pending','in_progress','completed'];
export const StatusAppointOptions = StatusAppointArray.map(data => {
    return {
        label: data,
        value: data
    }
})
export const StatusAppoint = {
    CANCEL : 'cancel',
    CONFIRMED : 'confirmed',
    PENDING : 'pending',
    IN_PROGRESS : 'in_progress',
    COMPLETED : 'completed',
}


  

export const doctorSpecialistArray = [
    { id: 1, value: "Cardiologist" }, // tim mach
    { id: 2, value: "Dermatologist" }, // da lieu
    { id: 3, value: "Orthopedic Surgeon", }, // xuong chinh hinh
    { id: 4, value: "Gynecologist" }, // phu khoa 
    { id: 5, value: "Neurologist" }, // than kinh
    { id: 6, value: "Ophthalmologist" }, // mat
    { id: 7, value: "Pediatrician" }, // nhi khoa
    { id: 8, value: "Endocrinologist" }, // noi tiet
    { id: 9, value: "Gastroenterologist" }, // tieu hoa
    { id: 10, value: "Pulmonologist" }, // phoi
    { id: 11, value: "Orthopedic" } // 
]

export const Special = {
    Urology: 'Urology',
    Neurology: 'Neurology',
    Orthopedic: 'Orthopedic',
    Cardiologist: 'Cardiologist',
    Dentist: 'Dentist',
}


export const SpecialOptions = [
    {
        label: Special.Urology,
        value: Special.Urology,
    },
    {
        label: Special.Neurology,
        value: Special.Neurology,
    },
    {
        label: Special.Orthopedic,
        value: Special.Orthopedic,
    },
    {
        label: Special.Cardiologist,
        value: Special.Cardiologist,
    },
    {
        label: Special.Dentist,
        value: Special.Dentist,
    },

];


export const doctorSpecialistOptions = doctorSpecialistArray.map(data => {
    return {
        label: data.value,
        value: data.value
    }
});

export const doctorTimeSlot = [
    "08:00 AM",
    "08:30 AM",
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM"
]

const appointmentStatus = [
    "pending",
    "scheduled",
    "cancel",
    "confirmed",
    "InProgress",
    "Completed",
    "FollowUp",
    "archived"
]

export const appointemntStatusOption = appointmentStatus.map((item) => {
    return {
        label: item,
        value: item
    }
})

//Daignosis

const medical_diagnoses = [
    "Hypertension",
    "Type 2 Diabetes Mellitus",
    "Coronary Artery Disease",
    "Osteoarthritis",
    "Rheumatoid Arthritis",
    "Chronic Obstructive Pulmonary Disease (COPD)",
    "Asthma",
    "Chronic Kidney Disease",
    "Migraine",
    "Major Depressive Disorder",
    "Generalized Anxiety Disorder",
    "Schizophrenia",
    "Bipolar Disorder",
    "Attention-Deficit/Hyperactivity Disorder (ADHD)",
    "Thyroid Disorders (e.g., Hypothyroidism, Hyperthyroidism)",
    "Gastroesophageal Reflux Disease (GERD)",
    "Peptic Ulcer Disease",
    "Irritable Bowel Syndrome (IBS)",
    "Crohn's Disease",
    "Ulcerative Colitis",
    "Chronic Hepatitis",
    "Cirrhosis of the Liver",
    "Stroke",
    "Epilepsy",
    "Chronic Heart Failure"
]
const medical_diseases = [
    "Hypertension",
    "Type 2 Diabetes Mellitus",
    "Coronary Artery Disease",
    "Osteoarthritis",
    "Rheumatoid Arthritis",
    "Chronic Obstructive Pulmonary Disease (COPD)",
    "Asthma",
    "Chronic Kidney Disease",
    "Migraine",
    "Major Depressive Disorder",
    "Generalized Anxiety Disorder",
    "Schizophrenia",
    "Bipolar Disorder",
    "Attention-Deficit/Hyperactivity Disorder (ADHD)",
    "Thyroid Disorders (e.g., Hypothyroidism, Hyperthyroidism)",
    "Gastroesophageal Reflux Disease (GERD)",
    "Peptic Ulcer Disease",
    "Irritable Bowel Syndrome (IBS)",
    "Crohn's Disease",
    "Ulcerative Colitis",
    "Chronic Hepatitis",
    "Cirrhosis of the Liver",
    "Stroke",
    "Epilepsy",
    "Chronic Heart Failure",
    "Obesity",
    "Arthritis",
    "Dementia",
    "Psoriasis",
    "Celiac Disease"
];

const medicalCheckupList = [
    "Physical Examination",
    "Blood Pressure Measurement",
    "Blood Tests",
    "Cholesterol Panel",
    "Blood Glucose Test",
    "Complete Blood Count (CBC)",
    "Thyroid Function Tests",
    "Liver Function Tests",
    "Kidney Function Tests",
    "Urinalysis",
    "Body Mass Index (BMI) Measurement",
    "Vision Test",
    "Hearing Test",
    "Dental Checkup",
    "Skin Examination",
    "Cancer Screenings (e.g., Mammogram, Pap Smear, Prostate Specific Antigen)",
    "Bone Density Test",
    "Electrocardiogram (ECG or EKG)",
    "Chest X-ray",
    "Pulmonary Function Tests",
    "Colonoscopy",
    "Stool Test for Colorectal Cancer",
    "DEXA Scan (Dual-Energy X-ray Absorptiometry)",
    "HIV Test",
    "Sexually Transmitted Infections (STI) Screenings",
    "Immunizations and Vaccinations",
    "Eye Exam",
    "Psychological Assessment",
    "Annual Checkup with General Practitioner"
];
// "Kiểm tra thể chất",1
//     "Đo huyết áp",2
//     "Xét nghiệm máu",3
//     "Bảng cholesterol",4
//     "Xét nghiệm đường huyết",5
//     "Công thức máu toàn bộ (CBC)",6
//     "Xét nghiệm chức năng tuyến giáp",7
//     "Xét nghiệm chức năng gan",8
//     "Xét nghiệm chức năng thận",9
//     "Phân tích nước tiểu",10
//     "Đo chỉ số khối cơ thể (BMI)",11
//     "Kiểm tra thị giác",12
//     "Kiểm tra nghe",13
//     "Khám răng",14
//     "Kiểm tra da",15
//     "Sàng lọc ung thư (ví dụ: Chụp quang tuyến vú, Xét nghiệm Pap, Kháng nguyên đặc hiệu tuyến tiền liệt)",16
//     "Kiểm tra mật độ xương",17
//     "Điện tâm đồ (ECG hoặc EKG)",18
//     "X-quang ngực",19
//     "Xét nghiệm chức năng phổi",20
//     "Nội soi đại tràng",21
//     "Xét nghiệm phân để phát hiện ung thư đại trực tràng",22
//     "Quét DEXA (Đo hấp thụ tia X năng lượng kép)",23
//     "Kiểm tra hiv",24
//     "Sàng lọc các bệnh lây truyền qua đường tình dục (STI)",25
//     "Tiêm chủng và tiêm chủng",26
//     "Kiểm tra mắt",27
//     "Đánh giá tâm lý",28
//     "Khám sức khỏe hàng năm với bác sĩ đa khoa"29
const dosageList = [
    "250 mg",
    "1000 mg",
    "75 mg",
    "50 mg",
    "5 mg",
    "150 mg",
    "300 mg",
    "200 mg",
    "10 mg",
    "20 mg"
];
const frequenciesList = [
    "Once Daily (QD)",
    "Twice Daily (BID)",
    "Three Times Daily (TID)",
    "Four Times Daily (QID)",
    "Every 6 Hours (Q6H)",
    "As Needed (PRN)",
    "Once Every Other Day (QOD)",
    "Every 8 Hours (Q8H)",
    "Every 12 Hours (Q12H)",
    "Once Weekly (QW)"
];

const patientStatusList = [
    "Stable",
    "Critical",
    "Serious",
    "Guarded",
    "Unstable",
    "Recovering",
    "Critical but Stable",
    "Comfort Measures Only (CMO)",
    "Acute",
    "Chronic"
];

export const PatientStatus = patientStatusList.map((item) => {
    return {
        label: item,
        value: item
    }
})



export const DiagnosisOptions = medical_diagnoses.map((item) => {
    return { label: item, value: item }
})

export const DiseaseOptions = medical_diseases.map((item) => {
    return { label: item, value: item }
})

export const MedicalCheckupOptions = medicalCheckupList.map((item) => {
    return { label: item, value: item }
})

export const DosageOptions = dosageList.map((item) => {
    return {
        label: item,
        value: item
    }
})

export const FrequencyOptions = frequenciesList.map((item) => {
    return {
        label: item,
        value: item
    }
})

export const DateRangePresets = [
    {
        label: 'Next 3 Days',
        value: [dayjs(), dayjs().add(3, 'd')],
    },
    {
        label: 'Next 7 Days',
        value: [dayjs(), dayjs().add(7, 'd')],
    },
    {
        label: 'Next 10 Days',
        value: [dayjs(), dayjs().add(10, 'd')],
    },
    {
        label: 'Next 14 Days',
        value: [dayjs(), dayjs().add(14, 'd')],
    },
    {
        label: 'Next 30 Days',
        value: [dayjs(), dayjs().add(30, 'd')],
    },
    {
        label: 'Next 2 Month',
        value: [dayjs(), dayjs().add(60, 'd')],
    },
    {
        label: 'Next 3 Month',
        value: [dayjs(), dayjs().add(90, 'd')],
    },
];

export const DatePickerSinglePresets = [
    {
        label: 'Tomorrow',
        value: dayjs().add(1, 'd'),
    },
    {
        label: 'Next 3 Day',
        value: dayjs().add(3, 'd'),
    },
    {
        label: 'Next Week',
        value: dayjs().add(7, 'd'),
    },
    {
        label: 'Next 2 Week',
        value: dayjs().add(15, 'd'),
    },
    {
        label: 'Next Month',
        value: dayjs().add(30, 'd'),
    },
    {
        label: 'Next 2 Month',
        value: dayjs().add(60, 'd'),
    },
    {
        label: 'Next 3 Month',
        value: dayjs().add(90, 'd'),
    },
    {
        label: 'Next 6 Month',
        value: dayjs().add(180, 'd'),
    },
]