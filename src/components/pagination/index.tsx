import ReactPaginate from 'react-paginate';
// import 'tailwindcss/tailwind.css';

const Pagination = ({ perPage, handlePerPageChange, handlePageChange, paginationData }:any) => {
  const lowerBound = (paginationData.page - 1) * perPage + 1;
  const upperBound = Math.min(paginationData.page * perPage, paginationData.totalCount);
  
  return (
    <>
      <div className='md:mb-0 mb-4'>
      Showing {lowerBound} - {upperBound} out of {paginationData?.totalCount}
        <select defaultValue={perPage} onChange={handlePerPageChange} className='px-3 py-2 rounded-lg w-16 text-center border border-gray-200 ml-3'>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={100}>100</option>
        </select>
      </div>
      {
        paginationData?.totalCount > perPage && (
            <div className="flex md:justify-end customepagination">
                <ReactPaginate
                previousLabel="<"
                nextLabel=">"
                breakLabel="..."
                pageCount={paginationData.totalPages || 1}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                containerClassName="flex"
                pageClassName="mx-1 border border-gray-300 text-purple-700 rounded"
                previousClassName="mx-1 border border-gray-300 text-purple-700 rounded"
                nextClassName="mx-1 border border-purple-700 text-purple-700 rounded"
                breakClassName="mx-1 border border-purple-700 text-purple-700 rounded"
                disabledClassName="opacity-50 cursor-not-allowed"
                activeClassName="bg-purple-700 text-white"
                onPageChange={handlePageChange}
                />
            </div>
        )
      }
    </>
  );
};

export default Pagination;