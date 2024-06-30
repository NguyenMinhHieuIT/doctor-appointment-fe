import { useEffect, useState } from 'react';
import './index.css';
import useAuthCheck from '../../../redux/hooks/useAuthCheck';
import TopHeader from '../TopHeader/TopHeader';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../images/logo.webp';
import avatar from '../../../images/avatar.jpg';
import { Button, message } from 'antd';
import { loggedOut } from '../../../service/auth.service';
import HeaderNav from './HeaderNav';
import { toast } from 'react-toastify';
import { useLogoutMutation } from '../../../redux/api/authApi';
import { localeData } from 'moment';
const Header = () => {
    const navigate = useNavigate();
    const { authChecked, data } = useAuthCheck();
    const [isLoggedIn, setIsLogged] = useState(false);
    const [show, setShow] = useState(true);
    const [open, setOpen] = useState(false);
    const [logout, {isSuccess: lIsSuccess, isError: lIsError}] = useLogoutMutation();
    // const lastScrollRef = useRef(0);
    const handleScroll = () => {
        const currentScroll = window.scrollY;
        // if (currentScroll > lastScrollRef.current) { // Undo scroll up effect
        if (currentScroll > 50) {
            setShow(false);
        } else {
            setShow(true);
        }
        // lastScrollRef.current = currentScroll;
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return (() => window.removeEventListener('scroll', handleScroll));   
    }, [])

    useEffect(() => { authChecked && setIsLogged(true) }, [authChecked]);
    const hanldeSignOut = () => {
        logout();
    }

    useEffect(()=>{
        if(lIsSuccess){
            loggedOut();
            setIsLogged(false);
            navigate('/');
            toast.success("Đăng xuất thành công");
        }
        
        if(lIsError)  toast.error("Đăng xuất thất bại");
    },[lIsSuccess, lIsError]);

    const content = (
        <div className='nav-popover'>
            <div className='my-2'>
                <h5 className='text-capitalize'>{data?.name}</h5>
                <p className='my-0'>{data?.email}</p>
                <Link to="/dashboard">Trang cá nhân</Link>
            </div>
            <Button variant="outline-danger" className='w-100' size="sm" onClick={hanldeSignOut}>
                Đăng xuất
            </Button>
        </div >
    );
    return (
        <>
            <div className={`navbar navbar-expand-lg navbar-light ${!show && "hideTopHeader"}`} expand="lg">
                <TopHeader />
            </div>
            <header id="header" className={`fixed-top ${!show && "stickyHeader"}`}>
                <div className="container d-flex align-items-center">

                    <Link to={'/'} className="logo me-auto">
                        <img src={logo} alt="" className="img-fluid" />
                        <span style={{color: '#1977cc'}}>DoctorApp</span>
                    </Link>
                    <div>
                        <HeaderNav isLoggedIn={isLoggedIn} data={data}
                        avatar={avatar} content={content} open={open} setOpen={setOpen} />
                    </div>
                    
                </div>
            </header>
        </>
    )
}

export default Header