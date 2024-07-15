import { useEffect, useState } from "react";
import { useGetPatientQuery } from "../api/patientApi";
import { getUserInfo } from '../../service/auth.service';

export default function useAuthCheck() {
    const [authChecked, setAuthChecked] = useState(false);
    const [data, setData] = useState({});
    const [role, setRole] = useState("");
    const [userId, setUserId] = useState(1);
    const { data: userData, isError, isSuccess, refetch } = useGetPatientQuery();
    const [localAuth, setLocalAuth] = useState(getUserInfo());
    useEffect(()=>{
        refetch();
        setLocalAuth(getUserInfo());
    },[])
    
    useEffect(() => {
        if (localAuth && localAuth !== null) {
            setData(userData)
            setRole(localAuth.role)
            setAuthChecked(isSuccess && !isError)
            setUserId(userData?.id)
        }
    }, [userData, isError, isSuccess, localAuth]);

    return {
        authChecked,
        data,
        role,
        userId
    };
}