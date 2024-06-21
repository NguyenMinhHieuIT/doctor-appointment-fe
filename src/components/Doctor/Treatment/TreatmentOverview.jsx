import { Link } from "react-router-dom";
import profileImg from '../../../images/avatar.jpg';
import { FaClock, FaEnvelope, FaLocationArrow, FaPhoneAlt } from "react-icons/fa";
import moment from "moment";
import { Tag } from "antd";

const TreatmentOverview = ({ data, isAppointment = false }) => {
    return (
        <>
            <div className="w-100 mb-3 rounded p-3 text-center d-flex justify-content-between bg-gray-g">
                <div className="container row">
                    <div className="col-5 p-2 rounded text-white border border-success">
                        <Link to={'/'} className="my-3 patient-img">
                            <img src={data?.patient?.avatar ?? profileImg} alt="" style={{ height: '90px', width: '90px' }} />
                        </Link>
                        <div className="patients-info mt-3">
                            <h5>{data?.patient?.name}</h5>
                            <div className="info">
                                <p><FaClock className='icon' /> {moment(data?.createdAt).format('LL')} </p>
                                <p><FaLocationArrow className='icon' /> {data?.patient?.address}</p>
                                <p><FaEnvelope className='icon' /> {data?.patient?.email}</p>
                                <p><FaPhoneAlt className='icon' /> {data?.patient?.phone}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default TreatmentOverview