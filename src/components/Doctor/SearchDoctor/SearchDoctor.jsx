import React, { useState, useEffect } from 'react';
import Footer from '../../Shared/Footer/Footer';
import SearchSidebar from './SearchSidebar';
import SearchContent from './SearchContent';
import { useGetDoctorsQuery } from '../../../redux/api/doctorApi';
import { Empty, Pagination } from 'antd';
import Header from '../../Shared/Header/Header';
import SubHeader from '../../Shared/SubHeader';

const SearchDoctor = () => {
  const [query, setQuery] = useState({});
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortByGender, setSorByGender] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [priceRange, setPriceRange] = useState({});

  const buildQuery = () => {
    const newQuery = {
      pageSize: size,
      pageNumber: page,
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

    if (searchTerm !== '') {
      newQuery.searchFields.push('name');
      if (newQuery.search === '') newQuery.search = searchTerm;
      else newQuery.search += ',' + searchTerm;
    }

    if (Object.keys(priceRange)?.length !== 0) {
      newQuery.min = priceRange.min;
      newQuery.max = priceRange.max;
    }

    setQuery(newQuery);
  };

  useEffect(() => {
    buildQuery();
  }, [page, size, sortBy, sortOrder, searchTerm, sortByGender, specialist, priceRange]);

  const resetFilter = () => {
    setPage(1);
    setSize(10);
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
    setSorByGender("");
    setSpecialist("");
    setPriceRange({});
    setQuery({});
  };

  const { data, isLoading, isError } = useGetDoctorsQuery(query);
  const doctorsData = data?.data || [];
  const meta = data?.meta;

  let content = <></>;
  if (isLoading) content = <>Loading ...</>;
  if (!isLoading && isError) content = <div>Something Went Wrong !</div>;
  if (!isLoading && !isError && doctorsData.length === 0) content = <div><Empty /></div>;
  if (!isLoading && !isError && doctorsData.length > 0) content = (
    <>
      {doctorsData.map((item, id) => (
        <SearchContent key={id + item.id} data={item} />
      ))}
    </>
  );

  const onShowSizeChange = (current, pageSize) => {
    setPage(current);
    setSize(pageSize);
    buildQuery();
  };

  return (
    <div>
      <Header />
      <SubHeader title='Doctors' subtitle='Lorem ipsum dolor sit amet.' />
      <div className="container" style={{ marginBottom: 200, marginTop: 80 }}>
        <div className="container-fluid">
          <div className="row">
            <SearchSidebar
              setSearchTerm={setSearchTerm}
              setSorByGender={setSorByGender}
              setSpecialist={setSpecialist}
              setPriceRange={setPriceRange}
              resetFilter={resetFilter}
              query={query}
              onSearch={buildQuery}
            />
            <div className="col-md-12 col-lg-8 col-xl-9">
              {content}
              <div className='text-center mt-5 mb-5'>
                <Pagination
                  showSizeChanger
                  onShowSizeChange={onShowSizeChange}
                  total={meta?.total}
                  pageSize={size}
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
