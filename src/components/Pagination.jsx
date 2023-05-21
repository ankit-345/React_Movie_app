import React from 'react'; 
import ReactPaginate from 'react-paginate';

const Pagination = ({ handlePageClick, total_pages}) =>{

    return (
      <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageCount={total_pages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
      </>
    )
}

export default Pagination;