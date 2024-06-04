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