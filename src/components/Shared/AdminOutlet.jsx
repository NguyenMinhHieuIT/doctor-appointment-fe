import { Outlet, useNavigate } from 'react-router-dom';
import { getUserInfo } from '../../service/auth.service';
import { useEffect } from 'react';
import useAuthCheck from '../../redux/hooks/useAuthCheck';
import { toast } from 'react-toastify';
import Home from '../Home/Home/Home';

const AdminOutlet = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const localAuth = getUserInfo();
        if (!localAuth) 
            navigate('/login', { replace: true }) 

        if (localAuth?.role !== 'admin') {
            navigate('/')
            toast.error('Bạn không phải admin!');
        }
    }, [navigate]);

    return <Outlet />
};

export default AdminOutlet;