import React from 'react';
import { Slider, Button, DatePicker, Radio } from 'antd';
import { FaSearch, FaRedoAlt } from "react-icons/fa";
import { SpecialOptions } from '../../../constant/global';
import { InputGroup, Form } from 'react-bootstrap';
const SearchSidebar = ({ setSearchTerm, setSorByGender, setSpecialist, setPriceRange, resetFilter, query, onSearch }) => {
  const handleDateChange = (_date, _dateString) => { }
  const GenderOptions = [
    {
      label: 'Male',
      value: 'male',
    },
    {
      label: 'Female',
      value: 'female',
    }
  ];
  const onSelectGender = (e) => setSorByGender(e.target.value)

  const onSelectSpecialist = (e) => setSpecialist(e.target.value)

  const onRangeChange = (range) => {
    const obj = {
      min: range[0],
      max: range[1]
    }
    setPriceRange(obj)
  }

  return (
    <div className="col-md-12 col-lg-4 col-xl-3">
      <div className="p-3 rounded" style={{ background: '#f3f3f3' }}>
        <h5 className='text-center mb-3' style={{ color: '#05335c' }}>Doctor Filter</h5>
        <div className="mb-3">
        <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          Name
        </InputGroup.Text>
        <Form.Control
          aria-label="Name"
          placeholder="Name..."
          onChange={(e)=> setSearchTerm( e.target.value ? e.target.value : '' )}
        />
      </InputGroup>
        </div>
        <div className='mb-3'>
          <h6 style={{ color: '#05335c' }}>Date Range</h6>
          <DatePicker
            style={{ width: "100%" }}
            format="YYYY-MM-DD HH:mm:ss"
            onChange={handleDateChange}
          />
        </div>

        <div className='mb-3'>
          <h6 style={{ color: '#05335c' }}>Gender</h6>
          <div className='d-flex flex-column'>
            <Radio.Group options={GenderOptions} onChange={onSelectGender} />
          </div>
        </div>

        <div className='mb-3'>
          <h6 style={{ color: '#05335c' }}>Price Range</h6>
          <Slider range defaultValue={[75, 150]} onChange={onRangeChange} />
        </div>

        <div className='mb-3'>
          <h6 style={{ color: '#05335c' }}>Select Specialist</h6>
          <div className='d-flex flex-column'>
            <Radio.Group options={SpecialOptions} onChange={onSelectSpecialist} />
          </div>
        </div>

        <Button className='w-100 mt-4 mb-2' type="primary" style={{ backgroundColor: '#1977cc' }} shape="round" icon={<FaSearch />} size="sm" onClick={onSearch}>Search</Button>
        {
          Object.keys(query).length > 4 && <Button className='w-100 mt-4 mb-2' style={{ backgroundColor: '#1977cc' }} onClick={resetFilter} type="primary" shape="round" icon={<FaRedoAlt />} size="sm">Reset</Button>
        }
      </div>
    </div>
  );
}

export default SearchSidebar;
