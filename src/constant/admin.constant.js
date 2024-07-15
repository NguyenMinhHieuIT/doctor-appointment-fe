export const searchDoctor = {
    name: 'Tên',
    age: 'Tuổi',
    address: 'Địa chỉ',
    clinicName: 'Nơi làm việc',
    email: 'Email',
    specialization: 'Chuyên môn',
    phone: 'Số điện thoại'
}

export const searchDoctorOptions = Object.keys(searchDoctor).map((item)=>{
    return {
        label: searchDoctor[item],
        value: item,  
    }
})

export const searchPatient = {
    name: 'Tên',
    age: 'Tuổi',
    address: 'Địa chỉ',
    email: 'Email',
    phone: 'Số điện thoại',
    bloodGroup: 'Nhóm máu'
}

export const searchPatientOptions = Object.keys(searchPatient).map((item)=>{
    return {
        label: searchPatient[item],
        value: item,  
    }
})