import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const PaginationDevice = ({setPage, item, page}) => {
    return (

        <div>
                <Pagination.Item onClick={()=> setPage(item)} active={page === item}>{item}</Pagination.Item>
        </div>
    );
};

export default PaginationDevice;