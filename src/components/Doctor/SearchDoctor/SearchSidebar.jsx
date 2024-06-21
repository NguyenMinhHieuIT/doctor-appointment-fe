import React from "react";
import { Slider, Button, Radio } from "antd";
import { FaSearch, FaRedoAlt } from "react-icons/fa";
import { SpecialOptions } from "../../../constant/global";
import { InputGroup, Form } from "react-bootstrap";
const SearchSidebar = ({
  setSearchName,
  setSorByGender,
  setSearchAddress,
  setSpecialist,
  setPriceRange,
  resetFilter,
  query,
  onSearch,
}) => {
  const GenderOptions = [
    {
      label: "Nam",
      value: "male",
    },
    {
      label: "Nữ",
      value: "female",
    },
  ];
  const onSelectGender = (e) => setSorByGender(e.target.value);

  const onSelectSpecialist = (e) => setSpecialist(e.target.value);

  const onRangeChange = (range) => {
    const obj = {
      min: range[0],
      max: range[1],
    };
    setPriceRange(obj);
  };

  return (
    <div className="col-md-12 col-lg-4 col-xl-3">
      <div className="p-3 rounded" style={{ background: "#f3f3f3" }}>
        <h5 className="text-center mb-3" style={{ color: "#05335c" }}>
          Tìm kiếm bác sĩ
        </h5>
        <div className="mb-3">
          <InputGroup className="mb-3">
            <Form.Control
              aria-label="Name"
              placeholder="Tên bác sĩ"
              onChange={(e) =>
                setSearchName(e.target.value ? e.target.value : "")
              }
            />
          </InputGroup>
        </div>

        <div className="mb-3">
          <InputGroup className="mb-3">
            <Form.Control
              aria-label="Địa chỉ"
              placeholder="Địa chỉ làm việc"
              onChange={(e) =>
                setSearchAddress(e.target.value ? e.target.value : "")
              }
            />
          </InputGroup>
        </div>

        <div className="mb-3">
          <h6 style={{ color: "#05335c" }}>Giới tính</h6>
          <div className="d-flex flex-column">
            <Radio.Group options={GenderOptions} onChange={onSelectGender} />
          </div>
        </div>

        {/* <div className='mb-3'>
          <h6 style={{ color: '#05335c' }}>Chi phí - vnđ</h6>
          <Slider max={1000000} min={100000} range defaultValue={[100000, 500000]} onChange={onRangeChange} />
        </div> */}

        <div className="mb-3">
          <h6 style={{ color: "#05335c" }}>Chuyên khoa</h6>
          <div className="d-flex flex-column">
            <Radio.Group
              options={SpecialOptions}
              onChange={onSelectSpecialist}
            />
          </div>
        </div>

        <Button
          className="w-100 mt-4 mb-2"
          type="primary"
          style={{ backgroundColor: "#1977cc" }}
          shape="round"
          icon={<FaSearch />}
          size="sm"
          onClick={onSearch}
        >
          Tìm kiếm
        </Button>
        {Object.keys(query).length > 4 && (
          <Button
            className="w-100 mt-4 mb-2"
            style={{ backgroundColor: "#1977cc" }}
            onClick={resetFilter}
            type="primary"
            shape="round"
            icon={<FaRedoAlt />}
            size="sm"
          >
            Quay lại
          </Button>
        )}
      </div>
    </div>
  );
};

export default SearchSidebar;
