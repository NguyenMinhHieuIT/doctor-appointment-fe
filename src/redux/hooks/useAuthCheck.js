import { useEffect, useState } from "react";
import { useGetDoctorQuery } from "../api/doctorApi";
import { useGetPatientQuery } from "../api/patientApi";
import { getUserInfo } from '../../service/auth.service';

export default function useAuthCheck() {
    const [authChecked, setAuthChecked] = useState(false);
    const [userId, setUserId] = useState('');
    const [isSkip, setIsSkip] = useState(true);
    const [data, setData] = useState({});
    const [role, setRole] = useState("");
    const { data: doctorData, isError, isSuccess: dIsSuccess } = useGetDoctorQuery();
    const { data: patientData, isError: pIsError, isSuccess: pIsSuccess } = useGetPatientQuery();

    useEffect(() => {
        const localAuth = getUserInfo();
        if (localAuth && localAuth !== null) {
            if (localAuth.role === 'patient') {
                setUserId(localAuth?.userId)
                setIsSkip(false);
                setData(patientData)
                setRole(localAuth.role)
                setAuthChecked(pIsSuccess && !pIsError)
            } else if (localAuth.role === 'doctor') {
                setUserId(localAuth?.userId)
                setIsSkip(false);
                setData(doctorData)
                setRole(localAuth.role)
                setAuthChecked(dIsSuccess && !isError)
            } else if(localAuth.role === 'admin'){
                setUserId(localAuth?.userId)
                setIsSkip(false);
                setData(patientData)
                setRole(localAuth.role)
                setAuthChecked(pIsSuccess && !pIsError)
            }
        }
    }, [patientData, doctorData, isError, dIsSuccess, pIsError, pIsSuccess]);

    return {
        authChecked,
        data,
        role
    };
}