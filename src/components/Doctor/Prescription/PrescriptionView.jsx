import { useParams } from "react-router-dom";
import logo from '../../../images/logo.webp';
import Footer from "../../Shared/Footer/Footer";
import Header from "../../Shared/Header/Header";
import { useGetPrescriptionQuery } from "../../../redux/api/prescriptionApi";
import moment from "moment";
import { Empty, Table, Button } from "antd";
import './index.css';
import { useRef } from "react";
import { FaPrint } from "react-icons/fa";
import ReactToPrint from "react-to-print";

const PrescriptionView = () => {
    const ref = useRef();
    const { id } = useParams();
    const { data, isLoading, isError } = useGetPrescriptionQuery(id);

    const columns = [
        {
            title: 'Thuốc',
            dataIndex: 'medicine',
            key: 'medicine',
        },
        {
            title: 'Liều lượng',
            dataIndex: 'dosage',
            key: 'dosage',
        },
        {
            title: 'Tần suất',
            dataIndex: 'frequency',
            key: 'frequency',
        },
        {
            title: 'Giai đoạn',
            key: 'duration',
            dataIndex: 'duration',
        },

    ];

    let content = null;
    if (isLoading) content = <div>Loading ...</div>
    if (!isLoading && isError) content = <div>Something went Wrong!</div>
    if (!isLoading && !isError && !data) content = <Empty />
    if (!isLoading && !isError && data) content =
        <>
            <div className="col-lg-8 offset-lg-2">
                <div className="invoice-content">
                    <div className="invoice-item">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="invoice-logo">
                                    <img src={logo} alt="" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <p className="invoice-details">
                                    <strong>Ngày cấp:</strong> {moment(data.createdAt).format('LL')}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="invoice-item">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="invoice-info p-2 rounded" style={{ background: '#c9c9c92b' }}>
                                    <div className="invoice-details invoice-details-two " >
                                        <h3>Dr.{data?.appoint?.doctor?.name}</h3>
                                        <p>{data?.appoint?.doctor?.designation}</p>
                                        <p>{data?.appoint?.doctor?.college}</p>
                                        <p>{data?.appoint?.doctor?.clinicName}-{data?.appoint?.doctor?.clinicAddress}</p>
                                        <span className="form-text">{data?.appoint?.doctor?.phone}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="invoice-info">
                                    <strong className="customer-text text-secondary">Thông tin bệnh nhân:</strong>
                                    <div className="invoice-details invoice-details-two">
                                        <div className="d-flex justify-content-between patient-name">
                                            <div>
                                                <h5 style={{ fontWeight: 700 }}>Tên bệnh nhân : {data?.appoint?.name}</h5>
                                                <p className="form-text">Địa chỉ: {data?.appoint?.address},</p>
                                            </div>
                                            <div>
                                                <p>Số điện thoại :  {data?.appoint?.phone}</p>
                                                <p>Email : {data?.appoint?.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="invoice-item invoice-table-wrap">
                        <div className="row border-top border-2">
                            <div className="col-md-3 col-xl-3 border-end border-2 symptoms-section">
                                <div className="mt-3">
                                    <div>
                                        <h5>Triệu chứng</h5>
                                        <p>{data?.disease}</p>
                                    </div>
                                    <div>
                                        <h5>Bệnh</h5>
                                        <p>{data?.daignosis}</p>
                                    </div>
                                    <div>
                                        <h5>Khám</h5>
                                        <p>{data?.test}</p>
                                    </div>                                   
                                    <div>
                                        <h5>Chỉ định</h5>
                                        <p>{data?.instruction}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-9 col-xl-9 px-0">
                                <Table columns={columns} dataSource={data?.medicine} pagination={false} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    return (
        <>
            <Header />

            <div className="content" style={{ marginTop: '10rem', marginBottom: '7rem' }}>
                <div className="d-flex justify-content-end" style={{ marginRight: '8rem' }}>
                    <ReactToPrint
                        bodyClass="print-agreement"
                        content={() => ref.current}
                        trigger={() => (<Button type="primary" icon={<FaPrint />}> Print</Button>)}
                    />
                </div>
                <div className="container-fluid" ref={ref}>
                    <div className="row">
                        {content}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default PrescriptionView