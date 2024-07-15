import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout/AdminLayout";
import "./Doctors.css";
import { useAdminGetAppointQuery, useAdminGetDoctorQuery, useAdminGetPatientQuery, useAdminGetReviewQuery } from "../../../redux/api/adminApi";
import CustomTable from "../../UI/component/CustomTable";
import { Tabs, Select, Input} from "antd";
import { FaEye, FaEdit, FaTrash, FaPlusCircle } from "react-icons/fa";
import ModalViewDoctor from "./ModalViewDoctor";
import ModalUpdateDoctor from "./ModalUpdateDoctor";
import { searchDoctorOptions } from "../../../constant/admin.constant";
import { toast } from "react-toastify";
import ModalDeleteDoctor from "./ModalDeleteDoctor";
import moment from "moment";

const Reviews = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [showView, setShowView] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [selectItems, setSelectItems] = useState([]);
  const [selectValues, setSelectValues] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [seed, setSeed] = useState(1);
  const [query, setQuery] = useState({ sort: "id", pageSize, pageNumber });
  const { data, isLoading, refetch } = useAdminGetReviewQuery(query);
  const [sortId, setSortId] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    setQuery({ sort: "id", pageSize, pageNumber, search: selectValues, searchFields: selectItems});
  }, [pageSize, pageNumber, selectValues]);
  const reset = () => {
    setSeed(Math.random());
  };

  const sortById = () => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      sort: sortId ? "id" : "-id",
    }));
    setSortId(!sortId);
  };

  const setModalView = (id) => {
    setShowView(true);
    setId(id);
  };

  const setModalUpdate = (id) => {
    setShowUpdate(true);
    setId(id);
  };

  const setModalDelete = (id) => {
    setShowDelete(true);
    setId(id);
  };

  const onPaginationChange = (page, pageSizee) => {
    if (page !== pageNumber) {
      setPageNumber(page);
      setPageSize(pageSizee);
    }

    if (pageSizee !== pageSize) {
      setPageNumber(1);
      setPageSize(pageSizee);
    }
  };

  const doctorColumns = [
    {
      title: (
        <div onClick={sortById} style={{ cursor: "pointer" }}>
          #
        </div>
      ),
      width: 3,
      render: (data) => <p className="text-nowrap mb-0">{data?.id}</p>,
    },
    {
      title: "Bệnh nhân",
      width: 15,
      render: (data) => <h6 className="text-nowrap mb-0">{data?.user?.name}</h6>,
    },
    {
      title: "Bác sĩ",
      width: 15,
      render: (data) => (
        <h6 className="text-nowrap mb-0">{data?.doctor?.name ?? "null"}</h6>
      ),
    },
    {
      title: "Đánh giá",
      width: 20,
      render: (data) => <h6 className="text-nowrap mb-0">{data?.description}</h6>,
      ellipsis: true,
    },
    {
      title: "Có giới thiệu",
      width: 10,
      render: (data) => (
        <h6 className="text-nowrap mb-0">{data?.isRecommended + ''}</h6>
      ),
      ellipsis: true,
    },
    {
      title: "Số sao",
      width: 20,
      render: (data) => (
        <h6 className="text-nowrap mb-0">{ data?.star }</h6>
      ),
      ellipsis: true,
    },
    {
      title: "Hành động",
      width: 20,
      render: (data) => (
        <div>
          <div
            className="btn btn-primary mx-2"
            onClick={() => setModalView(data?.id)}
          >
            <FaEye />
          </div>
          <div
            className="btn btn-warning mx-2"
            onClick={() => setModalUpdate(data?.id)}
          >
            <FaEdit />
          </div>
          <div className="btn btn-danger mx-2" 
          onClick={() => setModalDelete(data?.id)}
          >
            <FaTrash />
          </div>
        </div>
      ),
    },
  ];

  const items = [
    {
      key: "1",
      label: "Bệnh nhân",
      children: (
        <CustomTable
          loading={isLoading}
          columns={doctorColumns}
          dataSource={data?.data}
          pageSize={pageSize}
          totalPages={data?.meta?.totalPages * data?.meta?.pageSize}
          currentPage={pageNumber}
          showPagination={true}
          showSizeChanger={true}
          onPaginationChange={onPaginationChange}
        />
      ),
    },
  ];

  const handleClose = () => {
    setShowAdd(false);
    setShowView(false);
    setShowUpdate(false);
    setShowDelete(false);
    reset();
  };

  const onSearch = (value) => {
    const valueLength = value ? value.split(',').length : 0;
    if(valueLength !== selectItems.length){
        toast.error('Dữ liệu và trường tìm kiếm không khớp nhau');
        return;
    }
    setSelectValues(value);
  };

  return (
    <>
      <AdminLayout>
        <h1>Đánh giá bác sĩ</h1>
        <br />
        <ModalViewDoctor show={showView} handleClose={handleClose} id={id} />
        <ModalUpdateDoctor
          key={seed}
          show={showUpdate}
          handleClose={handleClose}
          id={id}
          refetchParent={refetch}
        />
        <ModalDeleteDoctor show={showDelete} handleClose={handleClose} id={id} refetch={refetch}/>
       
        <Tabs defaultActiveKey="1" items={items} />
      </AdminLayout>
    </>
  );
};

export default Reviews;
