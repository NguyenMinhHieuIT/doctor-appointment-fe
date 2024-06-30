import React, { useState, useEffect } from 'react';
import Footer from '../../Shared/Footer/Footer';
import SearchSidebar from './SearchSidebar';
import SearchContent from './SearchContent';
import { useGetDoctorsQuery } from '../../../redux/api/doctorApi';
import { Empty, Pagination } from 'antd';
import Header from '../../Shared/Header/Header';
import SubHeader from '../../Shared/SubHeader';
import useAuthCheck from '../../../redux/hooks/useAuthCheck';

const SearchDoctor = () => {
  const [query, setQuery] = useState({});
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const [sortByGender, setSorByGender] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [priceRange, setPriceRange] = useState({});
  const {authChecked, data: userData} = useAuthCheck();
  const { data, isLoading, isError } = useGetDoctorsQuery(query);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(3);


  let doctorsData = data?.data;
  let meta = data?.meta;

  const buildQuery = () => {
    const newQuery = {
      pageSize: pageSize,
      pageNumber: pageNumber,
      sortBy,
      sortOrder,
      search: '',
      searchFields: []
    };

    if (sortByGender !== '') {
      newQuery.searchFields.push('gender');
      if (newQuery.search === '') newQuery.search = sortByGender;
      else newQuery.search += ',' + sortByGender;
    }

    if (specialist !== '') {
      newQuery.searchFields.push('specialization');
      if (newQuery.search === '') newQuery.search = specialist;
      else newQuery.search += ',' + specialist;
    }

    if (searchName !== '') {
      newQuery.searchFields.push('name');
      if (newQuery.search === '') newQuery.search = searchName;
      else newQuery.search += ',' + searchName;
    }

    if (searchAddress !== '') {
      newQuery.searchFields.push('clinicAddress');
      if (newQuery.search === '') newQuery.search = searchAddress;
      else newQuery.search += ',' + searchAddress;
    }

    if (Object.keys(priceRange)?.length !== 0) {
      newQuery.min = priceRange.min;
      newQuery.max = priceRange.max;
    }

    setQuery(newQuery);
  };

  useEffect(() => {
    buildQuery();
    doctorsData = data?.data;
    meta = data?.meta;
  }, [pageSize, pageNumber, sortBy, sortOrder, searchName, sortByGender, specialist, priceRange, searchAddress]);

  const resetFilter = () => {
    setPageSize(3);
    setPageNumber(1);
    setSortBy("");
    setSortOrder("");
    setSearchName("");
    setSearchAddress('');
    setSorByGender("");
    setSpecialist("");
    setPriceRange({});
    setQuery({});
  };




  let content = <></>;
  if (isLoading) content = <>Loading ...</>;
  if (!isLoading && isError) content = <div>Something Went Wrong !</div>;
  if (!isLoading && !isError && doctorsData.length === 0) content = <div><Empty /></div>;
  if (!isLoading && !isError && doctorsData.length > 0) content = (
    <>
      {doctorsData.map((item, id) => (
        <SearchContent key={item.id} data={item} userData={userData} />
      ))}
    </>
  );

  const onPaginationChange = (page, pageSizee) => {
    if (page !== pageNumber) {
      setPageNumber(page);
      setPageSize(pageSizee);
    }

    if (pageSizee !== pageSize) {
      setPageNumber(1);
      setPageSize(pageSizee);
    }
    buildQuery();
    doctorsData = data?.data;
    meta = data?.meta;
  };

  return (
    <div>
      <Header />
      <div className="container" style={{ marginBottom: 200, marginTop: 150 }}>
        <div className="container-fluid">
          <div className="row">
            <SearchSidebar
              setSearchName={setSearchName}
              setSearchAddress={setSearchAddress}
              setSorByGender={setSorByGender}
              setSpecialist={setSpecialist}
              setPriceRange={setPriceRange}
              resetFilter={resetFilter}
              query={query}
              onSearch={buildQuery}
            />
            <div className="col-md-12 col-lg-8 col-xl-9">
              { content }
              <div className='text-center mt-5 mb-5'>
                <Pagination
                  showSizeChanger
                  onChange={onPaginationChange}
                  total={meta?.totalPages * meta?.pageSize}
                  pageSizeOptions={[1, 2, 3, 5, 10, 20, 30]} 
                  current={pageNumber}
                  pageSize={pageSize}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SearchDoctor;
