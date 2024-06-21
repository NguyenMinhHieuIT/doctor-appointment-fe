import { Popover } from "antd"
import { Link, NavLink } from "react-router-dom"
import { FaBars } from "react-icons/fa";
import { Drawer, Button } from 'antd';
import { FaHome, FaPhoneAlt, FaWrench, FaUserMd, FaAddressBook, FaBloggerB, FaSignInAlt } from "react-icons/fa";

const HeaderNav = ({ open, setOpen, isLoggedIn, data, avatar, content }) => {
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    return (
        <>
            <nav id="navbar" className="navbar order-last order-lg-0">
                <ul>
                    <li><NavLink to={'/'} className={({ isActive }) => isActive ? "nav-link scrollto active" : ""}>Trang chủ</NavLink></li>
                    <li><NavLink to={'/about'} className={({ isActive }) => isActive ? "nav-link scrollto active" : ""}>Về chúng tôi</NavLink></li>
                    <li><NavLink to={'/doctors'} className={({ isActive }) => isActive ? "nav-link scrollto active" : ""}>Bác sĩ</NavLink></li>
                    <li><NavLink to={'/contact'} className={({ isActive }) => isActive ? "nav-link scrollto active" : ""}>Liên hệ</NavLink></li>
                  
                    {!isLoggedIn && <li><Link to={'/login'} className="nav-link scrollto">Đăng nhập</Link></li>}
                    {data?.role === 'admin' && isLoggedIn && <li><Link to={'/admin/dashboard'} className="nav-link scrollto">Admin</Link></li>}
                </ul>
                {isLoggedIn &&
                    <div>
                        <Popover content={content}>
                            <div className='profileImage'>
                                <img src={data?.avatar ? data?.avatar : avatar} alt="" className="profileImage shadow img-fluid" />
                            </div>
                        </Popover>
                    </div>
                }
                <FaBars className='mobile-nav-toggle' onClick={showDrawer} />
            </nav>
            <Drawer
                placement={'left'}
                width={500}
                onClose={onClose}
                open={open}
                size={"default"}
                extra={<Button type="primary" onClick={onClose}> Đóng</Button>}
            >
                <ul className="mobile-menu-nav">
                    <li><NavLink to={'/'} className={({ isActive }) => isActive ? "nav-link scrollto active" : ""}><FaHome className="icon" />Trang chủ</NavLink></li>
                    <li><NavLink to={'/about'} className={({ isActive }) => isActive ? "nav-link scrollto active" : ""}><FaAddressBook className="icon" />Về chúng tôi</NavLink></li>
                    <li><NavLink to={'/doctors'} className={({ isActive }) => isActive ? "nav-link scrollto active" : ""}><FaUserMd className="icon" />Bác sĩ</NavLink></li>
                    <li><NavLink to={'/contact'} className={({ isActive }) => isActive ? "nav-link scrollto active" : ""}><FaPhoneAlt className="icon" />Liên hệ</NavLink></li>
                    
                    {!isLoggedIn && <li><Link to={'/login'} className="nav-link scrollto"><FaSignInAlt className="icon" />Đăng nhập</Link></li>}
                    {data?.role === 'admin' && isLoggedIn && <li><Link to={'/admin/dashboard'} className="nav-link scrollto">Admin</Link></li>}
                </ul>
            </Drawer>
        </>
    )
}

export default HeaderNav