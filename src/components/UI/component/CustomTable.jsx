import React from 'react'
import { Table } from 'antd';

const CustomTable = ({
    dataSource,
    columns,
    loading,
    pageSize,
    totalPages,
    showPagination = true,
    onPaginationChange,
    onTableChange,
    showSizeChanger,
    onShowSizeChange,
    currentPage,
}) => {
    const paginationConfig = showPagination ? {
        pageSize: pageSize,
        total: totalPages,
        pageSizeOptions: [1, 2, 3, 5, 10, 20, 30],
        showSizeChanger: showSizeChanger,
        onChange: onPaginationChange,
        onShowSizeChange:onShowSizeChange,
        showPagination: true,
        current: currentPage
    } : false;
    return (
        <Table
            loading={loading}
            dataSource={dataSource}
            columns={columns}
            onChange={onTableChange}
            pagination={paginationConfig}
            scroll={{
                y:420
            }}
        />
    )
}

export default CustomTable